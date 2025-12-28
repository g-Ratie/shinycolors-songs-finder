import Link from "next/link";
import { getUnits, getVibeTags } from "@/lib/queries";
import { SongFinderClient } from "@/components/SongFinderClient";

export default async function Home() {
  const [units, vibeTags] = await Promise.all([getUnits(), getVibeTags()]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <header className="mb-8 text-center">
          <h1 className="inline-block text-3xl font-bold text-white bg-shiny-blue px-6 py-2 rounded-full shadow-md">
            シャニマス楽曲検索
          </h1>
          <p className="mt-3 text-sm text-slate-700 drop-shadow-sm">
            ユニット、属性、Vibeタグで楽曲を検索できます
          </p>
        </header>

        <SongFinderClient initialUnits={units} initialVibeTags={vibeTags} />
      </div>

      <footer className="py-6 text-center text-sm text-slate-500 border-t border-shiny-blue/10">
        <div className="flex justify-center gap-6">
          <Link href="/about" className="hover:text-shiny-blue-dark">
            このサイトについて
          </Link>
          <Link href="/contact" className="hover:text-shiny-blue-dark">
            お問い合わせ
          </Link>
        </div>
      </footer>
    </div>
  );
}
