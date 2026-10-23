# Full-Demo English/Spanish Coverage — discovery and proposal 01

Date: October 23, 2026

Product Owner: Jorge Obando

Repository: `O2Mdesign-Obando/cognit`

Branch: `feat/demo-structured-curriculum-multilingual-01`

## 1. Acceptance closeout and baseline

Jorge Obando reports hosted human QA `PASS` for the accepted four-route product-local candidate at exactly:

- Commit: `3f99f86967123ed89e59a17e3f615656f9c33d9b`
- Tree: `c26d099c862eae10d83bbb4cfa20aea8e232e1ae`
- Vercel Preview: `dpl_8Mb9ZW6vcz5v3E6ajtt9hnvNuLre`
- Immutable Preview URL: `https://cognit-4rbarsyn4-o2mdesign-obandos-projects.vercel.app`

That acceptance covers only the previously authorized routes and their accepted English/Spanish and read-only progression behavior. It is not acceptance of the whole Demo, Demo2, Production, shared qualification, reuse, extraction, or any future changed copy or behavior. Production remained unchanged at deployment `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5`, source commit `88997bc352d4ccc3508e27acac0465c40edc5510`.

Verified working baseline:

- Current branch: `feat/demo-structured-curriculum-multilingual-01`
- Documentation HEAD before this proposal: `eff5217cb5eb97da636742e5142a8012b0247f99`
- Documentation HEAD tree: `e652612342dc0f86eb896c2b0f764ee32ac311f7`
- The only committed difference from the accepted runtime checkpoint through `eff5217` is `docs/cognit-learning-hub/structured-curriculum-multilingual-01-preview-readiness.md`.
- Therefore `eff5217` introduces no runtime difference from accepted commit `3f99f86967123ed89e59a17e3f615656f9c33d9b`.
- The unrelated untracked file `scripts/verify-cognit-curriculum-presentation 2.mjs` remains untouched.

## 2. Canonical Demo boundary

The canonical product is the Astro Demo rooted at `/learninghub/demo`. Its source owners are:

- entry and route dispatch: `src/pages/learninghub/demo/`
- route manifest: `src/pages/learninghub/demo/[perspective]/[...view].astro` and `src/demo/cognit-demo-routes.js`
- shared shell: `src/components/layout/` and `src/components/demo/DemoLoopNav.astro`
- role views: `src/components/demo/CognitCenter*.astro`, `CognitCoach*.astro`, `CognitStudentJourneyView.astro`, `CognitFamilyJourneyView.astro`, `CognitHqView.astro`, `CognitDemoDeepView.astro`, and `CognitDemoPerspective.astro`
- synthetic records and projections: `src/demo/cognit-demo-data.js`, `cognit-demo-model.js`, `cognit-hq-data.js`, and the role interaction modules
- accepted localization: `src/demo/cognit-localization.js`, `src/demo/locales/`, `CognitLanguageControls.astro`, `CognitCurriculumProjection.astro`, and `CognitCurriculumWorkspace.astro`

`demo2/` is excluded. `docs/demo2-source-boundary.md` defines it as an isolated React/Vite import and `docs/cognit-learning-hub/09-demo2-demo1-presentation-reconciliation.md` identifies Demo1 (`/learninghub/demo`) as canonical and Demo2 (`/learninghub/demo2`) as a design challenger. Demo2 is not an active canonical journey and must not be silently added to full-Demo localization.

Also excluded: `/`, `/learninghub`, marketing websites, other products, Italian, Portuguese, live translation, user-entered-work translation, new learning capabilities, and synchronous or asynchronous learning discovery.

### Exact canonical route manifest

The source manifest expands to 385 concrete in-place routes. This is a routing inventory, not 385 unique designs.

| Journey | Concrete routes | Designed-source structure |
| --- | ---: | --- |
| Public Demo entry | 1 | one perspective-selection surface |
| Center | 321 | 107 relative view shapes rendered at unscoped, Northfield, and Harbor prefixes |
| Coach | 26 | journey-specific and generic deep-view templates |
| Student | 12 | journey/workspace and generic deep-view templates |
| Family | 14 | one parameterized journey component with distinct states |
| HQ | 11 | one parameterized network-stewardship component |
| **Total** | **385** | generated routes must not be treated as unique screens |

