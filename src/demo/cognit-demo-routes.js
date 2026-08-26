export const CENTER_CONTEXT_KEYS = Object.freeze(["northfield", "harbor"]);
export const CENTER_SECTION_KEYS = Object.freeze([
  "overview", "classes", "communication", "coaches", "students", "scheduling", "courses", "billing", "reports", "whats-new",
  "attendance", "families", "settings", "configuration", "module-control", "support", "migration",
  // Backwards-compatible demo URLs retained from the first Cognit shell.
  "schedule", "messages"
]);

export function centerContextSectionHref(context, section = "overview") {
  if (!CENTER_CONTEXT_KEYS.includes(context)) throw new Error(`Unknown Center demo context: ${context}`);
  if (!CENTER_SECTION_KEYS.includes(section)) throw new Error(`Unknown Center demo section: ${section}`);
  const suffix = section === "overview" ? "" : `/${section}`;
  return `/learninghub/demo/center/context/${context}${suffix}`;
}

export function parseCenterDemoView(view) {
  const parts = String(view || "").split("/").filter(Boolean);
  if (parts[0] === "context") {
    const context = CENTER_CONTEXT_KEYS.includes(parts[1]) ? parts[1] : "northfield";
    const section = CENTER_SECTION_KEYS.includes(parts[2]) ? parts[2] : "overview";
    return { context, section, item: parts.slice(3).join("/"), explicitContext: true };
  }
  const section = CENTER_SECTION_KEYS.includes(parts[0]) ? parts[0] : "overview";
  return { context: "northfield", section, item: parts.slice(1).join("/"), explicitContext: false };
}
