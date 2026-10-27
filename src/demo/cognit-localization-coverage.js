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
  ]),
  configuration: Object.freeze([
    "/learninghub/demo/center/configuration", "/learninghub/demo/center/configuration/modules", "/learninghub/demo/center/module-control", "/learninghub/demo/center/settings",
    "/learninghub/demo/center/context/northfield/configuration", "/learninghub/demo/center/context/northfield/configuration/modules", "/learninghub/demo/center/context/northfield/module-control", "/learninghub/demo/center/context/northfield/settings",
    "/learninghub/demo/center/context/harbor/configuration", "/learninghub/demo/center/context/harbor/configuration/modules", "/learninghub/demo/center/context/harbor/module-control", "/learninghub/demo/center/context/harbor/settings"
  ]),
  supportAndReleases: Object.freeze([
    "/learninghub/demo/center/support", "/learninghub/demo/center/whats-new", "/learninghub/demo/center/whats-new/archive",
    "/learninghub/demo/center/context/northfield/support", "/learninghub/demo/center/context/northfield/whats-new", "/learninghub/demo/center/context/northfield/whats-new/archive",
    "/learninghub/demo/center/context/harbor/support", "/learninghub/demo/center/context/harbor/whats-new", "/learninghub/demo/center/context/harbor/whats-new/archive"
  ]),
  attendanceAndMakeups: Object.freeze([
    "/learninghub/demo/center/attendance", "/learninghub/demo/center/attendance/absence/mina-storytelling", "/learninghub/demo/center/attendance/cancellation/creative-weather", "/learninghub/demo/center/attendance/eli", "/learninghub/demo/center/attendance/makeup", "/learninghub/demo/center/attendance/makeup/eli-creative-weather", "/learninghub/demo/center/attendance/makeup/lena-creative-weather", "/learninghub/demo/center/attendance/makeup/mina-storytelling", "/learninghub/demo/center/attendance/makeup/sofia-robotics", "/learninghub/demo/center/attendance/makeup/sofia-robotics-expired", "/learninghub/demo/center/attendance/makeup/sofia-robotics-redeemed", "/learninghub/demo/center/attendance/override/ava-storytelling", "/learninghub/demo/center/attendance/sofia",
    "/learninghub/demo/center/context/northfield/attendance", "/learninghub/demo/center/context/northfield/attendance/absence/mina-storytelling", "/learninghub/demo/center/context/northfield/attendance/cancellation/creative-weather", "/learninghub/demo/center/context/northfield/attendance/eli", "/learninghub/demo/center/context/northfield/attendance/makeup", "/learninghub/demo/center/context/northfield/attendance/makeup/eli-creative-weather", "/learninghub/demo/center/context/northfield/attendance/makeup/lena-creative-weather", "/learninghub/demo/center/context/northfield/attendance/makeup/mina-storytelling", "/learninghub/demo/center/context/northfield/attendance/makeup/sofia-robotics", "/learninghub/demo/center/context/northfield/attendance/makeup/sofia-robotics-expired", "/learninghub/demo/center/context/northfield/attendance/makeup/sofia-robotics-redeemed", "/learninghub/demo/center/context/northfield/attendance/override/ava-storytelling", "/learninghub/demo/center/context/northfield/attendance/sofia",
    "/learninghub/demo/center/context/harbor/attendance", "/learninghub/demo/center/context/harbor/attendance/absence/mina-storytelling", "/learninghub/demo/center/context/harbor/attendance/cancellation/creative-weather", "/learninghub/demo/center/context/harbor/attendance/eli", "/learninghub/demo/center/context/harbor/attendance/makeup", "/learninghub/demo/center/context/harbor/attendance/makeup/eli-creative-weather", "/learninghub/demo/center/context/harbor/attendance/makeup/lena-creative-weather", "/learninghub/demo/center/context/harbor/attendance/makeup/mina-storytelling", "/learninghub/demo/center/context/harbor/attendance/makeup/sofia-robotics", "/learninghub/demo/center/context/harbor/attendance/makeup/sofia-robotics-expired", "/learninghub/demo/center/context/harbor/attendance/makeup/sofia-robotics-redeemed", "/learninghub/demo/center/context/harbor/attendance/override/ava-storytelling", "/learninghub/demo/center/context/harbor/attendance/sofia"
  ]),
  migration: Object.freeze([
    "/learninghub/demo/center/migration", "/learninghub/demo/center/migration/map", "/learninghub/demo/center/migration/preview", "/learninghub/demo/center/migration/processing", "/learninghub/demo/center/migration/ready", "/learninghub/demo/center/migration/select", "/learninghub/demo/center/migration/source",
    "/learninghub/demo/center/context/northfield/migration", "/learninghub/demo/center/context/northfield/migration/map", "/learninghub/demo/center/context/northfield/migration/preview", "/learninghub/demo/center/context/northfield/migration/processing", "/learninghub/demo/center/context/northfield/migration/ready", "/learninghub/demo/center/context/northfield/migration/select", "/learninghub/demo/center/context/northfield/migration/source",
    "/learninghub/demo/center/context/harbor/migration", "/learninghub/demo/center/context/harbor/migration/map", "/learninghub/demo/center/context/harbor/migration/preview", "/learninghub/demo/center/context/harbor/migration/processing", "/learninghub/demo/center/context/harbor/migration/ready", "/learninghub/demo/center/context/harbor/migration/select", "/learninghub/demo/center/context/harbor/migration/source"
  ]),
  courses: Object.freeze([
    "/learninghub/demo/center/courses", "/learninghub/demo/center/courses/creative-app-lab", "/learninghub/demo/center/courses/robotics-studio", "/learninghub/demo/center/courses/digital-storytelling-lab",
    "/learninghub/demo/center/context/northfield/courses", "/learninghub/demo/center/context/northfield/courses/creative-app-lab", "/learninghub/demo/center/context/northfield/courses/robotics-studio", "/learninghub/demo/center/context/northfield/courses/digital-storytelling-lab",
    "/learninghub/demo/center/context/harbor/courses", "/learninghub/demo/center/context/harbor/courses/creative-app-lab", "/learninghub/demo/center/context/harbor/courses/robotics-studio", "/learninghub/demo/center/context/harbor/courses/digital-storytelling-lab"
  ]),
  reports: Object.freeze([
    "/learninghub/demo/center/reports", "/learninghub/demo/center/reports/attention", "/learninghub/demo/center/reports/ready", "/learninghub/demo/center/reports/all", "/learninghub/demo/center/reports/published", "/learninghub/demo/center/reports/eli", "/learninghub/demo/center/reports/sofia", "/learninghub/demo/center/reports/builder",
    "/learninghub/demo/center/context/northfield/reports", "/learninghub/demo/center/context/northfield/reports/attention", "/learninghub/demo/center/context/northfield/reports/ready", "/learninghub/demo/center/context/northfield/reports/all", "/learninghub/demo/center/context/northfield/reports/published", "/learninghub/demo/center/context/northfield/reports/eli", "/learninghub/demo/center/context/northfield/reports/sofia", "/learninghub/demo/center/context/northfield/reports/builder",
    "/learninghub/demo/center/context/harbor/reports", "/learninghub/demo/center/context/harbor/reports/attention", "/learninghub/demo/center/context/harbor/reports/ready", "/learninghub/demo/center/context/harbor/reports/all", "/learninghub/demo/center/context/harbor/reports/published", "/learninghub/demo/center/context/harbor/reports/eli", "/learninghub/demo/center/context/harbor/reports/sofia", "/learninghub/demo/center/context/harbor/reports/builder"
  ]),
  scheduleAliases: Object.freeze([
    "/learninghub/demo/center/schedule", "/learninghub/demo/center/schedule/creative",
    "/learninghub/demo/center/context/northfield/schedule", "/learninghub/demo/center/context/northfield/schedule/creative",
    "/learninghub/demo/center/context/harbor/schedule", "/learninghub/demo/center/context/harbor/schedule/creative"
  ]),
  messageAliases: Object.freeze([
    "/learninghub/demo/center/messages", "/learninghub/demo/center/context/northfield/messages", "/learninghub/demo/center/context/harbor/messages"
  ]),
  communicationInboxAndThreads: Object.freeze([
    "/learninghub/demo/center/communication", "/learninghub/demo/center/communication/coach", "/learninghub/demo/center/communication/family", "/learninghub/demo/center/communication/thread/harbor-jordan", "/learninghub/demo/center/communication/thread/jordan-materials", "/learninghub/demo/center/communication/thread/morgan-schedule", "/learninghub/demo/center/communication/thread/priya-evidence", "/learninghub/demo/center/communication/thread/reyes-makeup",
    "/learninghub/demo/center/context/northfield/communication", "/learninghub/demo/center/context/northfield/communication/coach", "/learninghub/demo/center/context/northfield/communication/family", "/learninghub/demo/center/context/northfield/communication/thread/harbor-jordan", "/learninghub/demo/center/context/northfield/communication/thread/jordan-materials", "/learninghub/demo/center/context/northfield/communication/thread/morgan-schedule", "/learninghub/demo/center/context/northfield/communication/thread/priya-evidence", "/learninghub/demo/center/context/northfield/communication/thread/reyes-makeup",
    "/learninghub/demo/center/context/harbor/communication", "/learninghub/demo/center/context/harbor/communication/coach", "/learninghub/demo/center/context/harbor/communication/family", "/learninghub/demo/center/context/harbor/communication/thread/harbor-jordan", "/learninghub/demo/center/context/harbor/communication/thread/jordan-materials", "/learninghub/demo/center/context/harbor/communication/thread/morgan-schedule", "/learninghub/demo/center/context/harbor/communication/thread/priya-evidence", "/learninghub/demo/center/context/harbor/communication/thread/reyes-makeup"
  ]),
  communicationComposeAndAnnouncements: Object.freeze([
    "/learninghub/demo/center/communication/compose", "/learninghub/demo/center/communication/announcements", "/learninghub/demo/center/communication/announcements/new",
    "/learninghub/demo/center/context/northfield/communication/compose", "/learninghub/demo/center/context/northfield/communication/announcements", "/learninghub/demo/center/context/northfield/communication/announcements/new",
    "/learninghub/demo/center/context/harbor/communication/compose", "/learninghub/demo/center/context/harbor/communication/announcements", "/learninghub/demo/center/context/harbor/communication/announcements/new"
  ]),
  billingOverviewAndDashboard: Object.freeze([
    "/learninghub/demo/center/billing", "/learninghub/demo/center/billing/dashboard",
    "/learninghub/demo/center/context/northfield/billing", "/learninghub/demo/center/context/northfield/billing/dashboard",
    "/learninghub/demo/center/context/harbor/billing", "/learninghub/demo/center/context/harbor/billing/dashboard"
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
    center: Object.freeze({ routes: 321, completedRoutes: 243, completedGroups: Object.freeze(["overviewAndClasses", "coaches", "families", "students", "configuration", "supportAndReleases", "attendanceAndMakeups", "migration", "courses", "reports", "scheduleAliases", "messageAliases", "communicationInboxAndThreads", "communicationComposeAndAnnouncements", "billingOverviewAndDashboard"]), initialCopy: "partial_with_explicit_fallback", interactiveStates: "partial_with_explicit_fallback" }),
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
