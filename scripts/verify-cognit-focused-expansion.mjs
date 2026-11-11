import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createConnectedState, normalizeConnectedState, reduceConnectedState, saveAudioBlob, validateAudioBlob, writeConnectedState } from "../src/demo/cognit-focused-expansion-state.js";
import { focusedExpansionCopy } from "../src/demo/cognit-focused-expansion-copy.js";
import { creativeAppLabProgression } from "../src/demo/cognit-curriculum-progression.js";
import { COGNIT_FOCUSED_EXPANSION_ROUTES, readCenterLanguageSetting, resolveEffectiveLocale, writeCenterHindiSetting, writeCenterJapaneseSetting } from "../src/demo/cognit-localization.js";
import { esUSLiterals } from "../src/demo/locales/es-US-literals.js";
import { hiINLiterals } from "../src/demo/locales/hi-IN-literals.js";
import { jaJPLiterals } from "../src/demo/locales/ja-JP-literals.js";

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
for (const [literals, expected] of [
  [esUSLiterals, "2 de 2 completadas"],
  [jaJPLiterals, "2件中2件完了"],
  [hiINLiterals, "2 में से 2 पूरे"]
]) {
  assert.equal(literals["2 of 2 complete"], expected);
  assert.ok(literals["Add a Coach-authored observation before requesting wording help."]);
  assert.ok(literals["Learner testing a prototype"]);
  assert.ok(literals["Confirm review: Prototype walkthrough example"].includes("Prototype walkthrough example"));
}
assert.equal(creativeAppLabProgression.teachingModuleId, "creative-prototype");
assert.deepEqual(creativeAppLabProgression.completedModuleIds, ["creative-foundations"]);

let state = createConnectedState();
assert.equal(state.draftsByTarget["demo-student-eli-morgan"].startsWith("Eli"), true);
assert.equal(state.draftsByTarget["demo-student-lena-chen"], "");
assert.equal(state.draftsByTarget["whole-class"], "");
state = reduceConnectedState(state, { type: "DRAFT_NOTE", target: "demo-student-lena-chen", note: "Lena draft" });
state = reduceConnectedState(state, { type: "DRAFT_NOTE", target: "whole-class", note: "Whole class draft" });
state = reduceConnectedState(state, { type: "DRAFT_NOTE", target: "demo-student-eli-morgan", note: "Eli draft" });
assert.equal(state.draftsByTarget["demo-student-lena-chen"], "Lena draft");
assert.equal(state.draftsByTarget["whole-class"], "Whole class draft");
assert.equal(state.draftsByTarget["demo-student-eli-morgan"], "Eli draft");
const migrated = normalizeConnectedState({ ...createConnectedState(), selectedTarget: "whole-class", draftsByTarget: undefined });
assert.equal(migrated.draftsByTarget["demo-student-eli-morgan"].startsWith("Eli"), true);
assert.equal(migrated.draftsByTarget["whole-class"], "", "The seeded Eli note must not follow a target switch");
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
state = reduceConnectedState(state, { type: "SAVE_NOTE", target: "demo-student-eli-morgan", note: "Changed source" });
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
await assert.rejects(validateAudioBlob(new Blob(["x"], { type: "audio/webm" }), async () => ({ supported: true, durationSeconds: 1 })), /no usable audio/);
await assert.rejects(validateAudioBlob(new Blob([new Uint8Array(128)], { type: "application/octet-stream" }), async () => ({ supported: true, durationSeconds: 1 })), /unsupported media type/);
for (const [id, target, durationSeconds] of [["fixture-eli", "demo-student-eli-morgan", 1.25], ["fixture-whole", "whole-class", 2.5]]) {
  const blob = new Blob([new Uint8Array(256)], { type: "audio/webm" });
  const metadata = await validateAudioBlob(blob, async () => ({ supported: true, durationSeconds }));
  assert.deepEqual(metadata, { durationSeconds, mimeType: "audio/webm", size: 256 });
  state = reduceConnectedState(state, { type: "ADD_CAPTURE", capture: { id, target, audioVersion: 1, ...metadata, transcript: null } });
}
assert.equal(state.captures.find((capture) => capture.id === "fixture-eli").target, "demo-student-eli-morgan");
assert.equal(state.captures.find((capture) => capture.id === "fixture-whole").target, "whole-class");
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
assert.match(component, /validateAudioBlob/);
assert.match(component, /:global\(\.connected \.capture-card\)/);
assert.match(component, /simulated-pending/);
assert.match(component, /data-family-report/);
assert.match(component, /data-view-original/);
assert.doesNotMatch(component, /module-03-navigation-flow/);
assert.match(component, /creative-prototype/);
assert.match(component, /data-capture-type="audio"/);
const copySource = await readFile(new URL("../src/demo/cognit-focused-expansion-copy.js", import.meta.url), "utf8");
assert.match(copySource, /Demo examples and recordings saved on this device/);
const coachJourney = await readFile(new URL("../src/components/demo/CognitCoachJourneyView.astro", import.meta.url), "utf8");
assert.match(coachJourney, /Connect a learning moment/);
const captureHtml = await readFile(new URL("../dist/learninghub/demo/coach/capture/index.html", import.meta.url), "utf8");
assert.doesNotMatch(captureHtml, /data-capture-learner/);
assert.doesNotMatch(captureHtml, /data-capture-placeholder/);
console.log("Connected class/month state, exact seven-route locale boundary, invalidation, and Family visibility checks passed.");
