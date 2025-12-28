import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@supabase/supabase-js";

async function isAdminEmail(email: string): Promise<boolean> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data } = await supabase
    .from("admin_emails")
    .select("id")
    .eq("email", email)
    .single();

  return !!data;
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isAuthCallback = pathname.startsWith("/auth/callback");

  if (isAdminRoute && !isLoginPage && !isAuthCallback) {
    if (!user) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!user.email) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const admin = await isAdminEmail(user.email);
    if (!admin) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
