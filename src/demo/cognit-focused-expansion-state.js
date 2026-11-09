export const CONNECTED_IDS = Object.freeze({
  course: "course-creative-app-lab",
  classMonth: "class-creative-app-lab-2026-09",
  learner: "demo-student-eli-morgan",
  currentModule: "creative-prototype",
  audioStore: "cognit-connected-audio-v1"
});

export const CONNECTED_STATE_KEY = "cognit:connected-class-month:v1";
export const DEFAULT_ELI_NOTE = "Eli connected the primary action to a visible result and explained the revision.";

export function createConnectedState() {
  return {
    schema: 1,
    sourceRevision: 1,
    selectedTarget: "",
    selectedCaptureType: "photo",
    typedNote: DEFAULT_ELI_NOTE,
    draftsByTarget: {
      "demo-student-eli-morgan": DEFAULT_ELI_NOTE,
      "demo-student-lena-chen": "",
      "whole-class": ""
    },
    evidence: [
      { id: "evidence-photo-01", kind: "photo", label: "Navigation-flow sketch", reviewed: true, version: 1 },
      { id: "evidence-video-01", kind: "video", label: "Prototype walkthrough example", reviewed: false, version: 1 }
    ],
    captures: [],
    reports: [],
    currentReportId: null,
    acceptedReportId: null,
    decisionHistory: [],
    messages: [{
      id: "message-family-01", version: 1, sender: "Jordan Ellis", recipient: "Rachel Morgan",
      originalLanguage: "en-US", originalText: "Eli tested the navigation flow and revised the main action after feedback.",
      translations: {
        "es-US": "Eli probó el flujo de navegación y revisó la acción principal después de recibir comentarios.",
        "ja-JP": "Eli はナビゲーションフローをテストし、フィードバック後に主な操作を修正しました。",
        "hi-IN": "Eli ने नेविगेशन फ़्लो का परीक्षण किया और प्रतिक्रिया के बाद मुख्य क्रिया में सुधार किया।"
      }, status: "drafted"
    }]
  };
}

export function normalizeConnectedState(candidate) {
  const base = createConnectedState();
  if (!candidate || candidate.schema !== 1) return base;
  const draftsByTarget = { ...base.draftsByTarget, ...(candidate.draftsByTarget ?? {}) };
  if (!candidate.draftsByTarget && candidate.typedNote && candidate.typedNote !== DEFAULT_ELI_NOTE && candidate.selectedTarget) {
    draftsByTarget[candidate.selectedTarget] = candidate.typedNote;
  }
  return { ...base, ...candidate, draftsByTarget, selectedCaptureType: candidate.selectedCaptureType ?? base.selectedCaptureType, evidence: candidate.evidence ?? base.evidence, captures: candidate.captures ?? [], reports: candidate.reports ?? [], decisionHistory: candidate.decisionHistory ?? [], messages: candidate.messages ?? base.messages };
}

export function readConnectedState(storage = globalThis.localStorage) {
  try { return normalizeConnectedState(JSON.parse(storage?.getItem(CONNECTED_STATE_KEY) || "null")); }
  catch { return createConnectedState(); }
}

export function writeConnectedState(state, storage = globalThis.localStorage) {
  try { storage?.setItem(CONNECTED_STATE_KEY, JSON.stringify(state)); }
  catch (error) { throw new Error(`Browser-local metadata could not be saved: ${error?.message || "storage unavailable"}`); }
  globalThis.dispatchEvent?.(new CustomEvent("cognit:connected-state-changed", { detail: { sourceRevision: state.sourceRevision } }));
  return state;
}

function invalidateAccepted(state, reason) {
  if (!state.acceptedReportId) return state;
  const accepted = state.reports.find((report) => report.id === state.acceptedReportId);
  return {
    ...state,
    acceptedReportId: null,
    reports: state.reports.map((report) => report.id === state.acceptedReportId ? { ...report, status: "invalidated" } : report),
    decisionHistory: [...state.decisionHistory, { id: `decision-${Date.now()}`, reportId: accepted?.id, type: "invalidated", reason, at: new Date().toISOString() }]
  };
}

