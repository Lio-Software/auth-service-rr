import { RegisterUseCase } from "../application/use-cases/register.use-case";
import { LoginUseCase } from "../application/use-cases/login.use-case";
import { MysqlAuthRepository } from "./repositories/mysql-auth.repository";
import { AuthController } from "./controllers/auth.controller";
import { RefreshTokenUseCase } from "../application/use-cases/refresh-token.use-case";

const mysqlAuthRepository = new MysqlAuthRepository();

const registerUseCase = new RegisterUseCase(mysqlAuthRepository);
const loginUseCase = new LoginUseCase(mysqlAuthRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(mysqlAuthRepository);

export const authController = new AuthController(registerUseCase, loginUseCase, refreshTokenUseCase);
