# Focused Expansion 01 — bounded mobile correction receipt

Date: November 12, 2026

Status: local correction candidate; targeted human review required. No push or deployment was performed.

## Source and authority

- Accepted starting runtime: `e3e81f96a5d943fcae5275f963512d2f3f3608a1`
- Accepted starting tree: `3780a409636c1dedb71a03d3c909629bd918e0fe`
- Documentation-only HEAD before the correction: `92f7719e61700050cf814bdd65c8f41635b126a0`
- The accepted runtime is an ancestor of the documentation HEAD, and the intervening changes did not change `src`, `public`, dependency manifests, or Astro configuration.
- Canonical Product Platform registry: `d840e4dbbb1a127f4ce1bb779b3e34e12134f22b`
- Discovery request: `pp:request:cognit-demo-connected-class-month-composition-01`
- Discovery result: `KEEP_PRODUCT_LOCAL / may_proceed: true`
- Approved exception: `pp:exception:cognit-demo-connected-class-month-composition-01`
- Boundary used: narrowly scoped responsive repair and local verification of the already-authorized synthetic Demo. No registry, remote, deployment, provider, or Production action.

## Reproduction and root cause

The exact production build was served locally at `http://127.0.0.1:4322`. At a 360 by 800 CSS-pixel viewport with Hindi selected, the document itself could report no horizontal overflow while these child navigation regions still exceeded their own available width:

- shared perspective navigation: 340 px content in a 311 px container;
- Coach section navigation: 451 px content in a 311 px container;
- Student section navigation: 413 px content in a 311 px container;
- Family section navigation: 848 px content in a 311 px container.

The previous checks passed because they compared only document `scrollWidth` with the viewport and primarily inspected initial states. They did not measure independently scrolling descendants, off-screen navigation targets, populated audio/report/message states, or every target against the 44 by 44 px minimum.

The correction replaces the narrow-screen horizontal navigation strips with bounded two-column grids, keeps the desktop presentation unchanged, and brings shared Demo, Center, profile, and Student dialog targets to at least 44 by 44 px. It does not use document-level `overflow-x: hidden`.

## Verification

- Exact production build: PASS, 387 pages.
- Route validation: PASS, 446 HTML pages and 13,680 local references, zero missing.
- Demo2 validation: PASS, 54 declared and 59 prerendered routes, zero missing references.
- Localization manifest: PASS, 385 routes, SHA-256 `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`.
- Structured curriculum, Japanese/Hindi pilot, and connected expansion verification: PASS.
- Responsive matrix: PASS, 84 combinations (seven authorized routes × four locales × 320, 360, and 1280 px). No document overflow, measured internal navigation overflow, locale mismatch, or measured shared navigation target below 44 by 44 px.
- Populated audio fixtures: PASS at 320, 360, and 1280 px in all four locales. Two distinct non-empty WAV fixtures remained available after reload and reopening. Playback metadata reported 8,044 bytes and 0.5 seconds for each. Fixture verification is not a new real-microphone test; the previously accepted real microphone evidence is carried forward.
- Transcript state: PASS for simulated-unreviewed, edit, Cancel, Coach correction save, and exact audio-version labeling.
- Coach draft isolation: PASS for separate Eli and Lena observation and next-step values across learner and locale switching.
- Center fallback: PASS. Disabling Hindi preserved the saved preference and visibly used English; restoring Hindi returned the authorized report to `hi-IN`, while the compact notice remained only for actual fallback content.
- Exact-version invalidation: PASS. Changing the transcript source invalidated `report-creative-app-lab-2026-09-v1`, retained the accepted decision in history, disabled acceptance of the stale version, and removed the stale report from Family.
- Student dialog: PASS at 320 px. No dialog or document overflow; the close target is 44 by 44 px, receives initial focus, and returns focus to its opener.
- Family messages: PASS. Translation switching did not mutate the authored English message; View original remained available.
- Browser console: no warnings or errors captured during the final representative route and state pass.

Japanese and Hindi remain CODEX-drafted pending qualified linguistic review. This receipt does not establish exhaustive interaction, assistive-technology, hosted, or Production acceptance.

## Evidence

- `evidence/mobile-correction-01/before-family-messages-hi-360.png`
- `evidence/mobile-correction-01/after-family-messages-hi-360.png`
- `evidence/mobile-correction-01/before-coach-capture-hi-360.png`
- `evidence/mobile-correction-01/after-coach-capture-populated-hi-360.png`
- `evidence/mobile-correction-01/after-coach-report-populated-en-320.png`
