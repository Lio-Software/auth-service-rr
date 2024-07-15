import { RegisterUserRequest } from "../../domain/entities/dtos/requests/register-user.request";
import UserModel from "../../database/mysql/models/user.model";
import { AuthUserResponse } from "../../domain/entities/dtos/responses/auth-user.response";
import { VerifyTokenResponse } from "../../domain/entities/dtos/responses/verify-token.response";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import { BcryptUtils } from "../utils/bcrypt.utils";
import { createAccessToken, createRefreshToken, validateToken, refreshAccessToken, decodeToken } from "../utils/jwt.utils";
import { AccessTokenPayload } from "../../domain/entities/dtos/requests/access-token-payload";

export class MysqlAuthRepository implements AuthInterface {
    public async registerUser(request: RegisterUserRequest): Promise<string | null> {
        const foundUser = await UserModel.findOne({ where: { email: request.email } });

        const encryptedPassword = await BcryptUtils.hash(request.password);

        if (foundUser === null) {
            const createdUser = await UserModel.create({
                firstName: request.firstName,
                lastName: request.lastName,
                email: request.email,
                password: encryptedPassword,
                phoneNumber: request.phoneNumber,
            });
            return createdUser.uuid;
        }
        return null;
    }

    public async authenticateUser(email: string, password: string): Promise<AuthUserResponse | null> {
        const isValid = await this.userIsValid(email, password);

        if (isValid) {
            const foundUser = await this.getUserByEmail(email);

            const accessTokenPayload: AccessTokenPayload = new AccessTokenPayload(foundUser?.firstName ?? '', foundUser?.lastName ?? '', foundUser?.email ?? '', foundUser?.phoneNumber ?? '', foundUser?.imageUrl ?? '', foundUser?.uuid ?? '');

            const accessToken = await createAccessToken(accessTokenPayload);
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
