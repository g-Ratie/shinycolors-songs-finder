-- お問い合わせ種別のenum
create type inquiry_type as enum ('request', 'question', 'other');

-- お問い合わせステータスのenum
create type inquiry_status as enum ('pending', 'in_progress', 'completed', 'issued');

-- お問い合わせテーブル
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type inquiry_type not null,
  name text,
  content text not null,
  status inquiry_status not null default 'pending',
  github_issue_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS有効化
alter table inquiries enable row level security;

-- 公開ユーザーはINSERTのみ許可（お問い合わせ送信）
create policy "Anyone can insert inquiries"
  on inquiries for insert
  with check (true);

-- SELECTとUPDATEは認証済みユーザーのみ（管理画面用）
create policy "Authenticated users can view inquiries"
  on inquiries for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update inquiries"
  on inquiries for update
  using (auth.role() = 'authenticated');

-- updated_atの自動更新トリガー
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_inquiries_updated_at
  before update on inquiries
  for each row
  execute function update_updated_at_column();
