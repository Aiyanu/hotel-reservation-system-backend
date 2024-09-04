import { IBooking } from "./booking.interface";
import { IHotel } from "./hotel.interface";

export interface IRoom {
  id: string;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  hotel: IHotel;
  bookings: IBooking[];
}
