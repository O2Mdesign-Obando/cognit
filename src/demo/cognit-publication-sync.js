export const CENTER_STATE_KEY = "cognit:center-demo-state:v1";

export function readCenterPublication() {
  try {
    return Boolean(JSON.parse(localStorage.getItem(CENTER_STATE_KEY) || "{}").eliPublished);
  } catch {
    return false;
  }
}

export function applyCenterPublicationState(root = document) {
  const published = readCenterPublication();
  root.querySelectorAll("[data-center-published-event]").forEach((node) => { node.hidden = !published; });
  root.querySelectorAll("[data-center-publication-held]").forEach((node) => { node.hidden = published; });
  root.querySelectorAll("[data-center-publication-copy]").forEach((node) => {
    node.textContent = published
      ? "Published by the Center from the approved Eli learning event."
      : "Awaiting Center publication; this same-event update is not yet visible.";
  });
  return published;
}
