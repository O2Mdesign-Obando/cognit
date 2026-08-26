import { SYNTHETIC_COGNIT_DEMO } from "./cognit-demo-data.js";

export const COGNIT_STUDENT_INTERACTION_IDS = Object.freeze({
  student: "demo-student-eli-morgan",
  coach: "demo-coach-jordan-ellis",
  course: "demo-course-creative-app-lab",
  session: "demo-session-creative-today",
  event: "demo-event-eli-habit-flow"
});

const data = SYNTHETIC_COGNIT_DEMO;
const byId = (items, id) => items.find((item) => item.id === id);
const clone = (value) => JSON.parse(JSON.stringify(value));

export function createStudentLessonState() {
  const event = byId(data.learningEvents, COGNIT_STUDENT_INTERACTION_IDS.event);
  const session = byId(data.sessions, COGNIT_STUDENT_INTERACTION_IDS.session);
  const student = byId(data.people.students, COGNIT_STUDENT_INTERACTION_IDS.student);
  const coach = byId(data.people.coaches, COGNIT_STUDENT_INTERACTION_IDS.coach);
  const course = byId(data.courses, COGNIT_STUDENT_INTERACTION_IDS.course);

  return {
    synthetic: true,
    phase: "ready",
    elapsedSeconds: 0,
    student: { id: student.id, name: student.name },
    coach: { id: coach.id, name: coach.name },
    course: { id: course.id, name: course.name },
    session: { id: session.id, label: session.label, learningFocus: session.learningFocus },
    progress: {
      completed: event.progression.completed,
      total: event.progression.total,
      stepAdvanced: false,
      completedLabel: event.completed,
      current: event.challenge,
      next: event.next
    },
    scratchpad: "",
    helpRequested: false,
    reflection: { mood: "", outcome: "", text: "", skipped: false },
    completed: false
  };
}
export function canFinishStudentLesson(state) {
  return state.phase === "active" && state.progress.stepAdvanced;
}

export function reduceStudentLesson(state, action) {
  if (action.type === "reset") return createStudentLessonState();
  const next = clone(state);

  if (action.type === "start") {
    next.phase = "active";
    return next;
  }
  if (action.type === "tick" && next.phase === "active") {
    next.elapsedSeconds += 1;
    return next;
  }
  if (action.type === "update-scratchpad" && next.phase === "active") {
    next.scratchpad = String(action.value || "");
    return next;
  }
  if (action.type === "request-help" && next.phase === "active") {
    next.helpRequested = true;
    return next;
  }
  if (action.type === "complete-step" && next.phase === "active" && !next.progress.stepAdvanced) {
    next.progress.completed = Math.min(next.progress.total, next.progress.completed + 1);
    next.progress.completedLabel = next.progress.current;
    next.progress.current = next.progress.next;
    next.progress.next = "Continue testing and refining the interaction flow.";
    next.progress.stepAdvanced = true;
    return next;
  }
  if (action.type === "finish" && canFinishStudentLesson(next)) {
    next.phase = "reflection";
    return next;
  }
  if (action.type === "set-mood" && next.phase === "reflection") next.reflection.mood = String(action.value || "");
  if (action.type === "set-outcome" && next.phase === "reflection") next.reflection.outcome = String(action.value || "");
  if (action.type === "set-reflection" && next.phase === "reflection") next.reflection.text = String(action.value || "");
  if (action.type === "skip-reflection" && next.phase === "reflection") {
    next.reflection = { mood: "", outcome: "", text: "", skipped: true };
    next.phase = "complete";
    next.completed = true;
  }
  if (action.type === "submit-reflection" && next.phase === "reflection") {
    next.phase = "complete";
    next.completed = true;
  }
  return next;
}
