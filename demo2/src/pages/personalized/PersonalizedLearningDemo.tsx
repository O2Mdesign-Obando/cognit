import { useEffect, useState } from "react"
import { Check, ChevronRight, Settings2, X } from "lucide-react"
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
  const locale = state.locale
  const student = state.students[state.activeStudent]
  const tx = (en: string, es: string) => text(locale, en, es)

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
      snapshot.view === "updated"
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

  const roleName = state.view.startsWith("hq-")
    ? "Marcus Vance · HQ"
    : state.view === "available"
      ? "Kevin · Center Director"
      : state.view.startsWith("family")
        ? "Hayes Family"
        : ["coach", "evidence", "family-draft"].includes(state.view)
          ? "Coach Marcus"
          : student.name

  return (
    <div className="min-h-screen bg-cool-50 text-[#162b3d]">
      <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between border-b border-cool-300/70 bg-white px-4 py-3 sm:px-8">
        <a
          href="/learninghub/demo2/"
          aria-label={tx(
            "Cognit Demo home",
            "Inicio de la demostración Cognit",
          )}
        >
          <LogoHorizontal className="hidden h-7 sm:block" />
          <LogoWordmark className="h-6 sm:hidden" />
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

        {!state.view.startsWith("hq-") &&
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