Entry:

- `/learninghub/demo`

Center uses each of the following 107 relative view shapes at all three prefixes:

- `/learninghub/demo/center`
- `/learninghub/demo/center/context/northfield`
- `/learninghub/demo/center/context/harbor`

For the empty relative view, the prefix itself is the route. For every other relative view, append `/<relative-view>`.

| Center family | Exact relative views |
| --- | --- |
| overview | `(empty)` |
| classes | `classes`, `classes/creative`, `classes/creative/attendance`, `classes/robotics` |
| communication | `communication`, `communication/coach`, `communication/family`, `communication/compose`, `communication/announcements`, `communication/announcements/new`, `communication/thread/priya-evidence`, `communication/thread/reyes-makeup`, `communication/thread/jordan-materials`, `communication/thread/morgan-schedule`, `communication/thread/harbor-jordan` |
| coaches | `coaches`, `coaches/jordan`, `coaches/priya`, `coaches/avery` |
| schedule alias | `schedule`, `schedule/creative` |
| scheduling | `scheduling`, `scheduling/daily`, `scheduling/weekly`, `scheduling/monthly`, `scheduling/season`, `scheduling/new`, `scheduling/cancel`, `scheduling/cancel/confirmed`, `scheduling/session/creative-today`, `scheduling/session/robotics-today`, `scheduling/session/storytelling-today`, `scheduling/session/robotics-extension-draft`, `scheduling/session/robotics-recurring-tuesday`, `scheduling/session/harbor-creative`, `scheduling/session/harbor-showcase`, `scheduling/staffing/storytelling-today` |
| students | `students`, `students/eli`, `students/sofia`, `students/noah`, `students/mina`, `students/lena`, `students/ava`, `students/morgan`, `students/reyes`, `students/bennett`, `students/park`, `students/grant`, `students/thompson` |
| families | `families`, `families/morgan`, `families/reyes`, `families/park` |
| attendance | `attendance`, `attendance/eli`, `attendance/sofia`, `attendance/absence/mina-storytelling`, `attendance/makeup`, `attendance/makeup/mina-storytelling`, `attendance/makeup/eli-creative-weather`, `attendance/makeup/lena-creative-weather`, `attendance/makeup/sofia-robotics`, `attendance/makeup/sofia-robotics-redeemed`, `attendance/makeup/sofia-robotics-expired`, `attendance/override/ava-storytelling`, `attendance/cancellation/creative-weather` |
| courses | `courses`, `courses/creative-app-lab`, `courses/robotics-studio`, `courses/digital-storytelling-lab` |
| billing | `billing`, `billing/dashboard`, `billing/account/morgan`, `billing/account/morgan/method`, `billing/account/reyes`, `billing/account/reyes/method`, `billing/account/park`, `billing/account/park/method`, `billing/account/grant`, `billing/account/grant/method`, `billing/account/thompson`, `billing/account/thompson/method` |
| reports | `reports`, `reports/attention`, `reports/ready`, `reports/all`, `reports/published`, `reports/eli`, `reports/sofia`, `reports/builder` |
| configuration | `configuration`, `configuration/modules`, `module-control`, `settings` |
| closeout/support | `support`, `whats-new`, `whats-new/archive`, `migration`, `migration/source`, `migration/select`, `migration/map`, `migration/preview`, `migration/processing`, `migration/ready` |
| compatibility | `messages` |

Coach exact routes are the root plus:

`today`, `readiness`, `live`, `capture`, `after-class`, `end-of-day`, `releases`, `support`, `profile`, `class`, `learners/eli`, `learners/eli/progress`, `learners/eli/evidence`, `learners/eli/observations`, `learners/noah`, `learners/lena`, `learning-plan`, `progress`, `progress/eli`, `progress/lena`, `observations`, `observations/eli`, `evidence/eli`, `reporting`, `correspondence`.

Student exact routes are the root plus:

