import { FindOneOptions, FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { IRoom } from "./room.interface";
import { Availability } from "../entities";

export interface IAvailability {
  id: string;
  room: IRoom;
  date: Date;
  available: boolean;
}

export interface IAvailabilityCreationBody extends Omit<Availability, "id"> {}

export interface IFindAvailabilityQuery {
  where: FindOptionsWhere<Availability> | FindOptionsWhere<Availability>[]; // Adjusted to ensure proper typing for `where`
  relations?: string[];
  select?: FindOptionsSelect<Availability>; // Optional relations to be included in the query
  order?: { [P in keyof IAvailability]?: "ASC" | "DESC" }; // Ordering options
  skip?: number; // Optional skip for pagination
  take?: number; // Optional take for pagination
}

export interface IAvailabilityRepository {
  fetchOne(query: IFindAvailabilityQuery): Promise<IAvailability | null>;
  fetchAll(query: IFindAvailabilityQuery): Promise<IAvailability[] | null>;
  create(record: IAvailabilityCreationBody): Promise<IAvailability>;
  updateOne(
    searchBy: FindOptionsWhere<IAvailability>,
    data: Partial<IAvailability>
  ): Promise<void>;
  deleteOne(searchBy: FindOptionsWhere<IAvailability>): Promise<void>;
}
