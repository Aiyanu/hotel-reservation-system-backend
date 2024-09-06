import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Room } from "./Room.entity";
import { Payment } from "./Payment.entity";
import { IBooking } from "../interfaces/booking.interface";
import { User } from "./User.entity";
import { Hotel } from "./Hotel.entity";

@Entity()
export class Booking implements IBooking {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user!: User;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel!: Hotel;

  @ManyToOne(() => Room, (room) => room.bookings)
  room!: Room;

  @Column({ type: "date" })
  checkInDate!: Date;

  @Column({ type: "date" })
  checkOutDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  totalCost!: number;

  @Column({ default: "PENDING" })
  status!: string;
  @OneToMany(() => Payment, (payments) => payments.booking)
  payments!: Payment[];
}