`lesson`, `active`, `reflection`, `complete`, `my-work`, `artifact`, `progress`, `courses`, `courses/lena`, `journey`, `journey/eli`.

Family exact routes are the root plus:

`journey`, `journey/eli`, `attendance`, `attendance/eli`, `attendance/sofia`, `messages`, `absence`, `absence-confirmed`, `makeup`, `courses`, `billing`, `account`, `support`.

HQ exact routes are the root plus:

`network`, `centers`, `curriculum`, `insights`, `performance`, `governance`, `support`, `deployment`, `modules`, `allocation`.

All role suffixes above are appended to `/learninghub/demo/<role>/`. The root is `/learninghub/demo/<role>`.

## 3. Coverage matrix

The current runtime authorizes and initializes localization only on four exact routes. It contains 167 English dictionary keys, 166 Spanish keys, one controlled missing-key fallback fixture, 183 route-bounded Spanish literal mappings, and 78 explicit `data-i18n*` references. Those assets are useful seeds, not evidence of whole-Demo coverage.

| Journey | Existing coverage | Missing coverage | Shared-once opportunities |
| --- | --- | --- | --- |
| Entry | English only | perspective cards, headings, descriptions, links, metadata, accessible names, entry locale behavior | shared role names, shell, footer, perspective-selector vocabulary |
| Center | only `/center/courses/creative-app-lab` | 320 other concrete variants plus all interactive outcomes: contexts, rosters, classes, schedules, attendance, makeup, communication, announcements, reports, billing, configuration, migration, support, releases, forms, validation, dialogs, notifications and empty states | Center shell/navigation, status vocabulary, filters, form actions, date/money formatters, context-aware labels, generated result counts |
| Coach | only `/coach/learners/eli` | 25 other routes and live/readiness/capture/after-class/end-of-day/release/support/profile/generic learner, progress, evidence, reporting and correspondence states | Coach shell/navigation, report lifecycle, learner/evidence/status vocabulary, dialog and feedback actions |
| Student | only `/student/lesson` | 11 other routes: today, active/reflection/complete, work, artifact, progress, courses and journey states | Student shell/navigation, resources, step/reflection vocabulary, focus/live feedback, common curriculum strings |
| Family | only `/family/courses` | 13 other routes: home/journey, messages, attendance, absence, makeup, billing, account and support, including payment-method validation and confirmations | Family shell/navigation, published-story vocabulary, form actions, date/money formatters, filters and notices |
| HQ | none | all 11 routes: network, Centers, curriculum, insights, performance, governance, support, deployment and module allocation/configuration states | HQ shell/navigation, network statuses, tables, filters, case actions, module configuration and live feedback |
| Shared shell | translated only when one of four authorized pages initializes localization | header, perspective switcher, profile menu, scenario date, footer, route titles and back links everywhere else | one shell dictionary and one active-perspective locale resolver |

Therefore 381 of 385 concrete routes do not currently provide the accepted in-place language control behavior. This count is a boundary check only; it is not a screen count or effort estimate.

## 4. Deduplicated remaining translation/content inventory

A scan of the 385 built initial documents found 2,438 unique English-bearing initial text chunks and 133 unique English-bearing accessible/input attributes, with 2,561 values in the combined initial-render corpus. This is a planning lower bound, not a completion metric: it combines some rendered record text, misses some interaction-only states, and does not distinguish authored content. Source inspection separately found 102 hardcoded dynamic text assignments, 8 dialogs, 36 forms, and 68 status/live-region markers.

The implementation inventory must be deduplicated by ownership rather than copied from generated HTML:

