import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  COGNIT_AUTHORIZED_LOCALE_ROUTES, COGNIT_JAPANESE_PILOT_ROUTES,
  isJapanesePilotRoute, readCenterLanguageSetting, readSavedLocale,
  resolveEffectiveLocale, translateKey, writeCenterJapaneseSetting,
  writeCenterLanguageSetting, writeSavedLocale
} from "../src/demo/cognit-localization.js";
import { enUS } from "../src/demo/locales/en-US.js";
import { jaJP } from "../src/demo/locales/ja-JP.js";
import { jaJPLiterals } from "../src/demo/locales/ja-JP-literals.js";
import { creativeAppLabPresentation, getCreativeAppLabPresentation } from "../src/demo/cognit-curriculum-content.js";

assert.equal(COGNIT_JAPANESE_PILOT_ROUTES.length, 7);
assert.ok(COGNIT_JAPANESE_PILOT_ROUTES.every(route => COGNIT_AUTHORIZED_LOCALE_ROUTES.includes(route)));
assert.ok(COGNIT_JAPANESE_PILOT_ROUTES.every(isJapanesePilotRoute));
assert.equal(isJapanesePilotRoute("/learninghub/demo/center/settings"), false);
assert.equal(isJapanesePilotRoute("/learninghub/demo/student"), false);
assert.equal(isJapanesePilotRoute("/learninghub/demo2"), false);

const values = new Map();
const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
writeSavedLocale("demo-student-eli", "ja-JP", storage);
writeSavedLocale("demo-coach-jordan", "es-US", storage);
assert.equal(readSavedLocale("demo-student-eli", storage), "ja-JP");
assert.equal(readSavedLocale("demo-coach-jordan", storage), "es-US");
assert.equal(resolveEffectiveLocale("ja-JP", readCenterLanguageSetting(storage), true, true), "ja-JP");
assert.equal(resolveEffectiveLocale("ja-JP", readCenterLanguageSetting(storage), true, false), "en-US");
writeCenterJapaneseSetting(false, storage);
assert.equal(resolveEffectiveLocale("ja-JP", readCenterLanguageSetting(storage), true, true), "en-US");
assert.equal(readSavedLocale("demo-student-eli", storage), "ja-JP");
writeCenterJapaneseSetting(true, storage, "harbor");
assert.equal(readCenterLanguageSetting(storage, "harbor").japaneseEnabled, true);
assert.equal(readCenterLanguageSetting(storage).japaneseEnabled, false);
writeCenterLanguageSetting(false, storage);
assert.equal(readCenterLanguageSetting(storage).japaneseEnabled, false);
assert.equal(resolveEffectiveLocale("es-US", readCenterLanguageSetting(storage), true, true), "en-US");
writeCenterJapaneseSetting(true, storage);
assert.equal(resolveEffectiveLocale("ja-JP", readCenterLanguageSetting(storage), true, true), "ja-JP");
assert.equal(readCenterLanguageSetting(storage).spanishEnabled, false);

assert.equal(translateKey("ja-JP", "workspace.heading").value, "基本の流れを試作する");
assert.equal(translateKey("ja-JP", "workspace.groupPosition", { current: 2, total: 6 }).value, "6グループ中 2グループ目");
assert.equal(translateKey("ja-JP", "test.controlledFallback").value, enUS["test.controlledFallback"]);
assert.equal(translateKey("ja-JP", "test.controlledFallback").fallback, true);
assert.ok(Object.keys(enUS).filter(key => key.startsWith("progress.") || key.startsWith("module.") || key.startsWith("activity.") || key.startsWith("group.") || key.startsWith("workspace.")).every(key => jaJP[key] !== undefined));
assert.equal(getCreativeAppLabPresentation("center"), null);
assert.equal(getCreativeAppLabPresentation("family"), null);
assert.ok(getCreativeAppLabPresentation("coach"));
assert.ok(getCreativeAppLabPresentation("student"));
assert.equal(creativeAppLabPresentation.contentProvenance.sourceLocale, "en-US");
assert.equal(creativeAppLabPresentation.contentProvenance.candidateTranslations["ja-JP"], "local-four-route-draft-human-review-pending");

