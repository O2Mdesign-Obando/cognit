import { enUS } from "./locales/en-US.js";
import { esUS } from "./locales/es-US.js";
import { esUSLiterals } from "./locales/es-US-literals.js";

export const COGNIT_LOCALES = Object.freeze(["en-US", "es-US"]);
export const COGNIT_LANGUAGE_ENTITLEMENT = Object.freeze({
  defaultLocale: "en-US",
  additionalLanguageSlots: 10,
  operationalAdditionalLocales: Object.freeze(["es-US"])
});
export const COGNIT_AUTHORIZED_LOCALE_ROUTES = Object.freeze([
  "/learninghub/demo/center/courses/creative-app-lab",
  "/learninghub/demo/coach/learners/eli",
  "/learninghub/demo/student/lesson",
  "/learninghub/demo/family/courses"
]);

export const CENTER_LANGUAGE_STORAGE_KEY = "cognit:demo-language-enablement:v1";
export const PERSON_LANGUAGE_STORAGE_PREFIX = "cognit:demo-language-preference:v1:";
const dictionaries = { "en-US": enUS, "es-US": esUS };
const memoryStorage = new Map();
const originalText = new WeakMap();
const originalAttributes = new WeakMap();

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

export function readCenterLanguageSetting(storage = globalThis.localStorage) {
  const raw = storageRead(storage, CENTER_LANGUAGE_STORAGE_KEY);
  if (raw === null) return { spanishEnabled: true };
  try {
    const parsed = JSON.parse(raw);
    return { spanishEnabled: parsed?.spanishEnabled !== false };
  } catch { return { spanishEnabled: true }; }
}

export function writeCenterLanguageSetting(spanishEnabled, storage = globalThis.localStorage) {
  storageWrite(storage, CENTER_LANGUAGE_STORAGE_KEY, JSON.stringify({ spanishEnabled: Boolean(spanishEnabled) }));
}

export function readSavedLocale(personId, storage = globalThis.localStorage) {
  const value = storageRead(storage, `${PERSON_LANGUAGE_STORAGE_PREFIX}${personId}`);
  return COGNIT_LOCALES.includes(value) ? value : "en-US";
}

export function writeSavedLocale(personId, locale, storage = globalThis.localStorage) {
  storageWrite(storage, `${PERSON_LANGUAGE_STORAGE_PREFIX}${personId}`, COGNIT_LOCALES.includes(locale) ? locale : "en-US");
}

export function resolveEffectiveLocale(savedLocale, centerSetting = { spanishEnabled: true }) {
  return savedLocale === "es-US" && centerSetting.spanishEnabled ? "es-US" : "en-US";
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
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest("script, style, [data-i18n], [data-i18n-preserve]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
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
    });
  });
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
  root.querySelectorAll("[data-language-fallback-notice]").forEach((element) => { element.hidden = fallbackCount === 0; });
  translateLiteralText(root, locale);
  return fallbackCount;
}

export function initializeCognitLocalization(control) {
  if (!(control instanceof HTMLElement) || control.dataset.ready === "true") return;
  if (!isAuthorizedLocaleRoute(location.pathname)) return;
  control.dataset.ready = "true";
  const personId = control.dataset.personId;
  const select = control.querySelector("[data-language-select]");
  const toggle = control.querySelector("[data-center-spanish-enable]");
  const disabledNotice = control.querySelector("[data-language-disabled-notice]");
  const render = () => {
    const centerSetting = readCenterLanguageSetting();
    const savedLocale = readSavedLocale(personId);
    const effectiveLocale = resolveEffectiveLocale(savedLocale, centerSetting);
    if (select instanceof HTMLSelectElement) select.value = savedLocale;
    if (toggle instanceof HTMLInputElement) toggle.checked = centerSetting.spanishEnabled;
    if (disabledNotice instanceof HTMLElement) disabledNotice.hidden = !(savedLocale === "es-US" && effectiveLocale === "en-US");
    control.dataset.savedLocale = savedLocale;
    control.dataset.effectiveLocale = effectiveLocale;
    applyCognitLocale(effectiveLocale);
    document.dispatchEvent(new CustomEvent("cognit:language-changed", { detail: { personId, savedLocale, effectiveLocale } }));
  };
  select?.addEventListener("change", () => { if (select instanceof HTMLSelectElement) writeSavedLocale(personId, select.value); render(); select.focus(); });
  toggle?.addEventListener("change", () => { if (toggle instanceof HTMLInputElement) writeCenterLanguageSetting(toggle.checked); render(); toggle.focus(); });
  addEventListener("storage", render);
  const observer = new MutationObserver(() => queueMicrotask(() => translateLiteralText(document, control.dataset.effectiveLocale || "en-US")));
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  render();
}
