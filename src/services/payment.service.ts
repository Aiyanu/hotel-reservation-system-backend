import axios from "axios";
import { IPaymentRepository } from "../interfaces/payment.interface";

class PaymentService {
  private paymentRepository: IPaymentRepository;
  constructor(_paymentRepository: IPaymentRepository) {
    this.paymentRepository = _paymentRepository;
  }
  private paystackSecret: string = process.env.PAYSTACK_SECRET_KEY!;

  // Step 1: Initialize a payment
  async initializePayment(email: string, amount: number) {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        { email, amount: amount * 100 }, // Amount in kobo (Nigerian currency unit)
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // This will include the payment link.
    } catch (error) {
      throw new Error("Payment initialization failed");
    }
  }

  // Step 2: Verify a transaction
  async verifyPayment(reference: string) {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.paystackSecret}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Payment verification failed");
    }
  }
}
export default PaymentService;
