import { Request, Response } from "express";
import PaymentService from "../services/payment.service";

class PaymentController {
  private paymentService: PaymentService;
  constructor(_paymentService: PaymentService) {
    this.paymentService = _paymentService;
  }
  async getPaymentsByBooking(req: Request, res: Response) {}
  async addPayment(req: Request, res: Response) {}
}

export default PaymentController;
