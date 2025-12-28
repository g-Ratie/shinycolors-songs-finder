create table admin_emails (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table admin_emails enable row level security;

create or replace function is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from admin_emails
    where email = auth.jwt()->>'email'
  );
end;
$$ language plpgsql security definer;

alter table units enable row level security;
create policy "Anyone can view units" on units for select using (true);
create policy "Admin can insert units" on units for insert with check (is_admin());
create policy "Admin can update units" on units for update using (is_admin());
create policy "Admin can delete units" on units for delete using (is_admin());

alter table members enable row level security;
create policy "Anyone can view members" on members for select using (true);
create policy "Admin can insert members" on members for insert with check (is_admin());
create policy "Admin can update members" on members for update using (is_admin());
create policy "Admin can delete members" on members for delete using (is_admin());

alter table songs enable row level security;
create policy "Anyone can view songs" on songs for select using (true);
create policy "Admin can insert songs" on songs for insert with check (is_admin());
create policy "Admin can update songs" on songs for update using (is_admin());
create policy "Admin can delete songs" on songs for delete using (is_admin());

alter table vibe_tags enable row level security;
create policy "Anyone can view vibe_tags" on vibe_tags for select using (true);
create policy "Admin can insert vibe_tags" on vibe_tags for insert with check (is_admin());
create policy "Admin can update vibe_tags" on vibe_tags for update using (is_admin());
create policy "Admin can delete vibe_tags" on vibe_tags for delete using (is_admin());

alter table song_vibe_tags enable row level security;
create policy "Anyone can view song_vibe_tags" on song_vibe_tags for select using (true);
create policy "Admin can insert song_vibe_tags" on song_vibe_tags for insert with check (is_admin());
create policy "Admin can delete song_vibe_tags" on song_vibe_tags for delete using (is_admin());

create policy "Admin can insert member_units" on member_units for insert with check (is_admin());
create policy "Admin can update member_units" on member_units for update using (is_admin());
create policy "Admin can delete member_units" on member_units for delete using (is_admin());

drop policy if exists "Authenticated users can view inquiries" on inquiries;
drop policy if exists "Authenticated users can update inquiries" on inquiries;

create policy "Admin can view inquiries" on inquiries for select using (is_admin());
create policy "Admin can update inquiries" on inquiries for update using (is_admin());
create policy "Admin can delete inquiries" on inquiries for delete using (is_admin());