export function reduceConnectedState(state, action) {
  switch (action.type) {
    case "SELECT_TARGET": return { ...state, selectedTarget: action.target };
    case "SELECT_CAPTURE_TYPE": return { ...state, selectedCaptureType: action.captureType };
    case "DRAFT_NOTE": return { ...state, typedNote: action.note, draftsByTarget: { ...state.draftsByTarget, [action.target || state.selectedTarget]: action.note } };
    case "SAVE_NOTE": return invalidateAccepted({ ...state, typedNote: action.note, draftsByTarget: { ...state.draftsByTarget, [action.target || state.selectedTarget]: action.note }, sourceRevision: state.sourceRevision + 1 }, "Coach note changed after acceptance.");
    case "ADD_CAPTURE": return invalidateAccepted({ ...state, captures: [...state.captures, action.capture], sourceRevision: state.sourceRevision + 1 }, "Audio evidence changed after acceptance.");
    case "SAVE_TRANSCRIPT": return invalidateAccepted({
      ...state,
      captures: state.captures.map((capture) => capture.id === action.captureId && capture.audioVersion === action.audioVersion
        ? { ...capture, transcript: { text: action.text, version: (capture.transcript?.version ?? 0) + 1, status: action.status ?? "coach-corrected", audioVersion: capture.audioVersion } }
        : capture),
      sourceRevision: state.sourceRevision + 1
    }, "Transcript source changed after acceptance.");
    case "REVIEW_EVIDENCE": return { ...state, evidence: state.evidence.map((item) => item.id === action.id ? { ...item, reviewed: true } : item) };
    case "CREATE_REPORT": {
      const version = state.reports.length + 1;
      const id = `report-creative-app-lab-2026-09-v${version}`;
      const sourceIds = ["evidence-photo-01", ...state.captures.map((capture) => `${capture.id}@audio-v${capture.audioVersion}`)];
      const report = { id, version, sourceRevision: state.sourceRevision, sourceIds, status: "draft", coachReviewed: false, submitted: false, rule: action.rule ?? "routine", text: action.text };
      return { ...state, reports: [...state.reports, report], currentReportId: id };
    }
    case "REVIEW_REPORT": return { ...state, reports: state.reports.map((report) => report.id === action.id ? { ...report, coachReviewed: true, status: "reviewed" } : report) };
    case "SUBMIT_REPORT": return { ...state, reports: state.reports.map((report) => report.id === action.id && report.coachReviewed ? { ...report, submitted: true, status: "submitted" } : report) };
    case "CENTER_DECIDE": {
      const report = state.reports.find((item) => item.id === action.id);
      if (!report?.submitted || report.sourceRevision !== state.sourceRevision) return state;
      const type = action.decision;
      const accepted = type === "accepted";
      return {
        ...state,
        acceptedReportId: accepted ? report.id : state.acceptedReportId,
        reports: state.reports.map((item) => item.id === report.id ? { ...item, status: type } : item),
        decisionHistory: [...state.decisionHistory, { id: `decision-${Date.now()}`, reportId: report.id, type, reason: action.reason, at: new Date().toISOString() }]
      };
    }
    default: return state;
  }
}

function openAudioDatabase() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) return reject(new Error("Device-local audio storage is unavailable."));
    const request = indexedDB.open(CONNECTED_IDS.audioStore, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("audio", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Device-local audio storage failed."));
  });
}

export async function saveAudioBlob(id, blob, metadata = {}) {
  if (!(blob instanceof Blob) || blob.size === 0) throw new Error("The recording is empty and was not saved.");
  const db = await openAudioDatabase();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction("audio", "readwrite");
    transaction.objectStore("audio").put({ id, blob, savedAt: new Date().toISOString(), ...metadata });
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Device-local audio could not be saved."));
  });
  db.close();
}

export async function loadAudioBlob(id) {
  return (await loadAudioRecord(id))?.blob ?? null;
}

export async function loadAudioRecord(id) {
  const db = await openAudioDatabase();
  const result = await new Promise((resolve, reject) => {
    const request = db.transaction("audio", "readonly").objectStore("audio").get(id);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error || new Error("Saved audio could not be reopened."));
  });
  db.close();
  return result;
}

export async function validateAudioBlob(blob, probe) {
  if (!(blob instanceof Blob) || blob.size === 0) throw new Error("The recording is empty and was not saved.");
  if (!blob.type.startsWith("audio/")) throw new Error("The recording has an unsupported media type and was not saved.");
  if (blob.size < 64) throw new Error("The recording contains no usable audio and was not saved.");
  const result = await probe(blob);
  if (!result?.supported) throw new Error("This browser cannot play the recorded audio format.");
  if (!Number.isFinite(result.durationSeconds) || result.durationSeconds <= 0) throw new Error("The recording contains no playable audio and was not saved.");
  return { durationSeconds: result.durationSeconds, mimeType: blob.type, size: blob.size };
}
