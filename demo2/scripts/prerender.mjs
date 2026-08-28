import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { prerenderRoutes, render } from "../.prerender/entry-server.js";

const demoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(demoRoot, "../public/learninghub/demo2");
const template = await readFile(join(outputRoot, "index.html"), "utf8");
const emptyRoot = '<div id="root"></div>';

if (!template.includes(emptyRoot)) {
  throw new Error("Demo2 prerender could not locate the empty React root in the built entry.");
}

for (const route of prerenderRoutes) {
  const markup = render(route);
  const document = template.replace(emptyRoot, `<div id="root">${markup}</div>`);
  const outputFile = route === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, route.slice(1), "index.html");

  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, document);
}

await rm(join(demoRoot, ".prerender"), { recursive: true, force: true });
console.log(`Prerendered ${prerenderRoutes.length} directly addressable Demo2 routes.`);
