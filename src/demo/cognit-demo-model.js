import { SYNTHETIC_COGNIT_DEMO } from "./cognit-demo-data.js";

const data = SYNTHETIC_COGNIT_DEMO;
const byId = (items, id) => items.find((item) => item.id === id);
const student = (id) => byId(data.people.students, id);
const coach = (id) => byId(data.people.coaches, id);
const course = (id) => byId(data.courses, id);
const context = (id) => byId(data.contexts, id);
const session = (id) => byId(data.sessions, id);
const event = (id) => byId(data.learningEvents, id);

const eliEvent = () => event("demo-event-eli-habit-flow");
const sofiaEvent = () => event("demo-event-sofia-sensor-test");

function sharedModel() {
  return {
    synthetic: true,
    organization: { id: data.id, name: data.name },
    perspectives: ["center", "coach", "student", "family"]
  };
}

function centerModel() {
  const eli = eliEvent();
  const sofia = sofiaEvent();
  const minaEnrollments = data.enrollments.filter((item) => item.studentId === "demo-student-mina-park");
  const lenaEnrollments = data.enrollments.filter((item) => item.studentId === "demo-student-lena-grant" && item.status === "active");
  return {
    ...sharedModel(),
    role: "center",
    person: data.people.centerDirector,
    context: context("demo-context-northfield-studio"),
    summary: {
      activeCourses: data.courses.length,
      learnersExpected: new Set(data.sessions.flatMap((item) => item.studentIds)).size,
      coaches: data.people.coaches.length,
      operationalStatus: "One item needs attention"
    },
    needsAttention: {
      student: student(sofia.studentId),
      course: course(sofia.courseId),
      status: sofia.report.label,
      reason: sofia.report.reason
    },
    flowingNormally: {
      student: student(eli.studentId),
      course: course(eli.courseId),
      status: eli.report.label,
      detail: "Learning update processed — no Center intervention required."
    },
    makeup: {
      student: student("demo-student-sofia-reyes"),
      ...data.makeupEntitlements[0]
    },
    continuity: {
      transition: {
        student: student("demo-student-mina-park"),
        historical: context(minaEnrollments.find((item) => item.status === "historical").contextId),
        current: context(minaEnrollments.find((item) => item.status === "active").contextId)
      },
      multiCourse: {
        student: student("demo-student-lena-grant"),
        courses: lenaEnrollments.map((item) => course(item.courseId))
      }
    },
    contexts: data.contexts
  };
}

function coachModel() {
  const primary = eliEvent();
  const teachingSession = session(primary.sessionId);
  const sofia = sofiaEvent();
  return {
    ...sharedModel(),
    role: "coach",
    person: coach(teachingSession.coachId),
    context: context(teachingSession.contextId),
    session: { ...teachingSession, course: course(teachingSession.courseId) },
    roster: teachingSession.studentIds.map((id) => ({
      ...student(id),
      current: id === primary.studentId ? primary.challenge : "Continue the current course challenge.",
      status: id === primary.studentId ? "Progress recorded" : "Learning in progress"
    })),
    primary: {
      student: student(primary.studentId),
      challenge: primary.challenge,
      completed: primary.completed,
      next: primary.next,
      observation: primary.observation,
      evidence: primary.evidence,
      progression: primary.progression,
      report: primary.report
    },
    clarification: {
      coach: coach("demo-coach-priya-nair"),
      student: student(sofia.studentId),
      course: course(sofia.courseId),
      status: "Returned for clarification",
      reason: sofia.report.reason
    }
  };
}

function studentModel() {
  const primary = eliEvent();
  const teachingSession = session(primary.sessionId);
  const lenaCourses = data.enrollments
    .filter((item) => item.studentId === "demo-student-lena-grant" && item.status === "active")
    .map((item) => course(item.courseId));
  return {
    ...sharedModel(),
    role: "student",
    person: student(primary.studentId),
    coach: coach(teachingSession.coachId),
    course: course(primary.courseId),
    session: teachingSession,
    challenge: primary.challenge,
    completed: primary.completed,
    next: primary.next,
    progression: primary.progression,
    artifact: primary.evidence,
    observation: primary.observation,
    familyUpdate: primary.familyUpdate,
    publishedStory: primary.publishedStory,
    continuityExample: { student: student("demo-student-lena-grant"), courses: lenaCourses }
  };
}

function familyModel() {
  const primary = eliEvent();
  const family = byId(data.people.families, "demo-family-morgan");
  const makeup = data.makeupEntitlements[0];
  return {
    ...sharedModel(),
    role: "family",
    person: family.guardian,
    family,
    student: student(primary.studentId),
    course: course(primary.courseId),
    attendance: primary.attendance,
    challenge: primary.challenge,
    completed: primary.completed,
    next: primary.next,
    progression: primary.progression,
    observation: primary.observation,
    evidence: primary.evidence,
    report: primary.report,
    update: primary.familyUpdate,
    publishedStory: primary.publishedStory,
    action: "No action needed",
    secondary: {
      family: byId(data.people.families, "demo-family-reyes"),
      student: student(makeup.studentId),
      makeup
    }
  };
}

export function getCognitDemoPerspectiveModel(role) {
  const selectors = { center: centerModel, coach: coachModel, student: studentModel, family: familyModel };
  if (!selectors[role]) throw new Error(`Unknown Cognit demo perspective: ${role}`);
  return selectors[role]();
}

export function getCognitDemoData() {
  return data;
}
