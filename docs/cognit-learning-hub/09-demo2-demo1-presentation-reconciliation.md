# Demo2 → Demo1 Presentation Reconciliation

**Date:** August 26, 2026  
**Scope:** Read-only comparative design reconciliation  
**Canonical product:** Demo1 (`/learninghub/demo`)  
**Design challenger:** Demo2 (`/learninghub/demo2`)  
**Decision rule:** No visual enrichment without a source-of-truth owner.

## 1. Executive finding

Demo2 does not reveal a missing product architecture. Its strongest contribution is a more immediately recognizable presentation of work that Demo1 already models: clearer operating modes, stronger pre-class and active-work hierarchy, more compact operational summaries, calmer healthy states, and more emotionally readable published learning stories.

Demo1 remains the canonical product because it owns the shared synthetic operating truth, identity continuity, course-scoped progression, publication boundaries, context isolation, accessible and resettable interactions, and route architecture. The safe promotion strategy is therefore selective: adopt presentation patterns when existing Demo1 records support them, adapt patterns when they need canonical state projection, and reject any richness that depends on invented scale, policy, billing, media capture, or business performance.

## 2. Classification key

- **A — Adopt:** The presentation lesson can be applied directly without changing product meaning.
- **B — Adapt:** The lesson is useful, but must be rebuilt from Demo1 routes, state, and semantics.
- **C — Inspiration Only:** Useful visual reference, but no direct promotion is recommended.
- **D — Reject:** Conflicts with canonical truth or implies unsupported capability/data.
- **E — Human Judgment:** A product decision is required before implementation.

## 3. Source-of-truth map

| Responsibility | Canonical owner | Consumers |
| --- | --- | --- |
| People, identities, contexts, courses, enrollments, sessions, learning events, progress, attendance, makeup, messages | `src/demo/cognit-demo-data.js` | Center, Coach, Student, Family |
| Cross-loop projections and continuity | `src/demo/cognit-demo-model.js` | Center, Coach, Student, Family |
| Center operational state and resettable actions | `src/demo/cognit-center-interaction.js` | Center |
| Coach session/report lifecycle | `src/demo/cognit-coach-interaction.js` | Coach; downstream Center/Family after publication |
| Student active-work/reflection lifecycle | `src/demo/cognit-student-interaction.js` | Student; Coach only where explicitly shared |
| Family actions and published-story consumption | `src/demo/cognit-family-interaction.js` | Family |
| Publication visibility and boundary synchronization | `src/demo/cognit-publication-sync.js` | Coach, Center, Student, Family |
| HQ’s bounded network aggregate | `src/demo/cognit-hq-data.js`, `src/demo/cognit-hq-interaction.js` | HQ |

## 4. Reconciliation matrix

