import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { BRAND_NAME, EMAIL } from "@/lib/site";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!
  );
}

function phoneToTel(value: string): string {
  const digits = value.replace(/[^0-9+]/g, "");
  return digits || value;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Please enter your phone number." },
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }
    if (!message) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.BOOKING_EMAIL || process.env.SMTP_USER;
    const recipients = Array.from(
      new Set([recipient, EMAIL].filter(Boolean) as string[])
    );

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #E31E24; padding: 24px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">New Contact Message</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">Nrently.pk — Car Rental Services</p>
        </div>
        <div style="padding: 28px 24px; background: #fafafa;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #444;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(phoneToTel(phone))}" style="color: #E31E24;">${escapeHtml(phone)}</a></td></tr>
            ${
              email
                ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #E31E24;">${escapeHtml(email)}</a></td></tr>`
                : ""
            }
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Message</td><td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
        </div>
        <div style="background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #888;">
          Submitted via nrently.pk contact form
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${BRAND_NAME} Contact" <${process.env.SMTP_USER}>`,
      to: recipients,
      replyTo: email || undefined,
      subject: `New Contact Message: ${name} — ${phone}`,
      text: `${message}\n\n— ${name} (${phone}${email ? `, ${email}` : ""})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      {
        error:
          "Sorry, we couldn't send your message right now. Please try again or reach us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}