1. **Shared product chrome** — role names, perspective switching, profile utilities, scenario date, route titles, footer, back links, button verbs, status vocabulary, empty-state patterns, accessible names, and focus/live-region feedback.
2. **Locale mechanics** — route binding, preference resolution, effective fallback, document metadata, locale events, missing-key labeling, restoration after Center re-enablement, and safe storage failure behavior.
3. **Formatting** — scenario and record dates/times, relative day labels, plural counts, money and `/month` wording, durations, percentages, and status-derived sentences. Use stable values plus locale-aware presentation; do not translate identifiers or mutate records.
4. **Center records and generated UI** — two contexts, class/session names, roster facts, attendance consequences, makeup tokens, report states, communication filters and conversations, announcements, course/curriculum records, billing history, configuration, migration, support, release notes, and all interaction feedback.
5. **Coach journey** — readiness, live teaching, capture placeholders, after-class reporting, learner views, evidence, observations, releases, support/profile, submission dialogs, validation and lifecycle feedback.
6. **Student journey** — today, lesson/resources, active step, reflection choices, completion, work/artifact/progress/course/journey summaries, resource dialogs and keyboard/focus announcements.
7. **Family journey** — overview and published journey, authored conversations, replies, attendance/absence/makeup, course inquiry, tuition/billing, account preferences, support forms and validations.
8. **HQ journey** — network summaries, Center inventory, curriculum, insights/performance/governance, support cases, deployment readiness, module configuration/allocation and generated feedback.
9. **Accessibility and dynamic state** — `aria-label`, `title`, `placeholder`, captions, table labels, dialog labels, validation text, `role=status`, `aria-live`, focus-return copy and dynamically created nodes.
10. **Fixtures and content records** — course/module descriptions, announcements, report summaries, observations, message threads, support issues, release notes and instructional content. Each record needs a declared treatment rather than accidental DOM translation.

### Intentional preservation and authored-content treatment

Always preserve as written unless an explicit reviewed presentation field exists:

- personal names, Center names, brands, course/product names where they function as proper names;
- code, field names, file names, references, IDs and payment-reference tokens;
- user-entered work, drafts, replies and notes;
- the original text and attribution of fictional authored messages and observations.

For canonical fictional messages and observations, add a record-level presentation model with:

- immutable `originalText`, `originalLocale`, and author attribution;
- optional human-reviewed `es-US` presentation text stored separately;
- a visible label such as “Original authored in English” and a clearly identified Spanish presentation;
- fallback to the visible attributed original plus an explicit “Spanish presentation unavailable” state.

This makes the fictional communication understandable without claiming automatic translation or changing the authored record. Newly entered browser-local content remains untranslated.

## 5. Full-Demo language behavior

Reuse the accepted storage, fallback, same-route switching, locale event and state-preservation patterns, with these explicit identities:

- entry: an independent browser-local Demo-entry preference;
- Center: Maya Chen’s Center preference plus the accepted simulated Center Spanish enablement;
- Coach: Jordan Ellis’s independent person preference;
- Student: Eli Morgan’s independent person preference;
- Family: Rachel Morgan’s independent person preference;
- HQ: an independent HQ-administrator preference, not governed by a single Center’s enablement.

Resolution rules:

1. English remains the source and default locale; Spanish is the only additional operational locale.
2. Entry and HQ are independent of the simulated Center enablement because neither represents a selected Center participant.
3. On first entry to a role with no saved role preference, the entry preference may supply the initial effective locale without overwriting any existing role preference. The role saves only after its own language control changes.
4. Switching perspective reads the destination identity’s preference and never writes the source locale into the destination preference.
5. Shared header, navigation, page title, footer and content use the active route identity’s effective locale.
6. Center disablement retains saved Spanish for Center/Coach/Student/Family identities, displays English with the accepted disabled explanation, and restores Spanish when re-enabled. It does not alter entry or HQ.
7. Switching language stays on the exact route and preserves browser-local task state, drafts, filters, selected records, dialog/form work where already retained, instructional cursor, and progression facts. Existing nonpersistent behavior need not become persistent merely because localization is added.
8. `html[lang]`, content-locale metadata, accessible names and generated feedback reflect the effective locale.
9. Missing Spanish keys fall back to English with an explicit labeled state. Intentional authored-original presentation is classified separately and is not a missing-key fallback.
10. Translation does not alter permissions, completion, availability, role payloads, publication visibility, billing behavior or any other operational semantics.

## 6. Product Platform discovery receipt and expansion request

Fresh memory-only discovery ran against:

