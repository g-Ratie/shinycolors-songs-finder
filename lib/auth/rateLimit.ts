import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 3;

export async function checkRateLimit(
  key: string
): Promise<{ allowed: boolean; remaining: number }> {
  const supabase = createAdminClient();
  const windowStart = new Date(Date.now() - WINDOW_MS).toISOString();

  const { count } = await supabase
    .from("rate_limit_attempts")
    .select("*", { count: "exact", head: true })
    .eq("key", key)
    .gte("attempted_at", windowStart);

  const currentCount = count ?? 0;

  if (currentCount >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  await supabase.from("rate_limit_attempts").insert({ key });

  await supabase
    .from("rate_limit_attempts")
    .delete()
    .lt("attempted_at", windowStart);

  return { allowed: true, remaining: MAX_REQUESTS - currentCount - 1 };
}
