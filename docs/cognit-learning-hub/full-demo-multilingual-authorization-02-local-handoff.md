# Cognit Learning Demo — Authorization 02 local handoff

Date: October 23, 2026  
Execution start: 2026-10-23 10:29:57 -0400  
Authorized deadline: 2026-10-23 12:29:57 -0400  
Runtime checkpoint: `0c65bb00ae5bb58f0bb4c9183863635f3f82bb25`  
Runtime tree: `43ba36facf7915fd863d1262d84678ecef317af2`  
Branch: `feat/demo-structured-curriculum-multilingual-01`

Human review and acceptance remain pending for every changed Spanish presentation and behavior.

## Registry promotion and discovery receipt

- Starting canonical registry commit: `f7eb502f5508273163fb845efc471ff667d1f3ee`
- Promoted registry commit: `3005c4d2cf403a339c98f9bf5a5851d6092172e0`
- Promoted registry tree: `925d62735bbadac7a13973e5096d22566a2c7032`
- Changed-file manifest fingerprint: `7afb616a5ac9a0cfb1eb09fc6a824b5084b21eced39f4968835631e192ad90fc`
- Promotion: normal fast-forward of canonical `main`; remote identity verified after push.
- Qualification: schema validation passed; 391 of 391 tests passed; generated index and release checks passed; repeat generation was byte-deterministic.
- Canonical memory-only discovery ran at the promoted commit with a clean qualified registry and unchanged product tree.
- Discovery outcome: `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`; `may_proceed: true`.
- Active authorization: `pp:product-local-delivery-authorization:cognit-demo-localized-experience-delivery-01`.
- Remote push, hosted Preview, PR, merge, publication, deployment, Production, shared qualification, reuse, and extraction remain held.

## Exact route and implementation coverage

The executable manifest contains the exact 385 concrete routes and SHA-256 fingerprint `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`:

- Entry: 1
- Center: 321
- Coach: 26
- Student: 12
- Family: 14
- HQ: 11

Implemented in this checkpoint:

- Every exact manifest route now renders the shared in-place language control, pending-review state, and explicit English-fallback state.
- Entry and HQ use independent browser-local preference identities. A missing role preference may inherit entry as its initial presentation without overwriting the role preference.
- Center, Coach, Student, and Family retain independent person preferences and remain subject to Center language enablement.
- Northfield uses the accepted storage key; Harbor uses a distinct Center-identity key. Disabling Northfield does not disable Harbor.
- Same-route switching preserves existing DOM task state and does not mutate curriculum progression, publication, billing, role payloads, or other operating semantics.
- Authored messages, announcements, and Coach observations marked as original records are excluded from literal translation; user-entered textarea values are never translated.
- Entry initial copy and interactions have drafted Spanish coverage with no unclassified fallback in the exercised route.
- All 11 HQ initial routes and implemented HQ interactive feedback have drafted Spanish coverage with no unclassified fallback in the exercised states. Proper names, locations, record IDs, product/course names, and initials remain unchanged by design.
- Shared header, perspective navigation, scenario date, profile utilities, footer, review notices, language options, and common role copy use the active route identity.

Incomplete coverage remains explicit:

- Center: 321 routes have locale mechanics and fallback labeling; full UI, fixture, validation, dialog, notification, and interaction Spanish remains incomplete outside accepted seed content.
- Coach: 26 routes have locale mechanics and fallback labeling; full journey and dynamic-state Spanish remains incomplete outside accepted seed content.
- Student: 12 routes have locale mechanics and fallback labeling; full journey and dynamic-state Spanish remains incomplete outside accepted seed content.
- Family: 14 routes have locale mechanics and fallback labeling; full journey and dynamic-state Spanish remains incomplete outside accepted seed content.
- Spanish in this checkpoint is CODEX-drafted and is not human reviewed.

## Changed-file manifest

- `package.json`
- `scripts/generate-cognit-localization-route-manifest.mjs`
- `scripts/verify-cognit-curriculum-presentation.mjs`
- `src/components/demo/CognitCenterCommunication.astro`
- `src/components/demo/CognitFamilyJourneyView.astro`
- `src/components/demo/CognitLanguageControls.astro`
- `src/components/demo/CognitStudentJourneyView.astro`
- `src/components/layout/BaseLayout.astro`
- `src/demo/cognit-hq-interaction.js`
- `src/demo/cognit-localization-coverage.js`
- `src/demo/cognit-localization-route-manifest.js`
- `src/demo/cognit-localization.js`
- `src/demo/locales/en-US.js`
- `src/demo/locales/es-US-literals.js`
- `src/demo/locales/es-US.js`

The unrelated untracked file `scripts/verify-cognit-curriculum-presentation 2.mjs` was preserved and excluded from both commits.

## Verification, failures, and repairs

Passed:

- `npm run validate`: 387 canonical Astro pages built; 446 total HTML pages and 13,675 local references validated with zero missing; Demo2 validation passed separately and remains out of scope.
- `npm run verify:localization`: exact 385-route manifest and fingerprint check; all routes contain a language control and visible human-review state; accepted four-route curriculum invariants pass.
- Browser checks: entry/HQ preference isolation; Northfield disable and restore; Harbor isolation; same-route curriculum position and entered-draft preservation; Spanish authored-original preservation; entry and all HQ route fallback inventory; HQ Center, support-case, and module interaction feedback; 390×844 entry/HQ overflow smoke; empty browser warning/error console.

Repaired during the batch:

- The first registry qualification rejected a route-string array in a source-locator manifest; the locator was corrected to the exact committed proposal file while the route manifest remained in the governed request/authorization.
- Two deterministic registry inventory fixtures were updated for the admitted request and four new records.
- A first browser attempt exposed a recursive localization observer caused by reapplying keyed text on every mutation. The observer was narrowed to literal/dynamic fallback reconciliation, after which browser loading and console checks passed.
- HQ dynamic feedback initially lacked language-change attribution. It now assigns translation keys and parameters so existing feedback changes language without losing its record ID.

No regression was observed in the accepted four-route behavior, read-only progression, role/publication/billing boundaries, authored copy, entered work, or responsive layouts. This is local evidence, not human acceptance.

## Next bounded batch

Next: complete the Coach 26-route journey as one ownership-deduplicated batch, including live/readiness/capture/after-class/reporting/correspondence interaction outputs, authored-observation labels, accessibility strings, and focused mobile/browser verification. Estimated effort: 6–10 hours for Coach; 30–48 additional hours for Center, Student, and Family completion plus repair and human-review preparation. Those estimates do not authorize unattended execution beyond this assignment.

No Cognit push, PR, hosted deployment, merge, publication, Production action, hosted database change, or registry edit beyond the promoted Authorization 02 amendment occurred.
