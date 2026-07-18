---
name: release-note
description: >-
  Serene Bach のリリースノートを content/ 配下に英日 2 ファイル生成し、内容を提示・承認確認したあとで
  scripts/update-news.sh publish を実行してサイト反映（build + git commit + push）まで行う。
  「v4.0.0-beta.xx をリリースしました」「content にある md ファイルを参考にして content/v400b0xx-en.md /
  content/v400b0xx-ja.md を生成してほしい」といったリリースノート作成・ニュース更新の依頼で使う。
---

# Serene Bach リリースノート生成 + サイト反映

Serene Bach の GitHub リリースを元に、このサイトのニュース記事（英日 2 本）を
`content/` に生成し、**内容を確認してもらってから** サイトへ反映する定型作業。

## 入力

リリースのタグまたは URL。いずれの形でも beta 番号を取り出せればよい。

- `https://github.com/serendipitynz/serenebach/releases/tag/v4.0.0-beta.20`
- `v4.0.0-beta.20`

## 手順

### 1. バージョンとファイル名を確定する

- 入力から beta 番号 `N` を取り出す（例: `v4.0.0-beta.20` → `N = 20`）。
- ファイル名は既存の連番規則に合わせる: `content/v400b0` + `N` を **2 桁ゼロ埋め** + `-{en,ja}.md`。
  - 例: beta.20 → `content/v400b020-en.md`, `content/v400b020-ja.md`
  - 例: beta.7 → `content/v400b007-en.md`, `content/v400b007-ja.md`
  - 注: 既存は beta.1〜99 を想定した `v400b0NN` 形式。N が 100 以上になったら
    既存ファイルの実際の並びを確認して命名を合わせること。

### 2. リリースノートを取得する

対象リポジトリは **プロダクト側の `serendipitynz/serenebach`**（このサイトのリポジトリではない）。

```sh
gh release view v4.0.0-beta.N --repo serendipitynz/serenebach
```

- `## What's Changed` の各行が変更点。各行は「変更内容 by @author in <PR URL>」の形。
- 公開日は `--json publishedAt -q .publishedAt` で取得できる（`posted_at` に使う）。

```sh
gh release view v4.0.0-beta.N --repo serendipitynz/serenebach --json publishedAt -q .publishedAt
```

### 3. 既存 md を参照してトーン・粒度を合わせる

直近の `content/v400b0*-{en,ja}.md` を 1〜2 組読み、文体・箇条書きの粒度・
frontmatter の形をそろえる。

### 4. 2 ファイルを生成する

#### frontmatter（固定）

| 項目 | ja | en |
|---|---|---|
| `title` | `"Serene Bach v4.0.0-beta.N リリース"` | `"Release Serene Bach v4.0.0-beta.N"` |
| `status` | `published` | `published` |
| `posted_at` | リリース公開日(JST)の 0 時 | ja と同じ |
| `category` | `ja` | `en` |

- `posted_at` はリリース公開日を JST に変換した「日付の 0 時」。形式は `2026-06-29T00:00:00+09:00`。
  公開日が取れないときは当日の日付でよい。

#### 本文構造

1. 導入 1 行
   - ja: `Serene Bach v4.0.0-beta.N をリリースしています。`
   - en: `Serene Bach v4.0.0-beta.N has been released.`
2. 空行を挟んで箇条書き（**ja は `- `、en は `* `**）
   - 変更点 1 件 → 分類接頭辞付きの 1 行に要約する。
   - **PR 番号・issue 番号・`by @author`・`Full Changelog` は落とす。** ユーザー向けの
     平易な説明文に書き直す（PR タイトルの直訳ではなく、何が良くなったかを書く）。
   - 変更点の並び順はリリースノートに合わせる。英日は必ず同じ内容・同じ並びの対訳にする。
3. 空行を挟んでダウンロードリンク
   - ja: `ダウンロード: [Serene Bach v4.0.0-beta.N](<リリース URL>)`
   - en: `Download: [Serene Bach v4.0.0-beta.N](<リリース URL>)`

#### 分類接頭辞（英日を必ず対応させる）

既存で使われている接頭辞。最も近いものを選び、英日ペアをそろえる。

| ja | en |
|---|---|
| 機能追加 | Feature |
| 改善 | Improvement |
| 不具合修正 | Fix |
| リファクタリング | Refactor |
| パフォーマンス | Performance |
| セキュリティ | Security |
| ドキュメント | Docs |
| 開発 | Development |
| 配布 | Distribution |
| その他 | Other |

（過去には `Documentation` / `性能改善` 等の揺れもあるが、新規では上記の標準形にそろえる。）

#### 出力例（beta.20）

`content/v400b020-ja.md`:

```markdown
---
title: "Serene Bach v4.0.0-beta.20 リリース"
status: published
posted_at: 2026-06-29T00:00:00+09:00
category: ja
---

Serene Bach v4.0.0-beta.20 をリリースしています。

- 機能追加: エディタからテンプレートアセットをモーダルウィンドウでプレビューできるようにしました
- 改善: 画像アップロード処理の複雑度を下げ、CI に gocyclo の lint チェックを追加しました
- ドキュメント: テンプレートインポートの場所が分かりやすくなるよう、管理画面のナビゲーションと関連ドキュメントを更新しました

ダウンロード: [Serene Bach v4.0.0-beta.20](https://github.com/serendipitynz/serenebach/releases/tag/v4.0.0-beta.20)
```

`content/v400b020-en.md`:

```markdown
---
title: "Release Serene Bach v4.0.0-beta.20"
status: published
posted_at: 2026-06-29T00:00:00+09:00
category: en
---

Serene Bach v4.0.0-beta.20 has been released.

* Feature: Added the ability to preview template assets in a modal window from the editor.
* Improvement: Reduced the complexity of the image-upload code and added a gocyclo lint check to CI.
* Docs: Updated the admin navigation and related documentation to clarify where template imports live.

Download: [Serene Bach v4.0.0-beta.20](https://github.com/serendipitynz/serenebach/releases/tag/v4.0.0-beta.20)
```

### 5. ⚠️ 確認チェックポイント（承認まで停止する）

**2 ファイルを書き出したら、必ずここで止まる。**

- 生成した ja / en 両方の内容をユーザーに提示する。
- ユーザーの **明示的な承認（「OK」「反映して」等）を待つ。**
- **承認が出るまで `scripts/update-news.sh` は絶対に実行しない。**
- 修正指示が来たら該当ファイルを直し、再度提示して承認を待つ。

### 6. サイト反映（承認後のみ）

承認を得たら以下を実行する。build に加えて `git add` → `commit` → `push` まで行われる。

```sh
scripts/update-news.sh publish
```

- コミットメッセージ `feat(news): update news YYYY-MM-DD` はスクリプトが自動生成する。
- 実行後、push まで完了したことを報告する。

## 注意点

- `serenebach` コマンドが PATH にないと `update-news.sh` は失敗する。エラー時はその旨を伝える。
- リリースノート取得は `serendipitynz/serenebach`、生成物のコミット先はこのサイトリポジトリ。混同しない。
- push は取り消しにくい外向きの操作。手順 5 の承認は push まで含めた承認として扱う。
