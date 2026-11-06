import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createConnectedState, reduceConnectedState, saveAudioBlob, writeConnectedState } from "../src/demo/cognit-focused-expansion-state.js";
import { focusedExpansionCopy } from "../src/demo/cognit-focused-expansion-copy.js";
import { COGNIT_FOCUSED_EXPANSION_ROUTES, readCenterLanguageSetting, resolveEffectiveLocale, writeCenterHindiSetting, writeCenterJapaneseSetting } from "../src/demo/cognit-localization.js";

assert.deepEqual(COGNIT_FOCUSED_EXPANSION_ROUTES, [
  "/learninghub/demo/center/courses/creative-app-lab",
  "/learninghub/demo/center/context/northfield/reports/eli",
  "/learninghub/demo/coach/capture",
  "/learninghub/demo/coach/after-class",
  "/learninghub/demo/student/lesson",
  "/learninghub/demo/family/journey/eli",
  "/learninghub/demo/family/messages"
]);
for (const locale of ["en-US", "es-US", "ja-JP", "hi-IN"]) {
  assert.ok(focusedExpansionCopy[locale]);
  assert.deepEqual(Object.keys(focusedExpansionCopy[locale]).sort(), Object.keys(focusedExpansionCopy["en-US"]).sort());
}
assert.equal(focusedExpansionCopy["es-US"].organization, "Organización");
assert.equal(focusedExpansionCopy["es-US"].currentLabel, "Vigente");

let state = createConnectedState();
state = reduceConnectedState(state, { type: "ADD_CAPTURE", capture: { id: "audio-test-1", target: "demo-student-eli-morgan", audioVersion: 1, transcript: null } });
state = reduceConnectedState(state, { type: "SAVE_TRANSCRIPT", captureId: "audio-test-1", audioVersion: 1, text: "Coach correction", status: "coach-corrected" });
const corrected = state.captures[0].transcript;
state = reduceConnectedState(state, { type: "SAVE_TRANSCRIPT", captureId: "audio-test-1", audioVersion: 0, text: "Late stale simulation", status: "simulated-unreviewed" });
assert.deepEqual(state.captures[0].transcript, corrected, "A stale transcript version must not overwrite the Coach correction");
state = reduceConnectedState(state, { type: "CREATE_REPORT", text: "Supported progress only.", rule: "routine" });
const reportId = state.currentReportId;
state = reduceConnectedState(state, { type: "CENTER_DECIDE", id: reportId, decision: "accepted", reason: "Eligibility alone" });
assert.equal(state.acceptedReportId, null, "An unreviewed/unsubmitted report must not become Family-visible");
state = reduceConnectedState(state, { type: "REVIEW_REPORT", id: reportId });
state = reduceConnectedState(state, { type: "SUBMIT_REPORT", id: reportId });
state = reduceConnectedState(state, { type: "CENTER_DECIDE", id: reportId, decision: "accepted", reason: "Exact version accepted" });
assert.equal(state.acceptedReportId, reportId);
state = reduceConnectedState(state, { type: "SAVE_NOTE", note: "Changed source" });
assert.equal(state.acceptedReportId, null);
assert.equal(state.reports.find((report) => report.id === reportId).status, "invalidated");
assert.ok(state.decisionHistory.some((decision) => decision.type === "invalidated"));
state = reduceConnectedState(state, { type: "CREATE_REPORT", text: "Exception version.", rule: "manual" });
const manualId = state.currentReportId;
state = reduceConnectedState(state, { type: "REVIEW_REPORT", id: manualId });
state = reduceConnectedState(state, { type: "SUBMIT_REPORT", id: manualId });
state = reduceConnectedState(state, { type: "CENTER_DECIDE", id: manualId, decision: "manual", reason: "Exception reason remains visible" });
assert.equal(state.acceptedReportId, null);
assert.equal(state.reports.find((report) => report.id === manualId).status, "manual");
assert.ok(state.decisionHistory.some((decision) => decision.reportId === manualId && decision.reason === "Exception reason remains visible"));
assert.equal(state.messages[0].originalText, "Eli tested the navigation flow and revised the main action after feedback.");
await assert.rejects(saveAudioBlob("empty-audio", new Blob([])), /empty/);
assert.throws(() => writeConnectedState(state, { setItem() { throw new Error("quota blocked"); } }), /could not be saved/);

const values = new Map();
const storage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
writeCenterJapaneseSetting(false, storage); writeCenterHindiSetting(false, storage);
assert.equal(resolveEffectiveLocale("ja-JP", readCenterLanguageSetting(storage), true, true), "en-US");
assert.equal(resolveEffectiveLocale("hi-IN", readCenterLanguageSetting(storage), true, true), "en-US");
assert.equal(resolveEffectiveLocale("hi-IN", readCenterLanguageSetting(storage), false, true), "hi-IN");

for (const route of COGNIT_FOCUSED_EXPANSION_ROUTES) {
  const html = await readFile(new URL(`../dist${route}/index.html`, import.meta.url), "utf8");
  assert.match(html, /data-connected-demo/);
  assert.match(html, /<option value="ja-JP"[^>]*>日本語<\/option>/);
  assert.match(html, /<option value="hi-IN"[^>]*>हिन्दी<\/option>/);
}
const outside = await readFile(new URL("../dist/learninghub/demo/coach/today/index.html", import.meta.url), "utf8");
assert.doesNotMatch(outside, /data-connected-demo/);
assert.doesNotMatch(outside, /<option value="hi-IN"/);
const component = await readFile(new URL("../src/components/demo/CognitFocusedExpansion.astro", import.meta.url), "utf8");
assert.match(component, /navigator\.mediaDevices\?\.getUserMedia/);
assert.match(component, /saveAudioBlob/);
assert.match(component, /simulated-pending/);
assert.match(component, /data-family-report/);
assert.match(component, /data-view-original/);
console.log("Connected class/month state, exact seven-route locale boundary, invalidation, and Family visibility checks passed.");
