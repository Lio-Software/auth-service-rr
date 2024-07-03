import { RefreshTokenUseCase } from "@src/application/use-cases/refresh-token.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RegisterUseCase } from "../../application/use-cases/register.use-case";
import { Request, Response } from "express";

export class AuthController {
  constructor(readonly registerUseCase: RegisterUseCase, readonly loginUseCase: LoginUseCase, readonly refreshTokenUseCase: RefreshTokenUseCase) { }

  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    const userId = await this.registerUseCase.execute(firstName, lastName, email, password);

    if (!userId) {
      return res.status(500).json({ message: "Failed to register user" });
    }
    return res.status(201).json({ message: "User registered successfully!", userId });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserResponse = await this.loginUseCase.execute(email, password);

    if (!authUserResponse) {
      return res.status(401).json({ message: "Failed to authenticate user" });
    }

    const { accessToken, refreshToken } = authUserResponse;

    return res.status(200).json({ message: "User authenticated successfully!", accessToken, refreshToken });
  }

  async refreshToken(req: Request, res: Response) {
    const { accessToken, refreshToken } = req.body;

    const token = await this.refreshTokenUseCase.execute(refreshToken, accessToken);

    if (!token) {
      return res.status(500).json({ message: "Failed to refresh token" });
    }

    return res.status(200).json({ message: "Token refreshed successfully!", token });
  }
}
