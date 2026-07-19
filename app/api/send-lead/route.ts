import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, whatsapp, business, details, plan } = await req.json();

    const html = `
      <h2>🔔 New Lead from ZidlyWeb</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">${whatsapp}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Business</td><td style="padding:8px;border:1px solid #ddd">${business || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Selected Plan</td><td style="padding:8px;border:1px solid #ddd">${plan || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Details</td><td style="padding:8px;border:1px solid #ddd">${details}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "hello@zidlyweb.site",
      subject: `New Lead from ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-lead error:", error);
    return NextResponse.json({ success: false, error: "Failed to send" }, { status: 500 });
  }
}
