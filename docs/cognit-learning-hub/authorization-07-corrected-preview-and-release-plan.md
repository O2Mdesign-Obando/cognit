# Authorization 07 corrected Preview and release-plan receipt

Date: 2026-10-28

## Targeted acceptance and source identity

Jorge's targeted human acceptance is recorded against exact runtime commit `a614ffb245d01b416e5ae69ae056441563468f53`, tree `6940ea412654c859d39e159df3e0e9cc805e6739`, on `feat/demo-structured-curriculum-multilingual-01`. The accepted correction moves the existing language selector into the shared Demo navbar, uses the visible values English and Español, removes the prominent review panel, and corrects shared Student status labels while preserving original authored content and browser-local state.

Local documentation HEAD before this receipt was `9a0339073b99b8844764faf063c7931fc3260ad0`, tree `2be46b04812f2904c65f4c213052de8c595131eb`. Its only difference from the accepted runtime was `docs/cognit-learning-hub/targeted-language-navigation-correction-01-local-receipt.md`. No documentation descendant was pushed. The unrelated untracked duplicate verifier remains preserved.

## Product Platform receipt

- Canonical baseline before amendment: `71816a1a91d3df5bc9cb0ec952cda20f1fddccb1`.
- Authorization 07 canonical registry commit: `5bf0f533109a7e2f1c7a5d345e7ef83197aa12a0`.
- Registry tree: `364ac2afe214ec8eb7a91c800cdeb958378885b4`.
- Promotion: normal fast-forward of `O2Mdesign-Obando/loke-product-platform-registry` `main`; the remote resolved to the same commit after push.
- Qualification: PASS — 433 records, 72 fixtures, 34 schemas, 2,399 validation assertions, 393/393 tests, deterministic discovery index and `0.7.1` release artifact.
- Exact manifest: 385 routes — Entry 1, Center 321, Coach 26, Family 14, HQ 11, Student 12 — SHA-256 `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`.
- Fresh localization discovery: `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`, `may_proceed: true`, exact source revision `a614ffb245d01b416e5ae69ae056441563468f53`.
- Fresh progression discovery: `KEEP_PRODUCT_LOCAL`, `may_proceed: true`, approved exception `pp:exception:cognit-demo-curriculum-progression-01`, reuse `product_local_only`, extraction `none`.

Authorization 06 and the earlier four-route allowances remain consumed historical evidence. Authorization 07 permitted only the exact accepted push, its resulting Git-connected Preview, hosted verification, and read-only release planning.

## Vercel preflight and execution

- Team: `team_743yTzHuhccXpBtcT5qedSlh` (`o2mdesign-obandos-projects`).
- Project: `prj_AT3X9ZShjfCuZy7mQzWTm3UgDChy` (`cognit`).
- Git integration: GitHub `O2Mdesign-Obando/cognit`, repository ID `1347785593`.
- Production branch: `main`.
- Production before push: `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5`, source `88997bc352d4ccc3508e27acac0465c40edc5510`, READY.
- Remote feature branch before push: `13b52706d39b7877b185b060013b55ff60cc162d`; the accepted correction was a normal fast-forward and had no prior deployment.
- Exact command executed once: `git push origin a614ffb245d01b416e5ae69ae056441563468f53:refs/heads/feat/demo-structured-curriculum-multilingual-01`.
- Push receipt: `13b5270..a614ffb`; remote feature branch verified at the exact accepted commit.
- Preview deployment: `dpl_GJvad86zaXZUic4LV52xH123NBjf`.
- Immutable URL: `https://cognit-rm23wioit-o2mdesign-obandos-projects.vercel.app`.
- Attribution: project `cognit`, environment Preview, branch `feat/demo-structured-curriculum-multilingual-01`, source commit `a614ffb245d01b416e5ae69ae056441563468f53`, READY.

## Hosted verification

