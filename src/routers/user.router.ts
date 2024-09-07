import express, { Request, Response } from "express";
import { UserRepository } from "../repository";
import { UserController } from "../controllers";
import { EmailService, UploadService, UserService } from "../services";
import {
  Auth,
  uploadFileMiddleware,
  validator,
} from "../middlewares/middleware";
import userSchema from "../validators/user.validator";

const router = express.Router();
const userService = new UserService(new UserRepository());
const uploadService = new UploadService();
const userController = new UserController(userService, uploadService);

const UserRouter = () => {
  router.get("/", Auth(), (req: Request, res: Response) =>
    userController.getAllUsers(req, res)
  );
  router.get("/:id", Auth(), (req: Request, res: Response) =>
    userController.getUserById(req, res)
  );
  router.patch(
    "/:id",
    Auth(),
    validator(userSchema.updateSchema),
    (req: Request, res: Response) => userController.updateUser(req, res)
  );
  router.delete("/:id", Auth(), (req: Request, res: Response) =>
    userController.deleteUser(req, res)
  );
  router.patch(
    "/:id/upload/profile",
    Auth(),
    uploadFileMiddleware("profile"),
    // validator(userSchema.uploadSchema),
    (req: Request, res: Response) => userController.uploadProfilePhoto(req, res)
  );
  return router;
};

export default UserRouter();
