import express, { Request, Response } from "express";
import { HotelService, UploadService } from "../services";
import { HotelRepository } from "../repository";
import HotelController from "../controllers/hotel.controller";
import {
  Auth,
  uploadFileMiddleware,
  validator,
} from "../middlewares/middleware";
import hotelSchema from "../validators/hotel.validator";
const router = express.Router();
const hotelService = new HotelService(new HotelRepository());
const uploadService = new UploadService();
const hotelController = new HotelController(hotelService, uploadService);
const hotelRouter = () => {
  router.get("/", Auth(), (req, res) => hotelController.getAllHotels(req, res));
  router.get("/:id", Auth(), (req, res) =>
    hotelController.getHotelById(req, res)
  );
  router.post(
    "/",
    Auth(),
    validator(hotelSchema.createHotelSchema),
    (req, res) => hotelController.createHotel(req, res)
  );
  router.patch(
    "/:id",
    Auth(),
    validator(hotelSchema.updateHotelSchema),
    (req, res) => hotelController.updateHotel(req, res)
  );
  router.delete("/:id", Auth(), (req, res) =>
    hotelController.deleteHotel(req, res)
  );
  router.patch(
    "/:id/upload/hotel-photo/",
    Auth(),
    uploadFileMiddleware("hotel"),
    validator(hotelSchema.uploadSchema),
    (req, res) => hotelController.uploadHotelImages(req, res)
  );
  return router;
};

export default hotelRouter();
