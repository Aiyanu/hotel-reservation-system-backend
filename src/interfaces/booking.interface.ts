import { FindOptionsWhere } from "typeorm";
import { IHotel } from "./hotel.interface";
import { IPayment } from "./payment.interface";
import { IRoom } from "./room.interface";

export interface IBooking {
  id: string;
  hotel: IHotel;
  room: IRoom;
  checkInDate: Date;
  checkOutDate: Date;
  totalCost: number;
  status: string;
  payments?: IPayment[];
}

export interface IBookingCreationBody extends Omit<IBooking, "id"> {}

export interface IFindBookingQuery {
  where: FindOptionsWhere<IBooking> | FindOptionsWhere<IBooking>[]; // Specify the conditions to find the booking
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof IBooking]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IRepository {
  fetchOne(query: IFindBookingQuery): Promise<IBooking | null>;
  create(record: IBookingCreationBody): Promise<IBooking>;
  updateOne(
    searchBy: IFindBookingQuery,
    data: Partial<IBooking>
  ): Promise<void>;
}
