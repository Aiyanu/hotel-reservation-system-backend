import { IBooking } from "./booking.interface";

export interface IPayment {
  id: number;
  booking: IBooking;
  paymentMethod: string;
  paymentDate: Date;
  amount: number;
}