- registry version: `0.7.1`
- registry commit: `f7eb502f5508273163fb845efc471ff667d1f3ee`
- registry tree: `03afaf872d01a63952199b65ba31f3a583350624`
- canonical remote: `O2Mdesign-Obando/loke-product-platform-registry`
- clean state: `true`
- qualification: `PASS`
- product repository unchanged: `true`

Proposed responsibility: product-local `Localized Experience Delivery` for the complete canonical Cognit Demo, in place, `en-US` plus `es-US`, at source commit `3f99f86967123ed89e59a17e3f615656f9c33d9b`.

Discovery outcome: `PRODUCT_LOCAL_AUTHORIZATION_REQUIRED`; `may_proceed: false`.

Rationale: the exact request matches `pp:responsibility:localized-experience-delivery`, but the active authorization `pp:product-local-delivery-authorization:cognit-demo-localized-experience-delivery-01` binds only four exact routes. The entry, HQ, all other role routes, and the two context-qualified forms of accepted-looking Center content exceed that boundary. The previous single push/single Preview boundary is consumed and cannot be reused.

Smallest authorization change:

1. Amend or supersede the existing Cognit Demo product-local delivery authorization once, rather than creating page-by-page approvals.
2. Keep Product `pp:product:cognit`, repository `pp:repository:cognit`, full name `O2Mdesign-Obando/cognit`, source revision `3f99f86967123ed89e59a17e3f615656f9c33d9b`, source locale `en-US`, target locale `es-US`, and delivery mode `in_place`.
3. Replace the four-route list with the exact 385-route manifest in section 2.
4. Permit product-local runtime/dictionary/content adaptation, local verification, human review and local checkpoint commits only.
5. Add the entry and HQ preference identities and the authored-original/Spanish-presentation treatment described above.
6. Preserve read-only progression and all current role, publication, billing and operational boundaries.
7. Mark the earlier remote push and Preview allowance consumed. Do not carry it forward.
8. Keep remote push and hosted Preview unauthorized until the future implementation checkpoint is exact, locally verified and human accepted. Then add one new exact-commit, normal non-force feature-branch push and one Git-connected non-Production Preview boundary in a later canonical amendment.
9. Continue to prohibit Production, PR, merge, publication, shared qualification, extraction, other products/locales, live translation, user-entered translation, new learning capabilities and learning discovery.

No registry record was changed by this discovery.

## 7. Recommended implementation sequence

### Batch 0 — authority and executable inventory

- Obtain the consolidated authorization above.
- Generate a source-derived route binding manifest from `getStaticPaths`; do not use generated page count as a work queue.
- Add a checked intentional-preservation manifest for names, brands, identifiers, code and authored originals.
- Add a missing-key and hardcoded-presentational-string check before runtime edits expand.

Files: `src/demo/cognit-demo-routes.js`, proposed localization verification scripts under `scripts/`, and documentation. No dependency change is required.

### Batch 1 — shared localization architecture

- Generalize `COGNIT_AUTHORIZED_LOCALE_ROUTES` to the exact canonical manifest.
- Replace broad literal walking with keyed or record-owned presentation wherever practical; retain literal adaptation only as a temporary, verified compatibility layer.
- Add explicit entry and HQ identities, active-route locale resolution, formatting helpers, authored-content presentation records and fallback classification.
- Localize shell metadata, header, footer, perspective selector and shared navigation once.

Files: `src/demo/cognit-localization.js`, `src/demo/locales/en-US.js`, `es-US.js`, `es-US-literals.js`, `src/components/layout/{BaseLayout,Header,Footer}.astro`, `src/components/demo/{CognitLanguageControls,DemoLoopNav}.astro`, and Demo route pages.

### Batch 2 — entry, HQ and shared status vocabulary

- Complete entry and all HQ views, filters, tables, module allocation/configuration, feedback and accessibility text.
- Establish shared keys for statuses, counts, dates, actions and empty states before role-specific duplication.

Files: `src/pages/learninghub/demo/index.astro`, `src/components/demo/CognitHqView.astro`, `src/demo/cognit-hq-{data,interaction}.js`, shared locale files.

