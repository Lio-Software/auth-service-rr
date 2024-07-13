import { RefreshTokenUseCase } from "../../application/use-cases/refresh-token.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { RegisterUseCase } from "../../application/use-cases/register.use-case";
import { Request, Response } from "express";
import { VerifyTokenUseCase } from "../../application/use-cases/verify-token.use-case";
import { BaseResponse } from "../../domain/entities/dtos/responses/base.response";
import { RegisterUserRequest } from "@src/domain/entities/dtos/requests/register-user.request";

export class AuthController {
	constructor(readonly registerUseCase: RegisterUseCase, readonly loginUseCase: LoginUseCase, readonly refreshTokenUseCase: RefreshTokenUseCase, readonly verifyTokenUseCase: VerifyTokenUseCase) { }

	async register(req: Request, res: Response) {
		const request: RegisterUserRequest = req.body;

		try {
			const userId = await this.registerUseCase.execute(request);

			const response = new BaseResponse({ userId }, "User registered successfully!");

			return res.status(201).json(response);
		} catch (error: any) {
			const errors = (error as any).errors.map((err: any) => err.message);

			const response = new BaseResponse({}, errors);

			return res.status(500).json(response);
		}

	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const authUserResponse = await this.loginUseCase.execute(email, password);

		if (!authUserResponse) {
			const response = new BaseResponse({}, "Failed to authenticate user");

			return res.status(401).json(response);
		}

		const { accessToken, refreshToken } = authUserResponse;

		const response = new BaseResponse({ accessToken, refreshToken }, "User authenticated successfully!");

		return res.status(200).json(response);
	}

	async refreshToken(req: Request, res: Response) {
		const { accessToken, refreshToken } = req.body;

		const token = await this.refreshTokenUseCase.execute(refreshToken, accessToken);

		if (!token) {
			const response = new BaseResponse({}, "Failed to refresh token");

			return res.status(500).json(response);
		}

		const response = new BaseResponse({ accessToken: token }, "Token refreshed successfully!");

		return res.status(200).json(response);
	}

	async verifyToken(req: Request, res: Response) {
		const { accessToken } = req.body;

		const data = await this.verifyTokenUseCase.execute(accessToken);

		if (!data) {
			const response = new BaseResponse({}, "Failed to verify token");

			return res.status(401).json(response);
		}

		const response = new BaseResponse(data, "Token verified successfully!");

		return res.status(200).json({ message: "Token verified successfully!", data: response });
	}
}
