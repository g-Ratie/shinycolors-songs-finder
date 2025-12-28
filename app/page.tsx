import { getUnits, getVibeTags } from "@/lib/queries";
import { SongFinderClient } from "@/components/SongFinderClient";

export default async function Home() {
  const [units, vibeTags] = await Promise.all([getUnits(), getVibeTags()]);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-shiny-blue-dark">
            シャニマス楽曲検索
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            ユニット、属性、Vibeタグで楽曲を検索できます
          </p>
        </header>

        <SongFinderClient initialUnits={units} initialVibeTags={vibeTags} />
      </div>
    </div>
  );
}