| Demo2 Pattern | Demo1 Equivalent | Classification | Source-of-Truth Owner | Why It Helps | Product Risk | Tier | Recommended Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Center overview composition: attention stack plus concise operating summary | Center overview and context-scoped operations at `/learninghub/demo/center` and `/learninghub/demo/center/context/{context}` | **B — Adapt** | Shared data/model; Center interaction | Makes the daily operating picture recognizable before detail exploration | Medium: a dense dashboard can imply totals or urgency not present in records | 1 | Recompose existing sessions, messages, report states, and context facts; add no invented KPIs |
| Center schedule density across day/week/month/season | Existing scheduling routes under `/learninghub/demo/center/context/northfield/scheduling/*` | **B — Adapt** | Sessions/enrollments in shared data; Center interaction | Improves scanning across blocks and reveals real schedule relationships | Medium: dense calendars can create unsupported volume or duplicate enrollment semantics | 2 | Increase information density using existing sessions; preserve one enrollment across multiple participation blocks |
| Center report summary and review-by-exception | Center report list, Eli review, and Sofia clarification routes | **B — Adapt** | Learning events; publication sync; Center interaction | Clarifies what is processed, what needs review, and why | Low if derived from canonical report/evidence state | 1 | Pair exception cards with calm processed summaries and explicit publication status |
| Coach pre-class briefing with objective, outcomes, continuity, and special notes | `/learninghub/demo/coach/today` and `/learninghub/demo/coach/readiness` | **A — Adopt** | Session, course, roster, progress, prior learning event | Gives the Coach a useful first screen rather than a generic overview | Low | 1 | Present the existing plan, roster, prior state, and current focus as a compact briefing |
| Coach operating-mode separation: before, during, after, end-of-day | `/coach/readiness`, `/coach/live`, `/coach/after-class`, `/coach/end-of-day` | **B — Adapt** | Coach interaction lifecycle | Matches the Coach’s changing attention and reduces mixed-state pages | Medium: mode labels must follow actual lifecycle state | 1 | Strengthen mode cues and state-aware actions without replacing the canonical lifecycle |
| Coach after-class reporting composition with learner queue, evidence, observation, and readiness | `/learninghub/demo/coach/after-class` and `/learninghub/demo/coach/end-of-day` | **B — Adapt** | Coach interaction; learning event; evidence; publication sync | Makes completion requirements and handoff legible | Medium: must not imply upload, AI editing, or publication before supported state | 1 | Recompose existing evidence selection, observation, progression, and report checks; keep boundaries explicit |
| Coach live camera/capture workspace presented as functioning media capture | Demo1 live evidence placeholders and interaction controls | **D — Reject** | No authorized media-upload/camera owner | Visually dramatic but asserts an excluded operational capability | High | — | Retain evidence placeholders and inspectable metadata; do not simulate a real camera/upload system |
| Student “where I’ve been / where I am / what’s next” framing | Student home, progress, courses, and journey routes | **A — Adopt** | Course-scoped progress and learning events | Lets a learner locate themselves in the journey in seconds | Low | 1 | Add a compact progression frame derived only from canonical progress |
| Student active-work hierarchy: resources, current step, notes, help, completion | `/learninghub/demo/student/lesson` and `/learninghub/demo/student/active` | **A — Adopt** | Student interaction; course plan; progress | Improves focus and makes next action obvious | Low | 1 | Tighten hierarchy around the current activity and keep resources subordinate |
| Student gamification, badges, certificates, and external Codio dependency | Current course progression without those semantics | **D — Reject** | No canonical owner | Adds motivational decoration but changes product meaning | High | — | Do not promote without a separately authorized product capability and source of truth |
| Family Learning Journey as a narrative sequence with Coach voice, evidence memories, reflection, and next step | `/learninghub/demo/family/journey` and `/learninghub/demo/family/journey/eli` | **B — Adapt** | Published learning event/story; publication sync | Makes the published record emotionally readable and memorable | High if internal drafts, unpublished reflection, or unpublished evidence leak | 1 | Use only published story fields and family-authorized evidence; visibly separate story, memories, and next step |
| Family home/history density: latest story, enrollments, messages, announcements, actions | Family home, messages, attendance, makeup, courses | **B — Adapt** | Shared data/model; Family interaction | Makes the portal feel lived-in and supports exploration | Medium: history must be coherent and household-authorized | 2 | Add compact recent history only from shared records; avoid artificial activity volume |
| Family billing/course-registration richness | Existing bounded Family courses/billing demonstration surfaces | **D — Reject** | No authorized payment, pricing, inventory, or registration owner | Looks complete but fabricates business operations | High | — | Keep outside the promotion ledger unless separately authorized with real policy/data ownership |
| HQ executive overview with attention stack and bounded healthy summary | `/learninghub/demo/hq`, `/learninghub/demo/hq/network` | **B — Adapt** | HQ aggregate fixture and interaction | Improves executive scanning without opening local record access | Medium: executive cards can turn synthetic fixture values into business claims | 1 | Use qualitative/record-backed summaries; label the bounded synthetic network clearly |
| HQ recent-activity feed | HQ home/network activity and release/support/deployment records | **A — Adopt** | HQ data fixture | Explains why state changed and makes stewardship visible | Low if activities are structured fixture events | 2 | Render a short, dated event list from HQ-owned records |
| HQ readiness/escalation composition | HQ deployment, support, curriculum, and center-management routes | **B — Adapt** | HQ data fixture and interaction | Connects attention to a concrete stewardship action | Medium: do not imply automatic downstream access or invented compliance | 2 | Group existing readiness and escalation records by urgency and owner |
| Demo2 franchise scale, uptime, revenue, retention, compliance scores, and policy versions | Demo1’s bounded HQ fixture | **D — Reject** | No supported owner for those claims | Creates artificial executive richness | High | — | Remove from consideration; use only bounded fixture records and derived counts |
| Global shell and role/perspective switcher density | Demo1 global shell, perspective switcher, and loop-local navigation | **C — Inspiration Only** | Demo1 route architecture and shell | Demonstrates compact utility placement | Medium: direct adoption could weaken route clarity and accessibility | 1/2 | Preserve Demo1 information architecture; borrow spacing only after responsive/accessibility review |
| Account/utility dropdowns | Existing loop navigation and support/settings routes | **C — Inspiration Only** | Route architecture; future authenticated identity owner | Offers a familiar utility pattern | Medium: a profile/logout menu can imply authentication semantics not present in the demo | 2 | Do not add unless each utility maps to an existing route and truthful demo identity state |
| Release-note overlays and archives | Existing Coach/Center “What’s New” surfaces | **C — Inspiration Only** | Bounded release fixture | Useful exploration pattern, not central to the product story | Low | 2 | Keep as a secondary reference; do not interrupt the main walkthrough |
| Healthy/all-clear summaries beside exceptions | Center processed state and HQ all-clear/platform-health state | **A — Adopt** | Derived canonical state in shared model or HQ fixture | Prevents an exception-only product impression and makes normal operation visible | Low | 1 | Add calm, non-metric healthy summaries derived from zero open exceptions or processed records |
| Higher page density with grouped cards and tables | Demo1’s restrained cards, route-specific lists, and detail views | **B — Adapt** | Route-specific model projection | Reduces empty space and repeated explanation | Medium: density can become artificial busyness | 1/2 | Increase density only on scan-heavy surfaces; preserve focus on task-heavy surfaces |
| Identity, evidence, and story imagery | Demo1 local fictional identity images and evidence placeholders | **B — Adapt** | Person/evidence records in shared data | Improves recognition and Family narrative readability | Medium: decorative or repeated imagery can imply evidence that does not exist | 1/2 | Use imagery only when tied to a person, published story, or evidence record |
| More product-native explanatory copy | Demo1 orientation, boundary, and demo-scaffolding copy | **A — Adopt** | Route/component presentation; safety boundaries remain canonical | Lets the product state speak for itself | Low | 1 | Remove redundant implementation explanation while retaining publication, privacy, and synthetic-demo boundaries |
| Compact and consistent status hierarchy | Demo1 status chips, cards, alerts, and action labels | **A — Adopt** | Derived route state | Speeds recognition of scheduled/current/processed/needs-attention states | Low | 1 | Normalize visual priority without renaming canonical states |
| Separate routes for every operating-mode variation | Existing canonical deep routes plus stateful interactions | **E — Human Judgment** | Product/route architecture decision | Deep links can improve re-entry, but route multiplication can fragment one lifecycle | Medium | 2 | **Question:** Should mode changes remain stateful compositions within existing canonical routes, or should only modes requiring deep linking/re-entry receive dedicated subroutes? |
| Demo2 hard-coded lived-in volume and copy-only history | Demo1 shared records and bounded HQ fixture | **D — Reject** | No record owner | Feels active but cannot survive cross-loop inspection | High | — | Add only coherent historical records that project into every affected loop |

