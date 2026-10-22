# Structured Curriculum and Multilingual Experience 01 — local receipt

Date: October 22, 2026

Product Owner: Jorge Obando

Baseline: `d0320f988a1fa6b33b4c3d302c55957c922c268b`

Local branch: `feat/demo-structured-curriculum-multilingual-01`

## Product Platform discovery receipt

Discovery ran against the canonical clean registry at version `0.7.1`, commit `c176b49021c4c214ec4df5073c01686e30e30291`, tree `13c00727fcaf19cd58ddb9e16b68cb0ce45ce7e6`; qualification result: `PASS`.

| Responsibility | Canonical request | Result | Authority |
|---|---|---|---|
| Curriculum progression | `records/requests/cognit-demo-curriculum-progression-01.json` | `KEEP_PRODUCT_LOCAL`; proceed | `pp:exception:cognit-demo-curriculum-progression-01` |
| Localized experience delivery | `records/requests/cognit-demo-localized-experience-delivery-01.json` | `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`; proceed in place | `pp:product-local-delivery-authorization:cognit-demo-localized-experience-delivery-01` |

Authorized locale routes are exactly:

- `/learninghub/demo/center/courses/creative-app-lab`
- `/learninghub/demo/coach/learners/eli`
- `/learninghub/demo/student/lesson`
- `/learninghub/demo/family/courses`

The work remains product-local. Remote push, preview, publication, deployment, production use, shared qualification, reuse, and extraction are prohibited.

## Implemented candidate

- A synthetic read-only Creative App Lab progression fixture keeps completion, teaching position, reference access, and availability independent: Module 1 completed/reference-accessible; Module 2 current/incomplete; Module 3 available next; Module 4 locked future.
- Center, Coach, Student, and Family receive role-appropriate projections. Center and Family do not receive the Coach/Student instructional payload; locked instructional content is not present.
- Coach and Student share original fictional Module 2 presentation content with three activities, ordered groups, search, focus-managed navigation, responsive image dialog, contained code, and reflection drafts.
- `en-US` and `es-US` use stable content keys. `Coach` is provisionally `Instructor/a`; `Learning Journey` is provisionally `Trayectoria de aprendizaje`. Spanish human review remains pending.
- Illustrative entitlement: English default plus ten additional-language slots; only Spanish is operational.
- Center Spanish enablement and per-person language preferences persist separately in browser-local storage. Disabling Spanish retains a saved Spanish preference, applies English once, and restores Spanish when re-enabled.
- Missing Spanish keys fall back explicitly to English; a controlled test-only key verifies the fallback path.
- Activity position and entered reflection work persist per person and survive language changes and reloads. Storage errors and malformed values fall back safely.
- Disclosure: “Interactive Demo — simulated curriculum, language settings and browser-local progress.”

No progression, completion, teaching-position, reference-access, availability, or unlock mutation is exposed. Existing authored Coach observations and other record content are preserved rather than machine-translated.

## Verification

Completed successfully before the checkpoint:

- `npm run build`
- `node scripts/verify-cognit-curriculum-presentation.mjs`
- `npm run validate:routes`
- `npm run validate:demo2`
- `git diff --check`
- Browser checks confirmed all four exact role projections, English/Spanish switching, per-person isolation, Center disable with saved Spanish retained/effective English, automatic Spanish restore after re-enable, accurate `html[lang]`, no instructional groups for Center or Family, preserved guided position after reload, zero document-level horizontal overflow at the mobile breakpoint, and no console warnings or errors. The controlled English-fallback fixture and malformed/unavailable-storage paths are covered by the focused verification script.

## Review status

Spanish is a candidate translation with human review pending. The implementation is authorized only for local Demo evaluation and the exact in-place routes above.
