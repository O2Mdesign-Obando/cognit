import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");

if (!existsSync(dist)) {
  console.error("dist/ is missing. Run npm run build first.");
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = walk(dist).filter((file) => extname(file) === ".html");
const attributePattern = /(?:href|src)=["']([^"']+)["']/g;
const missing = [];
let localReferenceCount = 0;

function targetExists(urlPath) {
  const pathname = decodeURIComponent(urlPath.split(/[?#]/, 1)[0]);
  const localPath = join(dist, pathname.replace(/^\//, ""));
  return existsSync(localPath)
    || existsSync(`${localPath}.html`)
    || existsSync(join(localPath, "index.html"));
}

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(attributePattern)) {
    const reference = match[1];
    if (!reference.startsWith("/") || reference.startsWith("//")) continue;
    localReferenceCount += 1;
    if (!targetExists(reference)) {
      missing.push(`${relative(dist, htmlFile)} -> ${reference}`);
    }
  }
}

if (missing.length > 0) {
  console.error(`Found ${missing.length} missing local references:`);
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages and ${localReferenceCount} local references; 0 missing.`);
