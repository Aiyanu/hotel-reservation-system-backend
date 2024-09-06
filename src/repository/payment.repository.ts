import {
  IFindPaymentQuery,
  IPayment,
  IPaymentCreationBody,
  IPaymentRepository,
} from "../interfaces/payment.interface";
import { Payment } from "../entities";
import AppDataSource from "../database";
import { FindOptionsWhere, Repository } from "typeorm";

class PaymentRepository implements IPaymentRepository {
  private paymentRepository: Repository<Payment>;

  constructor() {
    this.paymentRepository = AppDataSource.getRepository(Payment);
  }

  async fetchOne(query: IFindPaymentQuery): Promise<IPayment | null> {
    const payment = await this.paymentRepository.findOne(query);
    return payment;
  }
  async fetchAll(query: IFindPaymentQuery): Promise<IPayment[] | null> {
    const payments = await this.paymentRepository.find(query);
    return payments;
  }
  async create(record: IPaymentCreationBody): Promise<IPayment> {
    const payment = this.paymentRepository.create(record);
    await this.paymentRepository.save(payment);
    return payment;
  }
  async updateOne(
    searchBy: IFindPaymentQuery,
    data: Partial<IPayment>
  ): Promise<void> {
    await this.paymentRepository.update(
      searchBy as FindOptionsWhere<Payment>,
      data
    );
  }
  async deleteOne(searchBy: IFindPaymentQuery): Promise<void> {
    await this.paymentRepository.delete(searchBy as FindOptionsWhere<Payment>);
  }
}

export default PaymentRepository;
