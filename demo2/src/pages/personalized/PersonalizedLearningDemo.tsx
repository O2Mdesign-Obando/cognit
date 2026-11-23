import { useEffect, useState } from "react"
import { ArrowLeft, Check, ChevronRight, Settings2, X } from "lucide-react"
import { Avatar, LogoHorizontal, LogoWordmark } from "../../lib/brand"
import {
  STORAGE_KEY,
  createAttempt,
  emptyState,
  invalidateApprovals,
  loadState,
  populatedJakeState,
  populatedLilyState,
  populatedRobertState,
  robertAssessment,
  type AttemptRecord,
  type DemoView,
  type PersonalizedLearningState,
  type Position,
  type Presentation,
  type StudentId,
} from "../../features/personalized-learning/state"

const POSITIONS: Position[] = ["Top", "Right", "Bottom", "Left"]
const PRESENTATIONS: { id: Presentation; en: string; es: string }[] = [
  { id: "narrated", en: "Narrated + illustrated", es: "Narrado + ilustrado" },
  {
    id: "interactive",
    en: "Interactive motor lab",
    es: "Laboratorio interactivo",
  },
  { id: "written", en: "Written brief", es: "Guía escrita" },
]

const VIEW_LABELS: { id: DemoView; en: string; es: string }[] = [
  { id: "guided-hq", en: "1 · HQ", es: "1 · Central" },
  { id: "guided-center", en: "2 · Center", es: "2 · Centro" },
  { id: "guided-coach", en: "3 · Coach", es: "3 · Instructor" },
  { id: "guided-student", en: "4 · Student", es: "4 · Estudiante" },
  { id: "guided-review", en: "5 · Monthly review", es: "5 · Revisión mensual" },
  { id: "guided-family", en: "6 · Family", es: "6 · Familia" },
  { id: "hq-upload", en: "HQ · Source", es: "Central · Fuente" },
  { id: "hq-review", en: "HQ · Approve", es: "Central · Aprobar" },
  { id: "available", en: "Center · Available", es: "Centro · Disponible" },
  { id: "adventure", en: "Student · Adventure", es: "Estudiante · Aventura" },
  { id: "practice", en: "Student · Practice", es: "Estudiante · Práctica" },
  { id: "checks", en: "Student · Checks", es: "Estudiante · Evaluaciones" },
  { id: "coach", en: "Coach · Decisions", es: "Instructor · Decisiones" },
  { id: "evidence", en: "Coach · Evidence", es: "Instructor · Evidencia" },
  { id: "updated", en: "Student · Transfer", es: "Estudiante · Transferencia" },
  {
    id: "family-draft",
    en: "Coach · Family draft",
    es: "Instructor · Borrador familiar",
  },
  { id: "family-view", en: "Family · Progress", es: "Familia · Progreso" },
]

const GUIDED_MOMENTS: { id: DemoView; en: string; es: string }[] = [
  { id: "guided-hq", en: "Prepare", es: "Preparar" },
  { id: "guided-center", en: "Understand", es: "Comprender" },
  { id: "guided-coach", en: "Choose", es: "Elegir" },
  { id: "guided-student", en: "Learn", es: "Aprender" },
  { id: "guided-review", en: "Review", es: "Revisar" },
  { id: "guided-family", en: "Respond", es: "Responder" },
]

function now() {
  return new Date().toISOString()
}

function text(locale: "en" | "es", en: string, es: string) {
  return locale === "es" ? es : en
}

function latestAttempt(
  state: PersonalizedLearningState,
  activity: AttemptRecord["activity"],
) {
  return [...state.students[state.activeStudent].attempts]
    .reverse()
    .find((attempt) => attempt.activity === activity)
}

function expectedPosition(activity: AttemptRecord["activity"]): Position {
  return {
    "adventure-1": "Right",
    "adventure-2": "Left",
    guided: "Bottom",
    interactive: "Bottom",
    "check-1": "Left",
    "check-2": "Top",
    transfer: "Bottom",
  }[activity] as Position
}

