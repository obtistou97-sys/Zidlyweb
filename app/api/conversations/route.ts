import { NextResponse } from "next/server";
import { getAllConversations, deleteConversation, clearAllConversations } from "@/lib/conversations";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const conversations = await getAllConversations();
    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("Conversations GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      await deleteConversation(id);
    } else {
      await clearAllConversations();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Conversations DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
