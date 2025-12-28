import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">管理画面</h1>
        </header>

        <nav className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/songs"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-shiny-blue transition-colors"
          >
            <h2 className="text-lg font-medium text-slate-800">楽曲管理</h2>
            <p className="mt-1 text-sm text-slate-500">
              楽曲の追加・編集・削除
            </p>
          </Link>
          <Link
            href="/admin/units"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-shiny-blue transition-colors"
          >
            <h2 className="text-lg font-medium text-slate-800">ユニット管理</h2>
            <p className="mt-1 text-sm text-slate-500">
              ユニットの追加・編集・削除
            </p>
          </Link>
          <Link
            href="/admin/members"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-shiny-blue transition-colors"
          >
            <h2 className="text-lg font-medium text-slate-800">メンバー管理</h2>
            <p className="mt-1 text-sm text-slate-500">
              メンバーの追加・編集・削除（複数ユニット所属対応）
            </p>
          </Link>
          <Link
            href="/admin/vibe-tags"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-shiny-blue transition-colors"
          >
            <h2 className="text-lg font-medium text-slate-800">タグ管理</h2>
            <p className="mt-1 text-sm text-slate-500">
              Vibeタグの追加・削除
            </p>
          </Link>
          <Link
            href="/admin/inquiries"
            className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-shiny-blue transition-colors"
          >
            <h2 className="text-lg font-medium text-slate-800">
              お問い合わせ管理
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              お問い合わせの確認とIssue化
            </p>
          </Link>
        </nav>
      </div>
    </div>
  );
}