Automated hosted availability checked every exact manifest route. All 385 returned HTTP 200, all 385 contained the shared navbar language selector and both English and Español choices, and zero contained the removed large-panel markers. This establishes route availability and selector presence, not exhaustive interaction coverage on every route.

Representative browser interaction checks passed:

- shared navbar dropdown on Entry, Center, Coach, Student, Family, and HQ shells;
- same-route English/Spanish switching and `lang`/effective-locale updates;
- native-select keyboard operation, 3px visible focus outline, 44px desktop and 48px mobile control height;
- Student activity position and entered draft preserved across switching and navigation;
- Northfield Spanish disable produced saved-Spanish/effective-English fallback notice, then restored Spanish and the Student draft/position;
- Harbor remained independently enabled while Northfield was disabled;
- Entry and HQ retained independent explicit preferences;
- Jordan's English authored guidance remained byte-for-byte visible with a localized provenance label;
- Student state labels rendered `Completado ✓`, `Paso actual`, and `Próximamente` in Spanish;
- 390 × 844 mobile smoke check showed the dropdown visible in the header with no document-level horizontal overflow; desktop smoke checks covered all role shells;
- browser warning/error console was empty after representative navigation and interactions.

Local regression verification also passed: localization manifest check, structured curriculum verification, full build (387 pages), 446-page route/reference validation with 13,675 references and zero missing, and Demo2 validation with 845 references and zero missing.

Production after verification remained `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5`, source `88997bc352d4ccc3508e27acac0465c40edc5510`, branch `main`, READY.

## Read-only release plan

Current `main` is `88997bc352d4ccc3508e27acac0465c40edc5510`, tree `a3de423fe23b10a9d456138db5ad587e869dc719`. The accepted correction is a descendant of `main` and contains scenario-coherence commit `d0320f988a1fa6b33b4c3d302c55957c922c268b` as an ancestor. The cumulative three-dot diff from current `main` to the accepted correction is 42 files, 3,663 insertions and 102 deletions.

Draft PR #2, `Demo: align scenario date and Morgan Family context`, remains OPEN and draft, head `feat/demo-scenario-context-coherence-01` at `d0320f988a1fa6b33b4c3d302c55957c922c268b`, base `main`, mergeable/CLEAN, with successful Vercel checks and no recorded review decision.

Required release sequence:

1. Obtain review and separate authority to mark PR #2 ready and merge the exact scenario-coherence dependency.
2. If PR #2 is merged preserving commit ancestry, prepare a separate localization PR for the exact accepted candidate and verify its cumulative diff does not reintroduce or duplicate scenario changes. If PR #2 is squash/rebase merged, reconcile the localization branch onto the new `main`; the resulting SHA is changed runtime identity and requires renewed verification and acceptance before release.
3. Require normal repository review, passing CI/Preview evidence, a clean merge state, and an explicit Production release authorization. Authorization 07 does not supply these actions or approvals.
4. Proposed runtime release candidate remains exact commit `a614ffb245d01b416e5ae69ae056441563468f53`, tree `6940ea412654c859d39e159df3e0e9cc805e6739`, only while ancestry and bytes remain unchanged. Any merge/rebase-created identity must be separately named and verified.
5. Before any Production action, record the then-current Production deployment again and compare it with this receipt.

Rollback target is the unchanged current Production deployment `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5` at source `88997bc352d4ccc3508e27acac0465c40edc5510`. Recovery, under separate authority, is to halt before promotion on failed gates; after a release, use the approved Vercel rollback/promotion path to the recorded deployment, confirm aliases and source attribution, then verify the representative Demo routes and Production identity. A Git revert may follow through normal review to restore repository history; it is not substituted for immediate deployment recovery.

Limitations: human acceptance is targeted to the corrected candidate and is not Production acceptance; 385-route hosted verification proves availability and common selector presence, while interactive coverage is representative rather than exhaustive; Preview browser storage is origin-local and does not transfer to Production; Spanish human review remains as recorded by Jorge for this exact candidate, not for future reconciled bytes.
