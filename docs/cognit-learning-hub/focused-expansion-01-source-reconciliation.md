# Focused Expansion 01 — source reconciliation and Product Platform gate

Recorded on November 6, 2026 in America/New_York. This is a documentation-only readiness receipt. It changes no Demo runtime bytes, does not accept language copy, and grants no remote action.

## Demo baseline and deployed relationship

- Repository: `O2Mdesign-Obando/cognit`
- Branch: `feat/demo-structured-curriculum-multilingual-01`
- Documentation HEAD before this receipt: `8a24d7bde44c333678dab20a34fb30a59ea9e9a4`
- HEAD tree before this receipt: `4e98e4e939e117ff18595d0008b8e460bcbf8b9c`
- Accepted runtime ancestor: `a614ffb245d01b416e5ae69ae056441563468f53`
- Accepted runtime tree: `6940ea412654c859d39e159df3e0e9cc805e6739`
- The two commits after the accepted runtime are documentation-only. The runtime diff from `a614ffb` to the pre-receipt HEAD is empty outside `docs/cognit-learning-hub/`.
- Unrelated untracked file preserved: `scripts/verify-cognit-curriculum-presentation 2.mjs`.
- Remote feature branch remains exactly `a614ffb245d01b416e5ae69ae056441563468f53`.
- Current corrected Preview remains `dpl_GJvad86zaXZUic4LV52xH123NBjf`, READY, source branch `feat/demo-structured-curriculum-multilingual-01`, source commit `a614ffb245d01b416e5ae69ae056441563468f53`, immutable URL `https://cognit-rm23wioit-o2mdesign-obandos-projects.vercel.app`.
- Current Production remains `dpl_6F6oaQhnkEdcRFutSLPNsi6kHyT5`, READY, source branch `main`, source commit `88997bc352d4ccc3508e27acac0465c40edc5510`.

The accepted and deployed runtime is therefore still `a614ffb`. The Japanese, Hindi, Coach-audio, and Stage A candidates are separate source candidates and are not part of that deployed runtime.

## Reconciled source identities

### Japanese four-route candidate

- Worktree: `/Users/jorgeobando/.codex/worktrees/cognit-japanese-four-route-local-01`
- Commit: `098cae2d00778c90717330bfb8d27ecb9191393c`
- Tree: `e631014af840ae90e788f497634ea58d1b4bbdc5`
- Parent implementation commit: `d937a115323e08c52afb80bdf1d9c09b08545e6d`
- Baseline: `a614ffb245d01b416e5ae69ae056441563468f53`
- Exact changed paths: `scripts/verify-cognit-curriculum-presentation.mjs`, `scripts/verify-cognit-japanese-pilot.mjs`, `src/components/demo/CognitCenterView.astro`, `src/components/demo/CognitCoachJourneyView.astro`, `src/components/demo/CognitLanguageControls.astro`, `src/demo/cognit-curriculum-content.js`, `src/demo/cognit-localization.js`, `src/demo/locales/en-US.js`, `src/demo/locales/es-US.js`, `src/demo/locales/ja-JP-literals.js`, and `src/demo/locales/ja-JP.js`.
- Authorized source route matrix: Center Creative App Lab, Coach Eli, Student Lesson, and Family Courses. Northfield Settings is an availability control, not a fifth translated route.
- Verification rerun: `node scripts/verify-cognit-japanese-pilot.mjs` PASS; `npm run verify:localization` PASS with the unchanged 385-route fingerprint `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`.
- Boundary: local candidate only; linguistic and browser review remain pending. Its existing Product Platform authorization is bound to the exact four routes and `a614ffb` source revision and does not authorize this larger connected matrix or a second integration checkpoint.

### Corrected Hindi Family candidate

