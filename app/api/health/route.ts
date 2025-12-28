import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const start = Date.now();

  const { error } = await supabase.from("_health_check").select("*").limit(1);

  const latency = Date.now() - start;

  if (error && error.code !== "PGRST116") {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "ok",
    supabase: "connected",
    latency: `${latency}ms`,
  });
}
