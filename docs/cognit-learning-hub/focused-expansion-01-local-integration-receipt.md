# Focused Demo Expansion 01 — local integration receipt

Recorded November 6, 2026 in America/New_York. This receipt covers a local synthetic candidate only. It is not language acceptance, hosted Preview authorization, publication, deployment, or Production approval.

## Authority and baseline

- Accepted runtime ancestor: `a614ffb245d01b416e5ae69ae056441563468f53`
- Accepted runtime tree: `6940ea412654c859d39e159df3e0e9cc805e6739`
- Source-reconciliation checkpoint: `b5c4b061e55ce4549208f3802e448982e8e3e953`
- Canonical registry: `e253ad3a249f26d869275bd1634a990f9a52dfcb`
- Canonical registry tree: `dad23cf517f82e39608a11506122e32bacd607ec`
- Connected composition discovery: `pp:request:cognit-demo-connected-class-month-composition-01` → `KEEP_PRODUCT_LOCAL`, `may_proceed: true`
- Seven-route language discovery: `pp:request:cognit-demo-seven-route-ja-hi-localization-01` → `PRODUCT_LOCAL_CANDIDATE_AUTHORIZED`, `may_proceed: true`
- Registry qualification at the canonical revision: PASS. The registry's separate stale local main ref was not used as authority and was not changed.

## Source provenance

- Japanese source candidate: commit `098cae2d00778c90717330bfb8d27ecb9191393c`, tree `e631014af840ae90e788f497634ea58d1b4bbdc5`, with implementation parent `d937a115323e08c52afb80bdf1d9c09b08545e6d`. Its supported Cognit localization structures were ported and then narrowed to the new exact seven-route authorization.
- Hindi behavioral receipt: `0adc2ec5e2a141f18aa777bf47aeac45cf1bd10de761e425c37807deaaf8adda`. Control Tower closed recovery. Cognit reimplements the recorded behavior locally; this receipt does not claim that missing CODEWIZ source bytes were copied or recovered.
- Coach-audio behavioral evidence: exact digest `68a796ec12b1f0a1a49e1f9c7d1cf3c1019f80e59b983cea251e7e84390fa0ce`. No CODEWIZ code was extracted. No live transcription/provider path was ported.
- Reporting Stage A behavioral evidence: exact checkpoint `ad74008593b5bf4df6a29b37eecc9f3f80c512b094a36597a64a279d9991ee87`. Cognit reimplements source links, review sequencing, routine/manual decisions, exact-version acceptance, invalidation, and decision history.

## Exact delivery boundary

Japanese and Hindi are available only on:

1. `/learninghub/demo/center/courses/creative-app-lab`
2. `/learninghub/demo/center/context/northfield/reports/eli`
3. `/learninghub/demo/coach/capture`
4. `/learninghub/demo/coach/after-class`
5. `/learninghub/demo/student/lesson`
6. `/learninghub/demo/family/journey/eli`
7. `/learninghub/demo/family/messages`

The Northfield language setting controls availability but is not an eighth localized delivery route. English/Spanish remain unchanged across the 385-route manifest. Japanese/Hindi saved versus effective preference, explicit English fallback, person/context isolation, and Center disable/restore are preserved. Japanese and Hindi copy is CODEX-drafted and remains pending qualified language review.

## Connected synthetic class/month

The shared browser-local record uses stable Creative App Lab course, September class/month, Eli learner, module, evidence, report, and message identifiers across roles.

- Center course shows completed, current, and locked modules, objectives, activity, and expected evidence.
- Coach capture requires Eli or Whole class before recording. Typed notes, photo/video fixtures, multiple device-local audio records, playback/reopen, and explicit error handling are represented. Audio blobs use IndexedDB; metadata and history use localStorage. Nothing is sent.
- Simulated transcripts are explicitly labeled and linked to an audio version. A late result cannot overwrite a Coach correction.
- The simulated AI-assisted monthly draft exposes source IDs and contains only supported fixture claims. Coach review and submission are separate actions.
- Center routine eligibility is not acceptance. Manual-review reasons remain visible. Center accepts an exact submitted/current version only.
- Source changes invalidate the accepted version while preserving prior report and decision history.
- Family receives only the current exact Center-accepted version. Raw audio, transcripts, pending, stale, superseded, or unaccepted drafts remain unavailable.
- Preferred-language messages preserve sender, recipient, original English text, language, status, and version. `View original` does not alter or send the message.
- Curriculum progression remains read-only.

## Verification record

Automated PASS:

- `npm run build` — 387 Cognit pages plus Demo2 build.
- `npm run verify:localization` — 385-route fingerprint `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`; English/Spanish regression; seven-route Japanese/Hindi boundary; deterministic connected-state, stale transcript, review, exact acceptance, invalidation, and Family visibility checks.
- `npm run validate:routes` — 446 HTML pages and 13,682 local references; zero missing.

Browser exercised locally:

- Coach target selection, typed note save, and preservation across Spanish → Japanese → Hindi switching.
- Evidence review → simulated source-linked draft → Coach review → submission.
- Center exact-version acceptance and decision history.
- Family visibility after acceptance, then removal after a Coach source change.
- Preferred-language message and `View original` authorship preservation.
- Northfield Hindi disable → explicit saved/effective English fallback → restore.
- Stale report actions disable after invalidation.
- Keyboard-visible native controls and accessibility tree names were inspected. Responsive CSS has a one-column breakpoint and 48 px mobile controls.

Not established by this receipt:

- Qualified Japanese or Hindi language review.
- Physical microphone record/stop/playback on a real phone; the automated browser permission remained unresolved and was cancelled by reload.
- A real screen-reader session, a dedicated narrow-viewport browser pass, or exhaustive interaction coverage.
- Browser-console collection was unavailable in the local in-app browser; build/runtime logs showed no compile or route errors.

## Local review access

The local server is bound to the LAN at `http://192.168.1.43:4321/`. A phone on the same network can open `/learninghub/demo/student/lesson`. The address depends on the current computer, network, firewall, and running local server; it is not hosted and is not a stable public URL. Browser storage is per device and origin, so desktop state does not transfer to the phone.

The Learning marketing site is updated in its own repository only after the Demo checks passed. Its copy describes synthetic device-local audio, simulated AI assistance, exact-version acceptance, and bounded Japanese/Hindi accurately. It does not link the existing hosted Demo as though it contains this candidate.

All remote-action holds remain in force. The unrelated `scripts/verify-cognit-curriculum-presentation 2.mjs` remains untracked and unchanged.
