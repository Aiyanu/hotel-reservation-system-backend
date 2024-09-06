import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Booking } from "./Booking.entity";
import { Availability } from "./Availability.entity";
import { IRoom } from "../interfaces/room.interface";
import { Hotel } from "./Hotel.entity";

@Entity()
export class Room implements IRoom {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel!: Hotel;

  @Column()
  roomNumber!: string; // Added room number for identification

  @Column()
  roomType!: string;

  @Column()
  capacity!: number;

  @Column()
  pricePerNight!: number;

  @Column({ type: "simple-array" })
  amenities!: string[];

  @Column("text", { array: true, default: [] })
  images!: string[]; // Array to store multiple image URLs for the room

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings!: Booking[];

  @OneToMany(() => Availability, (availability) => availability.room)
  availability!: Availability[];
}
