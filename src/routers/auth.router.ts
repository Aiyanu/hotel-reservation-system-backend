import express, { Request, Response } from "express";
import AuthService from "../services/auth.service";
import { AuthController } from "../controllers";
import { TokenRepository, UserRepository } from "../repository";
import { EmailService, TokenService, UserService } from "../services";
import {
  createSchema,
  forgotPasswordSchema,
  loginSchema,
  logoutSchema,
  resetPasswordSchema,
} from "../validators/auth.validator";
import { validator } from "../middlewares/middleware";

const router = express.Router();
const authService = new AuthService(new UserRepository());
const userService = new UserService(new UserRepository());
const tokenService = new TokenService(new TokenRepository());
const emailService = new EmailService();
const authController = new AuthController(
  authService,
  emailService,
  userService,
  tokenService
);
const AuthRouter = () => {
  router.post("/login", validator(loginSchema), (req, res) =>
    authController.login(req, res)
  );
  router.post("/register", validator(createSchema), (req, res) =>
    authController.register(req, res)
  );
  router.post("/forgot-password", validator(forgotPasswordSchema), (req, res) =>
    authController.forgotPassword(req, res)
  );
  router.post("/reset-password", validator(resetPasswordSchema), (req, res) =>
    authController.resetPassword(req, res)
  );
  return router;
};

export default AuthRouter();
