import { mkdir, readdir, readFile, rm, stat, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deflateRawSync } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "templates");
const publicRoot = path.join(root, "public", "templates");
const generatedRoot = path.join(root, "src", "data", "generated");
const generatedJson = path.join(generatedRoot, "templates.json");

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosDate, dosTime };
}

function writeUInt32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0, 0);
  return buffer;
}

function writeUInt16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value, 0);
  return buffer;
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

async function createZip(sourceDirectory, archiveRootName, outputPath) {
  const files = await listFiles(sourceDirectory);
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const absolutePath of files) {
    const relativePath = path.relative(sourceDirectory, absolutePath).split(path.sep).join("/");
    const archivePath = `${archiveRootName}/${relativePath}`;
    const nameBuffer = Buffer.from(archivePath, "utf8");
    const content = await readFile(absolutePath);
    const deflated = deflateRawSync(content, { level: 9 });
    const method = deflated.length < content.length ? 8 : 0;
    const payload = method === 8 ? deflated : content;
    const fileStat = await stat(absolutePath);
    const { dosDate, dosTime } = dosDateTime(fileStat.mtime);
    const checksum = crc32(content);

    const localHeader = Buffer.concat([
      writeUInt32(0x04034b50),
      writeUInt16(20),
      writeUInt16(0x0800),
      writeUInt16(method),
      writeUInt16(dosTime),
      writeUInt16(dosDate),
      writeUInt32(checksum),
      writeUInt32(payload.length),
      writeUInt32(content.length),
      writeUInt16(nameBuffer.length),
      writeUInt16(0),
      nameBuffer,
    ]);

    localParts.push(localHeader, payload);

    centralParts.push(
      Buffer.concat([
        writeUInt32(0x02014b50),
        writeUInt16(20),
        writeUInt16(20),
        writeUInt16(0x0800),
        writeUInt16(method),
        writeUInt16(dosTime),
        writeUInt16(dosDate),
        writeUInt32(checksum),
        writeUInt32(payload.length),
        writeUInt32(content.length),
        writeUInt16(nameBuffer.length),
        writeUInt16(0),
        writeUInt16(0),
        writeUInt16(0),
        writeUInt16(0),
        writeUInt32(0),
        writeUInt32(offset),
        nameBuffer,
      ]),
    );

    offset += localHeader.length + payload.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.concat([
    writeUInt32(0x06054b50),
    writeUInt16(0),
    writeUInt16(0),
    writeUInt16(files.length),
    writeUInt16(files.length),
    writeUInt32(centralDirectory.length),
    writeUInt32(offset),
    writeUInt16(0),
  ]);

  await writeFile(outputPath, Buffer.concat([...localParts, centralDirectory, endRecord]));
}

function sanitizeFilePart(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readField(text, fieldName) {
  const match = text.match(new RegExp(`^${fieldName}:\\s*(.+?)\\s*$`, "im"));
  return match?.[1]?.trim() ?? "";
}

function excerptFromMarkdown(markdown) {
  const prose = markdown
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");
  const paragraphs = prose
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((paragraph) => !paragraph.startsWith("- "));

  const description = paragraphs[0] ?? "";
  return description.length > 220 ? `${description.slice(0, 217)}...` : description;
}

function extractDescriptions(text) {
  const body = text.split(/^=====\s*$/m)[1]?.split(/^===\s*$/m)[0] ?? "";
  const [english = "", japanese = ""] = body.split(/^---\s*$/m);

  return {
    en: excerptFromMarkdown(english),
    ja: excerptFromMarkdown(japanese) || excerptFromMarkdown(english),
  };
}

function extractMarkdownBodies(text) {
  const body = text.split(/^=====\s*$/m)[1]?.split(/^===\s*$/m)[0] ?? "";
  const [english = "", japanese = ""] = body.split(/^---\s*$/m);

  return {
    en: english.trim(),
    ja: (japanese || english).trim(),
  };
}

function extractCopyright(text) {
  const licenseText = text.split(/^===\s*$/m)[1] ?? "";
  return licenseText.match(/^Copyright \(c\).+$/m)?.[0]?.trim() ?? "";
}

function insertUsageSection(markdown, slug, language) {
  const usage =
    language === "ja"
      ? `# **使用方法**\n${slug}.txt を「デザイン設定→インポート」より読み込んでください。`
      : `# **How to Use**\nPlease import ${slug}.txt via "Design → Import."`;
  const lines = markdown.trim().split(/\r?\n/);
  const firstHeadingIndex = lines.findIndex((line) => line.trim().startsWith("#"));

  if (firstHeadingIndex <= 0) {
    return [usage, markdown.trim()].filter(Boolean).join("\n\n");
  }

  return [
    lines.slice(0, firstHeadingIndex).join("\n").trim(),
    usage,
    lines.slice(firstHeadingIndex).join("\n").trim(),
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildReadme({ name, author, slug, source, language }) {
  const bodies = extractMarkdownBodies(source);
  const copyright = extractCopyright(source);
  const body = insertUsageSection(bodies[language], slug, language);
  const footer = copyright ? `\n\n${copyright}` : "";

  return [
    `title: ${name} - a template for Serene Bach - weblog management system`,
    `author: ${author}`,
    "---",
    "",
    `${body}${footer}`,
  ].join("\n").trimEnd() + "\n";
}

async function buildTemplates() {
  await rm(publicRoot, { recursive: true, force: true });
  await mkdir(publicRoot, { recursive: true });
  await mkdir(generatedRoot, { recursive: true });

  let directories = [];
  try {
    directories = await readdir(sourceRoot, { withFileTypes: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const templates = [];

  for (const entry of directories.filter((item) => item.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
    const slug = entry.name;
    const directory = path.join(sourceRoot, slug);
    const txtPath = path.join(directory, `${slug}.txt`);
    const jpgPath = path.join(directory, `${slug}.jpg`);
    const source = await readFile(txtPath, "utf8");
    const name = readField(source, "Name");
    const author = readField(source, "Author");
    const siteUrl = readField(source, "Address");
    const version = readField(source, "Version");

    if (!name || !author || !version) {
      throw new Error(`${path.relative(root, txtPath)} must include Name, Author, and Version fields.`);
    }

    await stat(jpgPath);
    await writeFile(
      path.join(directory, "readme.md"),
      buildReadme({ name, author, slug, source, language: "en" }),
    );
    await writeFile(
      path.join(directory, "readme.ja.md"),
      buildReadme({ name, author, slug, source, language: "ja" }),
    );

    const safeName = sanitizeFilePart(slug);
    const safeVersion = sanitizeFilePart(version);
    const zipName = `${safeName}_${safeVersion}.zip`;
    const destinationDirectory = path.join(publicRoot, slug);
    const destinationImage = path.join(destinationDirectory, `${slug}.jpg`);
    const destinationZip = path.join(destinationDirectory, zipName);

    await mkdir(destinationDirectory, { recursive: true });
    await copyFile(jpgPath, destinationImage);
    await createZip(directory, slug, destinationZip);

    templates.push({
      slug,
      name,
      author,
      siteUrl,
      version,
      descriptions: extractDescriptions(source),
      thumbnail: `/templates/${slug}/${slug}.jpg`,
      download: `/templates/${slug}/${zipName}`,
      downloadName: zipName,
    });
  }

  await writeFile(generatedJson, `${JSON.stringify(templates, null, 2)}\n`);
  console.log(`Generated ${templates.length} template package${templates.length === 1 ? "" : "s"}.`);
}

await buildTemplates();
