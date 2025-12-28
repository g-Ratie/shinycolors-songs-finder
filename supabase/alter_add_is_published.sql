-- songs テーブルの変更: is_published追加、NULL許容化

-- 1. 既存の制約を削除
alter table songs drop constraint if exists songs_attribute_solo_only;
alter table songs drop constraint if exists songs_member_solo_only;

-- 2. unit_id を NULL許容に変更
alter table songs alter column unit_id drop not null;

-- 3. youtube_url を NULL許容に変更
alter table songs alter column youtube_url drop not null;

-- 4. is_published カラムを追加
alter table songs add column if not exists is_published boolean not null default false;

-- 5. インデックス追加
create index if not exists songs_is_published_idx on songs(is_published) where is_published = true;

-- 6. RLSポリシー更新
drop policy if exists "Anyone can view songs" on songs;
drop policy if exists "Anyone can view published songs" on songs;
create policy "Anyone can view published songs" on songs for select using (is_published = true or is_admin());

drop policy if exists "Anyone can view song_vibe_tags" on song_vibe_tags;
drop policy if exists "Anyone can view song_vibe_tags for published songs" on song_vibe_tags;
create policy "Anyone can view song_vibe_tags for published songs" on song_vibe_tags for select using (
  exists (select 1 from songs where songs.id = song_id and (songs.is_published = true or is_admin()))
);
