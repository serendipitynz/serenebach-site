# Serene Bach Site

Landing page and public website for [Serene Bach](https://github.com/serendipitynz/serenebach), a self-hosted weblog engine built with Go, SQLite, static rebuilds, MCP, and AI-assisted writing.

> Japanese: see [README.ja.md](README.ja.md)

## Stack

- [Astro](https://astro.build/) for static site generation
- SCSS for styling
- `pnpm` for package management

## Pages

| Path | Purpose |
|---|---|
| `/` | English landing page |
| `/ja/` | Japanese landing page |
| `/en/` | Compatibility redirect to `/` |

English is the primary language for the public site. Japanese remains a first-class page because Serene Bach has a Japanese SB3 / CGI hosting background.

## Project Structure

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
├── serenebach-logo.svg
└── serenebach-logo-light.svg
```

Most landing-page copy lives in `src/data/content.ts`. The page layout is shared by `src/components/LandingPage.astro`.

## Development

```bash
pnpm install
pnpm dev
```

Astro defaults to <http://localhost:4321/>. If the port is already in use, it will choose another port.

## Build

```bash
pnpm build
```

The static output is written to `dist/`.

## Screenshots

Screenshots are stored under `public/screenshots/` and have light / dark variants:

```text
admin-entry-editor.png
admin-entry-editor-dark.png
admin-ai-settings.png
admin-ai-settings-dark.png
admin-rebuild.png
admin-rebuild-dark.png
```

The site switches screenshot variants automatically with `prefers-color-scheme`. The same rule is used for the lightbox preview.

## Verification

Before finishing changes, run:

```bash
pnpm exec tsc --noEmit --pretty false
pnpm build
```
