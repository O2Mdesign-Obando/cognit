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

export const COGNIT_STUDENT_LOCALIZATION_GROUPS = Object.freeze({
  today: Object.freeze(["/learninghub/demo/student"]),
  activeLesson: Object.freeze(["/learninghub/demo/student/lesson", "/learninghub/demo/student/active", "/learninghub/demo/student/reflection", "/learninghub/demo/student/complete"]),
  workAndProgress: Object.freeze(["/learninghub/demo/student/my-work", "/learninghub/demo/student/artifact", "/learninghub/demo/student/progress"]),
  coursesAndJourney: Object.freeze(["/learninghub/demo/student/courses", "/learninghub/demo/student/courses/lena", "/learninghub/demo/student/journey", "/learninghub/demo/student/journey/eli"])
});

export const COGNIT_FAMILY_LOCALIZATION_GROUPS = Object.freeze({
  homeAndJourney: Object.freeze(["/learninghub/demo/family", "/learninghub/demo/family/journey", "/learninghub/demo/family/journey/eli"]),
  attendance: Object.freeze(["/learninghub/demo/family/attendance", "/learninghub/demo/family/attendance/eli", "/learninghub/demo/family/attendance/sofia", "/learninghub/demo/family/absence", "/learninghub/demo/family/absence-confirmed", "/learninghub/demo/family/makeup"]),
  relationshipAndOperations: Object.freeze(["/learninghub/demo/family/messages", "/learninghub/demo/family/courses", "/learninghub/demo/family/billing", "/learninghub/demo/family/account", "/learninghub/demo/family/support"])
});

export const COGNIT_CENTER_LOCALIZATION_GROUPS = Object.freeze({
  overviewAndClasses: Object.freeze([
    "/learninghub/demo/center", "/learninghub/demo/center/classes", "/learninghub/demo/center/classes/creative", "/learninghub/demo/center/classes/creative/attendance", "/learninghub/demo/center/classes/robotics",
    "/learninghub/demo/center/context/northfield", "/learninghub/demo/center/context/northfield/classes", "/learninghub/demo/center/context/northfield/classes/creative", "/learninghub/demo/center/context/northfield/classes/creative/attendance", "/learninghub/demo/center/context/northfield/classes/robotics",
    "/learninghub/demo/center/context/harbor", "/learninghub/demo/center/context/harbor/classes", "/learninghub/demo/center/context/harbor/classes/creative", "/learninghub/demo/center/context/harbor/classes/creative/attendance", "/learninghub/demo/center/context/harbor/classes/robotics"
  ]),
  coaches: Object.freeze([
    "/learninghub/demo/center/coaches", "/learninghub/demo/center/coaches/jordan", "/learninghub/demo/center/coaches/priya", "/learninghub/demo/center/coaches/avery",
    "/learninghub/demo/center/context/northfield/coaches", "/learninghub/demo/center/context/northfield/coaches/jordan", "/learninghub/demo/center/context/northfield/coaches/priya", "/learninghub/demo/center/context/northfield/coaches/avery",
    "/learninghub/demo/center/context/harbor/coaches", "/learninghub/demo/center/context/harbor/coaches/jordan", "/learninghub/demo/center/context/harbor/coaches/priya", "/learninghub/demo/center/context/harbor/coaches/avery"
  ]),
  families: Object.freeze([
    "/learninghub/demo/center/families", "/learninghub/demo/center/families/morgan", "/learninghub/demo/center/families/reyes", "/learninghub/demo/center/families/park",
    "/learninghub/demo/center/context/northfield/families", "/learninghub/demo/center/context/northfield/families/morgan", "/learninghub/demo/center/context/northfield/families/reyes", "/learninghub/demo/center/context/northfield/families/park",
    "/learninghub/demo/center/context/harbor/families", "/learninghub/demo/center/context/harbor/families/morgan", "/learninghub/demo/center/context/harbor/families/reyes", "/learninghub/demo/center/context/harbor/families/park"
  ]),
  students: Object.freeze([
    "/learninghub/demo/center/students", "/learninghub/demo/center/students/eli", "/learninghub/demo/center/students/sofia", "/learninghub/demo/center/students/noah", "/learninghub/demo/center/students/mina", "/learninghub/demo/center/students/lena", "/learninghub/demo/center/students/ava", "/learninghub/demo/center/students/morgan", "/learninghub/demo/center/students/reyes", "/learninghub/demo/center/students/bennett", "/learninghub/demo/center/students/park", "/learninghub/demo/center/students/grant", "/learninghub/demo/center/students/thompson",
    "/learninghub/demo/center/context/northfield/students", "/learninghub/demo/center/context/northfield/students/eli", "/learninghub/demo/center/context/northfield/students/sofia", "/learninghub/demo/center/context/northfield/students/noah", "/learninghub/demo/center/context/northfield/students/mina", "/learninghub/demo/center/context/northfield/students/lena", "/learninghub/demo/center/context/northfield/students/ava", "/learninghub/demo/center/context/northfield/students/morgan", "/learninghub/demo/center/context/northfield/students/reyes", "/learninghub/demo/center/context/northfield/students/bennett", "/learninghub/demo/center/context/northfield/students/park", "/learninghub/demo/center/context/northfield/students/grant", "/learninghub/demo/center/context/northfield/students/thompson",
    "/learninghub/demo/center/context/harbor/students", "/learninghub/demo/center/context/harbor/students/eli", "/learninghub/demo/center/context/harbor/students/sofia", "/learninghub/demo/center/context/harbor/students/noah", "/learninghub/demo/center/context/harbor/students/mina", "/learninghub/demo/center/context/harbor/students/lena", "/learninghub/demo/center/context/harbor/students/ava", "/learninghub/demo/center/context/harbor/students/morgan", "/learninghub/demo/center/context/harbor/students/reyes", "/learninghub/demo/center/context/harbor/students/bennett", "/learninghub/demo/center/context/harbor/students/park", "/learninghub/demo/center/context/harbor/students/grant", "/learninghub/demo/center/context/harbor/students/thompson"
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
    center: Object.freeze({ routes: 321, completedRoutes: 78, completedGroups: Object.freeze(["overviewAndClasses", "coaches", "families", "students"]), initialCopy: "partial_with_explicit_fallback", interactiveStates: "partial_with_explicit_fallback" }),
    coach: Object.freeze({ routes: 26, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" }),
    student: Object.freeze({ routes: 12, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" }),
    family: Object.freeze({ routes: 14, initialCopy: "candidate_spanish_drafted", interactiveStates: "candidate_spanish_drafted" }),
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
