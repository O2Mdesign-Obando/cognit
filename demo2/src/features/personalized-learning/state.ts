export type Position = "Top" | "Right" | "Bottom" | "Left"
export type Presentation = "narrated" | "interactive" | "written"
export type StudentId = "robert" | "lily" | "jake"
export type DemoView = "hq-upload" | "hq-processing" | "hq-clarify" | "hq-failure" | "hq-review" | "available" | "adventure" | "practice" | "checks" | "results" | "coach" | "evidence" | "updated" | "family-draft" | "family-view"

export interface ApprovalRecord {
  id: string
  kind: "package" | "evidence" | "report"
  version: string
  status: "accepted" | "invalidated"
  acceptedAt: string
  invalidatedAt?: string
  invalidatedReason?: string
}

export interface AttemptRecord {
  id: string
  activity: "adventure-1" | "adventure-2" | "guided" | "interactive" | "check-1" | "check-2" | "transfer"
  prompt: string
  packageVersion: string
  answer?: Position
  originalAnswer?: Position
  revisions: Position[]
  explanation: string
  responseMode: "text" | "coach-recorded"
  hintUsed: boolean
  demonstrationUsed: boolean
  supportNotes: string[]
  submitted: boolean
  correct: boolean
  independentlyExplained: boolean
  reviewedByMarcus: boolean
  createdAt: string
  submittedAt?: string
}

export interface RecommendationRecord {
  id: string
  approach: Presentation | "narrated-then-reduced" | "dismissed"
  action: "accepted" | "modified" | "dismissed"
  reason: string
  evidenceIds: string[]
  createdAt: string
}

export interface ReportRevision {
  id: string
  version: string
  contentFingerprint: string
  status: "draft" | "approved" | "shared" | "invalidated"
  createdAt: string
  invalidatedReason?: string
}

export interface StudentRecord {
  id: StudentId
  name: string
  preference: string
  preparedPriorHistory: string[]
  remainingUncertainty: string
  practicePresentation: Presentation
  previewPresentation?: Presentation
  attempts: AttemptRecord[]
  reflection?: string
  recommendationHistory: RecommendationRecord[]
  pendingRecommendation?: Presentation
  evidenceApprovals: ApprovalRecord[]
  reportRevisions: ReportRevision[]
}

export interface PersonalizedLearningState {
  schemaVersion: 1
  locale: "en" | "es"
  view: DemoView
  activeStudent: StudentId
  activePresentation: Presentation
  activeCheck: 1 | 2
  storyboardFrame: 1 | 2 | 3
  captionsOn: boolean
  transcriptOpen: boolean
  package: {
    sourceFile: "motor-lab-v1.2.pdf"
    sourceVersion: "1.2"
    draftVersion: "0.9"
    preparedVersion: "1.0"
    status: "upload" | "preparing" | "clarification" | "failure" | "review" | "available"
    clarificationSaved: boolean
    approvals: ApprovalRecord[]
  }
  students: Record<StudentId, StudentRecord>
  presenterOpen: boolean
}

const NOW = "2026-11-21T12:00:00-05:00"

function student(
  id: StudentId,
  name: string,
  preference: string,
  practicePresentation: Presentation,
  prior: string[],
  uncertainty: string,
): StudentRecord {
  return {
    id,
    name,
    preference,
    preparedPriorHistory: prior,
    remainingUncertainty: uncertainty,
    practicePresentation,
    attempts: [],
    recommendationHistory: [],
    pendingRecommendation: id === "lily" ? "narrated" : undefined,
    evidenceApprovals: [],
    reportRevisions: [],
  }
}

export function emptyState(): PersonalizedLearningState {
  return {
    schemaVersion: 1,
    locale: "en",
    view: "hq-upload",
    activeStudent: "robert",
    activePresentation: "narrated",
    activeCheck: 1,
    storyboardFrame: 1,
    captionsOn: true,
    transcriptOpen: false,
    package: {
      sourceFile: "motor-lab-v1.2.pdf",
      sourceVersion: "1.2",
      draftVersion: "0.9",
      preparedVersion: "1.0",
      status: "upload",
      clarificationSaved: false,
      approvals: [],
    },
    students: {
      robert: student(
        "robert",
        "Robert Hayes",
        "Trying the controls helped.",
        "narrated",
        ["Initial direction response was revised after one supported example."],
        "Whole-turn counting is not yet independently established.",
      ),
      lily: student(
        "lily",
        "Lily Chen",
        "Let me test my ideas.",
        "interactive",
        [
          "Direction has been stronger than full-turn counting in prepared prior history.",
        ],
        "A current-session counting explanation is still needed.",
      ),
      jake: student(
        "jake",
        "Jake Thompson",
        "Keep the instructions short.",
        "written",
        [
          "Two prior fictional predictions were independently explained without help.",
        ],
        "Transfer to a new starting position remains unobserved.",
      ),
    },
    presenterOpen: false,
  }
}

export function createAttempt(
  activity: AttemptRecord["activity"],
  prompt: string,
): AttemptRecord {
  return {
    id: `${activity}-${Date.now()}`,
    activity,
    prompt,
    packageVersion: "1.0",
    revisions: [],
    explanation: "",
    responseMode: "text",
    hintUsed: false,
    demonstrationUsed: false,
    supportNotes: [],
    submitted: false,
    correct: false,
    independentlyExplained: false,
    reviewedByMarcus: false,
    createdAt: new Date().toISOString(),
  }
}

