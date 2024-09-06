import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Booking } from "./Booking.entity";
import { IPayment } from "../interfaces/payment.interface";

@Entity()
export class Payment implements IPayment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  amount!: number;

  @Column()
  paymentDate!: Date;

  @Column()
  paymentMethod!: string; // E.g., "Paystack"

  @Column()
  status!: string; // "Success", "Failed"

  @Column()
  receiptUrl!: string; // For downloading the receipt if applicable

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking!: Booking;
}
