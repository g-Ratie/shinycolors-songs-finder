import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-shiny-blue-dark text-sm transition-colors"
          >
            <span aria-hidden="true">&larr;</span>
            トップに戻る
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            このサイトについて
          </h1>
        </header>

        <main className="space-y-8">
          <section className="bg-white rounded-xl border border-shiny-blue/20 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              シャニマス楽曲検索とは
            </h2>
            <div className="space-y-3 text-slate-600 text-sm">
              <p>
                シャニマス楽曲検索は、アイドルマスター シャイニーカラーズの楽曲を
                ユニット、属性、雰囲気などの条件で検索できる非公式ファンサイトです。
              </p>
              <p>
                「こんな気分のときに聴きたい曲」「このユニットのこんな雰囲気の曲」
                といった探し方ができるように作りました。
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-shiny-blue/20 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              免責事項
            </h2>
            <div className="space-y-3 text-slate-600 text-sm">
              <p>
                本サイトは非公式のファンサイトであり、
                株式会社バンダイナムコエンターテインメントとは一切関係ありません。
              </p>
              <p>
                掲載している楽曲情報やYouTubeへのリンクは、
                ファン活動の一環として提供しています。
                権利者様からの指摘があった場合は速やかに対応いたします。
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-shiny-blue/20 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              お問い合わせ
            </h2>
            <div className="space-y-3 text-slate-600 text-sm">
              <p>
                機能のリクエストやバグ報告、その他のお問い合わせは
                下記のフォームからお送りください。
              </p>
              <Link
                href="/contact"
                className="inline-block mt-2 px-6 py-2 bg-shiny-blue text-white rounded-lg hover:bg-shiny-blue-dark transition-colors"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-shiny-blue/20 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              運営・開発
            </h2>
            <div className="text-slate-600 text-sm">
              <p>
                運営・開発は
                <a
                  href="https://x.com/ruribou177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-shiny-blue hover:text-shiny-blue-dark underline"
                >
                  るりいろぼうや
                </a>
                が行っています。
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
