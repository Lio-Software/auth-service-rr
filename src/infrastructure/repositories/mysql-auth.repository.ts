import UserModel from "../../database/mysql/models/user.model";
import { AuthUserResponse } from "../../domain/entities/dtos/responses/auth-user.response";
import { VerifyTokenResponse } from "../../domain/entities/dtos/responses/verify-token.response";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import { BcryptUtils } from "../utils/bcrypt.utils";
import { createAccessToken, createRefreshToken, validateToken, refreshAccessToken, decodeToken } from "../utils/jwt.utils";

export class MysqlAuthRepository implements AuthInterface {
    public async registerUser(user: UserEntity): Promise<string | null> {
        const foundUser = await UserModel.findOne({ where: { email: user.email } });

        const encryptedPassword = await BcryptUtils.hash(user.password);

        if (foundUser === null) {
            const createdUser = await UserModel.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: encryptedPassword,
            });
            return createdUser.uuid;
        }
        return null;
    }

    public async authenticateUser(email: string, password: string): Promise<AuthUserResponse | null> {
        const isValid = await this.userIsValid(email, password);

        if (isValid) {
            const foundUser = await this.getUserByEmail(email);

            const accessToken = await createAccessToken(foundUser?.firstName ?? '', foundUser?.lastName ?? '', foundUser?.email ?? '', foundUser?.uuid ?? '');
            const refreshToken = await createRefreshToken(foundUser?.uuid || '');
            return new AuthUserResponse(accessToken, refreshToken);
        }
        return null;
    }

    public async refreshAccessToken(refreshToken: string, accessToken: string): Promise<string | null> {
        const isValid = await validateToken(refreshToken);

        if (isValid) {
            const newAccessToken = await refreshAccessToken(accessToken);
            return newAccessToken;
        }
        return null;
    }

    public async logout(refreshToken: string): Promise<boolean> {
        return false;
    }

    public async verifyToken(accessToken: string): Promise<VerifyTokenResponse | null> {
        const isValid = await validateToken(accessToken);

        if (isValid) {
            const decodedToken = await decodeToken(accessToken) as { [key: string]: any };

            return new VerifyTokenResponse(true, decodedToken.data.uuid, decodedToken.data.email);
        }
        return null;
    }

    public async recoverPassword(email: string): Promise<boolean> {
        return false;
    }

    public async resetPassword(recoveryToken: string, newPassword: string): Promise<boolean> {
        return false;
    }

    private async userIsValid(email: string, password: string): Promise<boolean> {
        const foundUser = await UserModel.findOne({ where: { email } });

        if (foundUser === null) {
            return false;
        }

        const isValid = await BcryptUtils.compare(password, foundUser.password);

        return isValid;
    }

    private async getUserByEmail(email: string): Promise<UserModel | null> {
        const foundUser = await UserModel.findOne({ where: { email } });

        return foundUser;
    }
}
