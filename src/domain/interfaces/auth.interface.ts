import { RegisterUserRequest } from "../entities/dtos/requests/register-user.request";
import { AuthUserResponse } from "../entities/dtos/responses/auth-user.response";
import { VerifyTokenResponse } from "../entities/dtos/responses/verify-token.response";

export interface AuthInterface {
    registerUser(user: RegisterUserRequest): Promise<string | null>;
    authenticateUser(email: string, password: string): Promise<AuthUserResponse | null>;
    refreshAccessToken(refreshToken: string, accessToken: string): Promise<string | null>;
    logout(refreshToken: string): Promise<boolean>;
    verifyToken(accessToken: string): Promise<VerifyTokenResponse | null>;
    recoverPassword(email: string): Promise<boolean>;
    resetPassword(recoveryToken: string, newPassword: string): Promise<boolean>;
}