### Batch 3 — complete Center journey

- Work by the 19 Center route families, not by 321 generated documents.
- Order: shell/context and rosters; classes/scheduling; attendance/makeup; communication/announcements; courses/curriculum; reports/publication; billing; configuration/module control; support/releases/migration.
- Verify Northfield, Harbor and unscoped variants without translating each generated page independently.

Files: `CognitCenterView.astro`, `CognitCenterCommunication.astro`, `CognitCenterConfiguration.astro`, `CognitCenterCloseout.astro`, `cognit-center-{interaction,communication}.js`, shared data and locale files.

### Batch 4 — complete Coach journey

- Localize readiness, live, capture placeholders, after-class, end-of-day, release/support/profile, learner/progress/evidence/observation/reporting/correspondence and all dynamic feedback.
- Preserve original observations and authored messages using the declared bilingual presentation treatment.

Files: `CognitCoachJourneyView.astro`, `CognitCoachLiveTeaching.astro`, `CognitDemoDeepView.astro`, `CognitDemoPerspective.astro`, `cognit-coach-interaction.js`, data and locale files.

### Batch 5 — complete Student journey

- Localize today, work, resources, active/reflection/complete, artifact/progress/courses/journey and accessibility/focus feedback.
- Preserve current entered work and cursor semantics; never translate learner-entered drafts.

Files: `CognitStudentJourneyView.astro`, `CognitDemoDeepView.astro`, `cognit-student-interaction.js`, data and locale files.

### Batch 6 — complete Family journey

- Localize home/journey, conversations, replies, attendance/absence/makeup, courses, billing/payment-method validation, account and support.
- Apply the authored-message treatment; preserve entered reply and note text.

Files: `CognitFamilyJourneyView.astro`, `cognit-family-interaction.js`, publication/data owners and locale files.

### Batch 7 — integrated verification and candidate checkpoint

- Repair only concrete defects within the authorized manifest.
- Run automated corpus, route, key, exception, build and interaction checks.
- Conduct human Spanish/content review, then Jorge’s complete designed-surface and state QA.
- Create one exact local runtime checkpoint and a separate documentation receipt. Do not transfer four-route acceptance to changed behavior.
- Request a new exact-checkpoint remote/Preview boundary only after local acceptance.

Internal local commits may follow each batch so defects are attributable. Do not push intermediate or receipt commits.

## 8. Verification and review plan

Completion is measured by four reconciled manifests, not generated page counts:

1. every source-declared canonical route resolves to one locale identity and a tested role/surface family;
2. every designed surface and meaningful interactive state has English, reviewed Spanish, or an approved explicit exception;
3. every dictionary key exists in both locales except controlled fallback fixtures;
4. every preserved string is classified as a name, brand, identifier, code, user entry or original authored record.

Automated checks:

- build and current route/Demo2 validation;
- exact source route manifest versus localization binding manifest;
- English/Spanish key parity and unused-key reporting;
- hardcoded presentational-string detection in Astro and interaction modules with an explicit exception file;
- generated dynamic-text and accessible-attribute coverage;
- zero unlabeled fallback in the normal Spanish state;
- authored-content record schema and attribution checks;
- locale-aware date/count/currency fixtures;
- no mutation of progression, publication or role payload fixtures;
- `git diff --check` and accepted-baseline diff review.

Browser verification by designed surface/state catalog:

- same-route English ↔ Spanish switching and `html[lang]`;
- entry/HQ independence, per-person isolation and Center disable/restore;
- continuity across perspective switching without preference overwrite;
- drafts, entered work, selected record, filters, current instructional group and existing persisted state;
- dialogs, validation, confirmations, notifications, empty states and fallback labels;
- authored-original plus Spanish presentation behavior;
- keyboard operation, focus placement/return and live-region announcements;
- desktop and mobile layout, overflow and console/network errors;
- representative unscoped/Northfield/Harbor Center variants plus automated smoke of all concrete routes.

Human review responsibilities:

