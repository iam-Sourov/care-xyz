import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

// CRITICAL FIX: Forces the API to always fetch fresh data (no caching)
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Robust URL parsing for Next.js 16
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("care-xyz-db");

    const bookings = await db.collection("bookings")
      .find({ userEmail: email })
      .sort({ date: -1 }) // Sort by newest date
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("care-xyz-db");
    const body = await request.json();

    const bookingData = {
      ...body,
      createdAt: new Date(),
      status: "Pending"
    };

    const result = await db.collection("bookings").insertOne(bookingData);

    // Email Sending Logic
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.sendMail({
        from: `"Care.xyz Support" <${process.env.EMAIL_USER}>`,
        to: body.userEmail,
        subject: `Invoice: Booking Confirmed for ${body.serviceName}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; max-width: 600px;">
              <h2 style="color: #4F46E5;">Booking Confirmation</h2>
              <p>Dear ${body.userName || "Customer"},</p>
              <p>Thank you for choosing <strong>Care.xyz</strong>. Your booking has been received.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left;">Service</th>
                  <td style="padding: 10px;">${body.serviceName}</td>
                </tr>
                <tr>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Date</th>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.date}</td>
                </tr>
                 <tr>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Duration</th>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">${body.duration} Hours</td>
                </tr>
                <tr>
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #eee;">Address</th>
                  <td style="padding: 10px; border-bottom: 1px solid #eee;">
                    ${body.address?.details}, ${body.address?.area}, ${body.address?.district}
                  </td>
                </tr>
                <tr style="background-color: #f3f4f6;">
                  <th style="padding: 10px; text-align: left;">Total Cost</th>
                  <td style="padding: 10px; font-weight: bold;">$${body.price}</td>
                </tr>
              </table>

              <p style="margin-top: 20px;">Status: <span style="color: orange; font-weight: bold;">Pending</span></p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #888;">If you wish to cancel, please visit your dashboard.</p>
            </div>
          `,
      });
      console.log("Email sent successfully to:", body.userEmail);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json({ message: "Booked", id: result.insertedId }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("care-xyz-db");
    const result = await db.collection("bookings").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}