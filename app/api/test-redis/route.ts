import { NextResponse } from "next/server";
import { getKV } from "@/lib/kv";

export async function GET() {
  try {
    const kv = getKV();
    const testKey = "__redis_test__";
    await kv.set(testKey, "ok", { ex: 10 });
    const val = await kv.get(testKey);
    await kv.del(testKey);
    return NextResponse.json({ status: "connected", test: val });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}
