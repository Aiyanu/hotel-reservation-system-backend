import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Booking } from "./Booking.entity";
import { Review } from "./Review.entity";
import { IUser } from "../interfaces/user.interface";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  username!: string;

  // @Column()
  // age!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profile_photo!: string;

  @Column({ default: "GUEST" })
  role!: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
}
