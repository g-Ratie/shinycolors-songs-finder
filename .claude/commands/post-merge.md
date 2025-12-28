---
description: PRマージ後のクリーンアップ（ブランチ削除、git pull）
allowed-tools: Bash
---

PRがマージされた後のクリーンアップを実行してください。

## 手順

1. `git switch main` でmainブランチに切り替える
2. `git pull` で最新の変更を取得する
3. 現在のfeatureブランチをローカルから削除する
   - `git branch -d <branch-name>`
4. リモートブランチが残っている場合は削除する
   - `git push origin --delete <branch-name>`
   - マージ時に自動削除されている場合はスキップ

## 注意事項

- mainブランチで実行された場合は何もしない
- 未マージの変更がある場合は警告を出す
