# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

シャイニーカラーズの楽曲検索アプリケーション。Next.js 16（App Router）、React 19、Tailwind CSS 4を使用。

## コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # プロダクションビルド
npm run lint     # ESLint実行
npm run start    # プロダクションサーバー起動
```

## 技術スタック

- Next.js 16.1.1（App Router）
- React 19.2.3
- Tailwind CSS 4
- TypeScript 5（strict mode）
- ESLint 9（eslint-config-next）

## アーキテクチャ

- `app/` - Next.js App Routerのページとレイアウト
- `@/*` - プロジェクトルートからのパスエイリアス

## コーディング規約

- コミットはgit-cz形式（prefix以外は日本語、絵文字なし）
- 極めて高頻度のコミットを行う
- 不要なコメントは避け、Whyを示す場合のみコメントを使用
- 既存コードの形式に従う
