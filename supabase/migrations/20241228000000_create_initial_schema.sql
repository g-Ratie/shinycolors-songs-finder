-- pg_trgm拡張を有効化（タイトル検索用）
create extension if not exists pg_trgm;

-- units: ユニットマスタ（固定データ）
create table units (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

comment on table units is 'シャニマスのユニット一覧（固定マスタ）';

-- songs: 楽曲テーブル
create type song_type as enum ('unit', 'solo', 'collaboration', 'other');
create type attribute_type as enum ('stella', 'luna', 'sol');

create table songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  unit_id uuid not null references units(id) on delete restrict,
  song_type song_type not null default 'unit',
  attribute attribute_type,
  youtube_url text,
  links jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- ソロ曲以外ではattributeをnullにする制約
  constraint songs_attribute_solo_only check (
    (song_type = 'solo' and attribute is not null) or
    (song_type != 'solo' and attribute is null)
  )
);

comment on table songs is '楽曲データ';
comment on column songs.attribute is 'ソロ曲のみ設定可能（Stella/Luna/Sol）';
comment on column songs.links is '外部リンク（公式、配信サービス等）';

-- updated_at自動更新用のトリガー関数
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger songs_updated_at
  before update on songs
  for each row
  execute function update_updated_at();

-- vibe_tags: その他要素タグのマスタ
create table vibe_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

comment on table vibe_tags is '楽曲の雰囲気・感情タグ（Vibe）';

-- song_vibe_tags: 楽曲×Vibeタグの中間テーブル
create table song_vibe_tags (
  song_id uuid not null references songs(id) on delete cascade,
  vibe_tag_id uuid not null references vibe_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (song_id, vibe_tag_id)
);

comment on table song_vibe_tags is '楽曲とVibeタグの関連付け';

-- インデックス
create index songs_unit_id_idx on songs(unit_id);
create index songs_song_type_idx on songs(song_type);
create index songs_attribute_idx on songs(attribute) where attribute is not null;
create index songs_title_idx on songs using gin(title gin_trgm_ops);
create index vibe_tags_sort_order_idx on vibe_tags(sort_order);
create index song_vibe_tags_vibe_tag_id_idx on song_vibe_tags(vibe_tag_id);
