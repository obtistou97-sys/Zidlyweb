import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, details } = await req.json();

    const phone = process.env.CALLMEBOT_PHONE;
    const apiKey = process.env.CALLMEBOT_API_KEY;

    if (!phone || !apiKey) {
      console.warn("CALLMEBOT not configured — skipping WhatsApp notification");
      return NextResponse.json({ success: false, reason: "not_configured" });
    }

    const text = `🔔 New Lead from Zidly Chat\n\nName: ${name}\nEmail: ${email}\nDetails: ${details || "—"}`;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apiKey)}`;

    const res = await fetch(url);
    const body = await res.text();

    if (!res.ok) {
      console.error("CallMeBot error:", body);
      return NextResponse.json({ success: false, error: body }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("notify-whatsapp error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
