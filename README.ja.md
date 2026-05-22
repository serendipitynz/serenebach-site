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
| `/templates/` | 英語版テンプレートギャラリー |
| `/ja/templates/` | 日本語版テンプレートギャラリー |
| `/news/` | Serene Bach 本体が生成するニュースページ（後述の [News](#news) を参照） |

公開サイトでは英語を primary にしています。一方で Serene Bach は日本語圏の SB3 / CGI ホスティング文脈も強いため、日本語ページも同等に維持します。

ランディングページのニュースセクションは、ビルド時に `src/data/news.ts` から `public/news/atom.xml` を読み、最新 3 件を取り出して表示します。

## ディレクトリ構成

```text
src/
├── components/
│   ├── LandingPage.astro
│   └── TemplateGalleryPage.astro
├── data/
│   ├── content.ts            # ランディングページ本文 (en / ja)
│   ├── news.ts               # ニュースセクション用の Atom フィードパーサ
│   └── generated/
│       └── templates.json    # scripts/build-templates.mjs が生成
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro           # /
│   ├── ja.astro              # /ja/
│   ├── en.astro              # /en/ → / へリダイレクト
│   ├── templates/index.astro # /templates/
│   └── ja/templates/index.astro
└── styles/global.scss

templates/                    # テンプレートパッケージのソース（ビルドスクリプトの入力）
├── order.json                # ギャラリー上の並び順をピン留め
├── default/
├── default-forest/
├── default-ocean/
├── default-pastel/
├── default-sunset/
└── monochrome/

scripts/
├── build-templates.mjs       # public/templates/ と src/data/generated/templates.json を生成
└── update-news.sh            # `serenebach` CLI で public/news/ を再構築

content/                      # ニュース記事の Markdown ソース（update-news.sh が取り込む）
config/                       # Serene Bach 用のニューステンプレートとカテゴリ設定

public/
├── news/                     # 生成物。atom.xml / rss.xml / 個別エントリ / カテゴリ
├── templates/                # 生成物。テンプレートのサムネイルと配布用 ZIP
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

`predev` で `scripts/build-templates.mjs` が走るため、開発サーバ起動時には常に最新の ZIP とメタデータでテンプレートギャラリーが表示されます。

## ビルド

```bash
pnpm build
```

`prebuild` で `scripts/build-templates.mjs` が実行されます。静的出力は `dist/` に生成されます。

## テンプレート

テンプレートパッケージは `templates/<slug>/` に置きます。以下のファイルが必須です。

- `<slug>.txt`: `Name:` / `Author:` / `Version:`（および任意の `Address:`）を含むメタファイル
- `<slug>.jpg`: ライトモード用サムネイル
- 任意で `<slug>-dark.jpg`: ダークモード用サムネイル

`templates/order.json` はギャラリー先頭に並べたい slug の配列です。ここに記載のない slug は名前順で続きます。記載されているが存在しない slug はビルド時に警告が出ます。

`scripts/build-templates.mjs` の動作:

- 各テンプレートディレクトリを読み、`public/templates/<slug>/<slug>_<version>.zip` を出力
- JPG サムネイルを `public/templates/<slug>/` にコピー
- 各ソースディレクトリに英語 / 日本語の `readme.md` を生成（gitignore 対象）
- ギャラリー用メタデータを `src/data/generated/templates.json` に書き出し

`public/templates/` 配下とテンプレート内の `readme*.md` は gitignore 済みで、ビルドのたびに再生成されます。

## News

`/news/` 以下のニュースは Astro ではなく Serene Bach 本体が生成します。

- Markdown ソースは `content/` 配下（リリースごとに英語版・日本語版を 1 ファイルずつ用意）
- `config/` には Serene Bach News 用のテンプレート（`top.txt`、`category_en.txt`、`category_ja.txt`）とカテゴリ → テンプレートのマッピングを置いています。詳細は [config/README.md](config/README.md) を参照
- `scripts/update-news.sh` は `serenebach` CLI を呼び出し、`content/` の Markdown を取り込んで `public/news/` に静的 HTML / `atom.xml` / `rss.xml` を再構築します
- `scripts/update-news.sh publish` のように `publish` を渡すと、再生成された `content/` と `public/news/` をコミットして push もします

スクリプトは `PATH` 上に `serenebach` バイナリがあること、および `_sandbox/data/`（gitignore 対象）にローカルのデータがあることを前提とします。

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

ランディングページのツアー動画用に `admin-tour.mp4` と `admin-tour-poster.jpg` も同じディレクトリに置いています。

サイト表示と lightbox の拡大表示、およびテンプレートギャラリーのサムネイルは、いずれも `prefers-color-scheme` に応じて自動で light / dark を切り替えます。

## Open Graph

SNS 共有用の画像は `public/sb_opengraph.png` です。サイズは `1200 x 630` です。

`BaseLayout.astro` で Open Graph / Twitter Card のメタタグを出力します。本番 URL は `astro.config.mjs` で `https://go.serenebach.net` に設定しているため、`og:image` は絶対 URL として出力されます。

## 確認

変更後は以下を実行してください。

```bash
pnpm build
```

`astro build` は `.astro` ファイルの型チェックを含めて実行されます。TypeScript 単体はこのプロジェクトの dev 依存には入っていません。スタンドアロンの厳密な型チェックを行いたい場合は `@astrojs/check` をインストールしたうえで `pnpm exec astro check` を実行してください。
