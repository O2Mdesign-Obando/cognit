# Cognit Learning Demo — Authorization 03 local handoff

Date: October 23, 2026  
Execution start: 2026-10-23 16:08:15 -0400  
Authorized expiration: 2026-10-23 18:08:15 -0400  
Verification phase began before: 2026-10-23 17:43:15 -0400  
Runtime checkpoint: `e779594070872bfe4c0158b0675a98c73131cf0f`  
Runtime tree: `be14cc9a751079bdedfd9ebeb3b49f6fb72169c4`  
Branch: `feat/demo-structured-curriculum-multilingual-01`

All Spanish added in this window is CODEX-drafted and pending human review. This handoff records local candidate evidence only; it is not acceptance or remote-release authority.

## Preserved source and authority

- Verified preserved runtime: `0c65bb00ae5bb58f0bb4c9183863635f3f82bb25`, tree `43ba36facf7915fd863d1262d84678ecef317af2`.
- Reconciled documentation-only descendant `35f813f04b86553a5995f4b033fede5864b3ddad`; its only difference from the preserved runtime was the Authorization 02 handoff.
- Canonical registry `3005c4d2cf403a339c98f9bf5a5851d6092172e0`, version `0.7.1`, was clean and qualified `PASS`.
- Memory-only discovery returned `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`, `may_proceed: true`, and left the product repository unchanged.
- Runtime enforcement remained executor-side. Registry changes, Cognit push, PR, deployment, merge, Production, dependency changes, and scope expansion remained held.

## Local checkpoints

- `1b4982ebea95d174886ebc15f5c33a5137b47526` / tree `b13780908c864bda3ab689a89ad601268648908e` — Coach teaching workflow routes.
- `2c6b3eee9bd4c20d3d052c21a267c4e8871d5e29` / tree `ae606df44865a9caddd7de721974833c1c808167` — releases, support, profile, correspondence, and Eli workspace routes.
- `fb5ae9f76282f1aeed1616d475c0a921c5ecd079` / tree `35694577d3c6c8eb99baaa37b3834cee7d15fe8b` — generic Coach deep views.
- `80246989699cb67ddc1ee4e4e97826cedb4bb861` / tree `508153db23adfa8c71a03e7cc0cfe8449fd88880` — interactive Coach root and exact coverage manifest.
- `e779594070872bfe4c0158b0675a98c73131cf0f` / tree `be14cc9a751079bdedfd9ebeb3b49f6fb72169c4` — focused Coach verification assertions; final runtime checkpoint.

Authorization 03 changed-file manifest fingerprint: `ee36ecd365cd91dfa23e24910769d07e2e6aec139d8f90d2741877d4c019d4b6`.

Changed files:

- `scripts/verify-cognit-curriculum-presentation.mjs`
- `src/components/demo/CognitCoachJourneyView.astro`
- `src/components/demo/CognitCoachLiveTeaching.astro`
- `src/components/demo/CognitDemoDeepView.astro`
- `src/demo/cognit-coach-interaction.js`
- `src/demo/cognit-localization-coverage.js`
- `src/demo/cognit-localization.js`
- `src/demo/locales/es-US-literals.js`

The unrelated untracked `scripts/verify-cognit-curriculum-presentation 2.mjs` remains untouched and excluded.

## Exact completed Coach coverage

All 26 Coach manifest routes now have candidate Spanish initial-copy coverage and the implemented interactive states have candidate Spanish coverage, with zero unclassified fallback in the built Spanish all-route sweep.

Interactive teaching root:

- `/learninghub/demo/coach`
- Preflight, start class, Eli/Lena isolation, progress update, evidence attach/inspect, authored observation preservation, wording suggestion/acceptance, save/readiness, submit receipt, focus and live-status feedback.

Teaching journey:

- `/learninghub/demo/coach/today`
- `/learninghub/demo/coach/readiness`
- `/learninghub/demo/coach/live`
- `/learninghub/demo/coach/capture`
- `/learninghub/demo/coach/after-class`
- `/learninghub/demo/coach/end-of-day`
- Covered class switching presentation, quick-note learner isolation, entered-note preservation, end-class dialog/focus return, evidence assignment feedback, per-learner report drafts, report gating, receipt, and pending queues.

Support and correspondence:

