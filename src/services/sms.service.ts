import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

class SMSService {
  private snsClient: SNSClient;

  constructor() {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } =
      process.env;
    this.snsClient = new SNSClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  private async sendSMS(phoneNumber: string, message: string): Promise<void> {
    const params = { PhoneNumber: phoneNumber, Message: message };
    const command = new PublishCommand(params);
    await this.snsClient.send(command);
  }

  public sendBookingConfirmationSMS(phoneNumber: string, bookingId: string) {
    const message = `Your booking with ID ${bookingId} is confirmed. Thank you for choosing our hotel.`;
    return this.sendSMS(phoneNumber, message);
  }
}

export default SMSService;
