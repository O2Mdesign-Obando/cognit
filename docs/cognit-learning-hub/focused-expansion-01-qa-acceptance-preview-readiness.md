# Focused Expansion 01 — QA acceptance and Preview readiness

Recorded: 2026-11-09 12:31 EST; updated 2026-11-11
Branch: `feat/demo-structured-curriculum-multilingual-01`

## Human acceptance receipt

Jorge reported targeted human QA PASS for commit `7eb275ffdcb9333f48b1fd54b297ac317fb04bca`, tree `43beb5ef999d0678ebd5c1c1ffa77486e14e8008`.

Acceptance covers fresh microphone recording, saving, playback after reload, target-specific drafts, and the revised capture UI. It does not establish qualified Japanese/Hindi language review, exhaustive accessibility review, hosted Preview acceptance, or Production acceptance.

On 2026-11-10, Jorge additionally reported targeted Center Report QA PASS for commit `072f242137124f1a61332bfaa91a9bd712b9e318`, tree `6b651268781e47169c536aac72d713bec2bd9a33`. This acceptance covers the reviewed Center Report correction only. Coach after-class remains unaccepted, and no acceptance transfers to later Coach presentation changes.

On 2026-11-11, Jorge reported visual QA PASS for the Coach after-class refinement at commit `bee40f176035704681da302a4257e8f71b7de4db`, tree `e56d71342e96d4d93b01263049214828886c4b36`. This acceptance covers the reviewed presentation across the four selected language states. It does not establish Japanese/Hindi translation completeness or linguistic quality, and it does not transfer to later localization-copy changes.

Jorge subsequently reported targeted human QA PASS for the corrected runtime commit `e3e81f96a5d943fcae5275f963512d2f3f3608a1`, tree `3780a409636c1dedb71a03d3c909629bd918e0fe`. This acceptance covers the reviewed Coach interface/localization corrections and preservation of entered text. Earlier audio, Center Report, and visual acceptances remain attached to their respective checkpoints. Qualified Japanese/Hindi linguistic review, real VoiceOver testing, exhaustive interaction coverage, hosted Preview acceptance, and Production acceptance remain outstanding.

## Narrow-phone correction boundary

Readiness inspection found two concrete defects after the accepted checkpoint:

- the Spanish Center report status chip caused narrow-screen horizontal overflow;
- Coach after-class learner/skill/evidence buttons did not consistently meet a 44 px touch target or expose the intended focus treatment, including dynamically inserted evidence-review buttons.

The correction is commit `072f242137124f1a61332bfaa91a9bd712b9e318`, tree `6b651268781e47169c536aac72d713bec2bd9a33`. It changes:

- `src/components/demo/CognitCenterView.astro`
- `src/components/demo/CognitCoachJourneyView.astro`
- `src/components/demo/CognitFocusedExpansion.astro`

Jorge's audio/capture acceptance remains attached to `7eb275ffdcb9333f48b1fd54b297ac317fb04bca`. The Center Report portion of `072f242137124f1a61332bfaa91a9bd712b9e318` is accepted; its Coach after-class portion remains pending targeted human review.

## Coach after-class refinement candidate

The presentation-only Coach refinement is runtime commit `bee40f176035704681da302a4257e8f71b7de4db`, tree `e56d71342e96d4d93b01263049214828886c4b36`. It is a descendant of both accepted checkpoints and changes:

- `src/components/demo/CognitCoachJourneyView.astro`
- `src/components/demo/CognitFocusedExpansion.astro`
- `src/components/demo/CognitLanguageControls.astro`

The candidate replaces default-looking evidence controls with Cognit evidence cards; restores consistent field, section, optional-note, and submission spacing; presents monthly evidence by readable name with source IDs as secondary traceability; distinguishes actionable review controls from informational Reviewed status; and preserves Eli/Lena draft fields independently. The existing compact fallback notice is also constrained to the mobile header so it no longer extends left of the viewport at 320 px.

Jorge's Center Report and audio/capture acceptances remain attached to their reviewed commits. Jorge subsequently accepted the presentation of `bee40f176035704681da302a4257e8f71b7de4db` under the limited scope recorded above.

