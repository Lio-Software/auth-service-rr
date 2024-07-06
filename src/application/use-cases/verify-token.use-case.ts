import { AuthInterface } from "../../domain/interfaces/auth.interface";
import signale from "signale";

export class VerifyTokenUseCase {
    constructor(readonly authRepository: AuthInterface) {}

    async execute(accessToken: string) {
        const response = await this.authRepository.verifyToken(accessToken);

        if (!response) {
            signale.error("Failed to verify token");
            return null;
        }
        return response;
    }
}
