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

const handleSuccess = (
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

const handleError = (
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

const escapeHtml = (html: string) => {
  return html.replace(/[&<>"']/g, "");
};

const isEmpty = (data: any) => {
  return (
    !data ||
    data.length === 0 ||
    typeof data == "undefined" ||
    data == null ||
    Object.keys(data).length == 0
  );
};
const generateCode = (num: number = 15) => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  let result = randomness + dateString;
  result = result.length > num ? result.substring(0, num) : result;
  return result.toUpperCase();
};

const ResponseCodes = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export {
  logger,
  ResponseCodes,
  handleSuccess,
  handleError,
  escapeHtml,
  isEmpty,
  generateCode,
};