const requiredRouteLiterals = {
  "Same-event publication status": "同じ更新の公開状況",
  "Eli’s newest Center-reviewed update is still held.": "センターが確認した Eli の最新の更新は、まだ公開されていません。",
  "Family continues to see the previously published Journey until Northfield Studio releases the new story.": "Northfield Studio が新しいストーリーを公開するまで、家族には以前に公開された学習の歩みが表示されます。",
  "Eli’s newest Center-reviewed update is now published.": "センターが確認した Eli の最新の更新が公開されました。",
  "The Student and Family views now reflect the same published release.": "生徒と家族の画面に、同じ公開内容が表示されています。",
  "Today’s resources": "今日の資料",
  "Interaction-flow reference": "操作の流れの参考資料",
  "0 completed, one current, 0 upcoming": "修了 0、現在 1、今後 0",
  "Communication": "連絡",
  "Rosters": "名簿",
  "Financials": "会計",
  "CAL-201 · COURSE OPERATIONS": "CAL-201・コース運営",
  "CAL-201 · Course operations": "CAL-201・コース運営",
  "2 enrolled · 6 seats open": "受講中2名・空き6席",
  "No learners are waiting for this Course in Northfield Studio.": "Northfield Studio では、このコースの順番待ちはありません。",
  "Center delivery saved. HQ curriculum was not changed.": "センターでの実施内容を保存しました。本部のカリキュラムは変更されていません。",
  "Return to lesson": "レッスンに戻る",
  "Habit Tracker — interaction flow prototype": "Habit Tracker・操作の流れの試作品",
  "project artifact": "プロジェクト成果物",
  "project artifact · available": "プロジェクト成果物・利用可能",
  "available": "利用可能",
  "Can someone identify the next action?": "次の操作が分かりますか。",
  "Know what happened. Understand what comes next.": "起きたことを知り、次に進むことを理解する。"
};
for (const [source, expected] of Object.entries(requiredRouteLiterals)) assert.equal(jaJPLiterals[source], expected);
for (const source of [
  "Center profile menu", "Coach profile menu", "Student profile menu", "Family profile menu",
  "User utilities", "Center sections", "coach sections", "student sections", "family sections",
  "Academics pages", "Eli Morgan workspace sections", "Close Interaction-flow walkthrough",
  "Close Interaction-flow pattern", "Close Design testing checklist"
]) assert.ok(jaJPLiterals[source], `Missing Japanese accessible-name mapping for: ${source}`);

const control = await readFile(new URL("../src/components/demo/CognitLanguageControls.astro", import.meta.url), "utf8");
assert.match(control, /focusedLocaleRoute && <option value="ja-JP">日本語<\/option>/);
assert.match(control, /focusedLocaleRoute && <option value="hi-IN">हिन्दी<\/option>/);
assert.match(control, /data-center-japanese-enable/);
assert.match(control, /centerId === "northfield"/);
assert.match(control, /data-language-scope-notice/);
const runtime = await readFile(new URL("../src/demo/cognit-localization.js", import.meta.url), "utf8");
assert.match(runtime, /\["ja-JP", "hi-IN"\]\.includes\(savedLocale\)/);
const workspace = await readFile(new URL("../src/components/demo/CognitCurriculumWorkspace.astro", import.meta.url), "utf8");
assert.match(workspace, /data-entered-work/);
assert.match(workspace, /cognit:language-changed/);
assert.match(workspace, /dialog\?\.addEventListener\("close"/);
const student = await readFile(new URL("../src/components/demo/CognitStudentJourneyView.astro", import.meta.url), "utf8");
assert.match(student, /aria-label="Today’s resources"/);
assert.match(student, /aria-label=\{`Close \$\{resource\.title\}`\}/);
assert.match(student, /aria-label="Interaction-flow reference" data-i18n-preserve/);
const family = await readFile(new URL("../src/components/demo/CognitFamilyJourneyView.astro", import.meta.url), "utf8");
assert.match(family, /Eli’s newest Center-reviewed update is still held\./);
assert.match(family, /Eli’s newest Center-reviewed update is now published\./);
const center = await readFile(new URL("../src/components/demo/CognitCenterView.astro", import.meta.url), "utf8");
assert.match(center, /completed, one current,/);
assert.match(center, /data-ja-summary-source/);
assert.match(center, /data-ja-summary-draft/);
assert.match(center, /data-authored-original-locale="en-US">\{selectedCourse\.description\}/);
assert.equal(enUS["center.courseDescription.creativeAppLab"], "Learners turn a personally meaningful idea into a working app prototype, test it with peers, and explain how feedback changed the experience.");
assert.equal(jaJP["center.courseDescriptionDraftLabel"], "日本語ドラフト・有資格の日本語話者による確認待ち");
assert.equal(jaJP["center.originalEnglishSummary"], "英語の原文");
assert.equal(jaJPLiterals["Creative App Lab"], undefined);
const coach = await readFile(new URL("../src/components/demo/CognitCoachJourneyView.astro", import.meta.url), "utf8");
assert.match(coach, /<p data-i18n-preserve lang="en-US">\{model\.primary\.observation\}<\/p>/);
console.log("Seven-route local Japanese/Hindi candidate checks passed; linguistic and browser review remain pending.");
