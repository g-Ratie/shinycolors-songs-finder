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
insert into members (name, sort_order) values
  ('櫻木真乃', 1),
  ('風野灯織', 2),
  ('八宮めぐる', 3),
  ('月岡恋鐘', 4),
  ('田中摩美々', 5),
  ('白瀬咲耶', 6),
  ('三峰結華', 7),
  ('幽谷霧子', 8),
  ('小宮果穂', 9),
  ('園田智代子', 10),
  ('西城樹里', 11),
  ('杜野凛世', 12),
  ('有栖川夏葉', 13),
  ('大崎甘奈', 14),
  ('大崎甜花', 15),
  ('桑山千雪', 16),
  ('芹沢あさひ', 17),
  ('黛冬優子', 18),
  ('和泉愛依', 19),
  ('浅倉透', 20),
  ('樋口円香', 21),
  ('福丸小糸', 22),
  ('市川雛菜', 23),
  ('七草にちか', 24),
  ('緋田美琴', 25),
  ('斑鳩ルカ', 26),
  ('鈴木羽那', 27),
  ('郁田はるき', 28);

-- メンバーとユニットの関連付け
-- illumination STARS
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '櫻木真乃' and u.slug = 'illumination-stars';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '風野灯織' and u.slug = 'illumination-stars';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '八宮めぐる' and u.slug = 'illumination-stars';

-- L'Antica
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '月岡恋鐘' and u.slug = 'lantica';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '田中摩美々' and u.slug = 'lantica';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '白瀬咲耶' and u.slug = 'lantica';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '三峰結華' and u.slug = 'lantica';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '幽谷霧子' and u.slug = 'lantica';

-- 放課後クライマックスガールズ
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '小宮果穂' and u.slug = 'houkago-climax-girls';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '園田智代子' and u.slug = 'houkago-climax-girls';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '西城樹里' and u.slug = 'houkago-climax-girls';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '杜野凛世' and u.slug = 'houkago-climax-girls';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '有栖川夏葉' and u.slug = 'houkago-climax-girls';

-- ALSTROEMERIA
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '大崎甘奈' and u.slug = 'alstroemeria';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '大崎甜花' and u.slug = 'alstroemeria';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '桑山千雪' and u.slug = 'alstroemeria';

-- Straylight
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '芹沢あさひ' and u.slug = 'straylight';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '黛冬優子' and u.slug = 'straylight';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '和泉愛依' and u.slug = 'straylight';

-- noctchill
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '浅倉透' and u.slug = 'noctchill';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '樋口円香' and u.slug = 'noctchill';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '福丸小糸' and u.slug = 'noctchill';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '市川雛菜' and u.slug = 'noctchill';

-- SHHis
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '七草にちか' and u.slug = 'shhis';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '緋田美琴' and u.slug = 'shhis';

-- CoMETIK
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '斑鳩ルカ' and u.slug = 'cometik';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '鈴木羽那' and u.slug = 'cometik';
insert into member_units (member_id, unit_id, is_primary)
select m.id, u.id, true from members m, units u
where m.name = '郁田はるき' and u.slug = 'cometik';

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
