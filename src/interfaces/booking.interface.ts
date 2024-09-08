import { FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { IHotel } from "./hotel.interface";
import { IPayment } from "./payment.interface";
import { IRoom } from "./room.interface";
import { Booking } from "../entities";
import { IUser } from "./user.interface";

export interface IBooking {
  id: string;
  user: IUser;
  hotel: IHotel;
  room: IRoom;
  checkInDate: Date;
  checkOutDate: Date;
  totalCost: number;
  status: string;
  payments?: IPayment[];
}

export interface IBookingCreationBody
  extends Omit<IBooking, "id" | "payments"> {}

export interface IFindBookingQuery {
  where: FindOptionsWhere<Booking> | FindOptionsWhere<Booking>[]; // Use Booking entity here
  relations?: string[];
  select?: FindOptionsSelect<Booking>; // Specify relations to include
  order?: { [P in keyof Booking]?: "ASC" | "DESC" }; // Use Booking entity here
  skip?: number;
  take?: number;
}

export interface IBookingRepository {
  fetchOne(query: IFindBookingQuery): Promise<IBooking | null>;
  fetchAll(query: IFindBookingQuery): Promise<IBooking[] | null>;
  create(record: IBookingCreationBody): Promise<IBooking>;
  updateOne(
    searchBy: Partial<IBooking>,
    data: Partial<IBookingCreationBody>
  ): Promise<void>;
  deleteOne(searchBy: IFindBookingQuery): Promise<void>;
}
