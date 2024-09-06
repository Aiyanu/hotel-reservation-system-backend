import { FindOptionsWhere } from "typeorm";
import { IBooking } from "./booking.interface";
import { IReview } from "./review.interface";
import { IRoom } from "./room.interface";
import { Hotel } from "../entities";

export interface IHotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  starRating: number;
  amenities: string[];
  images: string[];
  rooms: IRoom[];
  bookings: IBooking[];
  reviews: IReview[];
}

export interface IHotelCreationBody extends Omit<IHotel, "id"> {}

export interface IFindHotelQuery {
  where: FindOptionsWhere<Hotel> | FindOptionsWhere<Hotel>[]; // Specify the conditions to find the hotel
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof Hotel]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IHotelRepository {
  fetchOne(query: IFindHotelQuery): Promise<IHotel | null>;
  fetchAll(query: IFindHotelQuery): Promise<IHotel[] | null>;
  create(record: IHotelCreationBody): Promise<IHotel>;
  updateOne(searchBy: IFindHotelQuery, data: Partial<IHotel>): Promise<void>;
  deleteOne(searchBy: IFindHotelQuery): Promise<void>;
}
