import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { InquiryList } from "./InquiryList";
import type { Inquiry } from "@/lib/types/database";

export const dynamic = "force-dynamic";

async function getInquiries(): Promise<Inquiry[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

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
          <h1 className="mt-4 text-2xl font-bold text-slate-800">
            お問い合わせ管理
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {inquiries.length}件のお問い合わせ
          </p>
        </header>

        <InquiryList initialInquiries={inquiries} />
      </div>
    </div>
  );
}
