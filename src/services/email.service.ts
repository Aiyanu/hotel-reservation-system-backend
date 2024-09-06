import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

class EmailService {
  private sesClient: SESClient;

  constructor() {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } =
      process.env;
    this.sesClient = new SESClient({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID!,
        secretAccessKey: AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  private async sendEmail(
    to: string,
    subject: string,
    htmlBody: string
  ): Promise<void> {
    const params = {
      Source: process.env.EMAIL_SOURCE as string, // Use your verified email here
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject },
        Body: { Html: { Data: htmlBody } },
      },
    };

    const command = new SendEmailCommand(params);
    try {
      await this.sesClient.send(command);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }

  public sendForgotPasswordEmail(to: string, token: string) {
    const resetUrl = `http://localhost:5000/reset-password/${token}`;
    const subject = "Password Reset Request";
    const htmlBody = `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`;

    return this.sendEmail(to, subject, htmlBody);
  }

  public sendBookingConfirmationEmail(to: string, bookingId: string) {
    const bookingUrl = `http://localhost:5000/bookings/${bookingId}`;
    const subject = "Booking Confirmation";
    const htmlBody = `<p>Your booking is confirmed. View your booking details <a href="${bookingUrl}">here</a>.</p>`;

    return this.sendEmail(to, subject, htmlBody);
  }
}

export default EmailService;
