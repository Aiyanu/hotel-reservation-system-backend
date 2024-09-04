import { FindOptionsWhere } from "typeorm";
import { IBooking } from "./booking.interface";

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  // age: number;
  email: string;
  password: string;
  profile_photo: string;
  bookings: IBooking[];
}

export interface IUserCreationBody extends Omit<IUser, "id"> {}

export interface IFindUserQuery {
  where: FindOptionsWhere<IUser> | FindOptionsWhere<IUser>[]; // Specify the conditions to find the user
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof IUser]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IUserRepository {
  fetchOne(query: IFindUserQuery): Promise<IUser | null>;
  create(record: IUserCreationBody): Promise<IUser>;
  updateOne(searchBy: IFindUserQuery, data: Partial<IUser>): Promise<void>;
}