- Spanish/content reviewer: terminology, grammar, tone, date/money phrasing, accessibility copy, fictional authored-message presentation and intentional-preservation list.
- Jorge QA: product meaning, cross-role continuity, preference behavior, dynamic states, read-only progression, mobile/desktop acceptance and exact checkpoint approval.
- CODEX: implementation, deduplication, automated checks, browser evidence, bounded repairs and checkpoint/receipt preparation.
- Product Platform/Control Tower: one consolidated route/action expansion before implementation and a later exact-checkpoint remote/Preview boundary.
- Vercel: no dependency during local implementation; existing authenticated CLI preflight can be reused only after new hosted authorization.

## 9. Effort estimate

Estimate basis: 385 concrete routes collapse to one entry surface, 19 Center route families, and four parameterized role components; relevant UI/data/interaction source is about 5,256 lines, with a 2,561-value initial-render corpus plus interaction-only strings. The Center state surface and human-reviewed authored-content treatment dominate the uncertainty.

| Work | Bounded estimate | Notes |
| --- | --- | --- |
| CODEX implementation and automated verification | 48–72 active engineering hours | seven batches; assumes no product-semantic redesign and no dependency additions |
| Human Spanish/content review | 16–24 reviewer hours | staged glossary plus role batches; depends on whether every fixture record receives a Spanish presentation |
| Jorge QA | 10–16 reviewer hours | designed surfaces and meaningful states, not 385 page-by-page reviews |
| Product Platform/Control Tower | external | one consolidated local expansion, then one later exact-checkpoint Preview amendment |
| Hosted Preview verification | 4–8 active hours after authorization | build observation, role/state checks, mobile/console and Production comparison |

These are active-work estimates, not unattended runtime or calendar guarantees. Main uncertainties are Center-generated dynamic sentences, authored-message presentation volume, Spanish terminology decisions, date/money formatting, and the number of interaction states human reviewers elect to inspect individually.

## 10. Paste-ready proposed execution authorization

> # CODEX — COGNIT LEARNING DEMO — EXECUTE FULL-DEMO ENGLISH/SPANISH LOCAL CANDIDATE
>
> Product Platform canonical expansion for complete product-local Cognit Demo localization is confirmed. Use the authorized boundary recorded in `docs/cognit-learning-hub/full-demo-multilingual-discovery-proposal-01.md`.
>
> Baseline runtime commit: `3f99f86967123ed89e59a17e3f615656f9c33d9b`
>
> Baseline tree: `c26d099c862eae10d83bbb4cfa20aea8e232e1ae`
>
> Repository: `O2Mdesign-Obando/cognit`
>
> Branch: `feat/demo-structured-curriculum-multilingual-01`
>
> Implement complete in-place `en-US` and `es-US` coverage for the exact 385-route canonical `/learninghub/demo` manifest. Reuse the accepted localization, Center enablement, per-person preference, explicit fallback, same-route switching, state preservation and read-only progression patterns. Add explicit independent entry and HQ preferences. Preserve names, brands, code/record identifiers, user-entered work and original authored text. Provide human-reviewed Spanish presentation for fictional authored messages/observations with original-language attribution; do not imply live or automatic translation.
>
> Execute the documented batches autonomously with local checkpoint commits, focused verification after each batch and bounded repairs for concrete defects. Preserve existing and unrelated work, including `scripts/verify-cognit-curriculum-presentation 2.mjs`. Measure completion with the route, designed-state, key and intentional-preservation manifests, not generated HTML counts.
>
> Do not modify Demo2, marketing sites, other products, Italian, Portuguese, learning capabilities, progression semantics, role/publication/operational behavior, dependencies or registry records. Do not begin synchronous or asynchronous learning discovery.
>
> Stop after a fully verified local runtime checkpoint and documentation receipt suitable for human Spanish/content review and Jorge QA. No push, PR, hosted Preview, deployment, merge, publication or Production action. The earlier push/Preview authorization is consumed; a later hosted Preview requires a fresh exact-checkpoint authorization.

Until the Product Platform expansion is canonical and explicitly permits implementation, this proposal remains planning documentation only and runtime implementation must not begin.