### Classification totals

| Classification | Count |
| --- | ---: |
| A — Adopt | 7 |
| B — Adapt | 11 |
| C — Inspiration Only | 3 |
| D — Reject | 5 |
| E — Human Judgment | 1 |
| **Total** | **27** |

## 5. Loop findings

### Center

Demo2’s useful Center lesson is composition: lead with a daily operating picture, then expose schedules, report flow, and exceptions at a higher but truthful density. Demo1 already has the stronger context model, temporal relationships, people continuity, report states, attendance/makeup flow, and resettable interactions. The most important change is not adding modules; it is grouping current facts into “operating now,” “processed normally,” and “needs attention.”

Center must not borrow Demo2’s artificial volume, billing richness, or counts. A full-day learner must continue to appear as one course enrollment with multiple scheduled participations, not as duplicated AM/PM enrollment rows.

### Coach

Demo2 most clearly improves the Coach loop. Its pre-class briefing, explicit before/during/after mode cues, compact roster treatment, and after-class queue are recognizable and task-oriented. Demo1 already owns the deeper lifecycle and should retain it. The safe correction is presentational: make state transitions more visible, keep the relevant tools in the current mode, and retain canonical evidence/report/publication semantics.

Real camera capture, file upload, AI-assisted editing, and automatic publication remain outside scope and must not be implied by presentation.

### Student

