import { AuthInterface } from "../../domain/interfaces/auth.interface";
import signale from "signale";

export class RegisterUseCase {
    constructor(readonly authRepository: AuthInterface) {}

    async execute(firstName: string, lastName: string, email: string, password: string): Promise<string | null> {
        const userId = await this.authRepository.registerUser({firstName, lastName, email, password});

        if (!userId) {
            signale.error("Failed to register user");
            return null;
        }
        return userId;
    }
}
