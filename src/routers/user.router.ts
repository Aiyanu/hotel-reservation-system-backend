import express, { Request, Response } from "express";
import { UserRepository } from "../repository";
import { UserController } from "../controllers";
import { EmailService, UploadService, UserService } from "../services";
import { Auth } from "../middlewares/middleware";

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
  router.patch("/:id", Auth(), (req: Request, res: Response) =>
    userController.updateUser(req, res)
  );
  router.delete("/:id", Auth(), (req: Request, res: Response) =>
    userController.deleteUser(req, res)
  );
  router.post("/upload/profile", Auth(), (req: Request, res: Response) =>
    userController.uploadProfilePhoto(req, res)
  );
  return router;
};

export default UserRouter();
