"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

interface UnitAssignment {
  unitId: string;
  isPrimary: boolean;
}

export async function createMember(
  name: string,
  sortOrder: number,
  unitAssignments: UnitAssignment[]
) {
  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert({ name, sort_order: sortOrder })
    .select()
    .single();

  if (memberError) {
    return { success: false, error: memberError.message };
  }

  if (unitAssignments.length > 0) {
    const memberUnits = unitAssignments.map((ua) => ({
      member_id: member.id,
      unit_id: ua.unitId,
      is_primary: ua.isPrimary,
    }));

    const { error: unitError } = await supabase
      .from("member_units")
      .insert(memberUnits);

    if (unitError) {
      await supabase.from("members").delete().eq("id", member.id);
      return { success: false, error: unitError.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/members");

  return { success: true };
}

export async function updateMember(
  id: string,
  name: string,
  sortOrder: number,
  unitAssignments: UnitAssignment[]
) {
  const { data: existingUnits } = await supabase
    .from("member_units")
    .select("*")
    .eq("member_id", id);

  const { error: memberError } = await supabase
    .from("members")
    .update({ name, sort_order: sortOrder })
    .eq("id", id);

  if (memberError) {
    return { success: false, error: memberError.message };
  }

  const { error: deleteError } = await supabase
    .from("member_units")
    .delete()
    .eq("member_id", id);

  if (deleteError) {
    return { success: false, error: deleteError.message };
  }

  if (unitAssignments.length > 0) {
    const memberUnits = unitAssignments.map((ua) => ({
      member_id: id,
      unit_id: ua.unitId,
      is_primary: ua.isPrimary,
    }));

    const { error: unitError } = await supabase
      .from("member_units")
      .insert(memberUnits);

    if (unitError) {
      if (existingUnits && existingUnits.length > 0) {
        await supabase.from("member_units").insert(existingUnits);
      }
      return { success: false, error: unitError.message };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/members");

  return { success: true };
}

export async function deleteMember(id: string) {
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/members");

  return { success: true };
}
