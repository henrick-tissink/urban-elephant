import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    // Optional so an out-of-hours callback request can be name + number only —
    // asking a guest for an email address just to be phoned back loses leads.
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().optional(),
    subject: z.string().min(3, "Subject must be at least 3 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    property: z.string().optional(),
    tour: z.string().optional(),
    dates: z.string().optional(),
    guests: z.number().optional(),
  })
  // ...but we still need some way to answer them.
  .refine((data) => Boolean(data.email || data.phone), {
    message: "Provide either an email address or a phone number",
    path: ["email"],
  });

type ContactPayload = z.infer<typeof contactSchema>;

// Escape user-supplied strings before interpolating into HTML.
function esc(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data: ContactPayload): string {
  const { name, email, phone, subject, message, property, tour, dates, guests } = data;
  const row = (label: string, value?: string | number) =>
    value
      ? `<tr><td style="padding:8px 0;color:#6b6b6b;font-size:13px;width:140px;vertical-align:top">${esc(label)}</td><td style="padding:8px 0;color:#24272a;font-size:14px;vertical-align:top">${esc(String(value))}</td></tr>`
      : "";

  const waLink = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : null;

  return `<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:#f6f6f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f6f6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #ececec;">
          <tr>
            <td style="background:#24272a;padding:24px 32px;">
              <p style="margin:0;color:#ff83ff;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;font-weight:700;">Urban Elephant</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:300;">New contact form submission</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <p style="margin:0 0 4px;color:#24272a;font-size:18px;font-weight:500;">${esc(name)}</p>
              <p style="margin:0;color:#6b6b6b;font-size:14px;">${[email, phone].filter(Boolean).map((v) => esc(String(v))).join(" &middot; ")}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                ${row("Subject", subject)}
                ${row("Tour of interest", tour)}
                ${row("Property of interest", property)}
                ${row("Preferred dates", dates)}
                ${row("Number of guests", guests)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px;">
              <p style="margin:0 0 8px;color:#6b6b6b;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">Message</p>
              <div style="padding:16px;background:#f8f8f8;border-left:3px solid #ff00ff;color:#24272a;font-size:15px;line-height:1.55;white-space:pre-wrap;">${esc(message)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px 32px;">
              ${email ? `<a href="mailto:${esc(email)}?subject=${encodeURIComponent("Re: " + subject)}" style="display:inline-block;background:#ff00ff;color:#ffffff;padding:12px 22px;text-decoration:none;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;margin-right:8px;">Reply by email</a>` : ""}
              ${phone ? `<a href="tel:${esc(phone.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#24272a;color:#ffffff;padding:12px 22px;text-decoration:none;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;margin-right:8px;">Call back</a>` : ""}
              ${waLink ? `<a href="${waLink}" style="display:inline-block;background:#25D366;color:#ffffff;padding:12px 22px;text-decoration:none;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">WhatsApp</a>` : ""}
            </td>
          </tr>
          <tr>
            <td style="background:#fafafa;padding:16px 32px;border-top:1px solid #ececec;">
              <p style="margin:0;color:#9b9b9b;font-size:11px;">Sent via urbanelephant.co.za on ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })} SAST.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(data: ContactPayload): string {
  const { name, email, phone, subject, message, property, tour, dates, guests } = data;
  return [
    "NEW CONTACT FORM SUBMISSION — Urban Elephant",
    "",
    `Name:    ${name}`,
    email ? `Email:   ${email}` : null,
    phone ? `Phone:   ${phone}` : null,
    "",
    `Subject:  ${subject}`,
    tour ? `Tour:     ${tour}` : null,
    property ? `Property: ${property}` : null,
    dates ? `Dates:    ${dates}` : null,
    guests ? `Guests:   ${guests}` : null,
    "",
    "Message:",
    message,
    "",
    "— Sent from urbanelephant.co.za",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 400 },
    );
  }

  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const from = process.env.EMAIL_FROM || "Urban Elephant <noreply@urbanelephant.co.za>";
  const to = process.env.EMAIL_TO || "reservations@urbanelephant.co.za";

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `[Urban Elephant] ${data.subject}`,
      html: buildHtml(data),
      text: buildText(data),
      ...(data.email ? { replyTo: data.email } : {}),
      tags: [{ name: "source", value: "contact-form" }],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
