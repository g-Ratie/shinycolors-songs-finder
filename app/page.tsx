import { getUnits, getVibeTags } from "@/lib/queries";
import { SongFinderClient } from "@/components/SongFinderClient";

export default async function Home() {
  const [units, vibeTags] = await Promise.all([getUnits(), getVibeTags()]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            シャニマス楽曲検索
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ユニット、属性、Vibeタグで楽曲を検索できます
          </p>
        </header>

        <SongFinderClient initialUnits={units} initialVibeTags={vibeTags} />
      </div>
    </div>
  );
}