Demo2’s strongest Student contribution is immediate progression framing and active-work hierarchy. Demo1 already knows the learner, course, current challenge, completed work, next step, reflection, and journey. Those facts can support a clear “been / now / next” frame and a focused activity workspace without adding gamification or external tool dependencies.

### Family

Family is the highest-value narrative presentation opportunity. Demo2 demonstrates how a published learning event can read as a meaningful story rather than a status report. Demo1’s publication boundary is the controlling constraint: Family can see the published Coach-authored story and authorized evidence, but not Coach drafts, Center review mechanics, unpublished Student reflection, or unpublished evidence.

Home/history density should be added only from household-authorized shared records. Billing, course inventory, pricing, and registration should not be promoted from Demo2.

### HQ

Demo2 contributes executive composition: an attention stack, concise healthy state, recent activity, and clear readiness/escalation groupings. Demo1 already models bounded synthetic HQ aggregates and protects the structural distinction between hierarchy and access. The promotion must remain qualitative and record-backed; franchise scale, uptime, revenue, retention, compliance, and policy-version claims are not supported product truth.

## 6. Cross-cutting findings

### Operating modes by loop

| Loop | Canonical modes worth making more explicit | Presentation lesson |
| --- | --- | --- |
| Center | Daily operation, schedule management, report review, communication, configuration | Keep the overview scan-heavy; move detail to existing routes |
| Coach | Before class, live class, after class, end-of-day | Put only the current mode’s primary action and supporting facts in the first viewport |
| Student | Before lesson, active work, reflection, completion, between-class journey | Make current work dominant and progression persistent but quiet |
| Family | Latest published story, attendance/action, message/history, household switching | Lead with what happened and what comes next; keep internal process invisible |
| HQ | Network attention, healthy stewardship, readiness, escalation, rollout | Pair every exception with an owner/action and a bounded healthy summary |

### Healthy states

Demo1 should preserve review-by-exception but make normal flow more visible. “Processed,” “nothing requires attention,” and “all required records are ready” are meaningful derived states. They should be calm, qualitative, and tied to actual record status—not replaced with vanity scores.

### Density

- Increase density on Center, HQ, Family history, and after-class queue surfaces where users scan multiple records.
- Preserve restraint on Coach live and Student active-work surfaces where one task should dominate.
- Reduce repeated demo explanation when headings, states, and controls already explain the surface.
- Do not fill whitespace with unsupported counts, charts, or duplicate cards.

### Navigation

Demo1’s route architecture and perspective boundaries remain authoritative. Demo2’s compact header spacing is useful inspiration, but its shell should not replace Demo1’s global/perspective and loop-local navigation. Active state, current context, keyboard focus, accessible names, and mobile reachability remain required.

### Imagery

Use images for identity recognition, authorized evidence, and published-story memory. Avoid generic operational photography, repeated portraits standing in for evidence, and decorative images inserted solely to make sparse pages feel full.

### Copy

Retain product guidance, safety boundaries, publication visibility, and synthetic-demo disclosure. Reduce implementation explanation, repeated “demo” scaffolding, and prose that restates visible controls. Prefer action/state copy such as “2 reports ready” over architecture commentary.

## 7. Unsupported source-of-truth risks

The following Demo2 patterns are visually attractive but do not currently have a safe canonical owner:

- Real camera, photo/video upload, attachment processing, and network retry behavior.
- AI-assisted observation editing or autonomous summary generation.
- Payment methods, tuition amounts, billing history, course prices, seats, and registration transactions.
- Franchise-wide revenue, retention, uptime, compliance, adoption, performance, and support-SLA claims beyond the bounded HQ fixture.
- Policy versions or rules that would drive attendance/makeup, publication, or access outcomes.
- Badges, certificates, levels, and external learning-environment integration.
- Profile/logout/account menus that imply an authentication lifecycle beyond the demo’s actual semantics.
- Hard-coded activity feeds that do not project from records shared with the affected loops.

## 8. Presentation tiers

### Tier 1 — 10–15 minute narrative

1. Center opens on a compact “today” composition that shows current operation, normal flow, and one truthful exception.
2. Coach moves through a recognizable before → live → after-class arc using the same learner/session state.
3. Student immediately sees completed/current/next and opens the active work tied to that session.
4. Center review and publication visibly preserve the boundary between internal workflow and released story.
5. Family receives the published learning story with authorized evidence and a clear next step.
6. HQ closes with bounded network stewardship: attention, healthy state, recent activity, and ownership.

