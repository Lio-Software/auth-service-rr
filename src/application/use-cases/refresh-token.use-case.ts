import { AuthInterface } from "@src/domain/interfaces/auth.interface";
import signale from "signale";

export class RefreshTokenUseCase {
    constructor(readonly authRepository: AuthInterface) {}

    async execute(refreshToken: string, accessToken: string) {
        const token = await this.authRepository.refreshAccessToken(refreshToken, accessToken);

        if (!token) {
            signale.error("Failed to refresh token");
            return null;
        }
        return token;
    }
}
