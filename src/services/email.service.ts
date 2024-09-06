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
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }

  public sendForgotPasswordEmail(to: string, code: string) {
    const resetUrl = `${process.env.DOMAIN_URL}/reset-password/${code}`;
    const subject = "Password Reset Request";
    const htmlBody = `
    <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="title" content="ADA">
            <meta name="x-apple-disable-message-reformatting">
            <title></title>
        
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,600" rel="stylesheet" type="text/css">
            <style>
                html,
                body {
                    margin: 0 auto !important;
                    padding: 0 !important;
                    height: 100% !important;
                    width: 100% !important;
                    font-family: 'Roboto', sans-serif !important;
                    font-size: 14px;
                    margin-bottom: 10px;
                    line-height: 24px;
                    color: #8094ae;
                    font-weight: 400;
                }
        
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                    margin: 0;
                    padding: 0;
                }
        
                table,
                td {
                    mso-table-lspace: 0pt !important;
                    mso-table-rspace: 0pt !important;
                }
        
                table {
                    border-spacing: 0 !important;
                    border-collapse: collapse !important;
                    table-layout: fixed !important;
                    margin: 0 auto !important;
                }
        
                table table table {
                    table-layout: auto;
                }
        
                a {
                    text-decoration: none;
                }
        
                img {
                    -ms-interpolation-mode: bicubic;
                }
            </style>
        
        </head>
        
        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f5f6fa;">
            <center style="width: 100%; background-color: #f5f6fa;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f6fa">
                    <tr>
                        <td style="padding: 40px 0;">
                            <table style="width:100%;max-width:620px;margin:0 auto;">
                                <tbody>
                                    <tr>
                                        <td style="text-align: center; padding-bottom:25px">
                                            <a href="${process.env.DOMAIN_URL}"  style="font-size:25px;font-weight: bold;color:#000000;">
                                                Hotel Reservation System</a>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;max-width:620px;margin:0 auto;background-color:#ffffff;">
                                <tbody>
                                    <tr>
                                        <td style="padding: 30px 30px 20px">
                                            <p style="margin-bottom: 10px; color: #000000;text-transform: uppercase;">Hello</p>
    
                                                <p 
                                                style="margin-bottom: 10px;text-transform: capitalize;color:#000000; text-align: left;">
                                                Click <a href="${resetUrl}">here</a> to reset your password.
                                            </p>
        
                                            
        
                                            <p
                                                style="margin-bottom: 10px;text-transform: uppercase;color:#000000; text-align: left;">
                                                <b>
                                                    Have Questions or Need Assistance?</b>
                                            </p>
                                            <p>Our dedicated support team is here to help you with any queries you might have.
                                                Feel free to reach out to us at #SUPPORT_MAIL# if you need assistance at any
                                                point.</p>
        
                                            <p style="margin-bottom: 10px;">
                                                Thank you for choosing #APP_NAME#. We can't wait to see you thrive and make the
                                                most of your journey with us!
                                            </p>
        
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width:100%;max-width:620px;margin:0 auto;">
                                <tbody>
                                    <tr>
                                        <td style="text-align: center; padding:25px 20px 0;">
                                            <p style="font-size: 13px;">Stay updated on the latest news, tips, and discussions
                                                in the world of decentralized finance. </a>.</p>
                                            <p>Follow us on social media:</p>
                                            <ul style="margin: 10px -4px 0;padding: 0;">
        
                                                <li style="display: inline-block; list-style: none; padding: 4px;"><a
                                                        style="display: inline-block; height: 30px; width:30px;border-radius: 50%; background-color: #ffffff"
                                                        href=""><img style="width: 30px"
                                                            src="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png"
                                                            alt="brand"></a></li>
                                                <li style="display: inline-block; list-style: none; padding: 4px;"><a
                                                        style="display: inline-block; height: 30px; width:30px;border-radius: 50%; background-color: #ffffff"
                                                        href=""><img style="width: 30px"
                                                            src="https://cdn-icons-png.flaticon.com/512/2504/2504848.png"
                                                            alt="brand"></a></li>
                                                <li style="display: inline-block; list-style: none; padding: 4px;"><a
                                                        style="display: inline-block; height: 30px; width:30px;border-radius: 50%; background-color: #ffffff"
                                                        href=""><img style="width: 30px"
                                                            src="http://cdn.onlinewebfonts.com/svg/img_256332.png"
                                                            alt="brand"></a></li>
                                            </ul>
                                            <p style="padding-top: 15px; font-size: 12px;">This email was sent to you as a
                                                registered user of <a style="color: #3876b4; text-decoration:none;"
                                                    href="#">Hotel Reservation System</a></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        
        </html>
        `;

    return this.sendEmail(to, subject, htmlBody);
  }

  public sendBookingConfirmationEmail(to: string, bookingId: string) {
    const bookingUrl = `${process.env.DOMAIN_URL}/bookings/${bookingId}`;
    const subject = "Booking Confirmation";
    const htmlBody = `<p>Your booking is confirmed. View your booking details <a href="${bookingUrl}">here</a>.</p>`;

    return this.sendEmail(to, subject, htmlBody);
  }
}

export default EmailService;
5000;