Tier 1 should not include billing, registration, support centers, release archives, governance controls, or every scheduling view.

### Tier 2 — exploration depth

- Center weekly/monthly/season scheduling and configuration/module controls.
- Coach end-of-day queue, releases, support, and secondary learner/course progression.
- Student resource dialogs, course continuity, reflection, and complete-state detail.
- Family messages, attendance/makeup history, household switching, support, and bounded course visibility.
- HQ curriculum, rollout, support escalation, governance, and module allocation.

## 9. Ranked enrichment slices

### 1. Published learning story spine

- **Affected loops:** Coach, Center, Student, Family
- **Exact Demo1 routes:** `/learninghub/demo/coach/after-class`; `/learninghub/demo/center/context/northfield/reports`; `/learninghub/demo/center/context/northfield/reports/eli`; `/learninghub/demo/student/journey/eli`; `/learninghub/demo/family/journey/eli`
- **Demo2 pattern promoted:** Rich after-class composition and emotionally readable Learning Journey
- **Source-of-truth support:** Eli learning event, evidence metadata, report state, published story, and `cognit-publication-sync.js`
- **New synthetic data required:** NO
- **Demo value:** High
- **Implementation effort:** Medium
- **Architecture risk:** Low
- **Cross-loop impact:** Makes one record’s Coach creation, Center visibility, Student continuity, and Family publication legible without changing boundaries
- **Narrative tier:** Tier 1
- **Why now:** It best expresses Cognit’s core promise—know what happened and what comes next—using truth already present.

### 2. Coach mode-aware daily arc

- **Affected loops:** Coach; Center receives downstream report state
- **Exact Demo1 routes:** `/learninghub/demo/coach/today`; `/learninghub/demo/coach/readiness`; `/learninghub/demo/coach/live`; `/learninghub/demo/coach/after-class`; `/learninghub/demo/coach/end-of-day`
- **Demo2 pattern promoted:** Pre-class briefing, explicit operating modes, focused live state, post-class transition
- **Source-of-truth support:** Current session, roster, plan, progress, evidence, observation, and Coach interaction lifecycle
- **New synthetic data required:** NO
- **Demo value:** High
- **Implementation effort:** Medium
- **Architecture risk:** Low
- **Cross-loop impact:** Improves the quality and legibility of the record later consumed by Center, Student, and Family
- **Narrative tier:** Tier 1
- **Why now:** Coach is the clearest gap between Demo1’s deep state and its current presentation recognition.

### 3. Center review-by-exception composition

- **Affected loops:** Center, Coach, Family
- **Exact Demo1 routes:** `/learninghub/demo/center`; `/learninghub/demo/center/context/northfield`; `/learninghub/demo/center/context/northfield/scheduling/daily`; `/learninghub/demo/center/context/northfield/reports`
- **Demo2 pattern promoted:** Dense operating overview, compact schedule, processed/attention report summary
- **Source-of-truth support:** Context, sessions, enrollment participation, messages, learning events, and Center interaction
- **New synthetic data required:** NO
- **Demo value:** High
- **Implementation effort:** Medium
- **Architecture risk:** Medium
- **Cross-loop impact:** Clarifies what the Center supervises without duplicating Coach or Family responsibilities
- **Narrative tier:** Tier 1
- **Why now:** It makes multicontext operation and normal-vs-exception flow recognizable in the first minute.

### 4. Student progression and active-work frame

- **Affected loops:** Student; Coach shares course-scoped progress
- **Exact Demo1 routes:** `/learninghub/demo/student`; `/learninghub/demo/student/lesson`; `/learninghub/demo/student/active`; `/learninghub/demo/student/progress`; `/learninghub/demo/student/complete`
- **Demo2 pattern promoted:** Been/current/next framing, current-step dominance, compact resources, completion transition
- **Source-of-truth support:** Course progress, learning event, current challenge, completed/next steps, Student interaction
- **New synthetic data required:** NO
- **Demo value:** High
- **Implementation effort:** Low
- **Architecture risk:** Low
- **Cross-loop impact:** Improves learner recognition without changing Coach-owned observation or Family publication state
- **Narrative tier:** Tier 1
- **Why now:** It is a low-risk, high-recognition improvement fully backed by canonical facts.

### 5. HQ stewardship scan