- Worktree: `/Users/jorgeobando/Desktop/Projects/codewiz-family-multilingual-local-synthetic-01`
- Git baseline: `7651e6ca7379974a438cd090c6716b11dea189d1`
- Baseline tree: `05c05057118b31373dd041f81f10e038c6e5b0e2`
- Reported exact 33-path content-manifest digest: `0adc2ec5e2a141f18aa777bf47aeac45cf1bd10de761e425c37807deaaf8adda`.
- Candidate scope: fourteen exact CODEWIZ Family routes, `en-US`, `es-US`, and `hi-IN`, guardian-scoped preference, source/version lifecycle, child binding, stale-result clearing, original view, synthetic data only.
- Verification rerun against the current worktree: `node scripts/verify-family-multilingual-experience.mjs` PASS.
- Review boundary: Spanish and Hindi remain pending qualified language review. Devesh's review was preliminary and limited to three Hindi views, not linguistic acceptance.
- Exact-artifact mismatch: 31 of the 33 receipt paths still match the recorded manifest, but the current worktree no longer contains the exact bytes recorded for `scripts/verify-family-multilingual-experience.mjs` (expected SHA-256 `9a49746eb1bc18b4ea6be55f312dae0138df41e59c3c0a330ddb18c37bf94f0b`) or `src/components/family/FamilyMultilingualPage.astro` (expected SHA-256 `3146c561ebf597282e8cf1236f47fa6437dd390c1d6cca9d38bef33bde569a6d`). The current aggregate is therefore not `0adc2ec…`.
- Required source artifact: the exact two recorded files, or a patch/archive reproducing the complete `0adc2ec…` manifest. No older or later Hindi candidate may be substituted silently.

### Coach audio candidate

- Worktree: `/Users/jorgeobando/Desktop/Projects/codewiz-bei-coach-audio-capture-local-01`
- Git baseline: `7651e6ca7379974a438cd090c6716b11dea189d1`
- Baseline tree: `05c05057118b31373dd041f81f10e038c6e5b0e2`
- Exact 17-path transcription manifest digest, recomputed from current bytes: `68a796ec12b1f0a1a49e1f9c7d1cf3c1019f80e59b983cea251e7e84390fa0ce`.
- The 17 paths comprise the 14-path local audio/Stage A boundary plus `src/server/transcription/deepgram-prerecorded.js`, `src/pages/api/coach-audio-transcription.js`, and `scripts/verify-deepgram-prerecorded-local.mjs`.
- Supported behavior relevant to this assignment: explicit learner/Whole class target; record, stop, playback, local save, reload, reopen, multiple distinct capture IDs; secure-context, denied/unavailable, interruption, empty and storage-failure handling; original-audio preservation; exact audio/transcript version linkage; simulated unreviewed transcript; Coach correction; Cancel; review; stale-result rejection.
- Verification rerun: `node scripts/verify-coach-audio-capture-local.mjs` PASS. The source receipt also records zero provider dispatch during its gated walkthrough.
- Boundary: the manifest contains a live Deepgram candidate, but this integration explicitly excludes live transcription and provider calls. Only the local capture and deterministic fixture behavior is a proposed source. Physical microphone review remains pending.

### Reporting Stage A

- Source worktree: the Coach audio worktree above.
- Exact five-file checkpoint: `ad74008593b5bf4df6a29b37eecc9f3f80c512b094a36597a64a279d9991ee87`.
- Files: `scripts/family-report-stage-a/recorded-note-continuity.mjs`, `source-linked-draft.mjs`, `simulated-policy.mjs`, `exact-version-approval.mjs`, and `scripts/verify-monthly-family-report-stage-a.mjs`.
- Supported behavior: source eligibility and exact source/version/fact trace; unsupported claim rejection; Coach then Center exact-version approvals; source, attribution, permission, draft, policy, and manifest invalidation; preserved predecessor history; routine eligibility; late/reopen manual-review routing; append-only amendment successor.
- Verification rerun: `node scripts/verify-monthly-family-report-stage-a.mjs` PASS and deterministic fail-closed cases passed.
- Boundary: synthetic local qualification only. `publicationEligible` and `deliveryEligible` remain false; human usefulness and acceptance remain pending.

## Product Platform discovery receipts

Discovery used clean, qualified registry candidate commit `46a833ebb61ca28251963a27722363ae19ba74e9` (version `0.7.1`). That commit is four local commits ahead of canonical remote `origin/main` `5bf0f533109a7e2f1c7a5d345e7ef83197aa12a0`; it contains the existing Stage A, live prerecorded transcription, and Japanese candidate records. It is not a new remote promotion and no registry mutation occurred.