export function populatedRobertState(): PersonalizedLearningState {
  const state = emptyState()
  state.view = "coach"
  state.package.status = "available"
  state.package.clarificationSaved = true
  state.package.approvals = [
    {
      id: "package-v1",
      kind: "package",
      version: "1.0",
      status: "accepted",
      acceptedAt: NOW,
    },
  ]
  state.students.robert.attempts = [
    {
      ...createAttempt("adventure-1", "¼ clockwise from Top"),
      id: "robert-adventure-1",
      answer: "Right",
      originalAnswer: "Top",
      revisions: ["Right"],
      hintUsed: true,
      supportNotes: ["Used one visual hint before revising."],
      submitted: true,
      correct: true,
      submittedAt: NOW,
    },
    {
      ...createAttempt("check-1", "1¼ counterclockwise from Top"),
      id: "robert-check-1",
      answer: "Left",
      originalAnswer: "Left",
      explanation:
        "One full turn returns to Top, then one quarter counterclockwise ends at Left.",
      submitted: true,
      correct: true,
      independentlyExplained: true,
      reviewedByMarcus: true,
      submittedAt: NOW,
    },
    {
      ...createAttempt("check-2", "Two complete clockwise rotations from Top"),
      id: "robert-check-2",
      answer: "Top",
      originalAnswer: "Top",
      explanation:
        "Each complete rotation returns to Top, so two rotations also end at Top.",
      submitted: true,
      correct: true,
      independentlyExplained: true,
      reviewedByMarcus: true,
      submittedAt: NOW,
    },
  ]
  state.students.robert.reflection =
    "Trying the controls helped me notice that complete turns return to the start."
  state.students.robert.recommendationHistory = [
    {
      id: "robert-decision-1",
      approach: "narrated-then-reduced",
      action: "modified",
      reason:
        "Use one narrated example, then reduce prompting while preserving access to all formats.",
      evidenceIds: ["robert-adventure-1", "robert-check-1", "robert-check-2"],
      createdAt: NOW,
    },
  ]
  state.students.robert.evidenceApprovals = [
    {
      id: "evidence-r1",
      kind: "evidence",
      version: "evidence-1",
      status: "accepted",
      acceptedAt: NOW,
    },
  ]
  state.students.robert.reportRevisions = [
    {
      id: "report-r1",
      version: "1",
      contentFingerprint: "robert-evidence-1-decision-1",
      status: "draft",
      createdAt: NOW,
    },
  ]
  return state
}

export function populatedLilyState(): PersonalizedLearningState {
  const state = emptyState()
  state.view = "evidence"
  state.activeStudent = "lily"
  state.activePresentation = "interactive"
  state.package.status = "available"
  state.package.clarificationSaved = true
  state.package.approvals = [
    {
      id: "package-v1",
      kind: "package",
      version: "1.0",
      status: "accepted",
      acceptedAt: NOW,
    },
  ]
  state.students.lily.attempts = [
    {
      ...createAttempt("interactive", "1½ clockwise rotations from Top"),
      id: "lily-interactive-1",
      answer: "Bottom",
      originalAnswer: "Right",
      revisions: ["Bottom"],
      explanation:
        "I counted one half turn first and forgot the complete turn before revising.",
      submitted: true,
      correct: true,
      supportNotes: ["Revision followed result comparison."],
      submittedAt: NOW,
    },
  ]
  state.students.lily.pendingRecommendation = "narrated"
  return state
}

export function populatedJakeState(): PersonalizedLearningState {
  const state = emptyState()
  state.view = "practice"
  state.activeStudent = "jake"
  state.activePresentation = "written"
  state.package.status = "available"
  state.package.clarificationSaved = true
  state.package.approvals = [
    {
      id: "package-v1",
      kind: "package",
      version: "1.0",
      status: "accepted",
      acceptedAt: NOW,
    },
  ]
  state.students.jake.recommendationHistory = [
    {
      id: "jake-decision-1",
      approach: "written",
      action: "accepted",
      reason:
        "Prepared prior independent explanations support a concise brief with optional extension.",
      evidenceIds: [],
      createdAt: NOW,
    },
  ]
  return state
}

export const STORAGE_KEY = "cognit.personalized-learning.demo.v1"

export function loadState(): PersonalizedLearningState {
  if (typeof window === "undefined") return emptyState()
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "null",
    )
    return parsed?.schemaVersion === 1 ? parsed : emptyState()
  } catch {
    return emptyState()
  }
}

export function invalidateApprovals(
  student: StudentRecord,
  reason: string,
): StudentRecord {
  const invalidatedAt = new Date().toISOString()
  return {
    ...student,
    evidenceApprovals: student.evidenceApprovals.map((approval) =>
      approval.status === "accepted"
        ? {
            ...approval,
            status: "invalidated",
            invalidatedAt,
            invalidatedReason: reason,
          }
        : approval,
    ),
    reportRevisions: student.reportRevisions.map((revision) =>
      revision.status === "approved" || revision.status === "shared"
        ? { ...revision, status: "invalidated", invalidatedReason: reason }
        : revision,
    ),
  }
}
