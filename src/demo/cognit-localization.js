import { enUS } from "./locales/en-US.js";
import { esUS } from "./locales/es-US.js";
import { esUSLiterals } from "./locales/es-US-literals.js";
import { COGNIT_DEMO_LOCALIZATION_MANIFEST } from "./cognit-localization-route-manifest.js";

export const COGNIT_LOCALES = Object.freeze(["en-US", "es-US"]);
export const COGNIT_LANGUAGE_ENTITLEMENT = Object.freeze({
  defaultLocale: "en-US",
  additionalLanguageSlots: 10,
  operationalAdditionalLocales: Object.freeze(["es-US"])
});
export const COGNIT_AUTHORIZED_LOCALE_ROUTES = COGNIT_DEMO_LOCALIZATION_MANIFEST;

export const CENTER_LANGUAGE_STORAGE_KEY = "cognit:demo-language-enablement:v1";
export const PERSON_LANGUAGE_STORAGE_PREFIX = "cognit:demo-language-preference:v1:";
export const ENTRY_LANGUAGE_PERSON_ID = "demo-entry";
const dictionaries = { "en-US": enUS, "es-US": esUS };
const intentionalPreserveLiterals = new Set([
  "Cognit", "AC", "Avery Chen", "Eli Morgan", "Jordan Ellis", "Rachel Morgan", "Marcus R.",
  "Riverton Learning Studio", "Oak Harbor Lab", "Cedar Grove Collective", "Sunfield Learning Works",
  "Maple Crossing Studio", "Bluewater Learning Lab", "Northfield Studio", "Harbor Learning Studio",
  "Creative App Foundations", "Robotics Systems", "Digital Storytelling", "AI Foundations",
  "Creative Computing Journey", "Engineering Design Journey", "Advanced Problem Solving",
  "Creative App Foundations 2.4"
  , "Creative App Lab", "Digital Storytelling Lab", "Harbor Creative App Lab", "Robotics Studio",
  "Habit Tracker", "Habit Tracker — interaction flow prototype", "Lena Grant", "Mina Park", "Ava Thompson",
  "Noah Bennett", "Sofia Reyes", "Morgan Family", "Northfield Studio Center team"
]);
const memoryStorage = new Map();
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

function isIntentionalPreserveLiteral(value) {
  return intentionalPreserveLiterals.has(value)
    || /^HQ-\d+(?: · .+)?$/.test(value)
    || /^[A-Z][A-Za-z ]+, [A-Z]{2}$/.test(value);
}

function storageRead(storage, key) {
  try { return storage?.getItem(key) ?? memoryStorage.get(key) ?? null; }
  catch { return memoryStorage.get(key) ?? null; }
}

function storageWrite(storage, key, value) {
  memoryStorage.set(key, value);
  try { storage?.setItem(key, value); } catch { /* browser-local memory fallback */ }
}

export function readBrowserLocalJson(key, fallback, storage = globalThis.localStorage) {
  const raw = storageRead(storage, key);
  if (raw === null) return fallback;
  try { return { ...fallback, ...JSON.parse(raw) }; }
  catch { return fallback; }
}

export function writeBrowserLocalJson(key, value, storage = globalThis.localStorage) {
  storageWrite(storage, key, JSON.stringify(value));
}

export function isAuthorizedLocaleRoute(pathname) {
  return COGNIT_AUTHORIZED_LOCALE_ROUTES.includes(pathname.replace(/\/$/, ""));
}

function centerLanguageStorageKey(centerId = "northfield") {
  return centerId === "northfield" ? CENTER_LANGUAGE_STORAGE_KEY : `${CENTER_LANGUAGE_STORAGE_KEY}:${centerId}`;
}

export function readCenterLanguageSetting(storage = globalThis.localStorage, centerId = "northfield") {
  const raw = storageRead(storage, centerLanguageStorageKey(centerId));
  if (raw === null) return { spanishEnabled: true };
  try {
    const parsed = JSON.parse(raw);
    return { spanishEnabled: parsed?.spanishEnabled !== false };
  } catch { return { spanishEnabled: true }; }
}

export function writeCenterLanguageSetting(spanishEnabled, storage = globalThis.localStorage, centerId = "northfield") {
  storageWrite(storage, centerLanguageStorageKey(centerId), JSON.stringify({ spanishEnabled: Boolean(spanishEnabled) }));
}

function readSavedLocaleValue(personId, storage = globalThis.localStorage) {
  const value = storageRead(storage, `${PERSON_LANGUAGE_STORAGE_PREFIX}${personId}`);
  return COGNIT_LOCALES.includes(value) ? value : null;
}

export function readSavedLocale(personId, storage = globalThis.localStorage) {
  return readSavedLocaleValue(personId, storage) ?? "en-US";
}

export function writeSavedLocale(personId, locale, storage = globalThis.localStorage) {
  storageWrite(storage, `${PERSON_LANGUAGE_STORAGE_PREFIX}${personId}`, COGNIT_LOCALES.includes(locale) ? locale : "en-US");
}

export function resolveEffectiveLocale(savedLocale, centerSetting = { spanishEnabled: true }, centerScoped = true) {
  return savedLocale === "es-US" && (!centerScoped || centerSetting.spanishEnabled) ? "es-US" : "en-US";
}

export function translateKey(locale, key, params = {}) {
  const localized = dictionaries[locale]?.[key];
  const fallback = localized === undefined && enUS[key] !== undefined;
  const template = localized ?? enUS[key] ?? key;
  return {
    value: Object.entries(params).reduce((value, [name, replacement]) => value.replaceAll(`{${name}}`, String(replacement)), template),
    fallback
  };
}

