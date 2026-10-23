import { translateKey } from "./cognit-localization.js";

const root = document.querySelector("[data-hq-view]");

if (root) {
  const tr = (key, params = {}) => translateKey(document.documentElement.dataset.contentLocale || "en-US", key, params).value;
  const setTranslated = (element, key, params = {}) => {
    if (!element) return;
    element.setAttribute("data-i18n", key);
    element.dataset.i18nParams = JSON.stringify(params);
    element.textContent = tr(key, params);
  };
  const search = root.querySelector("[data-hq-center-search]");
  const status = root.querySelector("[data-hq-center-status]");
  const rows = [...root.querySelectorAll("[data-center-row]")];
  const filterCenters = () => {
    const query = search?.value.trim().toLowerCase() || "";
    const selectedStatus = status?.value || "All";
    rows.forEach((row) => {
      row.hidden = !(row.dataset.name.includes(query) && (selectedStatus === "All" || row.dataset.status === selectedStatus));
    });
  };
  search?.addEventListener("input", filterCenters);
  status?.addEventListener("change", filterCenters);

  const centerFeedback = root.querySelector("[data-hq-center-feedback]");
  root.querySelector("[data-hq-add-center]")?.addEventListener("click", () => {
    setTranslated(centerFeedback, "hq.feedback.centerOnboardingOpened");
  });

  const caseFeedback = root.querySelector("[data-hq-case-feedback]");
  root.querySelectorAll("[data-take-case]").forEach((button) => {
    button.addEventListener("click", () => {
      setTranslated(caseFeedback, "hq.feedback.caseAssigned", { id: button.dataset.takeCase });
      setTranslated(button, "hq.feedback.caseSelected");
      button.disabled = true;
    });
  });

  root.querySelector("[data-hq-logout]")?.addEventListener("click", () => window.location.assign("/"));

  const workspace = root.querySelector("[data-hq-modules]");
  if (workspace) {
    const form = workspace.querySelector("[data-module-form]");
    const statusLine = workspace.querySelector("[data-module-status]");
    const audit = workspace.querySelector("[data-module-audit]");
    const storageKey = `cognit-hq-modules-${workspace.dataset.mode}`;
    const defaults = Object.fromEntries([...form.querySelectorAll("fieldset")].map((fieldset) => [fieldset.dataset.module, fieldset.querySelector("input:checked")?.value]));
    const readForm = () => Object.fromEntries([...form.querySelectorAll("fieldset")].map((fieldset) => [fieldset.dataset.module, fieldset.querySelector("input:checked")?.value]));
    const applyState = (state) => Object.entries(state || {}).forEach(([module, value]) => {
      const input = form.querySelector(`[data-module="${module}"] input[value="${value}"]`);
      if (input && !input.disabled) input.checked = true;
    });
    applyState(JSON.parse(localStorage.getItem(storageKey) || "null") || defaults);
    form.addEventListener("change", () => { setTranslated(statusLine, "hq.feedback.unsavedConfiguration"); });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      localStorage.setItem(storageKey, JSON.stringify(readForm()));
      setTranslated(statusLine, "hq.feedback.configurationSaved");
      const item = document.createElement("li");
      setTranslated(item, "hq.feedback.configurationRecorded");
      audit.prepend(item);
    });
    workspace.querySelector("[data-module-discard]")?.addEventListener("click", (event) => {
      event.preventDefault();
      form.reset();
      applyState(JSON.parse(localStorage.getItem(storageKey) || "null") || defaults);
      setTranslated(statusLine, "hq.feedback.changesDiscarded");
    });
    workspace.querySelector("[data-module-reset]")?.addEventListener("click", () => {
      localStorage.removeItem(storageKey);
      form.reset();
      applyState(defaults);
      setTranslated(statusLine, "hq.feedback.defaultsRestored");
    });
  }
}
