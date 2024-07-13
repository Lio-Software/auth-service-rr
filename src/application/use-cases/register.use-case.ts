import { RegisterUserRequest } from "../../domain/entities/dtos/requests/register-user.request";
import { AuthInterface } from "../../domain/interfaces/auth.interface";
import signale from "signale";

export class RegisterUseCase {
    constructor(readonly authRepository: AuthInterface) {}

    async execute(request: RegisterUserRequest): Promise<string | null> {
        const userId = await this.authRepository.registerUser(request);

        if (!userId) {
            signale.error("Failed to register user");
            return null;
        }
        return userId;
    }
}