## Coach after-class localization correction

The localization correction is runtime commit `e3e81f96a5d943fcae5275f963512d2f3f3608a1`, tree `3780a409636c1dedb71a03d3c909629bd918e0fe`. It preserves the accepted layout while completing in-scope Japanese/Hindi interface, dynamic feedback, and accessibility strings; correcting Spanish accessibility/dynamic labels that legitimately triggered the fallback notice; and preserving authored notes, entered work, names, identifiers, and source titles.

The remaining English on `/learninghub/demo/coach/after-class` is classified as follows:

- intentionally preserved authored/user-entered content: the Coach-authored learner observation and entered next-step/draft values;
- names, identifiers, or source titles: Creative App Lab, Eli Morgan, Lena Grant, Habit Tracker, Navigation-flow sketch, Prototype walkthrough example, source IDs, and version identifiers;
- content outside the authorized translation boundary: none displayed on this route; unrelated Demo routes remain outside the exact seven-route Japanese/Hindi boundary;
- missing in-scope interface translation: none found after this correction in the exercised initial, refine-feedback, learner-progress, and submission-receipt states.

The Spanish fallback notice was not suppressed. Its actual triggers were untranslated accessibility labels and dynamically rendered review/progress feedback. Those in-scope strings are now translated; the notice remains available and appears only if a real fallback occurs. Japanese/Hindi copy in this correction is CODEX-drafted and pending qualified language review. Jorge has accepted this corrected runtime for the bounded scope recorded above; a new registry authorization and one-push/one-Preview allowance are still required before release execution.

Correction verification passed:

- initial after-class interface, learner switching, empty evidence, wording feedback, `0/2`, `1/2`, and `2/2` progress, submission guidance, and submission receipt were exercised;
- en-US/es-US/ja-JP/hi-IN switching retained the exact authored observation and entered next-step values;
- Spanish, Japanese, and Hindi showed zero fallback markers in the exercised states; the Spanish fallback notice stayed hidden because its actual missing strings were resolved;
- localized accessible photo text and source-title review labels were present while source titles remained unchanged;
- browser console: zero warnings and zero errors;
- production build: 387 pages;
- localization manifest: 385 routes, unchanged SHA-256 `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`;
- focused expansion, structured curriculum, seven-route Japanese/Hindi, invalidation, and Family-visibility checks passed;
- route validation: 446 HTML pages and 13,680 local references, zero missing;
- Demo2 validation: 54 declared routes, 59 prerendered routes, 845 local references, zero missing.

Visual evidence is preserved in `docs/cognit-learning-hub/evidence/coach-after-class-localization-correction-01/` for Japanese and Hindi. These screenshots are verification artifacts, not qualified linguistic acceptance.

## Verification evidence

Automated browser checks exercised all seven authorized routes at 360 × 780 in en-US, es-US, ja-JP, and hi-IN, and at 320 × 700 in ja-JP and hi-IN:

1. `/learninghub/demo/center/courses/creative-app-lab`
2. `/learninghub/demo/center/context/northfield/reports/eli`
3. `/learninghub/demo/coach/capture`
4. `/learninghub/demo/coach/after-class`
5. `/learninghub/demo/student/lesson`
6. `/learninghub/demo/family/journey/eli`
7. `/learninghub/demo/family/messages`

Results after correction:

- no document-level horizontal overflow at 360 px or 320 px;
- no visible button, select, checkbox, or radio control below 44 × 44 px; connected mobile evidence controls are at least 48 px high;
- English, Spanish, Japanese, and Hindi selected the expected effective locale on all seven routes;
- disabling Northfield Japanese preserved the saved ja-JP preference, used en-US with an explicit status notice, and restored ja-JP after re-enablement;
- Center publication and Student curriculum image dialogs fit the viewport, opened by keyboard-compatible controls, closed with Escape, returned focus to their trigger, and showed a 3 px visible focus outline;
- expected status/live regions were present on localized/fallback surfaces;
- browser console contained zero warnings and zero errors during the corrected route pass.

Repository checks passed:

- production build: 387 pages;
- exact localization manifest: 385 routes, SHA-256 `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`;
- structured curriculum, seven-route Japanese/Hindi boundary, connected class/month, stale-result/invalidation, and Family-visibility verification;
- route validation: 446 HTML pages and 13,680 local references, zero missing;
- Demo2 validation: 54 declared routes, 59 prerendered routes, 845 local references, zero missing.

The earlier accepted real microphone, reload playback, target-draft, approval/invalidation, and Family-visibility evidence is carried forward. No microphone or state-changing publication flow was repeated for the CSS-only correction.

VoiceOver was not running in the available macOS session. Automated DOM/accessibility inspection and real keyboard interaction were completed, but no real screen-reader session is claimed. Remaining manual check: enable VoiceOver with Command-F5; use VO-Right/VO-Left and VO-Space through the role navbar, language selector, Coach capture/report controls, and both dialogs; confirm live status/fallback announcements, dialog context, Escape/close focus return, and Japanese/Hindi accessible names; then disable VoiceOver with Command-F5.

Japanese and Hindi remain CODEX-drafted and pending qualified language review.

## Canonical authority and read-only Preview readiness

Fresh canonical discovery used registry commit `e253ad3a249f26d869275bd1634a990f9a52dfcb` and passed qualification:

- `pp:request:cognit-demo-connected-class-month-composition-01` → `KEEP_PRODUCT_LOCAL`, `may_proceed: true`;
- `pp:request:cognit-demo-seven-route-ja-hi-localization-01` → `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`, `may_proceed: true`.

These receipts permit the existing product-local implementation and verification. They do not authorize a new Cognit push or hosted Preview. Earlier Preview allowances remain consumed.

### 2026-11-10 authority recheck

The earlier blocked receipt was produced by the installed discovery helper symlink against stale registry worktree commit `46a833ebb61ca28251963a27722363ae19ba74e9`. It was a provenance failure, not a scope denial, and is superseded.

Corrected discovery ran the supported helper directly from `/Users/jorgeobando/.codex/worktrees/pp-cognit-focused-expansion-01` at required canonical registry commit `e253ad3a249f26d869275bd1634a990f9a52dfcb`. Registry version `0.7.1`, remote `O2Mdesign-Obando/loke-product-platform-registry`, clean state, qualification `PASS`, and unchanged product repository were confirmed. Request `pp:request:cognit-demo-connected-class-month-composition-01` returned `KEEP_PRODUCT_LOCAL / may_proceed: true` under `pp:exception:cognit-demo-connected-class-month-composition-01`. The permitted boundary remains the local synthetic connected class/month composition; no centralization, extraction, registry mutation, push, or deployment authority is implied.

Focused verification of the Coach candidate passed:

- production build: 387 pages;
- localization manifest: 385 routes, unchanged SHA-256 `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`;
- structured curriculum, seven-route locale boundary, connected state, invalidation, and Family visibility checks;
- route validation: 446 HTML pages and 13,680 local references, zero missing;
- Demo2 validation: 54 declared routes, 59 prerendered routes, 845 local references, zero missing;
- desktop and 360 px observation/evidence layouts; production-build inspection at 320 px;
- en-US, es-US, ja-JP, and hi-IN selection on the authorized Coach route;
- Eli/Lena observation, roadblock, next-step, and skill isolation across learner switching;
- evidence review changing from an action button to an informational Reviewed status;
- monthly draft sequencing, readable evidence names, retained source IDs, and disabled submission prerequisites;
- keyboard focus traversal and visible focus styling; no browser console warnings or errors.

Local visual evidence is preserved in `docs/cognit-learning-hub/evidence/coach-after-class-ui-refinement-01/`: desktop observation feedback, desktop populated monthly evidence, corresponding 360 px views, and the corrected 320 px Hindi fallback state.

Japanese and Hindi remain drafted and pending qualified review. No real screen-reader session was performed in this refinement pass; prior DOM/accessibility and keyboard evidence is retained.

Read-only Git/Vercel findings:

