import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Room } from "./Room.entity";
import { IAvailability } from "../interfaces/availability.interface";

@Entity()
export class Availability implements IAvailability {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @ManyToOne(() => Room, (room) => room.availability)
  room!: Room;

  @Column({ type: "date" })
  date!: Date;

  @Column({ default: true })
  available!: boolean;
}
