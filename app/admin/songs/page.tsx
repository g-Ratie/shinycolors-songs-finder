import Link from "next/link";
import { getSongs, getUnits, getVibeTags } from "@/lib/queries";
import { SongTable } from "./SongTable";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*, unit:units(*)")
    .order("unit_id")
    .order("sort_order");

  if (error) throw error;
  return data ?? [];
}

export default async function AdminSongsPage() {
  const [songs, units, vibeTags, members] = await Promise.all([
    getSongs(),
    getUnits(),
    getVibeTags(),
    getMembers(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/admin"
            className="text-shiny-blue-dark hover:text-shiny-blue text-sm"
          >
            管理画面に戻る
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">楽曲管理</h1>
              <p className="mt-1 text-sm text-slate-500">
                {songs.length}件の楽曲
              </p>
            </div>
          </div>
        </header>

        <SongTable
          songs={songs}
          units={units}
          vibeTags={vibeTags}
          members={members}
        />
      </div>
    </div>
  );
}
