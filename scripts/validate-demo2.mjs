import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const demo2Root = join(root, "demo2");
const builtRoot = join(root, "dist", "learninghub", "demo2");
const routesSource = readFileSync(join(demo2Root, "src", "routes.tsx"), "utf8");
const routeMatches = [...routesSource.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
const concreteRoutes = routeMatches.filter((route) => route !== "*");

const expectedPrefix = "/learninghub/demo2";
if (!routesSource.includes(`basename: "${expectedPrefix}"`)) {
  throw new Error(`Demo2 router basename must be ${expectedPrefix}`);
}

if (!existsSync(join(builtRoot, "index.html"))) {
  throw new Error("Demo2 built index is missing from dist/learninghub/demo2.");
}

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const builtFiles = walk(builtRoot);
const builtHtml = readFileSync(join(builtRoot, "index.html"), "utf8");
const localReferences = [...builtHtml.matchAll(/(?:href|src)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((reference) => reference.startsWith(expectedPrefix));

const missingReferences = localReferences.filter((reference) => {
  const path = reference.split(/[?#]/, 1)[0].replace(`${expectedPrefix}/`, "");
  return !existsSync(join(builtRoot, path));
});

if (missingReferences.length > 0) {
  throw new Error(`Demo2 has missing built references: ${missingReferences.join(", ")}`);
}

if (builtFiles.length < 2 || concreteRoutes.length < 2) {
  throw new Error("Demo2 build or route inventory is unexpectedly empty.");
}

console.log(
  `Validated Demo2 at ${expectedPrefix}: ${concreteRoutes.length} declared routes, `
  + `${builtFiles.length} built files, ${localReferences.length} local entry references, 0 missing.`,
);
