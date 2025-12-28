"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf-]/g, "");
}

export async function createUnit(name: string) {
  const supabase = createAdminClient();
  const slug = generateSlug(name);

  const { error } = await supabase.from("units").insert({ name, slug });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/units");

  return { success: true };
}

export async function updateUnit(id: string, name: string) {
  const supabase = createAdminClient();
  const slug = generateSlug(name);

  const { error } = await supabase
    .from("units")
    .update({ name, slug })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/units");

  return { success: true };
}

export async function deleteUnit(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("units").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/units");

  return { success: true };
}
