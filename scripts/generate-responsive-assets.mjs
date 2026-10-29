import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

const root = process.cwd();
const appDir = join(root, "app");
const artDir = join(root, "public", "art");
const outputDir = join(artDir, "responsive");
const targetWidths = [480, 768, 1024, 1600];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const referenced = new Set();
for (const file of walk(appDir).filter((path) => /\.(tsx|ts|css)$/.test(path))) {
  for (const match of readFileSync(file, "utf8").matchAll(/[A-Za-z0-9_-]+\.webp/g)) referenced.add(match[0]);
}

mkdirSync(outputDir, { recursive: true });
const manifest = {};

for (const fileName of [...referenced].sort()) {
  const input = join(artDir, fileName);
  const [width, height] = execFileSync("identify", ["-format", "%w %h", input], { encoding: "utf8" }).trim().split(" ").map(Number);
  const stem = basename(fileName, extname(fileName));
  const variants = [];
  for (const targetWidth of targetWidths.filter((candidate) => candidate < width)) {
    const outputName = `${stem}-${targetWidth}.webp`;
    execFileSync("convert", [input, "-resize", `${targetWidth}x`, "-quality", "86", "-define", "webp:method=6", join(outputDir, outputName)]);
    variants.push({ src: `/art/responsive/${outputName}`, width: targetWidth });
  }
  variants.push({ src: `/art/${fileName}`, width });
  manifest[`/art/${fileName}`] = { width, height, variants };
}

writeFileSync(join(appDir, "image-manifest.ts"), `export type ImageVariant = { src: string; width: number };\nexport type ImageMetadata = { width: number; height: number; variants: ImageVariant[] };\n\nexport const imageManifest: Record<string, ImageMetadata> = ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`Generated ${Object.keys(manifest).length} responsive image manifests.`);
