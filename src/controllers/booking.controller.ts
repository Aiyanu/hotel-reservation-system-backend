import { Request, Response } from "express";
import BookingService from "../services/booking.service";

class BookingController {
  private bookingService: BookingService;
  constructor(_bookingService: BookingService) {
    this.bookingService = _bookingService;
  }
  async getAllBookings(req: Request, res: Response) {}
  async getBookingById(req: Request, res: Response) {}
  async createBooking(req: Request, res: Response) {}
  async updateBooking(req: Request, res: Response) {}
  async deleteBooking(req: Request, res: Response) {}
}

export default BookingController;
