import {
  IFindBookingQuery,
  IBooking,
  IBookingCreationBody,
  IBookingRepository,
} from "../interfaces/booking.interface";
import { Booking } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class BookingRepository implements IBookingRepository {
  private bookingRepository: Repository<Booking>;

  constructor() {
    this.bookingRepository = AppDataSource.getRepository(Booking);
  }

  async fetchOne(query: IFindBookingQuery): Promise<IBooking | null> {
    const booking = await this.bookingRepository.findOne(query);
    return booking;
  }
  async fetchAll(query: IFindBookingQuery): Promise<IBooking[] | null> {
    const bookings = await this.bookingRepository.find(query);
    return bookings;
  }
  async create(record: IBookingCreationBody): Promise<IBooking> {
    const booking = this.bookingRepository.create(record);
    await this.bookingRepository.save(booking);
    return booking;
  }
  async updateOne(
    searchBy: Partial<IBooking>,
    data: Partial<IBookingCreationBody>
  ): Promise<void> {
    await this.bookingRepository.update(
      searchBy as FindOptionsWhere<Booking>,
      data
    );
  }
  async deleteOne(searchBy: IFindBookingQuery): Promise<void> {
    await this.bookingRepository.delete(searchBy as FindOptionsWhere<Booking>);
  }
}

export default BookingRepository;
