# Serene Bach Site

[Serene Bach](https://github.com/serendipitynz/serenebach) のランディングページ / 公式サイトです。Serene Bach は Go、SQLite、静的再構築、MCP、AI 執筆補助に対応したセルフホスト型ブログエンジンです。

> English: see [README.md](README.md)

## 技術スタック

- 静的サイト生成: [Astro](https://astro.build/)
- スタイリング: SCSS
- パッケージ管理: `pnpm`

## ページ

| Path | 用途 |
|---|---|
| `/` | 英語ランディングページ |
| `/ja/` | 日本語ランディングページ |
| `/en/` | 互換用。`/` へリダイレクト |

公開サイトでは英語を primary にしています。一方で Serene Bach は日本語圏の SB3 / CGI ホスティング文脈も強いため、日本語ページも同等に維持します。

## ディレクトリ構成

```text
src/
├── components/LandingPage.astro
├── data/content.ts
├── layouts/BaseLayout.astro
├── pages/index.astro
├── pages/ja.astro
├── pages/en.astro
└── styles/global.scss

public/
├── screenshots/
├── sb_opengraph.png
├── serenebach-logo.svg
└── serenebach-logo-light.svg
```

ランディングページの主な文言は `src/data/content.ts` にあります。ページの共通レイアウトは `src/components/LandingPage.astro` です。

## 開発

```bash
pnpm install
pnpm dev
```

Astro の既定ポートは <http://localhost:4321/> です。すでに使用中の場合は別ポートが自動で選ばれます。

## ビルド

```bash
pnpm build
```

静的出力は `dist/` に生成されます。

## スクリーンショット

スクリーンショットは `public/screenshots/` に置き、light / dark の両方を用意します。

```text
admin-entry-editor.png
admin-entry-editor-dark.png
admin-ai-settings.png
admin-ai-settings-dark.png
admin-rebuild.png
admin-rebuild-dark.png
```

サイト表示と lightbox の拡大表示は、どちらも `prefers-color-scheme` に応じて自動で light / dark を切り替えます。

## Open Graph

SNS 共有用の画像は `public/sb_opengraph.png` です。サイズは `1200 x 630` です。

`BaseLayout.astro` で Open Graph / Twitter Card のメタタグを出力します。本番 URL は `astro.config.mjs` で `https://go.serenebach.net` に設定しているため、`og:image` は絶対 URL として出力されます。

## 確認

変更後は以下を実行してください。

```bash
pnpm exec tsc --noEmit --pretty false
pnpm build
```
