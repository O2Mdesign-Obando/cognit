import { COGNIT_DEMO_LOCALIZATION_MANIFEST_META } from "./cognit-localization-route-manifest.js";

export const COGNIT_COACH_LOCALIZATION_GROUPS = Object.freeze({
  interactiveTeachingRoot: Object.freeze(["/learninghub/demo/coach"]),
  teachingJourney: Object.freeze([
    "/learninghub/demo/coach/today",
    "/learninghub/demo/coach/readiness",
    "/learninghub/demo/coach/live",
    "/learninghub/demo/coach/capture",
    "/learninghub/demo/coach/after-class",
    "/learninghub/demo/coach/end-of-day"
  ]),
  supportAndCorrespondence: Object.freeze([
    "/learninghub/demo/coach/releases",
    "/learninghub/demo/coach/support",
    "/learninghub/demo/coach/profile",
    "/learninghub/demo/coach/correspondence"
  ]),
  eliWorkspaceAndAliases: Object.freeze([
    "/learninghub/demo/coach/learners/eli",
    "/learninghub/demo/coach/learners/eli/progress",
    "/learninghub/demo/coach/learners/eli/evidence",
    "/learninghub/demo/coach/learners/eli/observations",
    "/learninghub/demo/coach/progress/eli",
    "/learninghub/demo/coach/observations/eli",
    "/learninghub/demo/coach/evidence/eli"
  ]),
  genericDeepViews: Object.freeze([
    "/learninghub/demo/coach/class",
    "/learninghub/demo/coach/learners/noah",
    "/learninghub/demo/coach/learners/lena",
    "/learninghub/demo/coach/learning-plan",
    "/learninghub/demo/coach/progress",
    "/learninghub/demo/coach/progress/lena",
    "/learninghub/demo/coach/observations",
    "/learninghub/demo/coach/reporting"
  ])
});

export const COGNIT_LOCALIZATION_COVERAGE = Object.freeze({
  manifest: COGNIT_DEMO_LOCALIZATION_MANIFEST_META,
  reviewStatus: "SPANISH_HUMAN_REVIEW_PENDING",
  mechanics: Object.freeze({
    sameRouteSwitching: "implemented",
    exactRouteBinding: "implemented",
    entryPreference: "implemented_independent",
    hqPreference: "implemented_independent",
    perPersonPreferences: "implemented",
    northfieldEnablement: "implemented_center_scoped",
    harborEnablement: "implemented_center_scoped",
    explicitEnglishFallback: "implemented",
    authoredOriginalPreservation: "implemented_for_declared_records",
    userEnteredContentPreservation: "implemented",
    progressionMutation: "prohibited"
  }),
  families: Object.freeze({
    entry: Object.freeze({ routes: 1, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" }),
    center: Object.freeze({ routes: 321, initialCopy: "partial_with_explicit_fallback", interactiveStates: "partial_with_explicit_fallback" }),
    coach: Object.freeze({ routes: 26, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" }),
    student: Object.freeze({ routes: 12, initialCopy: "partial_with_explicit_fallback", interactiveStates: "partial_with_explicit_fallback" }),
    family: Object.freeze({ routes: 14, initialCopy: "partial_with_explicit_fallback", interactiveStates: "partial_with_explicit_fallback" }),
    hq: Object.freeze({ routes: 11, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" })
  }),
  interactiveStateInventory: Object.freeze([
    "shared navigation and profile menus",
    "Center context navigation and language enablement",
    "forms validation dialogs confirmations notifications and empty states",
    "Coach learner workspace and report lifecycle",
    "Student activity reflection resources and entered work",
    "Family attendance messages courses billing account and support",
    "HQ filters cases deployment modules and allocation",
    "read-only curriculum presentation and position"
  ])
});
