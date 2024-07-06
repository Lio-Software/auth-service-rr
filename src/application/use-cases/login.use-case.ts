import { AuthUserResponse } from "../../domain/entities/dtos/responses/auth-user.response";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import signale from "signale";

export class LoginUseCase {
    constructor(readonly authRepository: AuthInterface) {}

    async execute(email: string, password: string): Promise<AuthUserResponse | null> {
        const authResponse = await this.authRepository.authenticateUser(email, password);

        if (!authResponse) {
            signale.error("Failed to authenticate user");
            return null;
        }
        return authResponse;
    }
}
