import { NextResponse } from "next/server";
import { getAllLeads, saveLead, deleteLead, clearAllLeads, type Lead } from "@/lib/conversations";

function checkAuth(request: Request): boolean {
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Leads GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, details } = body;

    if (!name && !email) {
      return NextResponse.json({ error: "Missing lead data" }, { status: 400 });
    }

    await saveLead({
      name: name || "Chat Lead",
      email: email || "",
      phone: phone || "",
      details: details || "",
      capturedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Leads POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      await deleteLead(id);
    } else {
      await clearAllLeads();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Leads DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
