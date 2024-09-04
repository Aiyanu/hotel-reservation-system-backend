import { IHotel } from "./hotel.interface";
import { IUser } from "./user.interface";

export interface IReview {
  id: number;
  user: IUser;
  hotel: IHotel;
  rating: number;
  comment: string;
  createdAt: Date;
}
