export type Position = "Top" | "Right" | "Bottom" | "Left"
export type Presentation = "narrated" | "interactive" | "written"
export type StudentId = "robert" | "lily" | "jake"
export type DemoView = "guided-hq" | "guided-center" | "guided-coach" | "guided-student" | "guided-review" | "guided-family" | "hq-upload" | "hq-processing" | "hq-clarify" | "hq-failure" | "hq-review" | "available" | "adventure" | "practice" | "checks" | "results" | "coach" | "evidence" | "updated" | "family-draft" | "family-view"

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
  activity: "adventure-1" | "adventure-2" | "guided" | "guided-challenge" | "interactive" | "check-1" | "check-2" | "transfer"
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
  submissionHistory?: Array<{
    answer: Position
    correct: boolean
    submittedAt: string
    hintUsed: boolean
    supportNotes: string[]
  }>
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

export interface ReportReviewRecord {
  id: string
  version: string
  role: "coach" | "center"
  action: "reviewed" | "approved" | "invalidated"
  createdAt: string
  reason?: string
}

export interface FamilyCommentRecord {
  id: string
  reportVersion: string
  text: string
  createdAt: string
  simulated: true
}

export interface CenterAssessmentRecord {
  version: "assessment-1"
  status: "prepared" | "reviewed"
  knowledge: string
  skills: string
  preference: string
  interests: string
  supportNeeds: string
  evidenceSources: string[]
  reviewedAt?: string
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
  reportReviews: ReportReviewRecord[]
  familyComments: FamilyCommentRecord[]
  centerAssessment?: CenterAssessmentRecord
}

export interface PersonalizedLearningState {
  schemaVersion: 2
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
    reportReviews: [],
    familyComments: [],
  }
}

export function emptyState(): PersonalizedLearningState {
  return {
    schemaVersion: 2,
    locale: "en",
    view: "guided-hq",
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
      status: "review",
      clarificationSaved: true,
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

export function robertAssessment(): CenterAssessmentRecord {
  return {
    version: "assessment-1",
    status: "prepared",
    knowledge: "Robert identifies clockwise and counterclockwise direction from the shaft-end view.",
    skills: "He predicts quarter-turn endpoints and revises after visible motor feedback.",
    preference: "He currently engages most readily when he can try the controls.",
    interests: "Rescue missions, robots, and testing a prediction.",
    supportNeeds: "Counting complete rotations still needs one concise example before independent practice.",
    evidenceSources: [
      "New-student intake: fictional interest and presentation-preference questions.",
      "Prepared prior evidence · September 8: supported quarter-turn revision.",
      "Prepared prior evidence · September 15: direction correct; complete-turn count uncertain.",
    ],
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
    submissionHistory: [],
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
  state.students.robert.centerAssessment = {
    ...robertAssessment(),
    status: "reviewed",
    reviewedAt: NOW,
  }
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

function normalizeAttemptHistory(state: PersonalizedLearningState) {
  for (const record of Object.values(state.students)) {
    for (const attempt of record.attempts) {
      attempt.submissionHistory ??= []
    }
  }
  return state
}

export function loadState(): PersonalizedLearningState {
  if (typeof window === "undefined") return emptyState()
  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "null",
    )
    if (parsed?.schemaVersion === 2)
      return normalizeAttemptHistory(parsed as PersonalizedLearningState)
    if (parsed?.schemaVersion === 1) {
      const migrated = parsed as PersonalizedLearningState
      migrated.schemaVersion = 2
      migrated.view = "guided-hq"
      for (const record of Object.values(migrated.students)) {
        record.reportReviews ??= []
        record.familyComments ??= []
      }
      return normalizeAttemptHistory(migrated)
    }
    return emptyState()
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
    reportReviews: student.reportReviews.map((review) =>
      review.action === "reviewed" || review.action === "approved"
        ? { ...review, action: "invalidated", reason }
        : review,
    ),
  }
}
