import { FindOptionsSelect, FindOptionsWhere } from "typeorm";
import { IBooking } from "./booking.interface";
import { Payment } from "../entities";

export interface IPayment {
  id: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: string;
  receiptUrl: string;
  booking: IBooking;
}

export interface IPaymentCreationBody extends Omit<IPayment, "id"> {}

export interface IFindPaymentQuery {
  where: FindOptionsWhere<Payment> | FindOptionsWhere<Payment>[]; // Specify the conditions to find the payment
  relations?: string[];
  select?: FindOptionsSelect<Payment>; // Specify the relations to include in the result
  order?: { [P in keyof Payment]?: "ASC" | "DESC" }; // Specify the order of results
  skip?: number; // Number of results to skip
  take?: number; // Number of results to take
}

export interface IPaymentRepository {
  fetchOne(query: IFindPaymentQuery): Promise<IPayment | null>;
  fetchAll(query: IFindPaymentQuery): Promise<IPayment[] | null>;
  create(record: IPaymentCreationBody): Promise<IPayment>;
  updateOne(
    searchBy: IFindPaymentQuery,
    data: Partial<IPayment>
  ): Promise<void>;
  deleteOne(searchBy: IFindPaymentQuery): Promise<void>;
}