- repository: `O2Mdesign-Obando/cognit`;
- origin: `https://github.com/O2Mdesign-Obando/cognit.git`;
- remote feature branch: `a614ffb245d01b416e5ae69ae056441563468f53`;
- remote Production branch `main`: `88997bc352d4ccc3508e27acac0465c40edc5510`;
- the correction is a normal fast-forward descendant of the remote feature branch;
- Vercel team: `team_743yTzHuhccXpBtcT5qedSlh` (`o2mdesign-obandos-projects`);
- Vercel project: `prj_AT3X9ZShjfCuZy7mQzWTm3UgDChy` (`cognit`);
- Git integration: GitHub `O2Mdesign-Obando/cognit`, Production branch `main`;
- a push to the named non-main feature branch targets a Git-connected Preview;
- current feature Preview: `dpl_GJvad86zaXZUic4LV52xH123NBjf`, source `a614ffb245d01b416e5ae69ae056441563468f53`, READY;
- current Production: `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5`, source `88997bc352d4ccc3508e27acac0465c40edc5510`, READY;
- no deployment attributable to `7eb275ffdcb9333f48b1fd54b297ac317fb04bca`, `072f242137124f1a61332bfaa91a9bd712b9e318`, or `bee40f176035704681da302a4257e8f71b7de4db` exists in the inspected deployment history.

After canonical approval of the new one-push/one-Preview release authorization, the exact proposed push is:

```sh
git push origin e3e81f96a5d943fcae5275f963512d2f3f3608a1:refs/heads/feat/demo-structured-curriculum-multilingual-01
```

Do not push documentation HEAD.

## Updated Preview authorization request — accepted candidate, execution held

Jorge's targeted acceptance of the Coach after-class localization correction is recorded. Control Tower/Product Platform is requested to authorize one sequential assignment for repository `O2Mdesign-Obando/cognit`, branch `feat/demo-structured-curriculum-multilingual-01`, runtime commit `e3e81f96a5d943fcae5275f963512d2f3f3608a1`, tree `3780a409636c1dedb71a03d3c909629bd918e0fe`:

1. record Jorge's acceptance against that exact runtime identity;
2. prepare, review, qualify, and canonically promote the smallest normal-fast-forward registry amendment permitting one normal non-force feature-branch push, one resulting Git-connected non-Production Preview, and hosted verification, while preserving consumed allowances as historical evidence;
3. preserve all consumed historical allowances and require fresh canonical discovery for connected class/month composition, bounded ja-JP/hi-IN delivery, existing en-US/es-US behavior, and read-only progression presentation;
4. preflight the existing authenticated Vercel team/project integration, Production branch, Preview-only targeting, unused new allowance, remote fast-forward feasibility, and current Production identity;
5. execute exactly `git push origin e3e81f96a5d943fcae5275f963512d2f3f3608a1:refs/heads/feat/demo-structured-curriculum-multilingual-01` once, without force and without pushing documentation HEAD;
6. verify exact deployment attribution and the connected seven-route journey, including the accepted Coach presentation, learner-specific drafts, localized dynamic feedback and accessibility names, authored-content preservation, device-local audio, explicitly simulated transcription/drafting, stale-result protection, exact-version Center acceptance/invalidation, monthly sequence, source IDs, four authorized locales, legitimate fallback/restore behavior, keyboard/focus, responsive layout, console capture, and Family visibility boundaries;
7. perform representative HTTPS phone microphone testing and distinguish automated, representative desktop/mobile, real-device, and untested coverage while confirming that the unchanged 385-route availability manifest remains intact;
8. confirm Production remains unchanged by comparing its deployment and source identity before and after.

Held: PRs, merges, manual deployments, hosted configuration/database changes, Production actions, dependencies, provider calls, shared storage, external messages, registry work beyond the narrow qualified amendment, and scope expansion. Japanese/Hindi remain pending qualified language review.

This is an authorization request only. Registry promotion, Cognit push, Preview execution, and hosted verification remain held until Control Tower approves the sequential assignment.

## Learning-site boundary

The Learning site remains at local commit `7695680e160838d3a8715c6379a5b2e598fe2165`, tree `3dc1f53250f06ccdbb838a9877e94491e2a96a7b`, on local `main` one commit ahead of its remote. It was not changed or published. No visitor link claims that the older hosted Demo contains this expansion.

