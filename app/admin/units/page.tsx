import { supabase } from "@/lib/supabase";
import type { Unit } from "@/lib/types/database";
import { UnitList } from "./UnitList";

export default async function UnitsPage() {
  const { data: units } = await supabase
    .from("units")
    .select("*")
    .order("name");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">ユニット管理</h1>
      <UnitList initialUnits={(units as Unit[]) || []} />
    </div>
  );
}
