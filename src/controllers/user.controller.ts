import { Request, Response } from "express";
import UserService from "../services/user.service";
import { UploadService } from "../services";

class UserController {
  private userService: UserService;
  private uploadService: UploadService;
  constructor(_userService: UserService, _uploadService: UploadService) {
    this.userService = _userService;
    this.uploadService = _uploadService;
  }
  async getAllUsers(req: Request, res: Response) {}
  async getUserById(req: Request, res: Response) {}
  async updateUser(req: Request, res: Response) {}
  async deleteUser(req: Request, res: Response) {}
  async uploadProfilePhoto(req: Request, res: Response) {}
}

export default UserController;
