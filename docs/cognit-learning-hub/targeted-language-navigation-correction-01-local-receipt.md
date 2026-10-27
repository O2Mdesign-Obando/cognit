# Cognit Demo targeted language-navigation correction 01

Date: October 27, 2026  
Branch: `feat/demo-structured-curriculum-multilingual-01`

## Review provenance

Jorge's hosted full-Demo QA PASS remains recorded only against the previously reviewed runtime:

- Commit: `13b52706d39b7877b185b060013b55ff60cc162d`
- Tree: `acc4e469ddf13c09983c1eb3816d218b72edea1a`
- Scope: the exact 385-route English/Spanish manifest, without a Production-acceptance or exhaustive-interaction claim

This correction changes presentation and shared Spanish state labels. Acceptance does not transfer automatically. The corrected local runtime below is pending targeted human review:

- Correction commit: `a614ffb245d01b416e5ae69ae056441563468f53`
- Correction tree: `6940ea412654c859d39e159df3e0e9cc805e6739`
- Review status: `TARGETED_HUMAN_REVIEW_PENDING`

## Product Platform discovery

The memory-only governed implementation request used canonical registry commit `71816a1a91d3df5bc9cb0ec952cda20f1fddccb1` (`v0.7.1`, clean, qualification PASS). It returned:

- Outcome: `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`
- `may_proceed: true`
- Responsibility: `pp:responsibility:localized-experience-delivery`
- Product-local authorization: `pp:product-local-delivery-authorization:cognit-demo-localized-experience-delivery-01`
- Runtime enforcement: `declared_not_enforced`
- Deployment authorized: false

The earlier one-push/one-Preview allowance is consumed and was not reused.

## Bounded correction

- Replaced the prominent page-level language panel with one native `select` in the shared Demo header.
- The visible values are `English` and `Español`; stored values remain `en-US` and `es-US`.
- Removed the duplicate language heading, candidate-review notice, browser-storage boilerplate, and panel spacing from the normal layout.
- Kept compact disabled-language and English-fallback messages hidden until their conditions occur.
- Moved Center Spanish enablement to Center Settings for both Northfield and Harbor contexts.
- Localized the Student continuity labels `Complete`, `Current step`, and `Upcoming` when Spanish is effective.
- Preserved Jordan's original English note and its original-authorship attribution.
- Preserved same-route switching, saved-versus-effective preference behavior, role/context isolation, entered work, activity position, audience boundaries, and read-only progression.

## Verification

Automated checks passed:

- `npm run build` — 387 Astro pages plus the unchanged Demo2 build
- `npm run verify:localization` — exact 385-route manifest fingerprint `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`
- `npm run validate:routes` — 446 HTML pages, 13,675 local references, 0 missing
- `npm run validate:demo2` — 54 declared routes, 59 prerendered routes, 845 local references, 0 missing
- `git diff --check`

Local browser checks passed for:

- English/Spanish switching and focus retention on the native selector
- visible focus styling and a 48 px mobile selector target
- Student entered-work and completed-step preservation across a language change
- Spanish `Completado`, `Paso actual`, and `Próximamente` labels
- Northfield disable/fallback/restore with the saved Spanish preference retained
- Harbor enablement isolation while Northfield was disabled
- independent Entry, HQ, and Student preferences
- Jordan's original English note remaining unchanged in Spanish
- desktop layout and a 390 × 844 mobile layout
- browser console with no runtime errors (local Vite connection messages only)

## Targeted local review

- Entry: <http://127.0.0.1:4321/learninghub/demo>
- Student labels and authored note: <http://127.0.0.1:4321/learninghub/demo/student>
- Student entered-work preservation: <http://127.0.0.1:4321/learninghub/demo/student/active>
- Northfield language management: <http://127.0.0.1:4321/learninghub/demo/center/settings#center-languages>
- Harbor language management: <http://127.0.0.1:4321/learninghub/demo/center/context/harbor/settings#center-languages>
- HQ header: <http://127.0.0.1:4321/learninghub/demo/hq>

Screenshots:

- `artifacts/targeted-language-navigation-correction/student-desktop-es.png`
- `artifacts/targeted-language-navigation-correction/student-mobile-es.png`

No push, Preview, deployment, PR, merge, registry mutation, dependency change, or Production action was performed.
