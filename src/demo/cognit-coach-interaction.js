import { SYNTHETIC_COGNIT_DEMO } from "./cognit-demo-data.js";

export const COGNIT_COACH_INTERACTION_IDS = Object.freeze({
  session: "demo-session-creative-today",
  course: "demo-course-creative-app-lab",
  primaryLearner: "demo-student-eli-morgan",
  secondaryLearner: "demo-student-lena-grant",
  primaryEvent: "demo-event-eli-habit-flow"
});

const data = SYNTHETIC_COGNIT_DEMO;
const byId = (items, id) => items.find((item) => item.id === id);
const clone = (value) => JSON.parse(JSON.stringify(value));

function learnerBaseline(studentId) {
  const person = byId(data.people.students, studentId);
  const progress = data.courseProgress.find((item) => item.studentId === studentId && item.courseId === COGNIT_COACH_INTERACTION_IDS.course);
  const primaryEvent = byId(data.learningEvents, COGNIT_COACH_INTERACTION_IDS.primaryEvent);
  const isPrimary = studentId === COGNIT_COACH_INTERACTION_IDS.primaryLearner;

  if (!person || !progress) throw new Error(`Missing bounded Coach demo learner: ${studentId}`);

  return {
    id: person.id,
    name: person.name,
    courseId: COGNIT_COACH_INTERACTION_IDS.course,
    courseName: byId(data.courses, COGNIT_COACH_INTERACTION_IDS.course).name,
    progress: {
      baselineCompleted: progress.completed,
      completed: progress.completed,
      total: progress.total,
      completedLabel: isPrimary ? primaryEvent.completed : "Earlier course work remains complete.",
      current: isPrimary ? primaryEvent.challenge : progress.current,
      next: isPrimary ? primaryEvent.next : progress.next,
      progressUpdated: false
    },
    artifact: isPrimary ? clone(primaryEvent.evidence) : null,
    evidenceAttached: false,
    observationDraft: isPrimary ? primaryEvent.observation : "",
    observationOriginal: isPrimary ? primaryEvent.observation : "",
    observationSuggestion: "",
    observationSaved: false,
    submitted: false
  };
}

export function createCoachInteractionState() {
  const session = byId(data.sessions, COGNIT_COACH_INTERACTION_IDS.session);
  const course = byId(data.courses, COGNIT_COACH_INTERACTION_IDS.course);
  const coach = byId(data.people.coaches, session.coachId);
  const learnerIds = [COGNIT_COACH_INTERACTION_IDS.primaryLearner, COGNIT_COACH_INTERACTION_IDS.secondaryLearner];

  return {
    synthetic: true,
    classStarted: false,
    elapsedSeconds: 0,
    selectedLearnerId: COGNIT_COACH_INTERACTION_IDS.primaryLearner,
    session: {
      id: session.id,
      label: session.label,
      learningFocus: session.learningFocus,
      contextId: session.contextId,
      contextName: byId(data.contexts, session.contextId).name,
      courseId: course.id,
      courseName: course.name,
      coachId: coach.id,
      coachName: coach.name
    },
    learners: Object.fromEntries(learnerIds.map((id) => [id, learnerBaseline(id)]))
  };
}

export function getSelectedCoachLearner(state) {
  return state.learners[state.selectedLearnerId];
}

export function getCoachReportReadiness(state, learnerId = state.selectedLearnerId) {
  const learner = state.learners[learnerId];
  return {
    progress: learner.progress.progressUpdated,
    evidence: learner.evidenceAttached,
    observation: learner.observationSaved && Boolean(learner.observationDraft.trim())
  };
}

export function isCoachReportReady(state, learnerId = state.selectedLearnerId) {
  const readiness = getCoachReportReadiness(state, learnerId);
  return state.classStarted && Object.values(readiness).every(Boolean);
}

export function reduceCoachInteraction(state, action) {
  if (action.type === "reset") return createCoachInteractionState();

  const next = clone(state);
  if (action.type === "start-class") {
    next.classStarted = true;
    return next;
  }

  if (action.type === "tick" && next.classStarted) {
    next.elapsedSeconds += 1;
    return next;
  }

  if (action.type === "select-learner") {
    if (!next.learners[action.learnerId]) throw new Error(`Learner is outside the bounded session: ${action.learnerId}`);
    next.selectedLearnerId = action.learnerId;
    return next;
  }

  const learner = next.learners[next.selectedLearnerId];
  if (!next.classStarted || learner.submitted) return next;

  if (action.type === "update-progress" && !learner.progress.progressUpdated) {
    const priorCurrent = learner.progress.current;
    learner.progress.completed = Math.min(learner.progress.total, learner.progress.completed + 1);
    learner.progress.completedLabel = priorCurrent;
    learner.progress.current = learner.progress.next;
    learner.progress.next = `Ready for the next ${learner.courseName} learning focus.`;
    learner.progress.progressUpdated = true;
  }

  if (action.type === "attach-evidence" && learner.artifact) learner.evidenceAttached = true;

  if (action.type === "update-observation") {
    learner.observationDraft = String(action.value || "");
    learner.observationSuggestion = "";
    learner.observationSaved = false;
  }

  if (action.type === "request-wording-suggestion" && learner.observationDraft.trim()) {
    learner.observationOriginal = learner.observationDraft;
    learner.observationSuggestion = learner.id === COGNIT_COACH_INTERACTION_IDS.primaryLearner
      ? "Eli independently built the core navigation, then tested the interaction with a classmate and revised one confusing step."
      : learner.observationDraft;
  }

  if (action.type === "accept-wording-suggestion" && learner.observationSuggestion) {
    learner.observationDraft = learner.observationSuggestion;
    learner.observationSuggestion = "";
    learner.observationSaved = false;
  }

  if (action.type === "keep-original-wording") {
    learner.observationDraft = learner.observationOriginal;
    learner.observationSuggestion = "";
    learner.observationSaved = false;
  }

  if (action.type === "save-observation") learner.observationSaved = Boolean(learner.observationDraft.trim());

  if (action.type === "submit-report" && isCoachReportReady(next)) learner.submitted = true;

  return next;
}
