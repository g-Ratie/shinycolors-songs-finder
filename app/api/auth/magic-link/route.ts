import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/auth/admin";
import { checkRateLimit } from "@/lib/auth/rateLimit";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";

  const ipLimit = await checkRateLimit(`ip:${ip}`);
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく待ってから再度お試しください。" },
      { status: 429 }
    );
  }

  const body = await request.json();
  const email = body.email?.trim().toLowerCase();

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "メールアドレスを入力してください。" },
      { status: 400 }
    );
  }

  const emailLimit = await checkRateLimit(`email:${email}`);
  if (!emailLimit.allowed) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく待ってから再度お試しください。" },
      { status: 429 }
    );
  }

  const admin = await isAdmin(email);
  if (!admin) {
    return NextResponse.json({ success: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${request.nextUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Magic link error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
