import { Request, Response } from "express";
import HotelService from "../services/hotel.service";

class HotelController {
  private hotelService: HotelService;
  constructor(_hotelService: HotelService) {
    this.hotelService = _hotelService;
  }
  async getAllHotels(req: Request, res: Response) {}
  async getHotelById(req: Request, res: Response) {}
  async createHotel(req: Request, res: Response) {}
  async updateHotel(req: Request, res: Response) {}
  async deleteHotel(req: Request, res: Response) {}
}

export default HotelController;
