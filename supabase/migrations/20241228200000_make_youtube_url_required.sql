-- 既存のnullデータがある場合はダミーURLを設定
update songs set youtube_url = 'https://www.youtube.com/watch?v=PLACEHOLDER' where youtube_url is null;

-- youtube_urlをnot nullに変更
alter table songs alter column youtube_url set not null;
