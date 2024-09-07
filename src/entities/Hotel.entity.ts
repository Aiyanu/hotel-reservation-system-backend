import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Booking } from "./Booking.entity";
import { Review } from "./Review.entity";
import { IHotel } from "../interfaces/hotel.interface";
import { Room } from "./Room.entity";
@Entity()
export class Hotel implements IHotel {
  // Adjusted the name to "Hotel" to better match the domain
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column({ type: "decimal", precision: 9, scale: 6 })
  latitude!: number;

  @Column({ type: "decimal", precision: 9, scale: 6 })
  longitude!: number;

  @Column({ default: 0 })
  starRating!: number;

  @Column("text", { array: true, default: [] })
  amenities!: string[];

  @Column("text", { array: true, default: [] })
  images!: string[]; // Array to store multiple image URLs for the room

  @OneToMany(() => Room, (room) => room.hotel)
  rooms!: Room[];

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings!: Booking[];

  @OneToMany(() => Review, (review) => review.hotel)
  reviews!: Review[];
}
