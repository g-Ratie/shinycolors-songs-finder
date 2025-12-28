import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const start = Date.now();

  const { error } = await supabase.from("_health_check").select("*").limit(1);

  const latency = Date.now() - start;

  const tableNotFoundCodes = ["PGRST116", "PGRST205"];
  if (error && !tableNotFoundCodes.includes(error.code)) {
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
