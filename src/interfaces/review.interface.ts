import { FindOptionsWhere } from "typeorm";
import { IUser } from "./user.interface";
import { IHotel } from "./hotel.interface";
import { Review } from "../entities";

export interface IReview {
  id: string;
  user: IUser;
  hotel: IHotel;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IReviewCreationBody extends Omit<IReview, "id"> {}

export interface IFindReviewQuery {
  where: FindOptionsWhere<Review> | FindOptionsWhere<Review>[]; // Specify the conditions to find the review
  relations?: string[]; // Specify the relations to include in the result
  order?: { [P in keyof Review]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IReviewRepository {
  fetchOne(query: IFindReviewQuery): Promise<IReview | null>;
  fetchAll(query: IFindReviewQuery): Promise<IReview[] | null>;
  create(record: IReviewCreationBody): Promise<IReview>;
  updateOne(searchBy: IFindReviewQuery, data: Partial<IReview>): Promise<void>;
  deleteOne(searchBy: IFindReviewQuery): Promise<void>;
}
