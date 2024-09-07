import { Request, Response } from "express";
import UserService from "../services/user.service";
import { UploadService } from "../services";
import {
  handleError,
  handleSuccess,
  ResponseCodes,
} from "../utils/index.utils";
import { IUserCreationBody } from "../interfaces/user.interface";
import { error } from "console";

class UserController {
  private userService: UserService;
  private uploadService: UploadService;
  constructor(_userService: UserService, _uploadService: UploadService) {
    this.userService = _userService;
    this.uploadService = _uploadService;
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const user = await this.userService.getAllUsers();
      if (!user) {
        handleError(res, ResponseCodes.NOT_FOUND, "No Users found");
      }
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Fetched All Users Successfully",
        { user }
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async getUserById(req: Request, res: Response) {
    const params = req.params;
    try {
      const user = await this.userService.getUserByField({
        id: params.id,
      });
      if (!user) {
        return handleError(res, ResponseCodes.CONFLICT, "User Not found");
      }
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "User Fetched Successfully",
        { user }
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async updateUser(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;
    try {
      const user = await this.userService.getUserByField({
        id: params.id,
      });
      if (!user) {
        handleError(res, ResponseCodes.NOT_FOUND, "User not found");
      }
      const userData = { ...body } as Partial<IUserCreationBody>;
      await this.userService.updateUser({ id: params.id }, userData);
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "User Updated Successfully"
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async deleteUser(req: Request, res: Response) {
    const params = req.params;
    try {
      const user = await this.userService.getUserByField({
        id: params.id,
      });
      if (!user) {
        handleError(res, ResponseCodes.NOT_FOUND, "User not found");
      }
      await this.userService.deleteUser(params.id);
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "User Deleted Successfully"
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async uploadProfilePhoto(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if user exists
      const user = await this.userService.getUserByField({ id });
      if (!user) {
        return handleError(res, ResponseCodes.NOT_FOUND, "User not found");
      }

      // Multer stores uploaded file in req.file
      const file = req.file; // Assuming the file is in req.file

      if (!file) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No file uploaded");
      }

      // Upload the file to S3 via the upload service
      const uploadUrl = await this.uploadService.uploadUserProfilePhoto(file);

      if (!uploadUrl) {
        return handleError(
          res,
          ResponseCodes.BAD_REQUEST,
          "Failed to upload profile photo"
        );
      }

      // Update user with the profile photo URL
      await this.userService.updateUser({ id }, { profile_photo: uploadUrl });

      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Profile photo uploaded successfully",
        { uploadUrl }
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
}

export default UserController;
