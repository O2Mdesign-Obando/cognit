import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const demo2Root = join(root, "demo2");
const builtRoot = join(root, "dist", "learninghub", "demo2");
const routesSource = readFileSync(join(demo2Root, "src", "routes.tsx"), "utf8");
const prerenderRoutes = JSON.parse(readFileSync(join(demo2Root, "prerender-routes.json"), "utf8"));
const routeMatches = [...routesSource.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
const concreteRoutes = routeMatches.filter((route) => route !== "*");

const expectedPrefix = "/learninghub/demo2";
if (!routesSource.includes(`DEMO2_BASENAME = "${expectedPrefix}"`)) {
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
const builtHtmlFiles = builtFiles.filter((path) => path.endsWith("index.html"));
const builtHtmlDocuments = builtHtmlFiles.map((path) => ({ path, html: readFileSync(path, "utf8") }));
const localReferences = builtHtmlDocuments.flatMap(({ html }) => [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)])
  .map((match) => match[1])
  .filter((reference) => reference.startsWith(expectedPrefix));

const missingReferences = localReferences.filter((reference) => {
  const path = reference.split(/[?#]/, 1)[0].replace(`${expectedPrefix}/`, "");
  return !existsSync(join(builtRoot, path));
});

if (missingReferences.length > 0) {
  throw new Error(`Demo2 has missing built references: ${missingReferences.join(", ")}`);
}

const missingRouteDocuments = prerenderRoutes.filter((route) => {
  const output = route === "/" ? join(builtRoot, "index.html") : join(builtRoot, route.slice(1), "index.html");
  return !existsSync(output);
});

if (missingRouteDocuments.length > 0) {
  throw new Error(`Demo2 has missing prerendered routes: ${missingRouteDocuments.join(", ")}`);
}

const emptyRouteDocuments = prerenderRoutes.filter((route) => {
  const output = route === "/" ? join(builtRoot, "index.html") : join(builtRoot, route.slice(1), "index.html");
  return readFileSync(output, "utf8").includes('<div id="root"></div>');
});

if (emptyRouteDocuments.length > 0) {
  throw new Error(`Demo2 has client-only route shells: ${emptyRouteDocuments.join(", ")}`);
}

const representativeRoutes = [
  "/",
  "/center/home",
  "/coach/home",
  "/student/home",
  "/family/home",
  "/hq/home",
  "/coach/class/python-prodigy/live",
  "/coach/class/python-prodigy/review",
];
const semanticFailures = representativeRoutes.filter((route) => {
  const output = route === "/" ? join(builtRoot, "index.html") : join(builtRoot, route.slice(1), "index.html");
  const html = readFileSync(output, "utf8");
  return !/<main(?:\s|>)/.test(html) || !/<h1(?:\s|>)/.test(html);
});

if (semanticFailures.length > 0) {
  throw new Error(`Demo2 representative routes are missing a main landmark or h1: ${semanticFailures.join(", ")}`);
}

if (builtFiles.length < 2 || concreteRoutes.length < 2) {
  throw new Error("Demo2 build or route inventory is unexpectedly empty.");
}

console.log(
  `Validated Demo2 at ${expectedPrefix}: ${concreteRoutes.length} declared routes, `
  + `${prerenderRoutes.length} prerendered routes, ${builtFiles.length} built files, `
  + `${localReferences.length} local references, 0 missing.`,
);
