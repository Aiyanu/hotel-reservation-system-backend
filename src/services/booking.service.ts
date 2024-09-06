import { IBookingRepository } from "../interfaces/booking.interface";

class BookingService {
  private bookingRepository: IBookingRepository;
  constructor(_bookingRepository: IBookingRepository) {
    this.bookingRepository = _bookingRepository;
  }
}
export default BookingService;
