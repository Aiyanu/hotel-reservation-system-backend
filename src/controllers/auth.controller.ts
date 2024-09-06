import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import AuthService from "../services/auth.service";
import { EmailService, UserService } from "../services";
import {
  handleError,
  handleSuccess,
  ResponseCodes,
} from "../utils/index.utils";
import { IUserCreationBody } from "../interfaces/user.interface";
import TokenService from "../services/token.service";
import { TokenType } from "../interfaces/enums/token.enum";

class AuthController {
  private authService: AuthService;
  private userService: UserService;
  private emailService: EmailService;
  private tokenService: TokenService;
  constructor(
    _authService: AuthService,
    _emailService: EmailService,
    _userService: UserService,
    _tokenService: TokenService
  ) {
    this.authService = _authService;
    this.emailService = _emailService;
    this.userService = _userService;
    this.tokenService = _tokenService;
  }
  async login(req: Request, res: Response) {
    const body = req.body;
    try {
      const user = await this.authService.login(body.email);
      if (!user) {
        return handleError(res, ResponseCodes.NOT_FOUND, "Invalid Credentials");
      }
      const isPasswordMatch = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!isPasswordMatch) {
        return handleError(res, ResponseCodes.NOT_FOUND, "Invalid Credentials");
      }
      const token = JWT.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "30d" }
      );
      return handleSuccess(res, ResponseCodes.SUCCESS, "Login Successful", {
        token,
      });
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as TypeError).message,
        err
      );
    }
  }
  async register(req: Request, res: Response) {
    const body = req.body;
    try {
      const newUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        username: body.username,
      } as IUserCreationBody;
      newUser.password = bcrypt.hashSync(newUser.password, 10);
      const exist = await this.userService.getUserByField({
        where: { email: newUser.email },
      });
      if (exist) {
        return handleError(res, ResponseCodes.CONFLICT, "User Already Exists");
      }
      await this.authService.register(newUser);
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Registration Successful"
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as TypeError).message,
        err
      );
    }
  }
  async forgotPassword(req: Request, res: Response) {
    const body = req.body;
    try {
      const user = await this.userService.getUserByField({
        where: { email: body.email },
      });
      if (!user) {
        return handleError(res, ResponseCodes.CONFLICT, "Email Doesn't Exist");
      }
      const token = await this.tokenService.createToken(
        user,
        TokenType.PASSWORD_RESET,
        6
      );
      await this.emailService
        .sendForgotPasswordEmail(body.email, token)
        .then(() => {
          return handleSuccess(
            res,
            ResponseCodes.SUCCESS,
            "OTP code sent to email"
          );
        })
        .catch((err) => {
          return handleError(
            res,
            ResponseCodes.BAD_REQUEST,
            "Failed to send forget password email"
          );
        });
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as TypeError).message
      );
    }
  }
  async resetPassword(req: Request, res: Response) {}
}

export default AuthController;
