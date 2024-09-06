import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { IReview } from "../interfaces/review.interface";
import { Hotel } from "./Hotel.entity";

@Entity()
export class Review implements IReview {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.reviews)
  hotel!: Hotel;

  @Column({ type: "int" })
  rating!: number;

  @Column({ type: "text" })
  comment!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;
}
