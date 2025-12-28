import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export async function isAdmin(email: string): Promise<boolean> {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("admin_emails")
    .select("id")
    .eq("email", email)
    .single();

  return !!data;
}
