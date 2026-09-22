import { NextRequest, NextResponse } from "next/server";
import { EMAIL, BRAND_NAME } from "@/lib/site";
import { createMailer, SMTP_USER, BOOKING_EMAIL } from "@/lib/smtp";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  carType: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  clientMessage?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingData = await req.json();

    const { name, email, phone, carType, pickupLocation, dropoffLocation, pickupDate, pickupTime, dropoffDate, dropoffTime, clientMessage } = body;

    if (!name || !phone || !carType || !pickupLocation || !pickupDate || !email) {
      return NextResponse.json({ error: "All required fields must be filled." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const transporter = createMailer();

    const recipients = Array.from(
      new Set([BOOKING_EMAIL, EMAIL].filter(Boolean) as string[])
    );

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        <div style="background: #E31E24; padding: 24px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">New Booking Request</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 13px;">Nrently.pk — Car Rental Services</p>
        </div>
        <div style="padding: 28px 24px; background: #fafafa;">
          <h2 style="margin: 0 0 16px; font-size: 16px; color: #333; border-bottom: 2px solid #E31E24; padding-bottom: 8px;">Customer Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #444;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #E31E24;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #E31E24;">${phone}</a></td></tr>
          </table>

          <h2 style="margin: 24px 0 16px; font-size: 16px; color: #333; border-bottom: 2px solid #E31E24; padding-bottom: 8px;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #444;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Car Type</td><td style="padding: 8px 0;">${carType}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Pickup Location</td><td style="padding: 8px 0;">${pickupLocation}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Drop-off Location</td><td style="padding: 8px 0;">${dropoffLocation || "Same as pickup"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Pick-up Date</td><td style="padding: 8px 0;">${pickupDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Pick-up Time</td><td style="padding: 8px 0;">${pickupTime}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Drop-off Date</td><td style="padding: 8px 0;">${dropoffDate || "—"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #333;">Drop-off Time</td><td style="padding: 8px 0;">${dropoffTime || "—"}</td></tr>
          </table>
        </div>
        <div style="background: #f3f4f6; padding: 16px 24px; text-align: center; font-size: 12px; color: #888;">
          Submitted via nrently.pk booking form
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${BRAND_NAME} Bookings" <${SMTP_USER}>`,
      to: recipients,
      replyTo: email,
      subject: `New Booking: ${name} — ${carType} (${pickupLocation})`,
      html: htmlContent,
    });

    if (clientMessage) {
      try {
        await transporter.sendMail({
          from: `"${BRAND_NAME} Car Rentals" <${SMTP_USER}>`,
          to: email,
          replyTo: BOOKING_EMAIL,
          subject: `Your Booking Request Confirmation — ${carType}`,
          text: clientMessage,
        });
      } catch (clientError) {
        console.error("Client confirmation email error:", clientError);
      }
    }

    if (clientMessage) {
      try {
        await transporter.sendMail({
          from: `"${BRAND_NAME} Car Rentals" <${SMTP_USER}>`,
          to: EMAIL,
          replyTo: email,
          subject: `Booking Message — ${name} (${carType})`,
          text: clientMessage,
        });
      } catch (ownerError) {
        console.error("Owner message email error:", ownerError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking email error:", error);
    return NextResponse.json(
      {
        error:
          "Sorry, we couldn't send your booking right now. Please try again or complete your booking on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
