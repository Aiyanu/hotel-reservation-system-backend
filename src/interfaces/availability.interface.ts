import { FindOptionsWhere } from "typeorm";
import { IRoom } from "./room.interface";

export interface IAvailability {
  id: number;
  room: IRoom;
  date: Date;
  available: boolean;
}

export interface IAvailabilityCreationBody extends Omit<IAvailability, "id"> {}

export interface IFindAvailabilityQuery {
  where: FindOptionsWhere<IAvailability> | FindOptionsWhere<IAvailability>[]; // Specify the conditions to find the availability
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof IAvailability]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IRepository {
  fetchOne(query: IFindAvailabilityQuery): Promise<IAvailability | null>;
  create(record: IAvailabilityCreationBody): Promise<IAvailability>;
  updateOne(
    searchBy: IFindAvailabilityQuery,
    data: Partial<IAvailability>
  ): Promise<void>;
}
