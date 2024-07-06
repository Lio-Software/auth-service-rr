import express from "express";
import { authController } from "../auth.dependencies";


export const authRouter = express.Router();

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));
authRouter.post('/refresh_token', authController.refreshToken.bind(authController));
authRouter.post('/verify_token', authController.verifyToken.bind(authController));
// authRouter.post('/logout', authController.logout.bind(authController));
// authRouter.post('/recover', authController.recoverassword.bind(authController));
// authRouter.post('/reset', authController.resetPassword.bind(authController));
