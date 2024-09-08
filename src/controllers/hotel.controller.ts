import { Request, Response } from "express";
import HotelService from "../services/hotel.service";
import { handleError, handleSuccess } from "../utils/index.utils";
import { UploadService } from "../services";
import { IHotelCreationBody } from "../interfaces/hotel.interface";
import { ResponseCodes } from "../utils/constants";

class HotelController {
  private hotelService: HotelService;
  private uploadService: UploadService;
  constructor(_hotelService: HotelService, _uploadService: UploadService) {
    this.hotelService = _hotelService;
    this.uploadService = _uploadService;
  }
  async getAllHotels(req: Request, res: Response) {
    try {
      const hotel = await this.hotelService.getAllHotels();
      if (!hotel) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No Hotels Found");
      }
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Successfully fetched all hotels",
        { hotel }
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async getHotelById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const hotel = await this.hotelService.getHotelByField({ id });
      if (!hotel) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No Hotels Found");
      }
      return handleSuccess(res, ResponseCodes.SUCCESS, "Hotel Found", {
        hotel,
      });
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async createHotel(req: Request, res: Response) {
    const body = req.body;
    try {
      const hotel = await this.hotelService.getHotelByField({
        name: String(body.name).toLowerCase(),
      });
      if (hotel) {
        return handleError(
          res,
          ResponseCodes.CONFLICT,
          "Hotel Already Exist Under this name"
        );
      }

      const newHotel = {
        name: String(body.name).toLowerCase(),
        address: body.address,
        city: body.city,
        country: body.country,
        latitude: body.latitude,
        description: body.description,
        longitude: body.longitude,
        starRating: body.starRating,
      } as IHotelCreationBody;
      await this.hotelService.addHotel(newHotel);
      if (!newHotel) {
        return handleError(
          res,
          ResponseCodes.BAD_REQUEST,
          "Failed to Create Hotel"
        );
      }
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Hotel Created Successfully",
        { newHotel }
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async updateHotel(req: Request, res: Response) {
    const { id } = req.params;
    const body = req.body;
    try {
      const hotel = await this.hotelService.getHotelByField({ id });
      if (!hotel) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No Hotels Found");
      }

      const hotelData = { ...body } as Partial<IHotelCreationBody>;
      console.log(hotelData);

      await this.hotelService.updateHotel(id, hotelData);
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Hotel Successfully Updated"
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async deleteHotel(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const hotel = await this.hotelService.getHotelByField({ id });
      if (!hotel) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No Hotels Found");
      }
      await this.hotelService.deleteHotel(id);
      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Hotel Successfully Deleted"
      );
    } catch (err) {
      return handleError(
        res,
        ResponseCodes.INTERNAL_SERVER_ERROR,
        (err as Error).message
      );
    }
  }
  async uploadHotelImages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hotel = await this.hotelService.getHotelByField({ id });
      if (!hotel) {
        return handleError(res, ResponseCodes.NOT_FOUND, "Hotel not found");
      }

      // Debugging line
      console.log("Uploaded file:", req.file);

      // Multer stores uploaded file in req.file
      const file = req.file;

      if (!file) {
        return handleError(res, ResponseCodes.BAD_REQUEST, "No file uploaded");
      }

      // Upload the file to S3 via the upload service
      const uploadUrl = await this.uploadService.uploadHotelImage(file);

      if (!uploadUrl) {
        return handleError(
          res,
          ResponseCodes.BAD_REQUEST,
          "Failed to upload Hotel image"
        );
      }
      console.log(hotel.images);

      if (hotel.images) {
        await this.hotelService.updateHotel(id, {
          images: [...hotel.images, uploadUrl],
        });
      } else {
        await this.hotelService.updateHotel(id, {
          images: [uploadUrl],
        });
      }

      return handleSuccess(
        res,
        ResponseCodes.SUCCESS,
        "Hotel Image uploaded successfully",
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

export default HotelController;
