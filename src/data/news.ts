import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Locale } from "./content";

export interface NewsItem {
  title: string;
  href: string;
  published: string;
}

const CATEGORY_BY_LOCALE: Record<Locale, string> = {
  ja: "お知らせ",
  en: "Information",
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const atomPath = path.join(repoRoot, "public", "news", "atom.xml");

interface AtomEntry {
  title: string;
  href: string;
  category: string;
  published: string;
}

function decodeXmlEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&");
}

function parseAtom(xml: string): AtomEntry[] {
  const entries: AtomEntry[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() ?? "";
    const href = block.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/)?.[1]?.trim() ?? "";
    const category = block.match(/<category[^>]*term="([^"]+)"/)?.[1]?.trim() ?? "";
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1]?.trim() ?? "";

    if (!title || !href || !category) continue;

    entries.push({
      title: decodeXmlEntities(title),
      href,
      category: decodeXmlEntities(category),
      published,
    });
  }

  return entries;
}

let cachedEntries: AtomEntry[] | null = null;

function loadEntries(): AtomEntry[] {
  if (cachedEntries) return cachedEntries;

  try {
    const xml = readFileSync(atomPath, "utf8");
    cachedEntries = parseAtom(xml);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      cachedEntries = [];
    } else {
      throw error;
    }
  }

  return cachedEntries;
}

export function getLatestNews(lang: Locale, limit = 3): NewsItem[] {
  const targetCategory = CATEGORY_BY_LOCALE[lang];
  return loadEntries()
    .filter((entry) => entry.category === targetCategory)
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, limit)
    .map((entry) => ({
      title: entry.title,
      href: entry.href,
      published: entry.published,
    }));
}

export function formatNewsDate(iso: string, lang: Locale): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const locale = lang === "ja" ? "ja-JP" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: lang === "ja" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