export default function PersonalizedLearningDemo() {
  const [state, setState] = useState<PersonalizedLearningState>(loadState)
  const [message, setMessage] = useState("")
  const [validation, setValidation] = useState("")
  const [familyCommentDraft, setFamilyCommentDraft] = useState("")
  const locale = state.locale
  const student = state.students[state.activeStudent]
  const tx = (en: string, es: string) => text(locale, en, es)
  const guidedFurthest = guidedFurthestIndex(state)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.matches("input, textarea, select, [contenteditable='true']"))
        return
      if (!/^[1-4]$/.test(event.key)) return
      const attempt = currentInteractiveAttempt(state)
      if (!attempt || attempt.submitted) return
      selectAnswer(POSITIONS[Number(event.key) - 1])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  function update(
    mutator: (draft: PersonalizedLearningState) => PersonalizedLearningState,
  ) {
    setState((current) => mutator(structuredClone(current)))
    setValidation("")
  }

  function navigate(view: DemoView) {
    update((draft) => ({ ...draft, view }))
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

  function selectStudent(id: StudentId) {
    update((draft) => ({
      ...draft,
      activeStudent: id,
      activePresentation: draft.students[id].practicePresentation,
      storyboardFrame: 1,
    }))
  }

  function ensureAttempt(activity: AttemptRecord["activity"], prompt: string) {
    update((draft) => {
      const record = draft.students[draft.activeStudent]
      if (
        !record.attempts.some(
          (attempt) => attempt.activity === activity && !attempt.submitted,
        )
      ) {
        record.attempts.push(createAttempt(activity, prompt))
      }
      return draft
    })
  }

  function changeAttempt(
    activity: AttemptRecord["activity"],
    change: (attempt: AttemptRecord) => void,
  ) {
    update((draft) => {
      const record = draft.students[draft.activeStudent]
      let attempt = [...record.attempts]
        .reverse()
        .find((item) => item.activity === activity && !item.submitted)
      if (!attempt) {
        attempt = createAttempt(activity, activity)
        record.attempts.push(attempt)
      }
      change(attempt)
      draft.students[draft.activeStudent] = invalidateApprovals(
        record,
        tx(
          "Evidence changed after approval.",
          "La evidencia cambió después de la aprobación.",
        ),
      )
      return draft
    })
  }

  function selectAnswer(position: Position) {
    const attempt = currentInteractiveAttempt(state)
    if (!attempt) return
    changeAttempt(attempt.activity, (draftAttempt) => {
      if (!draftAttempt.originalAnswer) draftAttempt.originalAnswer = position
      else if (draftAttempt.answer && draftAttempt.answer !== position)
        draftAttempt.revisions.push(position)
      draftAttempt.answer = position
    })
  }

  function submitAttempt(
    activity: AttemptRecord["activity"],
    requireExplanation = false,
  ) {
    const attempt = latestAttempt(state, activity)
    if (!attempt?.answer) {
      setValidation(
        tx(
          "Choose a position before submitting.",
          "Elige una posición antes de enviar.",
        ),
      )
      return
    }
    if (
      requireExplanation &&
      !attempt.explanation.trim() &&
      attempt.responseMode !== "coach-recorded"
    ) {
      setValidation(
        tx(
          "Add an explanation or choose the simulated coach-recorded response.",
          "Agrega una explicación o elige la respuesta simulada registrada por el instructor.",
        ),
      )
      return
    }
    update((draft) => {
      const record = draft.students[draft.activeStudent]
      const target = [...record.attempts]
        .reverse()
        .find((item) => item.activity === activity && !item.submitted)
      if (!target) return draft
      target.submitted = true
      target.submittedAt = now()
      target.correct = target.answer === expectedPosition(activity)
      target.independentlyExplained = Boolean(
        target.correct &&
          (target.explanation.trim() ||
            target.responseMode === "coach-recorded") &&
          !target.hintUsed &&
          !target.demonstrationUsed,
      )
      draft.students[draft.activeStudent] = invalidateApprovals(
        record,
        tx("A new attempt was submitted.", "Se envió un intento nuevo."),
      )
      return draft
    })
    setMessage(
      tx(
        `Submitted. Actual result: ${expectedPosition(activity)}.`,
        `Enviado. Resultado real: ${positionEs(expectedPosition(activity))}.`,
      ),
    )
  }

  function setPackage(status: PersonalizedLearningState["package"]["status"]) {
    update((draft) => {
      draft.package.status = status
      draft.view =
        status === "preparing"
          ? "hq-processing"
          : status === "clarification"
            ? "hq-clarify"
            : status === "failure"
              ? "hq-failure"
              : status === "review"
                ? "hq-review"
                : status === "available"
                  ? "available"
                  : "hq-upload"
      return draft
    })
  }

  function approvePackage() {
    update((draft) => {
      draft.package.status = "available"
      draft.package.approvals.push({
        id: `package-${Date.now()}`,
        kind: "package",
        version: "1.0",
        status: "accepted",
        acceptedAt: now(),
      })
      draft.view = "available"
      return draft
    })
  }

  function makeGuidedPackageAvailable() {
    update((draft) => {
      draft.package.status = "available"
      if (!draft.package.approvals.some((approval) => approval.status === "accepted")) {
        draft.package.approvals.push({
          id: `package-${Date.now()}`,
          kind: "package",
          version: "1.0",
          status: "accepted",
          acceptedAt: now(),
        })
      }
      draft.students.robert.centerAssessment ??= robertAssessment()
      draft.activeStudent = "robert"
      draft.view = "guided-center"
      return draft
    })
    setMessage(tx("Package v1.0 is available to Plainsboro Center.", "El paquete v1.0 está disponible para el Centro Plainsboro."))
  }

  function reviewGuidedAssessment() {
    update((draft) => {
      const assessment = draft.students.robert.centerAssessment ?? robertAssessment()
      assessment.status = "reviewed"
      assessment.reviewedAt = now()
      draft.students.robert.centerAssessment = assessment
      draft.activeStudent = "robert"
      draft.view = "guided-coach"
      return draft
    })
    setMessage(tx("Robert's fictional assessment is ready for Marcus.", "La evaluación ficticia de Robert está lista para Marcus."))
  }

  function saveGuidedDecision(adjusted: boolean) {
    update((draft) => {
      const record = draft.students.robert
      record.recommendationHistory.push({
        id: `robert-guided-decision-${Date.now()}`,
        approach: "narrated-then-reduced",
        action: adjusted ? "modified" : "accepted",
        reason: adjusted
          ? tx("Marcus added one visual marker cue to the narrated example, then reduced prompting.", "Marcus agregó una pista visual al ejemplo narrado y luego redujo las indicaciones.")
          : tx("Marcus accepted one short narrated example, then independent practice.", "Marcus aceptó un ejemplo narrado breve y luego práctica independiente."),
        evidenceIds: ["prepared-sept-08", "prepared-sept-15"],
        createdAt: now(),
      })
      record.reportRevisions = record.reportRevisions.map((revision) =>
        revision.status === "approved" || revision.status === "shared"
          ? { ...revision, status: "invalidated", invalidatedReason: tx("The teaching approach changed.", "El enfoque docente cambió.") }
          : revision,
      )
      record.reportReviews = record.reportReviews.map((review) =>
        review.action === "reviewed" || review.action === "approved"
          ? { ...review, action: "invalidated", reason: tx("The teaching approach changed.", "El enfoque docente cambió.") }
          : review,
      )
      if (!record.attempts.some((attempt) => attempt.activity === "check-1" && !attempt.submitted)) {
        record.attempts.push(createAttempt("check-1", "1¼ counterclockwise rotations from Top"))
      }
      draft.activeStudent = "robert"
      draft.activePresentation = "narrated"
      draft.view = "guided-student"
      return draft
    })
    setMessage(adjusted ? tx("Marcus adjusted and saved the approach.", "Marcus ajustó y guardó el enfoque.") : tx("Marcus accepted and saved the approach.", "Marcus aceptó y guardó el enfoque."))
  }

  function openGuidedMonthlyReview() {
    update((draft) => {
      const record = draft.students.robert
      if (!record.reportRevisions.some((revision) => revision.status === "draft")) {
        const nextVersion = `2.${record.reportRevisions.length + 1}`
        record.reportRevisions.push({
          id: `monthly-${Date.now()}`,
          version: nextVersion,
          contentFingerprint: `prepared-sept-08-sept-15-sept-22-${record.attempts.length}-${record.recommendationHistory.length}`,
          status: "draft",
          createdAt: now(),
        })
      }
      draft.view = "guided-review"
      return draft
    })
    setMessage("")
  }

  function reviewGuidedReport() {
    update((draft) => {
      const record = draft.students.robert
      const report = [...record.reportRevisions].reverse().find((revision) => revision.status === "draft")
      if (!report) return draft
      record.reportReviews.push({
        id: `coach-review-${Date.now()}`,
        version: report.version,
        role: "coach",
        action: "reviewed",
        createdAt: now(),
        reason: tx("Marcus confirmed the prepared evidence and next step.", "Marcus confirmó la evidencia preparada y el siguiente paso."),
      })
      return draft
    })
    setMessage(tx("Coach review recorded for this exact report version.", "La revisión del instructor se registró para esta versión exacta."))
  }

  function approveGuidedReport() {
    update((draft) => {
      const record = draft.students.robert
      const report = [...record.reportRevisions].reverse().find((revision) => revision.status === "draft")
      if (!report || !record.reportReviews.some((review) => review.version === report.version && review.role === "coach" && review.action === "reviewed")) return draft
      report.status = "approved"
      record.reportReviews.push({
        id: `center-approval-${Date.now()}`,
        version: report.version,
        role: "center",
        action: "approved",
        createdAt: now(),
        reason: tx("Plainsboro Center approved the exact reviewed version.", "El Centro Plainsboro aprobó la versión exacta revisada."),
      })
      return draft
    })
    setMessage(tx("Center approval recorded. The Family view can now use this exact version.", "Aprobación del Centro registrada. La vista familiar ya puede usar esta versión exacta."))
  }

  function shareGuidedReport() {
    update((draft) => {
      const report = [...draft.students.robert.reportRevisions].reverse().find((revision) => revision.status === "approved")
      if (!report) return draft
      report.status = "shared"
      draft.view = "guided-family"
      return draft
    })
    setMessage(tx("Shared only inside this fictional browser-local demo.", "Compartido solo dentro de esta demostración ficticia local del navegador."))
  }

  function submitFamilyComment() {
    if (!familyCommentDraft.trim()) {
      setValidation(tx("Write a fictional comment before submitting.", "Escribe un comentario ficticio antes de enviarlo."))
      return
    }
    update((draft) => {
      const record = draft.students.robert
      const report = [...record.reportRevisions].reverse().find((revision) => revision.status === "shared")
      if (!report) return draft
      record.familyComments.push({
        id: `family-comment-${Date.now()}`,
        reportVersion: report.version,
        text: familyCommentDraft.trim(),
        createdAt: now(),
        simulated: true,
      })
      return draft
    })
    setFamilyCommentDraft("")
    setMessage(tx("Fictional comment saved locally and now visible to Coach Marcus.", "Comentario ficticio guardado localmente y ahora visible para el instructor Marcus."))
  }

  function choosePresentation(presentation: Presentation, previewOnly = true) {
    update((draft) => {
      const record = draft.students[draft.activeStudent]
      draft.activePresentation = presentation
      if (previewOnly) record.previewPresentation = presentation
      else {
        record.practicePresentation = presentation
        record.previewPresentation = undefined
        if (
          record.attempts.some(
            (a) => a.activity.startsWith("check-") && !a.submitted,
          )
        ) {
          const attempt = [...record.attempts]
            .reverse()
            .find((a) => a.activity.startsWith("check-") && !a.submitted)
          attempt?.supportNotes.push(
            `Relevant ${presentation} guidance used during the active check.`,
          )
          if (attempt) attempt.hintUsed = true
        }
      }
      return draft
    })
  }

  function saveDecision(
    id: StudentId,
    action: "accepted" | "modified" | "dismissed",
    approach: Presentation | "narrated-then-reduced" | "dismissed",
  ) {
    update((draft) => {
      const record = draft.students[id]
      const evidenceIds = record.attempts
        .filter((attempt) => attempt.submitted)
        .map((attempt) => attempt.id)
      record.recommendationHistory.push({
        id: `${id}-decision-${Date.now()}`,
        approach,
        action,
        reason:
          action === "modified"
            ? tx(
                "One narrated example, then reduced prompting.",
                "Un ejemplo narrado y luego menos indicaciones.",
              )
            : action === "dismissed"
              ? tx(
                  "Coach retained the current approach.",
                  "El instructor mantuvo el enfoque actual.",
                )
              : tx(
                  "Supported by the listed observation.",
                  "Respaldado por la observación indicada.",
                ),
        evidenceIds,
        createdAt: now(),
      })
      record.pendingRecommendation = undefined
      record.reportRevisions = record.reportRevisions.map((revision) =>
        revision.status === "approved" || revision.status === "shared"
          ? {
              ...revision,
              status: "invalidated",
              invalidatedReason: tx(
                "The saved next step changed.",
                "El siguiente paso guardado cambió.",
              ),
            }
          : revision,
      )
      return draft
    })
    setMessage(
      action === "dismissed"
        ? tx(
            "Recommendation dismissed. No new approach was assigned.",
            "Recomendación descartada. No se asignó un enfoque nuevo.",
          )
        : tx(
            "Teaching decision saved with its reason and evidence links.",
            "Decisión docente guardada con su motivo y enlaces de evidencia.",
          ),
    )
  }

  function currentInteractiveAttempt(snapshot = state) {
    const activities: AttemptRecord["activity"][] =
      snapshot.view === "guided-student"
        ? ["check-1"]
        : snapshot.view === "updated"
        ? ["transfer"]
        : snapshot.view === "checks"
          ? [snapshot.activeCheck === 1 ? "check-1" : "check-2"]
          : snapshot.view === "adventure"
            ? [
                latestAttempt(snapshot, "adventure-1")?.submitted
                  ? "adventure-2"
                  : "adventure-1",
              ]
            : snapshot.activePresentation === "interactive"
              ? ["interactive"]
              : snapshot.activePresentation === "narrated"
                ? ["guided"]
                : []
    return activities.length
      ? latestAttempt(snapshot, activities[0])
      : undefined
  }

  const roleName = state.view === "guided-hq" || state.view.startsWith("hq-")
    ? "Marcus Vance · HQ"
    : state.view === "guided-center" || state.view === "available"
      ? "Kevin · Center Director"
      : state.view === "guided-family" || state.view.startsWith("family")
        ? "Hayes Family"
        : ["guided-coach", "guided-review", "coach", "evidence", "family-draft"].includes(state.view)
          ? "Coach Marcus"
          : student.name

  return (
    <div className="min-h-screen bg-cool-50 text-[#162b3d]">
      <header className="sticky top-0 z-40 flex min-h-16 flex-wrap items-center justify-between gap-y-2 border-b border-cool-300/70 bg-white px-4 py-3 sm:px-8">
        <a
          href="/learninghub/demo2/"
          aria-label={tx(
            "Cognit Demo home",
            "Inicio de la demostración Cognit",
          )}
          className="flex min-h-11 items-center gap-3 rounded-lg px-1 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <LogoHorizontal className="hidden h-7 sm:block" />
          <LogoWordmark className="h-6 sm:hidden" />
          <span className="hidden items-center gap-1 border-l border-cool-300 pl-3 text-sm font-semibold text-navy md:flex">
            <ArrowLeft size={15} /> {tx("Back to Demo2", "Volver a Demo2")}
          </span>
        </a>
        <div className="flex items-center gap-2">
          <button
            className="pl-pill min-h-11 px-3"
            onClick={() =>
              update((draft) => ({
                ...draft,
                locale: draft.locale === "en" ? "es" : "en",
              }))
            }
            aria-label={tx("Switch to Spanish", "Cambiar a inglés")}
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
          <Avatar name={roleName} size={32} />
          <span className="text-sm font-medium text-navy">{roleName}</span>
        </div>

        {state.view.startsWith("guided-") && (
          <GuidedProgress
            moments={GUIDED_MOMENTS}
            current={state.view}
            furthest={guidedFurthest}
            locale={locale}
            onSelect={(view) => navigate(view)}
          />
        )}
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-8 sm:py-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-navy">
            {breadcrumb(state.view, locale, student.name)}
          </p>
          <button
            className="pl-pill min-h-11 px-4"
            onClick={() =>
              update((draft) => ({
                ...draft,
                presenterOpen: !draft.presenterOpen,
              }))
            }
            aria-expanded={state.presenterOpen}
          >
            <Settings2 size={17} />{" "}
            {tx("Presenter / demo controls", "Controles del presentador")}
          </button>
        </div>

        {state.presenterOpen && (
          <section
            className="mb-7 rounded-2xl border border-navy bg-white p-4"
            aria-label={tx("Presenter controls", "Controles del presentador")}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-navy">
                {tx("Fictional scenarios", "Escenarios ficticios")}
              </h2>
              <button
                className="min-h-11 min-w-11 rounded-full border border-cool-300"
                onClick={() =>
                  update((draft) => ({ ...draft, presenterOpen: false }))
                }
                aria-label={tx("Close presenter controls", "Cerrar controles")}
              >
                <X className="mx-auto" size={18} />
              </button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <button
                className="pl-pill"
                onClick={() => {
                  setState(populatedRobertState())
                  setMessage("")
                  setValidation("")
                }}
              >
                {tx("Load populated Robert", "Cargar Robert completo")}
              </button>
              <button
                className="pl-pill"
                onClick={() => {
                  setState(populatedLilyState())
                  setMessage("")
                  setValidation("")
                }}
              >
                {tx("Load Lily observation", "Cargar observación de Lily")}
              </button>
              <button
                className="pl-pill"
                onClick={() => {
                  setState(populatedJakeState())
                  setMessage("")
                  setValidation("")
                }}
              >
                {tx("Load Jake written path", "Cargar ruta escrita de Jake")}
              </button>
              <button
                className="pl-pill"
                onClick={() => {
                  window.localStorage.removeItem(STORAGE_KEY)
                  setState(emptyState())
                  setMessage("")
                }}
              >
                {tx("Reset entire demo", "Reiniciar toda la demostración")}
              </button>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {VIEW_LABELS.map((item) => (
                <button
                  key={item.id}
                  className={`pl-chip ${
                    state.view === item.id ? "pl-chip-selected" : ""
                  }`}
                  onClick={() => navigate(item.id)}
                >
                  {locale === "es" ? item.es : item.en}
                </button>
              ))}
            </div>
          </section>
        )}

        {!state.view.startsWith("guided-") &&
          !state.view.startsWith("hq-") &&
          state.view !== "available" &&
          !state.view.startsWith("family") && (
            <div
              className="mb-5 flex flex-wrap gap-2"
              aria-label={tx("Fictional learner", "Estudiante ficticio")}
            >
              {(["robert", "lily", "jake"] as StudentId[]).map((id) => (
                <button
                  key={id}
                  className={`pl-chip ${
                    state.activeStudent === id ? "pl-chip-selected" : ""
                  }`}
                  onClick={() => selectStudent(id)}
                >
                  {state.students[id].name}
                </button>
              ))}
            </div>
          )}

        <div aria-live="polite">
          {message && (
            <div className="mb-5 rounded-xl bg-[#e2f4ef] px-5 py-4 font-medium text-[#126c5c]">
              {message}
            </div>
          )}
          {validation && (
            <div
              className="mb-5 rounded-xl border border-[#b94848] bg-[#fff0f0] px-5 py-4 font-medium text-[#9f3030]"
              role="alert"
            >
              {validation}
            </div>
          )}
        </div>

        {renderView()}
      </main>
    </div>
  )

  function renderView() {
    switch (state.view) {
      case "guided-hq":
        return <GuidedHq />
      case "guided-center":
        return <GuidedCenter />
      case "guided-coach":
        return <GuidedCoach />
      case "guided-student":
        return <GuidedStudent />
      case "guided-review":
        return <GuidedReview />
      case "guided-family":
        return <GuidedFamily />
      case "hq-upload":
        return <HqUpload />
      case "hq-processing":
        return <HqProcessing />
      case "hq-clarify":
        return <HqClarify />
      case "hq-failure":
        return <HqFailure />
      case "hq-review":
        return <HqReview />
      case "available":
        return <Available />
      case "adventure":
        return <Adventure />
      case "practice":
        return <Practice />
      case "checks":
        return <Checks />
      case "results":
        return <Results />
      case "coach":
        return <Coach />
      case "evidence":
        return <Evidence />
      case "updated":
        return <Updated />
      case "family-draft":
        return <FamilyDraft />
      case "family-view":
        return <FamilyView />
    }
  }

  function GuidedHq() {
    const available = state.package.approvals.some((approval) => approval.status === "accepted")
    const formats = [
      [tx("Video / storyboard", "Video / guion gráfico"), tx("Working prepared storyboard", "Guion gráfico preparado y funcional")],
      [tx("Audio / narration", "Audio / narración"), tx("Simulated media · script and transcript", "Medio simulado · guion y transcripción")],
      [tx("Animation / interactive", "Animación / interactivo"), tx("Working keyboard-accessible motor lab", "Laboratorio de motor funcional y accesible por teclado")],
      [tx("Text", "Texto"), tx("Working concise brief and extension", "Guía breve y extensión funcionales")],
    ]
    return (
      <Page
        title={tx("One curriculum. Several ways to learn.", "Un currículo. Varias formas de aprender.")}
        subtitle={tx("HQ prepared one fictional Robotics Explorers package with shared objectives and four presentations.", "La Central preparó un paquete ficticio de Exploradores de Robótica con objetivos comunes y cuatro presentaciones.")}
        eyebrow={tx("MOMENT 1 OF 6 · HQ PREPARATION", "MOMENTO 1 DE 6 · PREPARACIÓN CENTRAL")}
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <Label>{tx("PACKAGE v1.0 · MTR-01", "PAQUETE v1.0 · MTR-01")}</Label>
            <h2 className="pl-h2">{tx("Turn, test, explain", "Girar, probar, explicar")}</h2>
            <ul className="space-y-3 text-[1.02rem]">
              <li>✓ {tx("Predict clockwise and counterclockwise movement.", "Predecir el movimiento horario y antihorario.")}</li>
              <li>✓ {tx("Distinguish partial turns from complete rotations.", "Distinguir giros parciales de rotaciones completas.")}</li>
              <li>✓ {tx("Transfer the idea to a new starting position.", "Transferir la idea a una nueva posición inicial.")}</li>
              <li>✓ {tx("Explain or demonstrate the result.", "Explicar o demostrar el resultado.")}</li>
            </ul>
            <Info>{tx("Clarified shaft-end view, facing the motor. Two complete clockwise rotations = 720°.", "Vista aclarada desde el extremo del eje, frente al motor. Dos rotaciones completas en sentido horario = 720°.")}</Info>
          </Panel>
          <Panel>
            <h2 className="pl-h2">{tx("Prepared teaching formats", "Formatos de enseñanza preparados")}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {formats.map(([name, detail]) => (
                <div key={name} className="rounded-xl border border-cool-300 bg-cool-50 p-4">
                  <p className="font-semibold text-navy">{name}</p>
                  <p className="mt-1 text-sm text-cool-600">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-cool-600">{tx("All formats use the same objectives and comparable evidence task. No media was recorded or generated live.", "Todos los formatos usan los mismos objetivos y una tarea de evidencia comparable. No se grabó ni generó contenido en vivo.")}</p>
          </Panel>
        </div>
        {available ? (
          <Primary onClick={() => navigate("guided-center")}>{tx("Continue to Plainsboro Center", "Continuar al Centro Plainsboro")} <ChevronRight size={18} /></Primary>
        ) : (
          <Primary onClick={makeGuidedPackageAvailable}>{tx("Make available to centers", "Hacer disponible para los centros")} <ChevronRight size={18} /></Primary>
        )}
      </Page>
    )
  }

  function GuidedCenter() {
    const assessment = state.students.robert.centerAssessment ?? robertAssessment()
    return (
      <Page
        title={tx("Understand Robert before choosing an approach", "Comprender a Robert antes de elegir un enfoque")}
        subtitle={tx("The Center combines a fictional intake assessment with prepared prior evidence. Preferences are current signals, not fixed labels.", "El Centro combina una evaluación ficticia de ingreso con evidencia previa preparada. Las preferencias son señales actuales, no etiquetas fijas.")}
        eyebrow={tx("MOMENT 2 OF 6 · CENTER ASSESSMENT", "MOMENTO 2 DE 6 · EVALUACIÓN DEL CENTRO")}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <Label>{tx("HOW ASSESSMENT WORKS", "CÓMO FUNCIONA LA EVALUACIÓN")}</Label>
            <div className="space-y-4">
              <div className="rounded-xl bg-[#fff3d6] p-4"><strong>{tx("New student", "Estudiante nuevo")}</strong><p>{tx("Brief fictional questions establish current knowledge, interests, preferred ways to begin, and support needs.", "Preguntas ficticias breves establecen conocimientos actuales, intereses, formas preferidas de comenzar y necesidades de apoyo.")}</p></div>
              <div className="rounded-xl bg-[#dce9f4] p-4"><strong>{tx("Existing student", "Estudiante existente")}</strong><p>{tx("Prepared prior responses add evidence without replacing new observations or turning a preference into a label.", "Las respuestas previas preparadas agregan evidencia sin reemplazar nuevas observaciones ni convertir una preferencia en etiqueta.")}</p></div>
            </div>
          </Panel>
          <Panel>
            <Label>{tx("ROBERT · ASSESSMENT-1", "ROBERT · EVALUACIÓN-1")}</Label>
            <AssessmentRow label={tx("Current knowledge", "Conocimiento actual")} value={tx(assessment.knowledge, "Robert identifica la dirección horaria y antihoraria desde la vista del extremo del eje.")} />
            <AssessmentRow label={tx("Skills", "Habilidades")} value={tx(assessment.skills, "Predice los puntos finales de cuartos de vuelta y revisa después de ver la respuesta del motor.")} />
            <AssessmentRow label={tx("Presentation preference", "Preferencia de presentación")} value={tx(assessment.preference, "Actualmente participa con más facilidad cuando puede probar los controles.")} />
            <AssessmentRow label={tx("Interests", "Intereses")} value={tx(assessment.interests, "Misiones de rescate, robots y poner a prueba una predicción.")} />
            <AssessmentRow label={tx("Support need", "Necesidad de apoyo")} value={tx(assessment.supportNeeds, "Contar rotaciones completas todavía requiere un ejemplo conciso antes de la práctica independiente.")} />
          </Panel>
        </div>
        <Panel>
          <h2 className="pl-h2">{tx("Evidence used", "Evidencia utilizada")}</h2>
          <ul className="grid gap-3 md:grid-cols-3">
            {assessment.evidenceSources.map((source, index) => <li key={source} className="rounded-xl border border-cool-300 p-4">{tx(source, [
              "Ingreso de estudiante nuevo: preguntas ficticias sobre intereses y preferencias de presentación.",
              "Evidencia previa preparada · 8 de septiembre: revisión apoyada de un cuarto de vuelta.",
              "Evidencia previa preparada · 15 de septiembre: dirección correcta; conteo de vueltas completas incierto.",
            ][index])}</li>)}
          </ul>
        </Panel>
        <Primary onClick={reviewGuidedAssessment}>{tx("Review recommended approach", "Revisar el enfoque recomendado")} <ChevronRight size={18} /></Primary>
      </Page>
    )
  }

  function GuidedCoach() {
    const record = state.students.robert
    const assessment = record.centerAssessment ?? robertAssessment()
    const latestComment = record.familyComments.at(-1)
    return (
      <Page
        title={tx("Marcus chooses the teaching approach", "Marcus elige el enfoque de enseñanza")}
        subtitle={tx("The recommendation, rationale, and source evidence stay together. Marcus retains the decision.", "La recomendación, el motivo y la evidencia fuente permanecen juntos. Marcus conserva la decisión.")}
        eyebrow={tx("MOMENT 3 OF 6 · COACH DECISION", "MOMENTO 3 DE 6 · DECISIÓN DEL INSTRUCTOR")}
      >
        {latestComment && <Status>{tx("New fictional Family response", "Nueva respuesta ficticia de la familia")}: “{latestComment.text}” · {tx("Report", "Informe")} {latestComment.reportVersion}</Status>}
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <Label>{tx("ROBERT'S ASSESSMENT", "EVALUACIÓN DE ROBERT")}</Label>
            <p className="font-semibold text-navy">{tx(assessment.preference, "Actualmente participa con más facilidad cuando puede probar los controles.")}</p>
            <p className="mt-3">{tx(assessment.supportNeeds, "Contar rotaciones completas todavía requiere un ejemplo conciso antes de la práctica independiente.")}</p>
            <p className="mt-4 text-sm text-cool-600">{tx("Evidence: prepared fictional sessions on September 8 and September 15.", "Evidencia: sesiones ficticias preparadas del 8 y 15 de septiembre.")}</p>
          </Panel>
          <Panel>
            <Label>{tx("COGNIT RECOMMENDATION · AWAITING MARCUS", "RECOMENDACIÓN COGNIT · ESPERANDO A MARCUS")}</Label>
            <h2 className="pl-h2">{tx("One short narrated example, then independent practice", "Un ejemplo narrado breve y luego práctica independiente")}</h2>
            <p>{tx("Robert prefers hands-on activities. His previous responses suggest he needs help counting complete rotations. Start with a short narrated example, then let him try independently.", "Robert prefiere actividades prácticas. Sus respuestas anteriores sugieren que necesita ayuda para contar rotaciones completas. Comienza con un ejemplo narrado breve y luego deja que lo intente de forma independiente.")}</p>
            <Info>{tx("This is a changeable teaching decision—not a learning-style label.", "Esta es una decisión docente que puede cambiar, no una etiqueta de estilo de aprendizaje.")}</Info>
          </Panel>
        </div>
        <Primary onClick={() => saveGuidedDecision(false)}>{tx("Accept approach & start Robert's activity", "Aceptar enfoque e iniciar la actividad de Robert")} <ChevronRight size={18} /></Primary>
        <Secondary onClick={() => saveGuidedDecision(true)}>{tx("Adjust: add one visual cue", "Ajustar: agregar una pista visual")}</Secondary>
      </Page>
    )
  }

  function GuidedStudent() {
    const attempt = latestAttempt(state, "check-1")
    const decision = state.students.robert.recommendationHistory.at(-1)
    return (
      <Page
        title={tx("A short example, then Robert tries", "Un ejemplo breve y luego Robert intenta")}
        subtitle={tx("Chosen presentation: narrated + illustrated. Support level: one example, then reduced prompting.", "Presentación elegida: narrada + ilustrada. Nivel de apoyo: un ejemplo y luego menos indicaciones.")}
        eyebrow={tx("MOMENT 4 OF 6 · STUDENT LEARNING", "MOMENTO 4 DE 6 · APRENDIZAJE DEL ESTUDIANTE")}
      >
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Panel>
            <Label>{tx("TEACHING EXAMPLE · PREPARED STORYBOARD", "EJEMPLO DOCENTE · GUION PREPARADO")}</Label>
            <Rotation start="Top" end="Bottom" locale={locale} />
            <p className="mt-4">{tx("A half-turn moves the marker to the opposite side. Narration is represented by prepared captions and transcript; no audio was recorded.", "Media vuelta mueve el indicador al lado opuesto. La narración se representa con subtítulos y transcripción preparados; no se grabó audio.")}</p>
          </Panel>
          {!attempt ? (
            <Panel><h2 className="pl-h2">{tx("Ready for the meaningful task", "Listo para la tarea significativa")}</h2><p>{tx("Robert will predict 1¼ counterclockwise rotations from Top and explain how he counted.", "Robert predecirá 1¼ rotaciones antihorarias desde Arriba y explicará cómo contó.")}</p><Primary onClick={() => ensureAttempt("check-1", "1¼ counterclockwise rotations from Top")}>{tx("Start Robert's task", "Iniciar la tarea de Robert")}</Primary></Panel>
          ) : attempt.submitted ? (
            <Panel>
              <h2 className="pl-h2">{tx("What Robert demonstrated", "Lo que Robert demostró")}</h2>
              <AttemptSummary attempt={attempt} locale={locale} />
              <Status>{attempt.independentlyExplained ? tx("Independent achievement", "Logro independiente") : attempt.correct ? tx("Supported achievement", "Logro con apoyo") : tx("Incorrect response preserved for review", "Respuesta incorrecta conservada para revisión")}</Status>
            </Panel>
          ) : (
            <Panel>
              <h2 className="pl-h2">{tx("Robert's task", "Tarea de Robert")}</h2>
              <p className="mb-4 font-semibold text-navy">{tx("Start at Top. Predict the endpoint after 1¼ counterclockwise rotations.", "Comienza Arriba. Predice el punto final después de 1¼ rotaciones antihorarias.")}</p>
              <div className="grid gap-3 sm:grid-cols-2">{POSITIONS.map((position, index) => <button key={position} className={`pl-choice ${attempt.answer === position ? "pl-choice-selected" : ""}`} onClick={() => selectAnswer(position)} aria-pressed={attempt.answer === position}>{index + 1} · {locale === "es" ? positionEs(position) : position}</button>)}</div>
              <label className="mt-5 block font-semibold text-navy" htmlFor="guided-explanation">{tx("Explain how you counted", "Explica cómo contaste")}</label>
              <textarea id="guided-explanation" rows={3} className="mt-2 w-full rounded-xl border border-cool-300 bg-cool-50 p-3" value={attempt.explanation} onChange={(event) => changeAttempt("check-1", (item) => { item.explanation = event.target.value; item.responseMode = "text" })} />
              <details className="mt-4 rounded-xl border border-cool-300 p-4"><summary className="cursor-pointer font-semibold text-navy">{tx("Optional help", "Ayuda opcional")}</summary><Secondary onClick={() => changeAttempt("check-1", (item) => { item.hintUsed = true; item.supportNotes.push(tx("Marcus pointed to each complete rotation.", "Marcus señaló cada rotación completa.")) })}>{tx("Ask Marcus for one counting hint", "Pedir a Marcus una pista para contar")}</Secondary></details>
              <Primary onClick={() => submitAttempt("check-1", true)}>{tx("Submit Robert's response", "Enviar la respuesta de Robert")}</Primary>
            </Panel>
          )}
        </div>
        {attempt?.submitted && <Primary onClick={openGuidedMonthlyReview}>{tx("See Robert's monthly progress", "Ver el progreso mensual de Robert")} <ChevronRight size={18} /></Primary>}
        {decision && <p className="text-sm text-cool-600">{tx("Saved teaching decision", "Decisión docente guardada")}: {decision.reason}</p>}
      </Page>
    )
  }

  function GuidedReview() {
    const record = state.students.robert
    const report = [...record.reportRevisions].reverse().find((revision) => revision.status !== "invalidated")
    const coachReviewed = Boolean(report && record.reportReviews.some((review) => review.version === report.version && review.role === "coach" && review.action === "reviewed"))
    const centerApproved = Boolean(report && record.reportReviews.some((review) => review.version === report.version && review.role === "center" && review.action === "approved"))
    const currentAttempt = latestAttempt(state, "check-1")
    return (
      <Page
        title={tx("Review Robert's monthly progress", "Revisar el progreso mensual de Robert")}
        subtitle={tx("Prepared evidence from several fictional sessions is combined here. The visitor's single task is shown separately and does not represent the month.", "Aquí se combina evidencia preparada de varias sesiones ficticias. La única tarea del visitante se muestra por separado y no representa el mes.")}
        eyebrow={tx("MOMENT 5 OF 6 · COACH + CENTER REPORT WORKSPACE", "MOMENTO 5 DE 6 · ESPACIO DE INFORME DEL INSTRUCTOR + CENTRO")}
      >
        {!report ? <Panel><p>{tx("No monthly report version exists yet.", "Aún no existe una versión del informe mensual.")}</p><Primary onClick={openGuidedMonthlyReview}>{tx("Prepare monthly report workspace", "Preparar el espacio del informe mensual")}</Primary></Panel> : <>
          <Status>{tx("MONTHLY REPORT", "INFORME MENSUAL")} · {tx("Exact version", "Versión exacta")} {report.version} · {report.status}</Status>
          <div className="grid gap-5 xl:grid-cols-3">
            <Panel><h2 className="pl-h2">{tx("Objectives", "Objetivos")}</h2><p>{tx("Direction, partial versus complete rotations, transfer, and explanation.", "Dirección, rotaciones parciales frente a completas, transferencia y explicación.")}</p></Panel>
            <Panel><h2 className="pl-h2">{tx("Assessment → approach", "Evaluación → enfoque")}</h2><p>{tx("Hands-on preference plus uncertainty counting full turns supported one narrated example, then reduced prompting.", "La preferencia práctica y la incertidumbre al contar vueltas completas respaldaron un ejemplo narrado y luego menos indicaciones.")}</p></Panel>
            <Panel><h2 className="pl-h2">{tx("Remaining uncertainty", "Incertidumbre restante")}</h2><p>{tx("Transfer from a different starting position still needs independent evidence.", "La transferencia desde otra posición inicial aún necesita evidencia independiente.")}</p></Panel>
          </div>
          <Panel>
            <h2 className="pl-h2">{tx("Prepared multi-session evidence", "Evidencia preparada de varias sesiones")}</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <EvidenceCard date={tx("September 8", "8 de septiembre")} prepared={tx("Prepared fictional session", "Sesión ficticia preparada")} title={tx("Supported revision", "Revisión con apoyo")} body={tx("Robert revised a quarter-turn prediction after one visual hint.", "Robert revisó una predicción de cuarto de vuelta después de una pista visual.")} />
              <EvidenceCard date={tx("September 15", "15 de septiembre")} prepared={tx("Prepared fictional session", "Sesión ficticia preparada")} title={tx("Independent direction", "Dirección independiente")} body={tx("He identified clockwise direction independently; complete-turn counting remained uncertain.", "Identificó la dirección horaria de forma independiente; contar vueltas completas siguió siendo incierto.")} />
              <EvidenceCard date={tx("September 22", "22 de septiembre")} prepared={tx("Prepared fictional session", "Sesión ficticia preparada")} title={tx("Explained endpoint", "Punto final explicado")} body={tx("He explained that one complete turn returns to the starting position.", "Explicó que una vuelta completa regresa a la posición inicial.")} />
            </div>
          </Panel>
          <Panel><h2 className="pl-h2">{tx("Current demo activity · separate evidence", "Actividad actual de la demostración · evidencia separada")}</h2><AttemptSummary attempt={currentAttempt} locale={locale} /></Panel>
          <div className="grid gap-3 md:grid-cols-2">
            <Status>{tx("Coach Marcus", "Instructor Marcus")}: {coachReviewed ? tx("reviewed this exact version", "revisó esta versión exacta") : tx("review pending", "revisión pendiente")}</Status>
            <Status>{tx("Plainsboro Center", "Centro Plainsboro")}: {centerApproved ? tx("approved this exact version", "aprobó esta versión exacta") : tx("approval pending", "aprobación pendiente")}</Status>
          </div>
          {!coachReviewed ? <Primary onClick={reviewGuidedReport}>{tx("Coach Marcus · Review exact version", "Instructor Marcus · Revisar versión exacta")}</Primary> : !centerApproved ? <Primary onClick={approveGuidedReport}>{tx("Plainsboro Center · Approve exact version", "Centro Plainsboro · Aprobar versión exacta")}</Primary> : <Primary onClick={shareGuidedReport}>{tx("Share demo report with family", "Compartir informe de demostración con la familia")} <ChevronRight size={18} /></Primary>}
          <details className="rounded-xl border border-cool-300 bg-white p-4">
            <summary className="cursor-pointer font-semibold text-navy">{tx("Version and invalidation history", "Historial de versiones e invalidación")}</summary>
            <ul className="mt-3 space-y-2">
              {record.reportRevisions.map((revision) => <li key={revision.id}>{tx("Version", "Versión")} {revision.version} · {tx(revision.status, revision.status === "invalidated" ? "invalidada" : revision.status === "shared" ? "compartida" : "borrador")}{revision.invalidatedReason ? ` · ${tx(revision.invalidatedReason, "El enfoque docente cambió.")}` : ""}</li>)}
            </ul>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-cool-600">{tx("Coach and Center approval history", "Historial de aprobación del instructor y el Centro")}</p>
            <ul className="mt-2 space-y-2">
              {record.reportReviews.length ? record.reportReviews.map((review) => <li key={review.id}>{review.role === "coach" ? tx("Coach Marcus", "Instructor Marcus") : tx("Plainsboro Center", "Centro Plainsboro")} · {tx("Version", "Versión")} {review.version} · {tx(review.action, review.action === "reviewed" ? "revisada" : review.action === "approved" ? "aprobada" : "invalidada")}{review.reason ? ` · ${tx(review.reason, "El contenido del informe cambió.")}` : ""}</li>) : <li>{tx("No approvals recorded yet.", "Aún no hay aprobaciones registradas.")}</li>}
            </ul>
          </details>
        </>}
      </Page>
    )
  }

  function GuidedFamily() {
    const record = state.students.robert
    const shared = [...record.reportRevisions].reverse().find((revision) => revision.status === "shared")
    const latestComment = record.familyComments.at(-1)
    return (
      <Page
        title={tx("Robert's monthly learning story", "Historia mensual de aprendizaje de Robert")}
        subtitle={tx("A reviewed fictional report from Coach Marcus and Plainsboro Center.", "Un informe ficticio revisado por el instructor Marcus y el Centro Plainsboro.")}
        eyebrow={tx("MOMENT 6 OF 6 · FAMILY RESPONSE", "MOMENTO 6 DE 6 · RESPUESTA FAMILIAR")}
      >
        {!shared ? <Info>{tx("No Center-approved report is available to the Family yet.", "Aún no hay un informe aprobado por el Centro disponible para la familia.")}</Info> : <>
          <Status>{tx("SIMULATED FAMILY VIEW · REPORT", "VISTA FAMILIAR SIMULADA · INFORME")} {shared.version}</Status>
          <div className="grid gap-5 lg:grid-cols-2">
            <Panel><h2 className="pl-h2">{tx("What Robert learned", "Lo que Robert aprendió")}</h2><p>{tx("Across prepared fictional September sessions, Robert improved at predicting direction and explaining why complete rotations return to the starting point.", "Durante sesiones ficticias preparadas de septiembre, Robert mejoró al predecir la dirección y explicar por qué las rotaciones completas regresan al punto inicial.")}</p><h3 className="mt-5 font-semibold text-navy">{tx("Support used", "Apoyo utilizado")}</h3><p>{tx("One narrated example and an early visual hint; later direction evidence was independent.", "Un ejemplo narrado y una pista visual inicial; la evidencia posterior de dirección fue independiente.")}</p></Panel>
            <Panel><h2 className="pl-h2">{tx("What happens next", "Qué sigue")}</h2><p>{tx("Marcus will reduce prompting and check transfer from a new starting position.", "Marcus reducirá las indicaciones y comprobará la transferencia desde una nueva posición inicial.")}</p><p className="mt-5 text-sm text-cool-600">{tx("This report and response stay in this browser. Nothing is messaged or delivered.", "Este informe y la respuesta permanecen en este navegador. No se envía ni entrega nada.")}</p></Panel>
          </div>
          {latestComment ? <Panel><h2 className="pl-h2">{tx("Your response", "Tu respuesta")}</h2><Status>✓ {tx("Saved locally and visible to Coach Marcus", "Guardada localmente y visible para el instructor Marcus")}</Status><p className="mt-4">“{latestComment.text}”</p><Secondary onClick={() => navigate("guided-coach")}>{tx("See the Coach perspective", "Ver la perspectiva del instructor")}</Secondary></Panel> : <Panel><label className="pl-h2 block" htmlFor="family-comment">{tx("Respond to Coach Marcus", "Responder al instructor Marcus")}</label><textarea id="family-comment" rows={4} className="w-full rounded-xl border border-cool-300 bg-cool-50 p-3" placeholder={tx("Write a fictional Family comment…", "Escribe un comentario familiar ficticio…")} value={familyCommentDraft} onChange={(event) => setFamilyCommentDraft(event.target.value)} /><Primary onClick={submitFamilyComment}>{tx("Submit fictional comment", "Enviar comentario ficticio")}</Primary></Panel>}
        </>}
        {!shared && <Secondary onClick={() => navigate("guided-review")}>{tx("Return to monthly review", "Volver a la revisión mensual")}</Secondary>}
      </Page>
    )
  }

  function HqUpload() {
    return (
      <Page
        title={tx(
          "A new motor lab starts here",
          "Un nuevo laboratorio de motores comienza aquí",
        )}
        eyebrow={tx(
          "SCRIPTED DEMO · Prepared content / synthetic observations",
          "DEMOSTRACIÓN GUIADA · Contenido preparado / observaciones sintéticas",
        )}
      >
        <Panel>
          <Label>
            {tx(
              "FICTIONAL SOURCE · SOURCE v1.2",
              "FUENTE FICTICIA · VERSIÓN 1.2",
            )}
          </Label>
          <p className="pl-lead">
            {tx(
              "Upload the instructor guide for Robotics Explorers. This demo uses a prepared, fictional source; no document leaves the device.",
              "Carga la guía del instructor de Exploradores de Robótica. Esta demostración usa una fuente ficticia preparada; ningún documento sale del dispositivo.",
            )}
          </p>
          <Info>
            <strong>motor-lab-v1.2.pdf</strong>
            <br />8 {tx("pages", "páginas")} ·{" "}
            {tx(
              "Section 2: Motor direction & rotation",
              "Sección 2: Dirección y rotación del motor",
            )}
            <br />
            MTR-01 · {tx("Draft v0.9", "Borrador v0.9")}
          </Info>
          <Primary onClick={() => setPackage("preparing")}>
            {tx("Upload prepared curriculum", "Cargar currículo preparado")}{" "}
            <ChevronRight size={18} />
          </Primary>
        </Panel>
      </Page>
    )
  }

  function HqProcessing() {
    return (
      <Page title={tx("Preparing your package", "Preparando tu paquete")}>
        <Panel>
          <Label>
            {tx(
              "SIMULATED PREPARATION · 4 OF 5 READY",
              "PREPARACIÓN SIMULADA · 4 DE 5 LISTOS",
            )}
          </Label>
          <ul className="my-6 space-y-2 pl-1 text-lg">
            <li>✓ {tx("Source parsed", "Fuente analizada")}</li>
            <li>
              ✓{" "}
              {tx(
                "Module objectives extracted",
                "Objetivos del módulo extraídos",
              )}
            </li>
            <li>
              ✓{" "}
              {tx(
                "Written guide and illustrations prepared",
                "Guía escrita e ilustraciones preparadas",
              )}
            </li>
            <li>
              ✓{" "}
              {tx(
                "Narrated storyboard prepared",
                "Guion gráfico narrado preparado",
              )}
            </li>
            <li>
              {tx(
                "Interactive lab waiting for source clarification",
                "Laboratorio interactivo en espera de aclaración",
              )}
            </li>
          </ul>
          <Info>
            {tx(
              "No live AI or background job is running.",
              "No hay IA activa ni tarea en segundo plano.",
            )}
          </Info>
          <Primary onClick={() => setPackage("clarification")}>
            {tx("Review preparation", "Revisar preparación")}
          </Primary>
          <Secondary onClick={() => setPackage("failure")}>
            {tx("Simulate preparation failure", "Simular fallo de preparación")}
          </Secondary>
        </Panel>
      </Page>
    )
  }

  function HqClarify() {
    return (
      <Page
        title={tx(
          "Make the viewpoint unambiguous",
          "Haz que el punto de vista sea inequívoco",
        )}
      >
        <Panel>
          <Label>
            {tx(
              "MISSING INFORMATION · HQ DECISION",
              "INFORMACIÓN FALTANTE · DECISIÓN CENTRAL",
            )}
          </Label>
          <p className="pl-lead">
            {tx(
              "Source §2 says “2 turns to the right.”",
              "La fuente §2 dice “2 vueltas a la derecha”.",
            )}
          </p>
          <p className="pl-lead">
            {tx(
              "Clarification: view the shaft end, facing the motor. Clockwise follows a clock’s hands from this viewpoint. Two complete turns = 720°.",
              "Aclaración: mira el extremo del eje, de frente al motor. Desde este punto, el sentido horario sigue las agujas del reloj. Dos vueltas completas = 720°.",
            )}
          </p>
          <Info>
            {tx(
              "Replace “Move the pointer two spaces” with “Make two complete clockwise rotations.” Apply this to the written guide, illustrations, narration, captions and interactive lab.",
              "Reemplaza “Mueve el indicador dos espacios” por “Haz dos vueltas completas en sentido horario”. Aplícalo a la guía, ilustraciones, narración, subtítulos y laboratorio interactivo.",
            )}
          </Info>
          <Primary
            onClick={() =>
              update((draft) => {
                draft.package.clarificationSaved = true
                draft.package.status = "review"
                draft.view = "hq-review"
                return draft
              })
            }
          >
            {tx(
              "Save shaft-end clarification",
              "Guardar aclaración del extremo del eje",
            )}
          </Primary>
          <Secondary onClick={() => setPackage("preparing")}>
            {tx("Return without saving", "Volver sin guardar")}
          </Secondary>
        </Panel>
      </Page>
    )
  }

  function HqFailure() {
    return (
      <Page
        title={tx(
          "The interactive lab needs another try",
          "El laboratorio interactivo necesita otro intento",
        )}
      >
        <Panel>
          <Label>
            {tx(
              "SIMULATED FAILURE · NO WORK LOST",
              "FALLO SIMULADO · NO SE PERDIÓ TRABAJO",
            )}
          </Label>
          <p className="pl-lead">
            {tx(
              "The preview could not be prepared. Source v1.2, extracted objectives and four prepared asset scripts are saved.",
              "No se pudo preparar la vista previa. La fuente v1.2, los objetivos extraídos y cuatro guiones preparados están guardados.",
            )}
          </p>
          <Info>
            {tx(
              "Retry resumes only the interactive preview. Approval stays blocked until clarification and asset review are complete.",
              "Reintentar reanuda solo la vista interactiva. La aprobación queda bloqueada hasta completar la aclaración y la revisión.",
            )}
          </Info>
          <Primary
            onClick={() =>
              setPackage(
                state.package.clarificationSaved ? "review" : "clarification",
              )
            }
          >
            {tx("Retry preparation", "Reintentar preparación")}
          </Primary>
          <Secondary onClick={() => setPackage("upload")}>
            {tx("Return to source", "Volver a la fuente")}
          </Secondary>
        </Panel>
      </Page>
    )
  }

  function HqReview() {
    return (
      <Page
        title={tx(
          "One module. Three ways in.",
          "Un módulo. Tres formas de entrar.",
        )}
        subtitle={tx(
          "Preview the same objectives before publishing to a center.",
          "Revisa los mismos objetivos antes de ponerlos a disposición del centro.",
        )}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Panel>
            <Label>SOURCE v1.2 · §2</Label>
            <h2 className="pl-h2">
              “
              {tx(
                "Rotate the motor 2 turns to the right.",
                "Gira el motor 2 vueltas a la derecha.",
              )}
              ”
            </h2>
            <p>
              {tx(
                "HQ clarification: shaft-end view, facing the motor. Right means clockwise. One turn = 360°.",
                "Aclaración central: vista del extremo del eje, frente al motor. Derecha significa sentido horario. Una vuelta = 360°.",
              )}
            </p>
            <Status>
              {tx("Clarification saved by HQ", "Aclaración guardada")}
            </Status>
          </Panel>
          <Panel>
            <Label>
              {tx(
                "REVISED PREVIEW · PACKAGE v1.0",
                "VISTA REVISADA · PAQUETE v1.0",
              )}
            </Label>
            <h2 className="pl-h2">
              {tx("Two rotations, not two steps", "Dos vueltas, no dos pasos")}
            </h2>
            <p>
              {tx(
                "Face the shaft end. Predict its position after two complete clockwise rotations (720°). The marker ends where it started.",
                "Mira el extremo del eje. Predice su posición después de dos vueltas completas en sentido horario (720°). El indicador termina donde comenzó.",
              )}
            </p>
            <Status>
              {tx(
                "Correction applied to all prepared presentations",
                "Corrección aplicada a todas las presentaciones",
              )}
            </Status>
          </Panel>
        </div>
        <Panel>
          <h2 className="pl-h2">
            {tx(
              "Same objectives. Comparable independent checks.",
              "Mismos objetivos. Evaluaciones independientes comparables.",
            )}
          </h2>
          <p>
            {tx(
              "All three approaches teach direction, partial versus full turns, transfer, and explanation. Package approval is not a learner recommendation.",
              "Los tres enfoques enseñan dirección, vueltas parciales y completas, transferencia y explicación. Aprobar el paquete no es recomendarlo a un estudiante.",
            )}
          </p>
        </Panel>
        <Primary onClick={approvePackage}>
          {tx(
            "Approve exact package v1.0 & make available",
            "Aprobar el paquete exacto v1.0 y ponerlo disponible",
          )}
        </Primary>
      </Page>
    )
  }

  function Available() {
    return (
      <Page
        title={tx(
          "Ready for the center. Not assigned yet.",
          "Listo para el centro. Aún no asignado.",
        )}
      >
        <Panel>
          <Label>
            {tx("PACKAGE v1.0 · HQ APPROVED", "PAQUETE v1.0 · APROBADO")}
          </Label>
          <h2 className="pl-h2">
            Turn, test, explain
            <br />
            Robotics Explorers · MTR-01
          </h2>
          <p className="pl-lead">
            {tx(
              "Plainsboro Center has received the approved package. All three presentations share the same objectives and checks.",
              "El Centro Plainsboro recibió el paquete aprobado. Las tres presentaciones comparten los mismos objetivos y evaluaciones.",
            )}
          </p>
          <Info>
            {tx(
              "Coach Marcus still reviews each learner’s recommended approach. No recommendation has been accepted on a learner’s behalf.",
              "El instructor Marcus aún revisa el enfoque recomendado para cada estudiante. No se ha aceptado ninguna recomendación por el estudiante.",
            )}
          </Info>
          <Primary onClick={() => navigate("adventure")}>
            {tx(
              "Start Robert’s first adventure",
              "Comenzar la primera aventura de Robert",
            )}
          </Primary>
          <Secondary onClick={() => navigate("hq-review")}>
            {tx("Review package again", "Revisar el paquete otra vez")}
          </Secondary>
        </Panel>
      </Page>
    )
  }

  function Adventure() {
    const firstAttempt = latestAttempt(state, "adventure-1")
    const firstDone = Boolean(firstAttempt?.submitted && firstAttempt.correct)
    const activity: AttemptRecord["activity"] = firstDone
      ? "adventure-2"
      : "adventure-1"
    const prompt = firstDone ? "¾ clockwise from Top" : "¼ clockwise from Top"
    const attempt = latestAttempt(state, activity)
    if (!attempt) queueMicrotask(() => ensureAttempt(activity, prompt))
    return (
      <Page
        title={
          firstDone
            ? tx("Aim the rescue beacon", "Apunta la baliza de rescate")
            : tx("Your first robot adventure", "Tu primera aventura robótica")
        }
        subtitle={tx(
          "Choose Rescue beacon or Space signal, then predict where the marker will stop.",
          "Elige Baliza de rescate o Señal espacial y predice dónde se detendrá el indicador.",
        )}
      >
        <div className="mb-5 grid gap-3 sm:grid-cols-2">
          <Secondary>{tx("Rescue beacon", "Baliza de rescate")}</Secondary>
          <Secondary>{tx("Space signal", "Señal espacial")}</Secondary>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(300px,0.9fr)_1.1fr]">
          <Panel>
            <Rotation
              start="Top"
              end={attempt?.submitted ? expectedPosition(activity) : undefined}
              locale={locale}
            />
            <p className="mt-4 font-medium text-navy">
              {tx(
                "Mission target · Aim the rescue beacon",
                "Objetivo · Apunta la baliza de rescate",
              )}
            </p>
          </Panel>
          <AttemptForm
            attempt={attempt}
            activity={activity}
            title={
              firstDone
                ? tx(
                    "Predict a ¾ clockwise rotation",
                    "Predice una rotación de ¾ en sentido horario",
                  )
                : tx(
                    "Predict a ¼ clockwise rotation",
                    "Predice una rotación de ¼ en sentido horario",
                  )
            }
            submitLabel={tx("Submit prediction", "Enviar predicción")}
            onSubmit={() => submitAttempt(activity)}
          />
        </div>
        {attempt?.submitted && (
          <div className="mt-5 flex flex-wrap gap-3">
            <Secondary
              onClick={() =>
                changeAttempt(activity, (a) => {
                  a.submitted = false
                  a.correct = false
                })
              }
            >
              {tx("Revise my prediction", "Revisar mi predicción")}
            </Secondary>
            {firstDone && activity === "adventure-2" ? (
              <Primary onClick={() => navigate("practice")}>
                {tx(
                  "Continue to learning approaches",
                  "Continuar a los enfoques",
                )}
              </Primary>
            ) : null}
          </div>
        )}
      </Page>
    )
  }

  function Practice() {
    const presentation = state.activePresentation
    const preview = student.previewPresentation
    return (
      <Page
        title={tx("Turn, test, explain", "Gira, prueba y explica")}
        subtitle={`${student.name} · ${presentationName(presentation, locale)}`}
      >
        <Status>
          {preview ? tx("Preview", "Vista previa") : tx("Practice", "Práctica")}{" "}
          · {presentationName(presentation, locale)}
        </Status>
        {preview ? (
          <Panel>
            <h2 className="pl-h2">
              {tx(
                "See the format before you choose",
                "Mira el formato antes de elegir",
              )}
            </h2>
            <p className="pl-lead">
              {presentationDescription(presentation, locale)}
            </p>
            <p className="text-cool-600">
              {tx(
                "Previewing this outline does not change saved responses or the coach’s decision.",
                "Revisar este esquema no cambia las respuestas guardadas ni la decisión del instructor.",
              )}
            </p>
            <Primary onClick={() => choosePresentation(presentation, false)}>
              {tx(
                "Use this presentation for practice",
                "Usar esta presentación para practicar",
              )}
            </Primary>
            <p className="text-sm text-cool-600">
              {tx(
                "If a check is in progress, relevant guidance is recorded as support for that attempt.",
                "Si hay una evaluación en curso, la orientación pertinente se registra como apoyo para ese intento.",
              )}
            </p>
          </Panel>
        ) : (
          <PresentationBody presentation={presentation} />
        )}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {PRESENTATIONS.map((item) => (
            <Secondary
              key={item.id}
              onClick={() =>
                choosePresentation(
                  item.id,
                  item.id !== student.practicePresentation,
                )
              }
            >
              {item.id === student.practicePresentation
                ? tx("Current", "Actual")
                : tx("Preview", "Vista previa")}{" "}
              · {locale === "es" ? item.es : item.en}
            </Secondary>
          ))}
        </div>
        <p className="mt-5 text-sm text-cool-600">
          {tx(
            "Coach’s saved recommendation",
            "Recomendación guardada del instructor",
          )}
          :{" "}
          <strong className="text-navy">
            {student.recommendationHistory.at(-1)
              ? approachName(
                  student.recommendationHistory.at(-1)!.approach,
                  locale,
                )
              : tx("Pending instructor review", "Pendiente de revisión")}
          </strong>
        </p>
      </Page>
    )
  }

  function PresentationBody({ presentation }: { presentation: Presentation }) {
    if (presentation === "narrated") {
      const frames = [
        tx(
          "Face the shaft end. Start at Top.",
          "Mira el extremo del eje. Comienza arriba.",
        ),
        tx(
          "A counterclockwise turn moves opposite the clock’s hands.",
          "Una vuelta antihoraria va en dirección opuesta a las agujas.",
        ),
        tx(
          "A half turn from Top ends at Bottom.",
          "Media vuelta desde arriba termina abajo.",
        ),
      ]
      return (
        <Panel>
          <h2 className="pl-h2">
            {tx("Watch → Try → Go solo", "Mira → Prueba → Hazlo solo")}
          </h2>
          <p className="text-cool-600">
            {tx(
              "Prepared three-frame storyboard · No recorded audio or video",
              "Guion preparado de tres cuadros · Sin audio ni video grabado",
            )}
          </p>
          <p className="my-3 font-semibold text-navy">
            {tx("Frame", "Cuadro")} {state.storyboardFrame} / 3
          </p>
          <Rotation
            start={state.storyboardFrame === 3 ? "Bottom" : "Top"}
            locale={locale}
          />
          <p className="mt-3">{frames[state.storyboardFrame - 1]}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Primary
              onClick={() =>
                update((draft) => ({
                  ...draft,
                  storyboardFrame: Math.min(
                    3,
                    draft.storyboardFrame + 1,
                  ) as 1 | 2 | 3,
                }))
              }
            >
              {tx("Advance storyboard", "Avanzar guion")}
            </Primary>
            <Secondary
              onClick={() =>
                update((draft) => ({ ...draft, storyboardFrame: 1 }))
              }
            >
              {tx("Replay", "Repetir")}
            </Secondary>
            <Secondary
              onClick={() =>
                update((draft) => ({ ...draft, captionsOn: !draft.captionsOn }))
              }
            >
              {tx("Captions", "Subtítulos")}:{" "}
              {state.captionsOn
                ? tx("on", "activados")
                : tx("off", "desactivados")}
            </Secondary>
            <Secondary
              onClick={() =>
                update((draft) => ({
                  ...draft,
                  transcriptOpen: !draft.transcriptOpen,
                }))
              }
            >
              {tx(
                "Full transcript / static equivalent",
                "Transcripción completa / equivalente estático",
              )}
            </Secondary>
          </div>
          {state.transcriptOpen && <Info>{frames.join(" ")}</Info>}
          {state.storyboardFrame === 3 && (
            <Primary
              onClick={() => {
                ensureAttempt("guided", "½ counterclockwise from Top")
              }}
            >
              {tx("Begin guided prediction", "Comenzar predicción guiada")}
            </Primary>
          )}
          {latestAttempt(state, "guided") && (
            <AttemptForm
              attempt={latestAttempt(state, "guided")}
              activity="guided"
              title={tx(
                "Guided: ½ counterclockwise from Top",
                "Guiado: ½ vuelta antihoraria desde arriba",
              )}
              submitLabel={tx("Submit prediction", "Enviar predicción")}
              onSubmit={() => submitAttempt("guided")}
            />
          )}
        </Panel>
      )
    }
    if (presentation === "interactive") {
      const attempt = latestAttempt(state, "interactive")
      if (!attempt)
        queueMicrotask(() =>
          ensureAttempt("interactive", "1½ clockwise rotations from Top"),
        )
      return (
        <Panel>
          <h2 className="pl-h2">
            {tx(
              "Predict · 1½ clockwise rotations",
              "Predice · 1½ vueltas en sentido horario",
            )}
          </h2>
          <Rotation
            start="Top"
            end={attempt?.submitted ? "Bottom" : undefined}
            locale={locale}
          />
          <AttemptForm
            attempt={attempt}
            activity="interactive"
            title={tx(
              "Where will the marker finish? Explain how you counted.",
              "¿Dónde terminará el indicador? Explica cómo contaste.",
            )}
            submitLabel={tx("Run experiment", "Ejecutar experimento")}
            requireExplanation
            onSubmit={() => submitAttempt("interactive", true)}
          />
        </Panel>
      )
    }
    return (
      <Panel>
        <h2 className="pl-h2">
          {tx("Your independent brief", "Tu guía independiente")}
        </h2>
        <p className="pl-lead">
          {tx(
            "Face the shaft end. One complete rotation is 360°. Clockwise follows the clock’s hands; counterclockwise reverses them.",
            "Mira el extremo del eje. Una vuelta completa son 360°. El sentido horario sigue las agujas; el antihorario va al revés.",
          )}
        </p>
        <p>
          {tx(
            "Challenge: sketch or demonstrate 2¼ clockwise rotations. Explain how you counted.",
            "Reto: dibuja o demuestra 2¼ vueltas en sentido horario. Explica cómo contaste.",
          )}
        </p>
        <p className="mt-3 font-semibold text-navy">
          {tx(
            "Optional extension: find different rotation counts with the same endpoint.",
            "Extensión opcional: encuentra distintas cantidades de vueltas con el mismo punto final.",
          )}
        </p>
        <Primary onClick={() => navigate("checks")}>
          {tx(
            "Go solo · Begin Check 1 of 2",
            "Hazlo solo · Comenzar evaluación 1 de 2",
          )}
        </Primary>
      </Panel>
    )
  }

  function Checks() {
    const activity = state.activeCheck === 1 ? "check-1" : "check-2"
    const prompt =
      state.activeCheck === 1
        ? "1¼ counterclockwise rotations (450°) from Top"
        : "Two complete clockwise rotations (720°) from Top"
    const attempt = latestAttempt(state, activity)
    if (!attempt) queueMicrotask(() => ensureAttempt(activity, prompt))
    return (
      <Page
        title={`${tx("Independent check", "Evaluación independiente")} ${state.activeCheck} / 2`}
        subtitle={
          state.activeCheck === 1
            ? tx(
                "Start Top; 1¼ counterclockwise rotations, 450°.",
                "Comienza arriba; 1¼ vueltas antihorarias, 450°.",
              )
            : tx(
                "Start Top; two complete clockwise rotations, 720°.",
                "Comienza arriba; dos vueltas completas en sentido horario, 720°.",
              )
        }
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(300px,0.8fr)_1.2fr]">
          <Panel>
            <Rotation
              start="Top"
              end={attempt?.submitted ? expectedPosition(activity) : undefined}
              locale={locale}
            />
          </Panel>
          <AttemptForm
            attempt={attempt}
            activity={activity}
            title={tx(
              "Select a position and explain or demonstrate.",
              "Selecciona una posición y explica o demuestra.",
            )}
            submitLabel={tx("Submit for review", "Enviar para revisión")}
            requireExplanation
            onSubmit={() => submitAttempt(activity, true)}
          />
        </div>
        {attempt?.submitted && (
          <div className="mt-5">
            <Primary
              onClick={() =>
                state.activeCheck === 1
                  ? update((draft) => ({ ...draft, activeCheck: 2 }))
                  : navigate("results")
              }
            >
              {state.activeCheck === 1
                ? tx("Continue to Check 2", "Continuar a la evaluación 2")
                : tx("Review both responses", "Revisar ambas respuestas")}
            </Primary>
          </div>
        )}
      </Page>
    )
  }

  function Results() {
    const checks = student.attempts.filter(
      (attempt) =>
        attempt.activity === "check-1" || attempt.activity === "check-2",
    )
    return (
      <Page title={tx("Your two check responses", "Tus dos respuestas")}>
        {[1, 2].map((number) => {
          const attempt = [...checks]
            .reverse()
            .find((item) => item.activity === `check-${number}`)
          return (
            <Panel key={number}>
              <h2 className="pl-h2">
                {tx("Check", "Evaluación")} {number} / 2
              </h2>
              <AttemptSummary attempt={attempt} locale={locale} />
            </Panel>
          )
        })}
        <p className="font-semibold text-navy">
          {checks.filter(
            (attempt) =>
              attempt.submitted &&
              attempt.independentlyExplained &&
              attempt.reviewedByMarcus,
          ).length === 2
            ? tx(
                "2/2 independently explained or demonstrated",
                "2/2 explicadas o demostradas de forma independiente",
              )
            : tx(
                "Independent explanations await both checks and Marcus’s review.",
                "Las explicaciones independientes esperan ambas evaluaciones y la revisión de Marcus.",
              )}
        </p>
        <Primary onClick={() => navigate("coach")}>
          {tx(
            "Send responses to Coach Marcus",
            "Enviar respuestas al instructor Marcus",
          )}
        </Primary>
        <div className="grid gap-3 sm:grid-cols-2">
          <Secondary
            onClick={() =>
              update((draft) => ({ ...draft, view: "checks", activeCheck: 1 }))
            }
          >
            {tx("Review Check 1", "Revisar evaluación 1")}
          </Secondary>
          <Secondary
            onClick={() =>
              update((draft) => ({ ...draft, view: "checks", activeCheck: 2 }))
            }
          >
            {tx("Review Check 2", "Revisar evaluación 2")}
          </Secondary>
        </div>
      </Page>
    )
  }

  function Coach() {
    return (
      <Page
        title={tx(
          "A teaching decision, not a label",
          "Una decisión docente, no una etiqueta",
        )}
        eyebrow={tx(
          "Synthetic observations and illustrative recommendations",
          "Observaciones sintéticas y recomendaciones ilustrativas",
        )}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {(["robert", "lily", "jake"] as StudentId[]).map((id) => {
            const record = state.students[id]
            const observation = record.attempts.find(
              (attempt) => attempt.submitted,
            )
            return (
              <Panel key={id}>
                <h2 className="pl-h2">{record.name}</h2>
                <p className="text-cool-600">
                  {tx("Learning preference", "Preferencia")}: “
                  {record.preference}”
                </p>
                <p className="mt-3">
                  {observation
                    ? tx(
                        `Current session: ${observation.prompt}; ${
                          observation.correct
                            ? "correct endpoint"
                            : "incorrect endpoint"
                        }.`,
                        `Sesión actual: ${observation.prompt}; ${
                          observation.correct
                            ? "punto final correcto"
                            : "punto final incorrecto"
                        }.`,
                      )
                    : tx(
                        "No current-session response submitted.",
                        "No hay respuesta enviada en la sesión actual.",
                      )}
                </p>
                <p className="mt-3 text-sm text-cool-600">
                  {tx("Prepared prior history", "Historial previo preparado")}:{" "}
                  {record.preparedPriorHistory.join(" ")}
                </p>
                <p className="mt-3 font-medium text-navy">
                  {record.remainingUncertainty}
                </p>
                <div className="mt-4 grid gap-2">
                  <Secondary
                    onClick={() => {
                      selectStudent(id)
                      navigate("practice")
                    }}
                  >
                    {tx("Open activity", "Abrir actividad")}
                  </Secondary>
                  <Secondary
                    onClick={() => {
                      selectStudent(id)
                      navigate("evidence")
                    }}
                  >
                    {tx("Review evidence", "Revisar evidencia")}
                  </Secondary>
                </div>
              </Panel>
            )
          })}
        </div>
        <Panel>
          <h2 className="pl-h2">
            {student.name} ·{" "}
            {tx("Recommended learning approach", "Enfoque recomendado")}
          </h2>
          <p>
            {student.id === "robert"
              ? tx(
                  "Provisional interactive practice; select one narrated example, then reduce prompting.",
                  "Práctica interactiva provisional; selecciona un ejemplo narrado y luego reduce las indicaciones.",
                )
              : student.id === "lily"
                ? tx(
                    "Interactive practice; a narrated example remains pending until current-session counting evidence is reviewed.",
                    "Práctica interactiva; el ejemplo narrado sigue pendiente hasta revisar evidencia actual de conteo.",
                  )
                : tx(
                    "Written brief with optional extension, supported by prepared prior history.",
                    "Guía escrita con extensión opcional, respaldada por historial previo preparado.",
                  )}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <Secondary
              onClick={() =>
                saveDecision(
                  student.id,
                  "accepted",
                  student.practicePresentation,
                )
              }
            >
              {tx("Accept", "Aceptar")}
            </Secondary>
            <Primary
              onClick={() =>
                saveDecision(student.id, "modified", "narrated-then-reduced")
              }
            >
              {tx("Modify", "Modificar")}
            </Primary>
            <Secondary
              onClick={() => saveDecision(student.id, "dismissed", "dismissed")}
            >
              {tx("Dismiss", "Descartar")}
            </Secondary>
            <Secondary
              onClick={() =>
                setMessage(
                  tx(
                    "Cancelled. No decision was saved.",
                    "Cancelado. No se guardó ninguna decisión.",
                  ),
                )
              }
            >
              {tx("Cancel", "Cancelar")}
            </Secondary>
          </div>
        </Panel>
        <p className="text-sm text-cool-600">
          {tx(
            "Opening an activity is navigation. Submission does not establish understanding; Marcus must review an existing response.",
            "Abrir una actividad es navegación. Enviar no demuestra comprensión; Marcus debe revisar una respuesta existente.",
          )}
        </p>
      </Page>
    )
  }

  function Evidence() {
    const checks = student.attempts.filter(
      (attempt) =>
        attempt.activity === "check-1" || attempt.activity === "check-2",
    )
    const independent = checks.filter(
      (attempt) =>
        attempt.submitted &&
        attempt.independentlyExplained &&
        attempt.reviewedByMarcus,
    ).length
    const currentObservation = student.attempts.find(
      (attempt) =>
        attempt.activity === "interactive" &&
        attempt.submitted &&
        attempt.explanation.trim(),
    )
    return (
      <Page
        title={`${student.name.split(" ")[0]} · ${tx("Review the evidence", "Revisar la evidencia")}`}
      >
        {[1, 2].map((number) => {
          const attempt = [...checks]
            .reverse()
            .find((item) => item.activity === `check-${number}`)
          return (
            <Panel key={number}>
              <h2 className="pl-h2">
                {tx("Check", "Evaluación")} {number} / 2
              </h2>
              <AttemptSummary attempt={attempt} locale={locale} />
              {attempt?.submitted &&
                (attempt.explanation.trim() ||
                  attempt.responseMode === "coach-recorded") &&
                !attempt.reviewedByMarcus && (
                  <Secondary
                    onClick={() =>
                      update((draft) => {
                        const target = draft.students[
                          draft.activeStudent
                        ].attempts.find((item) => item.id === attempt.id)
                        if (target) target.reviewedByMarcus = true
                        return draft
                      })
                    }
                  >
                    {tx(
                      "Marcus: confirm this response",
                      "Marcus: confirmar esta respuesta",
                    )}
                  </Secondary>
                )}
            </Panel>
          )
        })}
        <p className="font-semibold text-navy">
          {independent === 2
            ? tx(
                "2/2 independently explained or demonstrated",
                "2/2 explicadas o demostradas de forma independiente",
              )
            : tx(
                "Confirmations require an existing response. Independent evidence is not complete yet.",
                "Las confirmaciones requieren una respuesta existente. La evidencia independiente aún no está completa.",
              )}
        </p>
        {student.id === "lily" && (
          <Panel className="bg-[#fff3d6]">
            <p>
              {currentObservation
                ? tx(
                    "Current-session counting explanation recorded and available for review.",
                    "Explicación de conteo de la sesión actual registrada y disponible para revisión.",
                  )
                : tx(
                    "No new counting observation recorded. Opening or running the experiment does not create this evidence.",
                    "No se registró una nueva observación de conteo. Abrir o ejecutar el experimento no crea esta evidencia.",
                  )}
            </p>
            <h3 className="mt-3 font-semibold text-navy">
              {tx(
                "Proposed narrated example · Awaiting Coach Marcus",
                "Ejemplo narrado propuesto · En espera de Marcus",
              )}
            </h3>
            <div className="mt-4 grid gap-3">
              <Primary
                onClick={() => saveDecision("lily", "accepted", "narrated")}
              >
                {tx("Accept narrated example", "Aceptar ejemplo narrado")}
              </Primary>
              <Secondary
                onClick={() => saveDecision("lily", "modified", "written")}
              >
                {tx("Modify to written brief", "Cambiar a guía escrita")}
              </Secondary>
              <Secondary
                onClick={() => saveDecision("lily", "dismissed", "dismissed")}
              >
                {tx(
                  "Dismiss; keep interactive",
                  "Descartar; mantener interactivo",
                )}
              </Secondary>
            </div>
          </Panel>
        )}
        {student.id === "robert" && (
          <div className="grid gap-3">
            <Primary
              onClick={() =>
                saveDecision("robert", "modified", "narrated-then-reduced")
              }
            >
              {tx(
                "Save one example, then reduced prompting",
                "Guardar un ejemplo y luego reducir indicaciones",
              )}
            </Primary>
            <Secondary onClick={() => navigate("updated")}>
              {tx(
                "Open Robert’s updated activity",
                "Abrir actividad actualizada de Robert",
              )}
            </Secondary>
            <Secondary onClick={() => navigate("family-draft")}>
              {tx("Review family summary", "Revisar resumen familiar")}
            </Secondary>
          </div>
        )}
        <Secondary onClick={() => navigate("coach")}>
          {tx("Back to teaching overview", "Volver al resumen docente")}
        </Secondary>
      </Page>
    )
  }

  function Updated() {
    const attempt = latestAttempt(state, "transfer")
    if (!attempt)
      queueMicrotask(() =>
        ensureAttempt("transfer", "¾ counterclockwise from Right"),
      )
    return (
      <Page
        title={tx("A new starting position", "Una nueva posición inicial")}
        subtitle={tx(
          "Start at Right. Predict the endpoint after ¾ counterclockwise rotation. Explain before running the motor.",
          "Comienza a la derecha. Predice el final después de ¾ de vuelta antihoraria. Explica antes de ejecutar el motor.",
        )}
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(300px,0.8fr)_1.2fr]">
          <Panel>
            <Rotation
              start="Right"
              end={attempt?.submitted ? "Bottom" : undefined}
              locale={locale}
            />
          </Panel>
          <AttemptForm
            attempt={attempt}
            activity="transfer"
            title={tx(
              "Your prediction and explanation",
              "Tu predicción y explicación",
            )}
            submitLabel={tx("Run motor & submit", "Ejecutar motor y enviar")}
            requireExplanation
            onSubmit={() => submitAttempt("transfer", true)}
          />
        </div>
        <Secondary onClick={() => navigate("evidence")}>
          {tx("Back to Coach review", "Volver a la revisión del instructor")}
        </Secondary>
      </Page>
    )
  }

  function FamilyDraft() {
    const checks = student.attempts.filter(
      (attempt) => attempt.activity.startsWith("check-") && attempt.submitted,
    )
    const next = student.recommendationHistory.at(-1)
    const current = [...student.reportRevisions].reverse().find(
      (revision) => revision.status !== "invalidated",
    )
    return (
      <Page
        title={tx(
          "Family preview · Draft · Not shared",
          "Vista familiar · Borrador · No compartido",
        )}
      >
        <Status>
          {tx(
            "Coach draft preview · Family account cannot see this yet",
            "Vista previa del instructor · La familia aún no puede verla",
          )}
        </Status>
        <h2 className="pl-h2">
          {tx(
            "Robert explored how a motor turns",
            "Robert exploró cómo gira un motor",
          )}
        </h2>
        <p>
          {tx(
            "In “Turn, test, explain,” Robert predicted motor direction, compared part-turns with whole rotations and tried a new challenge.",
            "En “Gira, prueba y explica”, Robert predijo la dirección, comparó vueltas parciales con completas y probó un reto nuevo.",
          )}
        </p>
        <Panel>
          <h3 className="pl-h2">
            {tx("What Robert demonstrated", "Lo que Robert demostró")}
          </h3>
          {checks.length ? (
            checks.map((attempt) => (
              <AttemptSummary
                key={attempt.id}
                attempt={attempt}
                locale={locale}
              />
            ))
          ) : (
            <p>
              {tx(
                "Awaiting both independent responses and instructor review.",
                "Esperando ambas respuestas independientes y la revisión del instructor.",
              )}
            </p>
          )}
        </Panel>
        <Panel>
          <h3 className="pl-h2">
            {tx(
              "A short example, then room to try",
              "Un ejemplo breve y luego espacio para intentar",
            )}
          </h3>
          <p>
            {tx(
              "Presentation preference and earlier support remain separate from demonstrated understanding.",
              "La preferencia de presentación y el apoyo previo se mantienen separados de la comprensión demostrada.",
            )}
          </p>
        </Panel>
        <h3 className="font-semibold text-navy">
          {tx("A note from Marcus", "Una nota de Marcus")}
        </h3>
        <p>
          “
          {checks.length === 2
            ? tx(
                "Robert is beginning to separate where the marker ends from how many turns it makes. His explanations gave useful evidence—not just a completed activity.",
                "Robert está empezando a separar dónde termina el indicador de cuántas vueltas da. Sus explicaciones aportaron evidencia útil, no solo una actividad terminada.",
              )
            : tx(
                "I am still reviewing Robert’s responses before describing demonstrated understanding.",
                "Todavía estoy revisando las respuestas de Robert antes de describir comprensión demostrada.",
              )}
          ”
        </p>
        <Panel>
          <h3 className="pl-h2">{tx("What happens next", "Qué sigue")}</h3>
          <p>
            {next
              ? `${approachName(next.approach, locale)}: ${next.reason}`
              : tx(
                  "Next teaching step has not been saved.",
                  "El siguiente paso docente no se ha guardado.",
                )}
          </p>
        </Panel>
        <div className="grid gap-3">
          <Primary
            onClick={() =>
              update((draft) => {
                const record = draft.students[draft.activeStudent]
                const fingerprint = `${record.attempts
                  .filter((a) => a.submitted)
                  .map((a) => a.id + a.answer + a.explanation)
                  .join(
                    "|",
                  )}:${record.recommendationHistory.at(-1)?.id ?? "none"}`
                record.reportRevisions = record.reportRevisions.map(
                  (revision) =>
                    revision.status === "approved" ||
                    revision.status === "shared"
                      ? {
                          ...revision,
                          status: "invalidated",
                          invalidatedReason: tx(
                            "A newer report version was approved.",
                            "Se aprobó una versión más reciente del informe.",
                          ),
                        }
                      : revision,
                )
                record.reportRevisions.push({
                  id: `report-${Date.now()}`,
                  version: String(record.reportRevisions.length + 1),
                  contentFingerprint: fingerprint,
                  status: "approved",
                  createdAt: now(),
                })
                return draft
              })
            }
          >
            {tx(
              "Approve exact summary version",
              "Aprobar versión exacta del resumen",
            )}
          </Primary>
          <Primary
            onClick={() => {
              if (!current || current.status !== "approved") {
                setValidation(
                  tx(
                    "Approve the current exact summary version before simulated sharing.",
                    "Aprueba la versión exacta actual antes de compartirla de forma simulada.",
                  ),
                )
                return
              }
              update((draft) => {
                const revision = draft.students[
                  draft.activeStudent
                ].reportRevisions.find((item) => item.id === current.id)
                if (revision) revision.status = "shared"
                draft.view = "family-view"
                return draft
              })
            }}
          >
            {tx("Simulate sharing locally", "Simular compartir localmente")}
          </Primary>
          <Secondary
            onClick={() =>
              setMessage(
                tx(
                  "Draft saved locally. Nothing was sent.",
                  "Borrador guardado localmente. No se envió nada.",
                ),
              )
            }
          >
            {tx("Save draft & pause", "Guardar borrador y pausar")}
          </Secondary>
        </div>
      </Page>
    )
  }

  function FamilyView() {
    const shared = [...state.students.robert.reportRevisions].reverse().find(
      (revision) => revision.status === "shared",
    )
    return (
      <Page
        title={tx(
          "Small turns. Real progress.",
          "Pequeños giros. Progreso real.",
        )}
      >
        {!shared ? (
          <Info>
            {tx(
              "There is no shared summary yet. Coach Marcus is still reviewing it.",
              "Todavía no hay un resumen compartido. El instructor Marcus sigue revisándolo.",
            )}
          </Info>
        ) : (
          <>
            <Status>
              {tx(
                `Simulated shared summary · Version ${shared.version}`,
                `Resumen compartido simulado · Versión ${shared.version}`,
              )}
            </Status>
            <Panel>
              <h2 className="pl-h2">
                {tx(
                  "Robert explored how a motor turns",
                  "Robert exploró cómo gira un motor",
                )}
              </h2>
              <p>
                {tx(
                  "Robert independently explained both checks after comparing partial and complete rotations. One earlier supported revision remains visible in his learning history.",
                  "Robert explicó de forma independiente ambas evaluaciones después de comparar vueltas parciales y completas. Una revisión anterior con apoyo sigue visible en su historial.",
                )}
              </p>
              <h3 className="mt-5 font-semibold text-navy">
                {tx("Next step", "Siguiente paso")}
              </h3>
              <p>
                {state.students.robert.recommendationHistory.at(-1)?.reason}
              </p>
              <p className="mt-5 text-sm text-cool-600">
                {tx(
                  "This local fictional summary describes this session, not a permanent ability or learning style.",
                  "Este resumen ficticio local describe esta sesión, no una capacidad ni estilo de aprendizaje permanente.",
                )}
              </p>
            </Panel>
          </>
        )}
        <Secondary onClick={() => navigate("family-draft")}>
          {tx("Return to Coach preview", "Volver a la vista del instructor")}
        </Secondary>
      </Page>
    )
  }

  function AttemptForm({
    attempt,
    activity,
    title,
    submitLabel,
    requireExplanation = false,
    onSubmit,
  }: {
    attempt?: AttemptRecord
    activity: AttemptRecord["activity"]
    title: string
    submitLabel: string
    requireExplanation?: boolean
    onSubmit: () => void
  }) {
    return (
      <Panel>
        <h2 className="pl-h2">{title}</h2>
        <fieldset>
          <legend className="mb-3 font-semibold text-navy">
            {tx(
              "Where will the marker stop?",
              "¿Dónde se detendrá el indicador?",
            )}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {POSITIONS.map((position, index) => (
              <button
                key={position}
                type="button"
                className={`pl-choice ${
                  attempt?.answer === position ? "pl-choice-selected" : ""
                }`}
                onClick={() => selectAnswer(position)}
                aria-pressed={attempt?.answer === position}
              >
                {index + 1} ·{" "}
                {locale === "es" ? positionEs(position) : position}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-3 font-semibold text-navy">
          {attempt?.answer
            ? `${tx("Selected", "Seleccionado")}: ${
                locale === "es" ? positionEs(attempt.answer) : attempt.answer
              }`
            : tx("Not selected", "No seleccionado")}
        </p>
        {requireExplanation && (
          <>
            <label
              className="mt-5 block font-semibold text-navy"
              htmlFor={`${activity}-explanation`}
            >
              {tx("Text explanation", "Explicación escrita")}
            </label>
            <textarea
              id={`${activity}-explanation`}
              rows={4}
              className="mt-2 w-full rounded-xl border border-cool-300 bg-cool-50 p-3 outline-none focus:border-navy focus:ring-2 focus:ring-navy/30"
              placeholder={tx(
                "Explain how you counted the turns…",
                "Explica cómo contaste las vueltas…",
              )}
              value={attempt?.explanation ?? ""}
              onChange={(event) =>
                changeAttempt(activity, (item) => {
                  item.explanation = event.target.value
                  item.responseMode = "text"
                })
              }
            />
            <Secondary
              onClick={() =>
                changeAttempt(activity, (item) => {
                  item.responseMode = "coach-recorded"
                  item.explanation = ""
                })
              }
            >
              {attempt?.responseMode === "coach-recorded" ? (
                <Check size={17} />
              ) : null}
              {tx(
                "Simulated coach-recorded spoken/demonstrated response",
                "Respuesta oral/demostrada simulada registrada por el instructor",
              )}
            </Secondary>
          </>
        )}
        <Primary onClick={onSubmit}>{submitLabel}</Primary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Secondary
            onClick={() =>
              changeAttempt(activity, (item) => {
                item.hintUsed = true
                item.supportNotes.push(
                  tx(
                    "Learner requested help during this attempt.",
                    "El estudiante pidió ayuda durante este intento.",
                  ),
                )
              })
            }
          >
            {tx("Ask Marcus for help", "Pedir ayuda a Marcus")}
          </Secondary>
          {!requireExplanation && (
            <Secondary
              onClick={() =>
                changeAttempt(activity, (item) => {
                  item.demonstrationUsed = true
                  item.supportNotes.push(
                    tx(
                      "Prepared demonstration viewed.",
                      "Se vio la demostración preparada.",
                    ),
                  )
                })
              }
            >
              {tx("Watch a demonstration", "Ver una demostración")}
            </Secondary>
          )}
        </div>
        <p className="mt-3 text-sm text-cool-600">
          {attempt?.hintUsed || attempt?.demonstrationUsed
            ? tx(
                "Supported attempt. Support remains attached to this response.",
                "Intento con apoyo. El apoyo permanece vinculado a esta respuesta.",
              )
            : tx(
                "No help used in this attempt.",
                "No se usó ayuda en este intento.",
              )}
        </p>
      </Panel>
    )
  }
}

function guidedFurthestIndex(state: PersonalizedLearningState) {
  const record = state.students.robert
  const shared = record.reportRevisions.some((revision) => revision.status === "shared")
  const approved = record.reportReviews.some((review) => review.role === "center" && review.action === "approved")
  const submitted = record.attempts.some((attempt) => attempt.activity === "check-1" && attempt.submitted)
  if (shared || approved) return 5
  if (submitted) return 4
  if (record.recommendationHistory.length) return 3
  if (record.centerAssessment?.status === "reviewed") return 2
  if (state.package.approvals.some((approval) => approval.status === "accepted")) return 1
  return 0
}

function GuidedProgress({
  moments,
  current,
  furthest,
  locale,
  onSelect,
}: {
  moments: { id: DemoView; en: string; es: string }[]
  current: DemoView
  furthest: number
  locale: "en" | "es"
  onSelect: (view: DemoView) => void
}) {
  return (
    <nav className="order-3 w-full lg:order-none lg:max-w-[800px]" aria-label={locale === "es" ? "Progreso de la demostración guiada" : "Guided demo progress"}>
      <ol className="pl-moment-list grid grid-cols-6 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {moments.map((moment, index) => {
          const active = current === moment.id
          const available = index <= furthest
          return (
            <li key={moment.id}>
              <button
                type="button"
                className={`pl-moment ${active ? "pl-moment-active" : ""}`}
                onClick={() => onSelect(moment.id)}
                disabled={!available}
                aria-current={active ? "step" : undefined}
                aria-label={`${index + 1} ${locale === "es" ? moment.es : moment.en}`}
                title={!available ? (locale === "es" ? "Completa el momento anterior" : "Complete the previous moment") : undefined}
              >
                <span className="pl-moment-number">{index + 1}</span>
                <span className="hidden sm:inline">{locale === "es" ? moment.es : moment.en}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function AssessmentRow({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-cool-300 py-3 last:border-0"><p className="text-xs font-bold uppercase tracking-wide text-cool-600">{label}</p><p className="mt-1">{value}</p></div>
}

function EvidenceCard({ date, prepared, title, body }: { date: string; prepared: string; title: string; body: string }) {
  return <article className="rounded-xl border border-cool-300 bg-cool-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-cool-600">{date} · {prepared}</p><h3 className="mt-2 font-semibold text-navy">{title}</h3><p className="mt-2 text-sm">{body}</p></article>
}

function Page({
  title,
  subtitle,
  eyebrow,
  children,
}: {
  title: string
  subtitle?: string
  eyebrow?: string
  children: React.ReactNode
}) {
  return (
    <div className="animate-fade-up">
      <p className="mb-4 text-sm text-cool-600">{eyebrow ?? "DEMO · MTR-01"}</p>
      <h1 className="pl-title">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-4xl text-lg text-navy">{subtitle}</p>
      )}
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  )
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-cool-300 bg-white p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  )
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-xl bg-[#dce9f4] p-4 text-navy">{children}</div>
  )
}
function Status({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#e2f4ef] px-4 py-3 font-semibold text-navy">
      {children}
    </div>
  )
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-xs font-bold uppercase tracking-wide text-navy">
      {children}
    </p>
  )
}

function Primary({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button type="button" className="pl-primary" onClick={onClick}>
      {children}
    </button>
  )
}
function Secondary({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button type="button" className="pl-secondary" onClick={onClick}>
      {children}
    </button>
  )
}

function Rotation({
  start,
  end,
  locale,
}: {
  start: Position
  end?: Position
  locale: "en" | "es"
}) {
  const angle = { Top: 0, Right: 90, Bottom: 180, Left: 270 }[end ?? start]
  const label = (position: Position) =>
    locale === "es" ? positionEs(position) : position
  return (
    <div className="rounded-xl bg-[#dce9f4] p-5">
      <div
        className="relative mx-auto h-48 w-48"
        role="img"
        aria-label={
          locale === "es"
            ? `Diagrama del extremo del eje. Inicio ${label(start)}${
                end ? `, resultado ${label(end)}` : ""
              }.`
            : `Shaft-end rotation diagram. Start ${start}${
                end ? `, result ${end}` : ""
              }.`
        }
      >
        <span className="absolute left-1/2 top-0 -translate-x-1/2 text-sm text-navy">
          {label("Top")}
        </span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-navy">
          {label("Right")}
        </span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-navy">
          {label("Bottom")}
        </span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-navy">
          {label("Left")}
        </span>
        <div className="absolute inset-7 rounded-full border-[3px] border-navy bg-white">
          <div
            className="absolute left-1/2 top-1/2 h-[4px] w-[46%] origin-left rounded-full bg-navy"
            style={{ transform: `rotate(${angle - 90}deg)` }}
          >
            <span className="absolute -right-1 -top-1.5 h-4 w-4 rounded-full bg-navy" />
          </div>
          <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
        </div>
      </div>
      <p className="text-center text-sm text-navy">
        {locale === "es"
          ? `Vista del extremo del eje · Frente al motor · ${
              end ? `Resultado: ${label(end)}` : `Inicio: ${label(start)}`
            }`
          : `Shaft-end view · Facing the motor · ${
              end ? `Result: ${end}` : `Start: ${start}`
            }`}
      </p>
    </div>
  )
}

function AttemptSummary({
  attempt,
  locale,
}: {
  attempt?: AttemptRecord
  locale: "en" | "es"
}) {
  const tx = (en: string, es: string) => (locale === "es" ? es : en)
  if (!attempt?.submitted)
    return (
      <>
        <p>{tx("No response submitted.", "No se envió una respuesta.")}</p>
        <p className="mt-3 text-sm text-cool-600">
          {tx(
            "No help used in this attempt.",
            "No se usó ayuda en este intento.",
          )}
        </p>
      </>
    )
  return (
    <div className="space-y-2">
      <p>
        <strong>{tx("Answer", "Respuesta")}:</strong>{" "}
        {locale === "es" && attempt.answer
          ? positionEs(attempt.answer)
          : attempt.answer}{" "}
        ·{" "}
        {attempt.correct
          ? tx("Correct endpoint", "Punto final correcto")
          : tx("Incorrect endpoint", "Punto final incorrecto")}
      </p>
      <p>
        <strong>{tx("Explanation", "Explicación")}:</strong>{" "}
        {attempt.responseMode === "coach-recorded"
          ? tx(
              "Simulated coach-recorded response",
              "Respuesta simulada registrada por el instructor",
            )
          : attempt.explanation ||
            tx("No explanation submitted", "No se envió una explicación")}
      </p>
      <p>
        <strong>{tx("Support", "Apoyo")}:</strong>{" "}
        {attempt.hintUsed || attempt.demonstrationUsed
          ? attempt.supportNotes.join(" ") || tx("Support used", "Se usó apoyo")
          : tx("No help used", "No se usó ayuda")}
      </p>
      {attempt.originalAnswer && attempt.revisions.length > 0 && (
        <p>
          <strong>
            {tx("Original and revisions", "Original y revisiones")}:
          </strong>{" "}
          {attempt.originalAnswer} → {attempt.revisions.join(" → ")}
        </p>
      )}
    </div>
  )
}

function presentationName(presentation: Presentation, locale: "en" | "es") {
  const item = PRESENTATIONS.find((entry) => entry.id === presentation)!
  return locale === "es" ? item.es : item.en
}
function approachName(
  approach: Presentation | "narrated-then-reduced" | "dismissed",
  locale: "en" | "es",
) {
  if (approach === "narrated-then-reduced")
    return locale === "es"
      ? "Un ejemplo narrado y luego menos indicaciones"
      : "One narrated example, then reduced prompting"
  if (approach === "dismissed")
    return locale === "es"
      ? "Recomendación descartada"
      : "Recommendation dismissed"
  return presentationName(approach, locale)
}
function presentationDescription(
  presentation: Presentation,
  locale: "en" | "es",
) {
  const copy = {
    narrated: [
      "Three illustrated storyboard frames with captions and a full transcript, then a guided prediction.",
      "Tres cuadros ilustrados con subtítulos y transcripción completa, seguidos de una predicción guiada.",
    ],
    interactive: [
      "Choose a prediction, run the motor experiment, then compare the response with the result.",
      "Elige una predicción, ejecuta el experimento y compara la respuesta con el resultado.",
    ],
    written: [
      "Short written instructions, an independent challenge and an optional extension.",
      "Instrucciones breves, un reto independiente y una extensión opcional.",
    ],
  }[presentation]
  return locale === "es" ? copy[1] : copy[0]
}
function positionEs(position: Position) {
  return {
    Top: "Arriba",
    Right: "Derecha",
    Bottom: "Abajo",
    Left: "Izquierda",
  }[position]
}
function breadcrumb(view: DemoView, locale: "en" | "es", student: string) {
  if (view === "guided-hq")
    return locale === "es" ? "COGNIT CENTRAL / CURRÍCULO" : "COGNIT HQ / CURRICULUM"
  if (view === "guided-center")
    return locale === "es" ? "Centro Plainsboro / Evaluación de Robert" : "Plainsboro Center / Robert assessment"
  if (view === "guided-coach")
    return locale === "es" ? "Enseñanza / Decisión de Marcus" : "Teaching / Marcus's decision"
  if (view === "guided-student")
    return locale === "es" ? "Mi aprendizaje / Exploradores de Robótica" : "My learning / Robotics Explorers"
  if (view === "guided-review")
    return locale === "es" ? "Instructor + Centro / Informe mensual" : "Coach + Center / Monthly report"
  if (view === "guided-family")
    return locale === "es" ? `Familia / Trayectoria / ${student}` : `Family / Learning Journey / ${student}`
  if (view.startsWith("hq-"))
    return locale === "es"
      ? "COGNIT CENTRAL / CURRÍCULO"
      : "COGNIT HQ / CURRICULUM"
  if (view === "available")
    return locale === "es"
      ? "Centro / Plainsboro / Currículo disponible"
      : "Center / Plainsboro / Available curriculum"
  if (view.startsWith("family"))
    return locale === "es"
      ? `Inicio / Trayectoria / ${student}`
      : `Home / Learning Journey / ${student}`
  if (["coach", "evidence", "family-draft"].includes(view))
    return locale === "es"
      ? "Enseñanza / Exploradores de Robótica / Centro Plainsboro"
      : "Teaching / Robotics Explorers / Plainsboro Center"
  return locale === "es"
    ? "Mi aprendizaje / Exploradores de Robótica · MTR-01"
    : "My learning / Robotics Explorers · MTR-01"
}