- **Affected loops:** HQ
- **Exact Demo1 routes:** `/learninghub/demo/hq`; `/learninghub/demo/hq/network`; `/learninghub/demo/hq/deployment`; `/learninghub/demo/hq/support`
- **Demo2 pattern promoted:** Executive attention stack, recent activity, healthy state, readiness/escalation grouping
- **Source-of-truth support:** Bounded HQ data fixture and interaction; no automatic access to local records
- **New synthetic data required:** NO
- **Demo value:** Medium
- **Implementation effort:** Low
- **Architecture risk:** Medium
- **Cross-loop impact:** Demonstrates network stewardship while preserving hierarchy/access separation
- **Narrative tier:** Tier 1 summary; Tier 2 details
- **Why now:** It gives the five-loop walkthrough a credible executive close without inventing scale.

### 6. Coherent published-history pack

- **Affected loops:** Center, Coach, Student, Family
- **Exact Demo1 routes:** `/learninghub/demo/center/context/northfield/families/morgan`; `/learninghub/demo/coach/learners/eli`; `/learninghub/demo/student/journey`; `/learninghub/demo/family`; `/learninghub/demo/family/journey`; `/learninghub/demo/family/messages`
- **Demo2 pattern promoted:** Lived-in Family home/history and repeated learning memories
- **Source-of-truth support:** New historical records in shared data, projected through shared model and publication sync
- **New synthetic data required:** YES
- **Demo value:** Medium
- **Implementation effort:** Medium
- **Architecture risk:** Medium
- **Cross-loop impact:** The same historical event must appear consistently as Coach context, Center history, Student journey, and Family-published story
- **Narrative tier:** Tier 2
- **Why now:** It is the smallest safe way to make the product feel established after Tier 1 coherence is secured.

## 10. Data-model impact

Only slice 6 requires new synthetic facts.

| New event/record | Owning source of truth | Affected loops | Changes current facts? | Historical only? | Policy assumptions? |
| --- | --- | --- | --- | --- | --- |
| One prior completed `learningEvent` for Eli in Creative App Lab, with course/session linkage, completed/current-next summary, Coach observation, and publication timestamp | `src/demo/cognit-demo-data.js` | Coach, Center, Student, Family | Adds a fictional prior fact; does not change current session/progress facts | YES | NO |
| One evidence metadata record linked to that event and explicitly marked Family-publishable | `src/demo/cognit-demo-data.js`; visibility projected by `cognit-publication-sync.js` | Coach, Center, Student, Family | Adds historical evidence metadata only | YES | NO |
| One published story projection derived from the prior event | `src/demo/cognit-demo-model.js` and publication sync | Student, Family; visible to Center as published state | No independent fact; derived from the historical event | YES | NO |
| One Family message/notification pointing to the published story | `src/demo/cognit-demo-data.js` | Family, Center communication history | Adds a fictional prior communication | YES | NO |

No attendance, makeup, payment, pricing, policy, approval, guardian, or authorization rule should be inferred from this history pack.

## 11. Shared Foundation relationship

Any future implementation of these presentation slices must preserve Shared Foundation responsibilities already expressed in Demo1:

- keyboard focus order and visible focus across global and loop-local navigation;
- accessible names for icon-only controls, menus, dialogs, status chips, and imagery;
- `aria-live` or equivalent announcements for session, save, confirmation, publication, and error transitions;
- semantic forms, labels, validation, and recoverable errors for observations/reflections;
- explicit confirmation for state-changing or destructive actions;
- status communication that does not rely on color alone;
- reduced-motion and responsive behavior for overlays, drawers, and state transitions.

This audit does not create shared components, migrate runtime, or authorize a Foundation program.

**Shared Foundation Gate B opened: NO**

## 12. Promotion gate

A Demo2 pattern may enter a future Demo1 implementation slice only when all are true:

1. The exact Demo1 route and responsibility are named.
2. An existing canonical state owner is identified, or a bounded shared synthetic record is explicitly approved.
3. The pattern does not expose unpublished or unauthorized state.
4. Cross-loop projections remain coherent.
5. The pattern improves recognition in Tier 1 or answers a credible Tier 2 follow-up.
6. Responsive and accessible semantics can be preserved.
7. The pattern does not invent policy, business performance, operational volume, or external capability.

Demo1 is the product. Demo2 remains the critique and presentation reference.
