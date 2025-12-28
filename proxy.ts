import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAdmin } from "@/lib/auth/admin";

export async function proxy(request: NextRequest) {
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

    const admin = await isAdmin(user.email);
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
