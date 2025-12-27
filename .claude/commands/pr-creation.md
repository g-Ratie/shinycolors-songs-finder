---
allowed-tools: Bash, Read, Glob, Grep
---

現在のブランチの変更内容をもとにPull Requestを作成してください。

## 手順

1. 以下のコマンドを並列実行して現在の状態を把握する
   - `git status` で未コミットの変更を確認
   - `git branch --show-current` で現在のブランチ名を確認
   - `git log main..HEAD --oneline` でmainからの差分コミットを確認
   - `git diff main...HEAD --stat` で変更ファイルの概要を確認

2. 未コミットの変更がある場合は、ユーザーに確認してからコミットする

3. リモートブランチが存在しない場合は `git push -u origin <branch>` でプッシュする

4. `gh pr create` でPRを作成する
   - タイトル: コミット内容を要約（日本語）
   - ボディ: 以下の形式で記述
     ```
     ## Summary
     - 変更内容を箇条書きで記載

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```

5. 作成したPRのURLを表示する

## 注意事項

- mainブランチでは実行しない
- 変更がない場合はPRを作成しない
- PRタイトルとボディは日本語で記述する
