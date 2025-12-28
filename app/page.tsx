import Link from "next/link";
import { getUnits, getVibeTags } from "@/lib/queries";
import { SongFinderClient } from "@/components/SongFinderClient";

export default async function Home() {
  const [units, vibeTags] = await Promise.all([getUnits(), getVibeTags()]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        <header className="mb-10 text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-shiny-blue via-shiny-pink to-shiny-yellow rounded-full blur-lg opacity-50" />
            <h1 className="relative text-3xl font-bold text-white bg-gradient-to-r from-shiny-blue-dark to-shiny-blue px-8 py-3 rounded-full shadow-lg">
              シャニマス楽曲検索
            </h1>
          </div>
          <p className="mt-4 text-slate-600">
            ユニット、属性、タグで楽曲を検索できます
          </p>
        </header>

        <SongFinderClient initialUnits={units} initialVibeTags={vibeTags} />
      </div>

      <footer className="py-8 text-center text-sm text-slate-500 bg-white/50 border-t border-shiny-blue/10">
        <div className="flex justify-center gap-8">
          <Link
            href="/about"
            className="hover:text-shiny-blue-dark transition-colors"
          >
            このサイトについて
          </Link>
          <Link
            href="/contact"
            className="hover:text-shiny-blue-dark transition-colors"
          >
            お問い合わせ
          </Link>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          THE IDOLM@STER and all related marks are trademarks of Bandai Namco Entertainment Inc.
        </p>
      </footer>
    </div>
  );
}