1. Exact connected class/month request: `RESPONSIBILITY_UNRESOLVED`, `may_proceed: false`. Discovery found an unresolved tie among Learning Operations Continuity, Curriculum Progression, Source-Linked Learning Report Drafting, Live Prerecorded Transcription, Learning Record Revision Continuity, Report Policy Evaluation and Exception Routing, and Multi-Evidence Capture. It explicitly prohibits implementation while authority is unresolved.
2. Exact seven-route `ja-JP` plus `hi-IN` request: `PRODUCT_LOCAL_AUTHORIZATION_REQUIRED`, `may_proceed: false`. Existing Cognit English/Spanish and four-route Japanese records do not match the requested revision, locales, seven routes, actions, and connected-state boundary.

These outcomes stop dependent runtime implementation under the repository instruction. Registry admission in the local candidate branch would still need a reviewed canonical fast-forward before a fresh discovery receipt could permit implementation.

## Smallest exact amendment packet

Prepare one focused registry packet, without shared extraction or a broad responsibility redesign, that:

1. Resolves the exact Cognit-local synthetic composition against the existing responsibilities for device-local evidence capture, Source-Linked Learning Report Drafting, Report Policy Evaluation and Exception Routing, and exact-version approval/revision continuity. The packet must permit only the local Cognit adapter/presentation behavior, not reuse of CODEWIZ implementation bytes or live transcription authority.
2. Adds an exact Cognit product-local Localized Experience Delivery authorization for `ja-JP` and `hi-IN` on these seven in-place routes only:
   - `/learninghub/demo/center/courses/creative-app-lab`
   - `/learninghub/demo/center/context/northfield/reports/eli`
   - `/learninghub/demo/coach/capture`
   - `/learninghub/demo/coach/after-class`
   - `/learninghub/demo/student/lesson`
   - `/learninghub/demo/family/journey/eli`
   - `/learninghub/demo/family/messages`
3. Binds the packet to runtime source `a614ffb245d01b416e5ae69ae056441563468f53` / tree `6940ea412654c859d39e159df3e0e9cc805e6739`, Japanese source `098cae2d00778c90717330bfb8d27ecb9191393c`, Hindi manifest `0adc2ec5e2a141f18aa777bf47aeac45cf1bd10de761e425c37807deaaf8adda`, audio manifest `68a796ec12b1f0a1a49e1f9c7d1cf3c1019f80e59b983cea251e7e84390fa0ce`, and Stage A checkpoint `ad74008593b5bf4df6a29b37eecc9f3f80c512b094a36597a64a279d9991ee87`.
4. Permits local Cognit implementation, focused verification, local screenshots, documentation, and local checkpoint commits only. Continue to hold push, PR, Preview, deployment, publication, Production, provider calls, database/shared storage, dependencies, extraction, reuse, Demo2, marketing localization, and route expansion.
5. Requires accurate Japanese/Hindi pending-review labels, original authorship, entered work, role/child/learner isolation, Center saved/effective fallback, read-only progression, exact accepted-version Family visibility, and no raw audio or pending-draft Family exposure.

The amendment depends on recovery of the exact two missing Hindi source files before Hindi behavior can be ported. The registry branch must also be reconciled to the unchanged remote baseline with no overlapping mutation before any canonical promotion.

## Independent work completed and held work

- Reconciled all four source leads and reran their focused automated checks.
- Verified current Preview and Production identities read-only through the existing authenticated Vercel CLI.
- Selected an exact seven-route connected matrix and recorded the source/action boundary.
- Did not modify Demo runtime, CODEWIZ, Japanese, Hindi, Product Platform registry, Vercel configuration, or the Learning site.
- Learning-site updates remain correctly held because the Demo integration has not passed its Product Platform gate or verification. No visitor-facing link is ready.

Next action: recover the exact two Hindi `0adc2ec…` files and canonically admit the focused amendment above; then rerun both exact discoveries. Only `may_proceed: true` receipts authorize the local runtime integration.
