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

-- メンバー（アイドル）マスタデータ
-- illumination STARS
insert into members (name, unit_id, sort_order)
select '櫻木真乃', id, 1 from units where slug = 'illumination-stars';
insert into members (name, unit_id, sort_order)
select '風野灯織', id, 2 from units where slug = 'illumination-stars';
insert into members (name, unit_id, sort_order)
select '八宮めぐる', id, 3 from units where slug = 'illumination-stars';

-- L'Antica
insert into members (name, unit_id, sort_order)
select '月岡恋鐘', id, 1 from units where slug = 'lantica';
insert into members (name, unit_id, sort_order)
select '田中摩美々', id, 2 from units where slug = 'lantica';
insert into members (name, unit_id, sort_order)
select '白瀬咲耶', id, 3 from units where slug = 'lantica';
insert into members (name, unit_id, sort_order)
select '三峰結華', id, 4 from units where slug = 'lantica';
insert into members (name, unit_id, sort_order)
select '幽谷霧子', id, 5 from units where slug = 'lantica';

-- 放課後クライマックスガールズ
insert into members (name, unit_id, sort_order)
select '小宮果穂', id, 1 from units where slug = 'houkago-climax-girls';
insert into members (name, unit_id, sort_order)
select '園田智代子', id, 2 from units where slug = 'houkago-climax-girls';
insert into members (name, unit_id, sort_order)
select '西城樹里', id, 3 from units where slug = 'houkago-climax-girls';
insert into members (name, unit_id, sort_order)
select '杜野凛世', id, 4 from units where slug = 'houkago-climax-girls';
insert into members (name, unit_id, sort_order)
select '有栖川夏葉', id, 5 from units where slug = 'houkago-climax-girls';

-- ALSTROEMERIA
insert into members (name, unit_id, sort_order)
select '大崎甘奈', id, 1 from units where slug = 'alstroemeria';
insert into members (name, unit_id, sort_order)
select '大崎甜花', id, 2 from units where slug = 'alstroemeria';
insert into members (name, unit_id, sort_order)
select '桑山千雪', id, 3 from units where slug = 'alstroemeria';

-- Straylight
insert into members (name, unit_id, sort_order)
select '芹沢あさひ', id, 1 from units where slug = 'straylight';
insert into members (name, unit_id, sort_order)
select '黛冬優子', id, 2 from units where slug = 'straylight';
insert into members (name, unit_id, sort_order)
select '和泉愛依', id, 3 from units where slug = 'straylight';

-- noctchill
insert into members (name, unit_id, sort_order)
select '浅倉透', id, 1 from units where slug = 'noctchill';
insert into members (name, unit_id, sort_order)
select '樋口円香', id, 2 from units where slug = 'noctchill';
insert into members (name, unit_id, sort_order)
select '福丸小糸', id, 3 from units where slug = 'noctchill';
insert into members (name, unit_id, sort_order)
select '市川雛菜', id, 4 from units where slug = 'noctchill';

-- SHHis
insert into members (name, unit_id, sort_order)
select '七草にちか', id, 1 from units where slug = 'shhis';
insert into members (name, unit_id, sort_order)
select '緋田美琴', id, 2 from units where slug = 'shhis';

-- CoMETIK
insert into members (name, unit_id, sort_order)
select '斑鳩ルカ', id, 1 from units where slug = 'cometik';
insert into members (name, unit_id, sort_order)
select '鈴木羽那', id, 2 from units where slug = 'cometik';
insert into members (name, unit_id, sort_order)
select '郁田はるき', id, 3 from units where slug = 'cometik';

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
-- ユニット曲
insert into songs (title, unit_id, song_type, youtube_url)
select 'Spread the Wings!!', id, 'unit', 'https://youtu.be/IllFL-bksH8?si=H-VUEdJFO--qIHUD'
from units where slug = 'illumination-stars';

insert into songs (title, unit_id, song_type, youtube_url)
select 'ヒカリのdestination', id, 'unit', 'https://youtu.be/wjQGpudph_8?si=BxW3-fCe0i460Zwv'
from units where slug = 'illumination-stars';

insert into songs (title, unit_id, song_type, youtube_url)
select 'いつか Shiny Days', id, 'unit', 'https://www.youtube.com/watch?v=lantica1'
from units where slug = 'lantica';

insert into songs (title, unit_id, song_type, youtube_url)
select '夢咲きAfter school', id, 'unit', 'https://www.youtube.com/watch?v=example3'
from units where slug = 'houkago-climax-girls';

insert into songs (title, unit_id, song_type, youtube_url)
select 'Hide & Attack', id, 'unit', 'https://www.youtube.com/watch?v=straylight1'
from units where slug = 'straylight';

insert into songs (title, unit_id, song_type, youtube_url)
select 'Colorful Days〜僕らの朝〜', id, 'unit', 'https://www.youtube.com/watch?v=noctchill1'
from units where slug = 'noctchill';

-- ソロ曲
insert into songs (title, unit_id, member_id, song_type, attribute, youtube_url)
select '星をめざして', u.id, m.id, 'solo', 'stella', 'https://www.youtube.com/watch?v=mano1'
from units u, members m
where u.slug = 'illumination-stars' and m.name = '櫻木真乃';

insert into songs (title, unit_id, member_id, song_type, attribute, youtube_url)
select 'ありったけの輝きで', u.id, m.id, 'solo', 'luna', 'https://www.youtube.com/watch?v=hiori1'
from units u, members m
where u.slug = 'illumination-stars' and m.name = '風野灯織';

insert into songs (title, unit_id, member_id, song_type, attribute, youtube_url)
select 'ビーチブレイバー', u.id, m.id, 'solo', 'sol', 'https://www.youtube.com/watch?v=asahi1'
from units u, members m
where u.slug = 'straylight' and m.name = '芹沢あさひ';

-- ダミー楽曲へのVibeタグ付与
insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = 'Spread the Wings!!' and v.slug in ('kirakira', 'tanoshii');

insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = 'ヒカリのdestination' and v.slug in ('shissou-kan', 'chikaradzuyoi');

insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = '夢咲きAfter school' and v.slug in ('tanoshii', 'odoreru');

insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = 'Hide & Attack' and v.slug in ('kakkoii', 'shissou-kan');

insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = 'Colorful Days〜僕らの朝〜' and v.slug in ('sawayaka', 'yuttari');

insert into song_vibe_tags (song_id, vibe_tag_id)
select s.id, v.id
from songs s, vibe_tags v
where s.title = '星をめざして' and v.slug in ('kirakira', 'atatakai');
