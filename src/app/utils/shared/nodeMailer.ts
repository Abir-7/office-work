/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/mailer.ts
import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
import { config } from "../../config";

// Load environment variables
dotenv.config();

// Define an interface for the email options
interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string; // Optional HTML content
}

const transporter: Transporter = nodemailer.createTransport({
  host: config.host_email_service,
  port: Number(config.host_email_service_port),
  secure: false,
  auth: {
    user: config.host_email as string,
    pass: config.host_email_pass as string,
  },
});

transporter.verify(function (error: any, _success: any) {
  if (error) {
    console.error("Email transporter error:", error);
  } else {
    console.log("Email transporter is ready");
  }
});

// Send email utility function
export const sendMail = async (emailOptions: EmailOptions): Promise<void> => {
  const { to, subject, text, html } = emailOptions;

  try {
    const info = await transporter.sendMail({
      from: `"bdCalling" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
