import { supabase } from "@/lib/supabase";
import type { Member, Unit } from "@/lib/types/database";
import { MemberList } from "./MemberList";

export default async function MembersPage() {
  const [membersResult, unitsResult] = await Promise.all([
    supabase
      .from("members")
      .select(`
        *,
        member_units (
          unit_id,
          is_primary,
          unit:units (*)
        )
      `)
      .order("sort_order"),
    supabase.from("units").select("*").order("name"),
  ]);

  const members = (membersResult.data as Member[]) || [];
  const units = (unitsResult.data as Unit[]) || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">メンバー管理</h1>
      <MemberList initialMembers={members} units={units} />
    </div>
  );
}
