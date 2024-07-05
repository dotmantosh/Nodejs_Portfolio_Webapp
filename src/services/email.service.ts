import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private static transporter: Transporter;

  private static initialize() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services as well
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
    }
  }

  public static async sendEmail(options: EmailOptions): Promise<void> {
    this.initialize();

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}

export default EmailService;