function translateElement(element, locale) {
  const key = element.getAttribute("data-i18n");
  if (!key) return false;
  const params = element.dataset.i18nParams ? JSON.parse(element.dataset.i18nParams) : {};
  const result = translateKey(locale, key, params);
  element.textContent = result.value;
  element.toggleAttribute("data-english-fallback", result.fallback);
  return result.fallback;
}

function translateLiteralText(root, locale) {
  root.querySelectorAll("[data-literal-english-fallback]").forEach((element) => element.removeAttribute("data-literal-english-fallback"));
  let fallbackCount = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest("script, style, pre, code, textarea, [data-i18n], [data-i18n-preserve]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    let source = originalText.get(node);
    const currentTranslation = esUSLiterals[source.trim()];
    const expected = currentTranslation === undefined ? source : source.replace(source.trim(), currentTranslation);
    if (locale === "es-US" && node.nodeValue !== source && node.nodeValue !== expected) {
      originalText.set(node, node.nodeValue);
      source = node.nodeValue;
    }
    const trimmed = source.trim();
    const translated = locale === "es-US" ? esUSLiterals[trimmed] : undefined;
    const nextValue = translated === undefined ? source : source.replace(trimmed, translated);
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
    if (locale === "es-US" && translated === undefined && !isIntentionalPreserveLiteral(trimmed) && /[A-Za-z]{2}/.test(trimmed)) {
      fallbackCount += 1;
      node.parentElement?.setAttribute("data-literal-english-fallback", "true");
    }
  });
  ["aria-label", "placeholder", "title", "data-center-local-action"].forEach((attribute) => {
    root.querySelectorAll(`[${attribute}]`).forEach((element) => {
      if (element.hasAttribute(`data-i18n-${attribute}`)) return;
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const values = originalAttributes.get(element);
      if (!(attribute in values)) values[attribute] = element.getAttribute(attribute);
      const source = values[attribute];
      const translated = locale === "es-US" ? esUSLiterals[source] : undefined;
      const nextValue = translated ?? source;
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
      if (locale === "es-US" && translated === undefined && /[A-Za-z]{2}/.test(source || "")) {
        fallbackCount += 1;
        element.setAttribute("data-literal-english-fallback", "true");
      }
    });
  });
  return fallbackCount;
}

export function applyCognitLocale(locale, root = document) {
  let fallbackCount = 0;
  root.querySelectorAll("[data-i18n]").forEach((element) => { if (translateElement(element, locale)) fallbackCount += 1; });
  [["data-i18n-placeholder", "placeholder"], ["data-i18n-aria-label", "aria-label"], ["data-i18n-alt", "alt"]].forEach(([source, target]) => {
    root.querySelectorAll(`[${source}]`).forEach((element) => {
      const result = translateKey(locale, element.getAttribute(source));
      element.setAttribute(target, result.value);
      element.toggleAttribute("data-english-fallback", result.fallback);
      if (result.fallback) fallbackCount += 1;
    });
  });
  document.documentElement.lang = locale;
  document.documentElement.dataset.contentLocale = locale;
  fallbackCount += translateLiteralText(root, locale);
  root.querySelectorAll("[data-language-fallback-notice]").forEach((element) => { element.hidden = fallbackCount === 0; });
  return fallbackCount;
}

export function initializeCognitLocalization(control) {
  if (!(control instanceof HTMLElement) || control.dataset.ready === "true") return;
  if (!isAuthorizedLocaleRoute(location.pathname)) return;
  control.dataset.ready = "true";
  const personId = control.dataset.personId;
  const centerId = control.dataset.centerId || "northfield";
  const centerScoped = control.dataset.centerScoped !== "false";
  const select = control.querySelector("[data-language-select]");
  const toggle = control.querySelector("[data-center-spanish-enable]");
  const disabledNotice = control.querySelector("[data-language-disabled-notice]");
  const render = () => {
    const centerSetting = readCenterLanguageSetting(globalThis.localStorage, centerId);
    const ownLocale = readSavedLocaleValue(personId);
    const savedLocale = ownLocale ?? (personId === ENTRY_LANGUAGE_PERSON_ID ? "en-US" : readSavedLocale(ENTRY_LANGUAGE_PERSON_ID));
    const effectiveLocale = resolveEffectiveLocale(savedLocale, centerSetting, centerScoped);
    if (select instanceof HTMLSelectElement) select.value = savedLocale;
    if (toggle instanceof HTMLInputElement) toggle.checked = centerSetting.spanishEnabled;
    if (disabledNotice instanceof HTMLElement) disabledNotice.hidden = !(savedLocale === "es-US" && effectiveLocale === "en-US");
    control.dataset.savedLocale = savedLocale;
    control.dataset.effectiveLocale = effectiveLocale;
    control.dataset.preferenceSource = ownLocale ? "own" : personId === ENTRY_LANGUAGE_PERSON_ID ? "default" : "entry";
    applyCognitLocale(effectiveLocale);
    document.dispatchEvent(new CustomEvent("cognit:language-changed", { detail: { personId, savedLocale, effectiveLocale } }));
  };
  select?.addEventListener("change", () => { if (select instanceof HTMLSelectElement) writeSavedLocale(personId, select.value); render(); select.focus(); });
  toggle?.addEventListener("change", () => { if (toggle instanceof HTMLInputElement) writeCenterLanguageSetting(toggle.checked, globalThis.localStorage, centerId); render(); toggle.focus(); });
  addEventListener("storage", render);
  const observer = new MutationObserver(() => queueMicrotask(() => {
    const locale = control.dataset.effectiveLocale || "en-US";
    const fallbackCount = translateLiteralText(document, locale) + document.querySelectorAll("[data-english-fallback]").length;
    document.querySelectorAll("[data-language-fallback-notice]").forEach((element) => { element.hidden = fallbackCount === 0; });
  }));
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  render();
}
