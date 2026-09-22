import nodemailer from "nodemailer";

const DEFAULT_SMTP = {
  host: "smtp.gmail.com",
  port: 587,
  user: "nrently@gmail.com",
  pass: "aekqpsvecglgsvzr",
};

export const SMTP_USER = process.env.SMTP_USER || DEFAULT_SMTP.user;
export const SMTP_PASS = process.env.SMTP_PASS || DEFAULT_SMTP.pass;
export const BOOKING_EMAIL = process.env.BOOKING_EMAIL || SMTP_USER;

export function createMailer() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || DEFAULT_SMTP.host,
    port: Number(process.env.SMTP_PORT) || DEFAULT_SMTP.port,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}
