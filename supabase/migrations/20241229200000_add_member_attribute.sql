-- membersテーブルにattribute（属性）カラムを追加
alter table members add column attribute attribute_type;

-- 既存メンバーの属性を設定
update members set attribute = 'stella' where name in (
  '櫻木真乃', '月岡恋鐘', '小宮果穂', '園田智代子',
  '大崎甘奈', '芹沢あさひ', '樋口円香', '緋田美琴', '鈴木羽那'
);

update members set attribute = 'luna' where name in (
  '風野灯織', '田中摩美々', '三峰結華', '幽谷霧子',
  '杜野凛世', '大崎甜花', '和泉愛依', '福丸小糸', '斑鳩ルカ'
);

update members set attribute = 'sol' where name in (
  '八宮めぐる', '白瀬咲耶', '西城樹里', '有栖川夏葉',
  '桑山千雪', '黛冬優子', '浅倉透', '市川雛菜', '七草にちか', '郁田はるき'
);

-- NOT NULL制約を追加
alter table members alter column attribute set not null;

comment on column members.attribute is 'アイドルの属性（Stella/Luna/Sol）';

-- songsテーブルのattribute制約を削除（メンバーの属性を使うため）
alter table songs drop constraint songs_attribute_solo_only;

-- songsのattributeカラムを削除
alter table songs drop column attribute;
