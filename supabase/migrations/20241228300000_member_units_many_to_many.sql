-- メンバーとユニットの多対多関係を作成
create table member_units (
  member_id uuid not null references members(id) on delete cascade,
  unit_id uuid not null references units(id) on delete cascade,
  is_primary boolean not null default false,
  primary key (member_id, unit_id)
);

-- 既存のmembers.unit_idのデータをmember_unitsに移行
insert into member_units (member_id, unit_id, is_primary)
select id, unit_id, true from members where unit_id is not null;

-- unit_idカラムを削除
alter table members drop column unit_id;

-- sort_orderもmember_units側に移動した方が良いが、今回はmembersに残す

-- RLS有効化
alter table member_units enable row level security;

-- 公開SELECT許可
create policy "Anyone can view member_units"
  on member_units for select
  using (true);
