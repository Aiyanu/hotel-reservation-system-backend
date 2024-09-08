import { Response } from "express";
import winston from "winston";

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

// utils/selectFields.utils.ts
const selectFields = (query: string | undefined) => {
  if (!query) return undefined;
  return query.split(",").reduce((acc: { [key: string]: boolean }, field) => {
    acc[field] = true;
    return acc;
  }, {}); // Initialize with an empty object
};

// utils/parseRelations.utils.ts
const parseRelations = (relations: string | undefined) => {
  if (!relations) return undefined;
  return relations.split(",");
};

// utils/pagination.utils.ts
const paginate = (page: number, size: number) => {
  const limit = size ? +size : 10; // Default to 10 items per page
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export {
  logger,
  handleSuccess,
  handleError,
  escapeHtml,
  isEmpty,
  generateCode,
  selectFields,
  parseRelations,
  paginate,
};
