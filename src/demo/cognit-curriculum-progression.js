const modules = [
  {
    id: "creative-foundations",
    sequence: 1,
    state: "completed",
    completed: true,
    teachingPosition: false,
    referenceAccessible: true,
    available: true,
    titleKey: "module.creative-foundations.title",
    summaryKey: "module.creative-foundations.summary"
  },
  {
    id: "creative-prototype",
    sequence: 2,
    state: "current",
    completed: false,
    teachingPosition: true,
    referenceAccessible: false,
    available: true,
    titleKey: "module.creative-prototype.title",
    summaryKey: "module.creative-prototype.summary"
  },
  {
    id: "creative-share",
    sequence: 3,
    state: "available",
    completed: false,
    teachingPosition: false,
    referenceAccessible: false,
    available: true,
    titleKey: "module.creative-share.title",
    summaryKey: "module.creative-share.summary"
  },
  {
    id: "creative-showcase",
    sequence: 4,
    state: "locked",
    completed: false,
    teachingPosition: false,
    referenceAccessible: false,
    available: false,
    titleKey: "module.creative-showcase.title",
    summaryKey: "module.creative-showcase.summary"
  }
];

export const creativeAppLabProgression = Object.freeze({
  fixtureId: "cognit-demo-creative-app-lab-progression-01",
  courseId: "creative-app-lab",
  synthetic: true,
  mutationAuthorized: false,
  teachingModuleId: "creative-prototype",
  completedModuleIds: ["creative-foundations"],
  referenceAccessibleModuleIds: ["creative-foundations"],
  availableModuleIds: ["creative-foundations", "creative-prototype", "creative-share"],
  modules
});

export function getCreativeAppLabProgressionProjection(role) {
  if (!new Set(["center", "coach", "student", "family"]).has(role)) return null;
  return {
    fixtureId: creativeAppLabProgression.fixtureId,
    courseId: creativeAppLabProgression.courseId,
    role,
    synthetic: true,
    mutationAuthorized: false,
    modules: modules.map((module) => ({
      id: module.id,
      sequence: module.sequence,
      state: module.state,
      completed: module.completed,
      teachingPosition: module.teachingPosition,
      referenceAccessible: module.referenceAccessible,
      available: module.available,
      titleKey: module.titleKey,
      summaryKey: module.summaryKey
    }))
  };
}
