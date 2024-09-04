import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Booking } from "./Booking.entity";
import { IPayment } from "../interfaces/payment.interface";

@Entity()
export class Payment implements IPayment {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking!: Booking;

  @Column()
  paymentMethod!: string; // e.g., 'credit card', 'paypal', etc.

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  paymentDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount!: number;
}
