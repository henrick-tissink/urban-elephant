import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  property: z.string().optional(),
  dates: z.string().optional(),
  guests: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message, property, dates, guests } = result.data;

    // Check for Postmark API token
    const postmarkToken = process.env.POSTMARK_API_TOKEN;
    if (!postmarkToken) {
      console.error("POSTMARK_API_TOKEN not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email via Postmark
    const emailResponse = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": postmarkToken,
      },
      body: JSON.stringify({
        From: process.env.EMAIL_FROM || "noreply@urbanelephant.co.za",
        To: process.env.EMAIL_TO || "reservations@urbanelephant.co.za",
        Subject: `[Urban Elephant] ${subject}`,
        HtmlBody: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${property ? `<p><strong>Interested Property:</strong> ${property}</p>` : ""}
          ${dates ? `<p><strong>Preferred Dates:</strong> ${dates}</p>` : ""}
          ${guests ? `<p><strong>Number of Guests:</strong> ${guests}</p>` : ""}
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        TextBody: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
${property ? `Interested Property: ${property}` : ""}
${dates ? `Preferred Dates: ${dates}` : ""}
${guests ? `Number of Guests: ${guests}` : ""}

Message:
${message}
        `,
        ReplyTo: email,
        MessageStream: "outbound",
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error("Postmark error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
