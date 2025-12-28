-- ユニットマスタデータ
insert into units (name, slug) values
  ('illumination STARS', 'illumination-stars'),
  ('L''Antica', 'lantica'),
  ('放課後クライマックスガールズ', 'houkago-climax-girls'),
  ('ALSTROEMERIA', 'alstroemeria'),
  ('Straylight', 'straylight'),
  ('noctchill', 'noctchill'),
  ('SHHis', 'shhis'),
  ('CoMETIK', 'cometik'),
  ('シャイニーカラーズ', 'shinycolors');

-- Vibeタグマスタデータ
insert into vibe_tags (name, slug, sort_order) values
  ('楽しい', 'tanoshii', 1),
  ('かわいい', 'kawaii', 2),
  ('かっこいい', 'kakkoii', 3),
  ('キラキラ', 'kirakira', 4),
  ('温かい', 'atatakai', 5),
  ('胸に迫る', 'mune-ni-semaru', 6),
  ('疾走感', 'shissou-kan', 7),
  ('ゆったり', 'yuttari', 8),
  ('踊れる', 'odoreru', 9),
  ('和風', 'wafuu', 10),
  ('切ない', 'setsunai', 11),
  ('クセが強い', 'kuse-ga-tsuyoi', 12),
  ('エモい', 'emoi', 13),
  ('爽やか', 'sawayaka', 14),
  ('力強い', 'chikaradzuyoi', 15);

-- ダミー楽曲データ（動作確認用）
with
  unit_ids as (
    select id, slug from units
  ),
  vibe_ids as (
    select id, slug from vibe_tags
  )
insert into songs (title, unit_id, song_type, attribute, youtube_url) values
  (
    'Spread the Wings!!',
    (select id from unit_ids where slug = 'illumination-stars'),
    'unit',
    null,
    'https://www.youtube.com/watch?v=example1'
  ),
  (
    'ヒカリのdestination',
    (select id from unit_ids where slug = 'illumination-stars'),
    'unit',
    null,
    'https://www.youtube.com/watch?v=example2'
  ),
  (
    'いつか Shiny Days',
    (select id from unit_ids where slug = 'lantica'),
    'unit',
    null,
    null
  ),
  (
    '星をめざして',
    (select id from unit_ids where slug = 'illumination-stars'),
    'solo',
    'stella',
    null
  ),
  (
    '夢咲きAfter school',
    (select id from unit_ids where slug = 'houkago-climax-girls'),
    'unit',
    null,
    'https://www.youtube.com/watch?v=example3'
  ),
  (
    'Hide & Attack',
    (select id from unit_ids where slug = 'straylight'),
    'unit',
    null,
    null
  );

-- ダミー楽曲へのVibeタグ付与
with
  song_ids as (
    select id, title from songs
  ),
  vibe_ids as (
    select id, slug from vibe_tags
  )
insert into song_vibe_tags (song_id, vibe_tag_id) values
  -- Spread the Wings!!
  (
    (select id from song_ids where title = 'Spread the Wings!!'),
    (select id from vibe_ids where slug = 'kirakira')
  ),
  (
    (select id from song_ids where title = 'Spread the Wings!!'),
    (select id from vibe_ids where slug = 'tanoshii')
  ),
  -- ヒカリのdestination
  (
    (select id from song_ids where title = 'ヒカリのdestination'),
    (select id from vibe_ids where slug = 'shissou-kan')
  ),
  (
    (select id from song_ids where title = 'ヒカリのdestination'),
    (select id from vibe_ids where slug = 'chikaradzuyoi')
  ),
  -- 夢咲きAfter school
  (
    (select id from song_ids where title = '夢咲きAfter school'),
    (select id from vibe_ids where slug = 'tanoshii')
  ),
  (
    (select id from song_ids where title = '夢咲きAfter school'),
    (select id from vibe_ids where slug = 'odoreru')
  ),
  -- Hide & Attack
  (
    (select id from song_ids where title = 'Hide & Attack'),
    (select id from vibe_ids where slug = 'kakkoii')
  ),
  (
    (select id from song_ids where title = 'Hide & Attack'),
    (select id from vibe_ids where slug = 'shissou-kan')
  );
