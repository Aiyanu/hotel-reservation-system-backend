import { FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { IBooking } from "./booking.interface";
import { IHotel } from "./hotel.interface";
import { IAvailability } from "./availability.interface";
import { Room } from "../entities";

export interface IRoom {
  id: string;
  hotel: IHotel;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string[];
  images: string[];
  bookings: IBooking[];
  availability: IAvailability[];
}

export interface IRoomCreationBody
  extends Omit<IRoom, "id" | "bookings" | "availability"> {}

export interface IFindRoomQuery {
  where: FindOptionsWhere<Room> | FindOptionsWhere<Room>[]; // Specify the conditions to find the room
  relations?: string[];
  select?: FindOptionsSelect<Room>; // Specify the relations to include in the result
  order?: { [P in keyof IRoom]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IRoomRepository {
  fetchOne(query: IFindRoomQuery): Promise<IRoom | null>;
  fetchAll(query: IFindRoomQuery): Promise<IRoom[] | []>;
  create(record: IRoomCreationBody): Promise<IRoom>;
  updateOne(searchBy: IFindRoomQuery, data: Partial<IRoom>): Promise<void>;
  deleteOne(searchBy: IFindRoomQuery): Promise<void>;
}
