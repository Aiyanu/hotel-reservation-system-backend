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
import { UploadService, UserService } from "../services";
import { UserRepository } from "../repository";
import { z } from "zod";
import multer from "multer";

interface CustomRequest extends Request {
  fileLocation?: string;
}

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
          id: decoded.id,
        });
        if (!user) {
          throw new TypeError("Authorization Failed");
        }
        // req.body.user = decoded;
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

export const uploadFile = (destination: string, fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination); // Set the directory where files will be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  // Middleware to handle single file upload
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadSingle = upload.single(fieldName);
    uploadSingle(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      } else if (err) {
        // An unknown error occurred when uploading
        return res.status(500).json({
          success: false,
          message: "File upload failed",
        });
      }
      // Proceed to the next middleware if no errors
      next();
    });
  };
};
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single("file"); // Modify this if you want to handle multiple files

// Middleware to handle file upload and S3 upload
const uploadFileMiddleware = (uploadType: "profile" | "room" | "hotel") => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file provided" });
      }

      // Manual validation for file type and size
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type. Only JPEG or PNG allowed.",
        });
      }

      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          success: false,
          message: "File size must be less than 5MB",
        });
      }

      try {
        const uploadService = new UploadService();
        let uploadResult;
        switch (uploadType) {
          case "profile":
            uploadResult = await uploadService.uploadUserProfilePhoto(req.file);
            break;
          case "room":
            uploadResult = await uploadService.uploadRoomImage(req.file);
            break;
          case "hotel":
            uploadResult = await uploadService.uploadHotelImage(req.file);
            break;
        }

        req.fileLocation = uploadResult; // Attach the file URL to the request object
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload file to S3",
          error: (error as Error).message,
        });
      }
    });
  };
};

export { logRequests, Auth, validator, uploadFileMiddleware };
