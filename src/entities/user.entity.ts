import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Booking } from "./Booking.entity";
import { Review } from "./Review.entity";
import { IUser } from "../interfaces/user.interface";
import { Token } from "./Token.entity";

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

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  profile_photo!: string;

  @Column({ default: "GUEST" })
  role!: string;

  @Column({ default: false })
  isEmailVerified!: boolean;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];
  @OneToMany(() => Token, (token) => token.user)
  tokens!: Token[];
}