- `/learninghub/demo/coach/releases`
- `/learninghub/demo/coach/support`
- `/learninghub/demo/coach/profile`
- `/learninghub/demo/coach/correspondence`
- Covered release dialog, support form success feedback, recipient switching, per-recipient drafts, localized system defaults, and same-route language switching without overwriting custom subject/message text.

Eli workspace and aliases:

- `/learninghub/demo/coach/learners/eli`
- `/learninghub/demo/coach/learners/eli/progress`
- `/learninghub/demo/coach/learners/eli/evidence`
- `/learninghub/demo/coach/learners/eli/observations`
- `/learninghub/demo/coach/progress/eli`
- `/learninghub/demo/coach/observations/eli`
- `/learninghub/demo/coach/evidence/eli`
- Covered overview, progression, evidence, observations, Center-submit dialog, locked submitted state, receipt, and unchanged Student/Family publication boundary.

Generic deep views:

- `/learninghub/demo/coach/class`
- `/learninghub/demo/coach/learners/noah`
- `/learninghub/demo/coach/learners/lena`
- `/learninghub/demo/coach/learning-plan`
- `/learninghub/demo/coach/progress`
- `/learninghub/demo/coach/progress/lena`
- `/learninghub/demo/coach/observations`
- `/learninghub/demo/coach/reporting`
- Covered roster, learner contexts, plan, aggregate and per-course progress, authored observations, evidence status, and clarification state.

Original authored observations remain verbatim and are explicitly marked for preservation. User-entered notes, observations, correspondence subjects/messages, and per-learner drafts are not automatically translated. A Coach-accepted Spanish wording suggestion remains editable and preserves authorship semantics.

## Verification

Passed:

- `npm run validate`: 387 canonical Astro pages; 446 total HTML pages and 13,675 local references with zero missing; Demo2 remained separately valid at 54 declared routes, 59 prerendered routes, 68 built files, and 845 local references with zero missing.
- `npm run verify:localization`: exact 385-route manifest and fingerprint, accepted four-route curriculum invariants, exact 26-route Coach coverage uniqueness/membership, pending-human-review state, authored-preservation markers, and translated-suggestion draft isolation.
- Built-browser sweep of all 26 Coach routes in `es-US`: one language control per route, `html[lang=es-US]`, zero unclassified literal/key fallback.
- Built-browser sweep of all 26 Coach routes in `en-US`: one language control per route, `html[lang=en-US]`, zero fallback markers.
- Root state machine: full Eli progress/evidence/observation/submit flow, Spanish live-region feedback, Spanish accepted suggestion, receipt, and zero fallback at ready and submitted states.
- Secondary learner: independent empty draft, progress update, localized no-evidence state, and restored learner draft.
- Journey states: live quick-note isolation, capture assignment feedback, report draft isolation, end-class dialog focus, release dialog, support success, and correspondence language/draft preservation.
- Eli workspace: Center-submit dialog and submitted receipt retained the review/publication boundary with zero fallback.
- Mobile smoke at 390×844 on root, live, after-class, correspondence, and Lena progress: no horizontal overflow.
- Browser console across route and interaction sweeps: zero warnings/errors.
- Accepted four-route smoke: exact routes still expose their language controls and prior curriculum workspace boundaries; automated accepted-baseline assertions passed.

Observed and repaired:

- Dynamic system feedback initially remained English after mutations; exact localized presentation coverage was added and rechecked.
- Correspondence default subject/recipient copy needed locale-aware rendering without overwriting user-entered drafts; the renderer now distinguishes system defaults from edited values.
- Accepted wording suggestions initially inserted the English internal suggestion into a Spanish draft; acceptance now uses the visible localized suggestion while preserving the Coach as author.
- Dynamically rendered authored receipt text was initially classified as fallback; it is now explicitly preserved as authored content.

## Remaining gaps and continuation point

Coach has no known incomplete manifest route or exercised interaction group in this checkpoint. Spanish wording remains pending human linguistic/product review, and human QA remains pending for all changed Coach copy and behavior.

Outside Coach, the existing explicit gaps remain unchanged:

- Center: 321 routes remain partial outside the accepted seed route.
- Student: 12 routes remain partial outside the accepted seed route.
- Family: 14 routes remain partial outside the accepted seed route.
- Entry and all 11 HQ routes remain at the completed Authorization 02 candidate checkpoint.

Next bounded continuation: human review of the Coach copy and targeted Coach behavior, or a separately authorized role batch. Do not expand automatically from this checkpoint.

Local review base: `http://127.0.0.1:4322`.
