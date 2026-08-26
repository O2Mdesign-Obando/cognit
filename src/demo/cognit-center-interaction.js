const STATE_KEY = "cognit:center-demo-state:v1";
const initialState = {
  assignedCoach: false,
  lenaAttendance: "unresolved",
  reports: { eli: "ready", sofia: "needs_clarification" },
  eliPublished: false,
  moduleSavedAt: null,
  drafts: []
};

const readState = () => {
  try { return { ...initialState, ...JSON.parse(localStorage.getItem(STATE_KEY) || "{}") }; }
  catch { return { ...initialState }; }
};
const writeState = (next) => localStorage.setItem(STATE_KEY, JSON.stringify(next));
const feedback = (root, message) => {
  const node = root.querySelector("[data-center-feedback]");
  if (node) node.textContent = message;
};

document.querySelectorAll("[data-center-root]").forEach((root) => {
  let state = readState();

  const renderAssignment = () => {
    if (!state.assignedCoach) return;
    root.querySelectorAll("[data-unassigned-card], [data-unassigned-session]").forEach((card) => {
      const heading = card.querySelector("h2");
      const status = card.querySelector(".status");
      const button = card.querySelector("[data-assign-coach]");
      if (heading && card.matches("[data-unassigned-card]")) heading.textContent = "Digital Storytelling coverage confirmed";
      if (status) { status.textContent = "Jordan assigned"; status.classList.remove("attention"); }
      if (button) { button.textContent = "Jordan assigned"; button.disabled = true; }
    });
  };

  const renderAttendance = () => {
    const row = root.querySelector("[data-attendance-row]");
    if (!row || state.lenaAttendance === "unresolved") return;
    row.dataset.attendance = state.lenaAttendance;
    const label = row.querySelector("[data-attendance-label]");
    if (label) label.textContent = state.lenaAttendance[0].toUpperCase() + state.lenaAttendance.slice(1);
    row.querySelectorAll("button").forEach((button) => { button.disabled = true; button.setAttribute("aria-pressed", String(button.dataset.attendanceAction === state.lenaAttendance)); });
    const review = root.querySelector("[data-count-review]");
    const present = root.querySelector("[data-count-present]");
    const late = root.querySelector("[data-count-late]");
    if (review) review.textContent = "0";
    if (present && state.lenaAttendance === "present") present.textContent = "2";
    if (late && state.lenaAttendance === "late") late.textContent = "2";
  };

  renderAssignment();
  renderAttendance();

  root.querySelectorAll("[data-assign-coach]").forEach((button) => button.addEventListener("click", () => {
    state.assignedCoach = true; writeState(state); renderAssignment(); feedback(root, "Jordan Ellis assigned in the browser-local Center fixture.");
  }));

  root.querySelectorAll("[data-attendance-action]").forEach((button) => button.addEventListener("click", () => {
    state.lenaAttendance = button.dataset.attendanceAction; writeState(state); renderAttendance(); feedback(root, `Lena’s attendance is locally confirmed as ${state.lenaAttendance}.`);
  }));

  root.querySelectorAll("[data-center-local-action]").forEach((button) => button.addEventListener("click", () => feedback(root, button.dataset.centerLocalAction)));

  root.querySelectorAll("[data-local-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) status.textContent = "Recorded in this browser only. Nothing was delivered.";
    });
    form.querySelector("[data-save-draft]")?.addEventListener("click", () => {
      state.drafts = [...(state.drafts || []), { savedAt: new Date().toISOString(), kind: "center-message" }]; writeState(state);
      const status = form.querySelector("[data-form-status]"); if (status) status.textContent = "Draft saved to this browser only.";
    });
  });

  root.querySelectorAll("[data-report-action]").forEach((button) => button.addEventListener("click", () => {
    const student = button.dataset.reportStudent;
    const action = button.dataset.reportAction;
    state.reports = { ...state.reports, [student]: action === "approve" ? "approved" : "needs_clarification" }; writeState(state);
    const status = root.querySelector("[data-report-status]");
    if (status) status.textContent = action === "approve" ? "Approved in the local Center review fixture." : "Clarification requested in the local fixture; no message was delivered.";
  }));

  root.querySelector("[data-publish-journey]")?.addEventListener("click", () => {
    state.eliPublished = true; state.reports = { ...state.reports, eli: "published" }; writeState(state);
    const status = root.querySelector("[data-publish-status]"); if (status) status.textContent = "Published locally. Student and Family demo views will now show the Center publication receipt.";
  });

  root.querySelector("[data-module-form]")?.addEventListener("submit", (event) => {
    event.preventDefault(); state.moduleSavedAt = new Date().toISOString(); writeState(state);
    const status = root.querySelector("[data-module-status]"); if (status) status.textContent = "Configuration saved to this browser-local fixture.";
  });

  root.querySelector("[data-student-search]")?.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    root.querySelectorAll("[data-student-card]").forEach((card) => { card.hidden = !card.dataset.name.includes(query); });
  });
  root.querySelector("[data-student-course]")?.addEventListener("change", (event) => {
    const value = event.target.value;
    root.querySelectorAll("[data-student-card]").forEach((card) => { card.hidden = value !== "all" && !card.dataset.courses.includes(value); });
  });

  root.querySelectorAll("[data-release-filter]").forEach((button) => button.addEventListener("click", () => {
    const kind = button.dataset.releaseFilter;
    const empty = root.querySelector("[data-release-empty]");
    root.querySelectorAll("[data-release-kind]").forEach((card) => { card.hidden = kind === "caught-up" || (kind !== "all" && card.dataset.releaseKind !== kind); });
    if (empty) empty.hidden = kind !== "caught-up";
  }));

  root.querySelector("[data-center-reset]")?.addEventListener("click", () => {
    localStorage.removeItem(STATE_KEY);
    window.location.reload();
  });
});
