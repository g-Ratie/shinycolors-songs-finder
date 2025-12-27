---
allowed-tools: Bash, Read, Glob, Grep
---

現在のブランチの変更に対してセルフレビューを実施してください。

## 手順

1. 以下のコマンドを並列実行して変更内容を把握する
   - `git diff main...HEAD` で差分を確認
   - `git log main..HEAD --oneline` でコミット履歴を確認

2. 変更されたファイルを読み、レビューを実施する

3. 以下のフォーマットでレビュー結果を出力する

## 出力フォーマット

```
# Summary
- **Overall:** 🟢 Good / 🟡 Warning / 🔴 Critical
- **Why:** 結論の理由（3点以内）
- **Top Actions:** 最優先の対応タスク（最大5件）

# Findings

カテゴリごとに指摘を列挙する。各指摘は以下の形式で記述：

- **[Severity] タイトル**
  - **Where:** ファイルパス（関数名/行）
  - **What:** 何が問題か
  - **Why:** なぜ問題か
  - **Fix:** 具体的な修正案

Severity:
- 🟢 Good: 良い点、維持したい点
- 🟡 Warning: 改善推奨（将来の不具合・保守性低下の芽）
- 🔴 Critical: 修正必須（バグ/セキュリティ/重大な設計欠陥）

# カテゴリ一覧

- **Design:** API/インターフェース、複雑さ、命名・責務の一貫性
- **Security:** 認証認可、機密情報、インジェクションリスク、依存関係
- **Performance:** レイテンシ、N+1、キャッシュ、エラーハンドリング
- **Cleanup:** スコープ外だが気になる負債（Warningのみ）
```

## 評価ルール

- 🔴 Criticalが1つでもある → Overall: 🔴 Critical
- 🔴がなく、🟡 Warningが複数または重要度が高い → Overall: 🟡 Warning
- 主要リスクが潰れている → Overall: 🟢 Good

## 注意事項

- 断定は根拠とセットで記述
- 推測は推測と明記
- 指摘は「理由」と「修正案」をセットで出す
- 余計な称賛は不要、簡潔に
