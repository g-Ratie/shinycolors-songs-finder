import Link from "next/link";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="text-shiny-blue-dark hover:text-shiny-blue text-sm"
          >
            トップに戻る
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            お問い合わせ
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            機能のリクエストやバグ報告、その他のお問い合わせはこちらからお送りください。
          </p>
        </header>

        <main className="bg-white rounded-xl border border-shiny-blue/20 p-6 shadow-sm">
          <ContactForm />
        </main>
      </div>
    </div>
  );
}
