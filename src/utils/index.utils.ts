import { NextFunction, Response } from "express";
import winston from "winston";
import { z } from "zod";

const { combine, timestamp, printf, json } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export const handleSuccess = (
  res: Response,
  statusCode: number,
  message: string,
  data?: {
    [key: string]: any;
  }
) => {
  logger.info(`Success: ${message}`);
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const handleError = (
  res: Response,
  statusCode: number,
  message: string,
  error?: any
) => {
  logger.error(`Error: ${message}`, { error });
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
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

export { logger, validator };
