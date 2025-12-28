import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 公開データ取得用（認証不要のSELECT操作）
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
