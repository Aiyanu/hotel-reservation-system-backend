// loggerMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/index.utils";

const logRequests = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Received ${req.method} request for ${req.originalUrl}`);
  next();
};

export { logRequests };
