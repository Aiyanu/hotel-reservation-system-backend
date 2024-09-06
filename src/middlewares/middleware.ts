// loggerMiddleware.ts
import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import {
  handleError,
  isEmpty,
  logger,
  ResponseCodes,
} from "../utils/index.utils";
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services";
import { UserRepository } from "../repository";
import { z } from "zod";

const userService = new UserService(new UserRepository());

const logRequests = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Received ${req.method} request for ${req.originalUrl}`);
  next();
};
const Auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? "";
      if (isEmpty(token)) {
        throw new TypeError("Authorization Failed");
      }
      token = token.split(" ")[1];
      const decoded = JWT.verify(token, process.env.JWT_KEY as string) as IUser;
      if (decoded && decoded.id) {
        const user = await userService.getUserByField({
          where: { id: decoded.id },
        });
        if (!user) {
          throw new TypeError("Authorization Failed");
        }
        req.body.user = decoded;
        next();
      } else {
        throw new TypeError("Authorization Failed");
      }
    } catch (error) {
      return handleError(
        res,
        ResponseCodes.BAD_REQUEST,
        (error as TypeError).message
      );
    }
  };
};
const validator =
  (schema: z.ZodSchema<any>) =>
  (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      res.status(400).json({ errors: result.error.errors });
    }
  };

export { logRequests, Auth, validator };
