# Structured Curriculum and Multilingual Experience 01 — acceptance and Preview readiness

Date: October 22, 2026

Product Owner: Jorge Obando

Local branch: `feat/demo-structured-curriculum-multilingual-01`

## Recorded human acceptance

Jorge Obando reported local human QA `PASS` in English and Spanish for the four authorized routes at exactly:

- Commit: `021b6a5fa176836931ba455561203fa52e869853`
- Tree: `5a536adeff890344e8461ae6672883cbd8562049`

This records acceptance of that exact product-local candidate only. It covers the four-route localization scope and read-only progression behavior. It does not accept the whole Demo, any route outside the four listed below, a hosted Preview, Production, publication, deployment, shared qualification, reuse, extraction, or promotion.

The report that some content remained in English did not approve unidentified translation defects inside the authorized scope.

Authorized routes:

- `/learninghub/demo/center/courses/creative-app-lab`
- `/learninghub/demo/coach/learners/eli`
- `/learninghub/demo/student/lesson`
- `/learninghub/demo/family/courses`

## Translation-boundary reconciliation

The route and interactive-state audit classified remaining English as follows.

| Classification | Finding |
|---|---|
| Destination outside authorized scope | Links from an authorized route to any other Demo route remain navigation to an out-of-scope destination. No destination route was translated. Source-route navigation labels are localized. |
| Original authored content intentionally preserved | The Coach-authored observation and named artifacts/courses remain in their original authored form. Product and organization names are preserved. |
| Explicitly labeled translation fallback | The controlled fallback exists only as a verification fixture. No fallback was visible in the normal four-route audit, and browser verification found zero elements labeled as English fallback. |
| Missing translation within authorized scope | Found in shared route chrome, Student lesson context/resources, Coach learner workspace/submission states, Family course filters/cards/inquiry dialog, and Center course operations/local-action feedback. These were defects, not accepted English content. |

The authorized Center route also rendered an empty legacy delivery-progression/module-sequence block because its canonical module payload is intentionally withheld. That duplicate presentation is now hidden on this exact route; the read-only curriculum projection remains the progression display.

## Correction checkpoint and required targeted re-review

The in-scope defects were corrected in the local checkpoint:

- Commit: `3f99f86967123ed89e59a17e3f615656f9c33d9b`
- Tree: `c26d099c862eae10d83bbb4cfa20aea8e232e1ae`

The earlier acceptance does not transfer to this changed checkpoint. Targeted human re-review is required for:

1. English → Spanish → English switching on all four exact routes, including shared header/footer and “All perspectives.”
2. Student lesson context, resource cards, and each resource dialog.
3. Coach learner summary plus the Center-submission dialog and submitted-state copy. The authored Coach observation must remain English.
4. Family course filters/cards and the course-inquiry dialog.
5. Center course header/summary/provenance/roster/local-delivery form, copy-preparation feedback, delivery-save feedback, and absence of the empty legacy progression/sequence panels.

Focused verification passed after the correction:

- `npm run build`
- `node scripts/verify-cognit-curriculum-presentation.mjs`
- `npm run validate:routes`
- `npm run validate:demo2`
- `git diff --check`
- Browser interaction checks for the Family inquiry dialog, Coach submission dialog, Center copy-preparation feedback, Center delivery-save feedback, reversible locale switching, and zero visible fallback labels.

## Git and Vercel Preview readiness

Read-only repository facts:

- Remote: `origin` → `https://github.com/O2Mdesign-Obando/cognit.git`
- GitHub default branch: `main`
- Current feature branch is local only; it has no upstream and no remote branch.
- The feature branch is stacked directly on `d0320f988a1fa6b33b4c3d302c55957c922c268b`, the head of `feat/demo-scenario-context-coherence-01`.
- Open draft PR #2, `Demo: align scenario date and Morgan Family context`, has head `feat/demo-scenario-context-coherence-01` and base `main`: `https://github.com/O2Mdesign-Obando/cognit/pull/2`.
- Vercel local link: project `cognit`, project ID `prj_AT3X9ZShjfCuZy7mQzWTm3UgDChy`, team ID `team_743yTzHuhccXpBtcT5qedSlh`, root directory unset.

The single current Vercel access check returned `403` for scope `o2mdesign-obandos-projects`. Therefore the Vercel Production branch, active Git integration, automatic Preview-only behavior, and deployment commit metadata could not be confirmed. GitHub `main` must not be treated as proof of the Vercel Production branch.

Smallest access correction: authorize the existing Vercel connection for team `team_743yTzHuhccXpBtcT5qedSlh` (or complete that team’s SSO authorization if required), then retry the same read-only project/deployment inspection. Do not reconnect, relink, switch accounts, or change project/deployment settings.

After targeted re-review and separate authorization, the exact proposed remote action is:

```sh
git push -u origin feat/demo-structured-curriculum-multilingual-01
```

Expected direct Git effect: create/update only that remote feature branch and set its upstream; it does not merge either branch or create a PR. If and only if the currently unconfirmed Vercel Git integration is active and this branch is not the configured Production branch, Vercel should automatically create a Preview deployment for the pushed commit. No `vercel --prod`, promotion, Production alias assignment, or merge is part of the action.

After the push, inspect the resulting deployment and require its source commit to equal the exact reviewed correction checkpoint before sharing its URL. If a PR is later authorized before PR #2 merges, base it on `feat/demo-scenario-context-coherence-01` so the proposed diff contains only this feature and does not duplicate the scenario-coherence changes. If PR #2 merges first, rebase/reconcile separately and obtain review for the resulting commit; do not silently transfer acceptance.

## Product Platform gate for hosted Preview

Fresh memory-only discovery used canonical registry version `0.7.1`, commit `c176b49021c4c214ec4df5073c01686e30e30291`, tree `13c00727fcaf19cd58ddb9e16b68cb0ce45ce7e6`, canonical remote `O2Mdesign-Obando/loke-product-platform-registry`, clean state, qualification `PASS`.

Outcome: `PRODUCT_LOCAL_AUTHORIZATION_REQUIRED`; `may_proceed: false`.

Boundary mismatches were:

- hosted Preview is not authorized;
- remote feature-branch push is not authorized;
- source revision `021b6a5fa176836931ba455561203fa52e869853` was outside the registered baseline boundary (and the correction checkpoint is necessarily newer still).

No registry record was changed.

Exact bounded authorization request:

> Product Owner authorization is requested for product `Cognit`, repository `O2Mdesign-Obando/cognit`, source commit `3f99f86967123ed89e59a17e3f615656f9c33d9b`, branch `feat/demo-structured-curriculum-multilingual-01`, locales `en-US` and `es-US`, and only the four listed routes. Permit exactly one remote push of that branch and one non-Production Vercel hosted Preview attributable to that exact commit for targeted human review. Preserve product-local candidate status and read-only progression. Exclude additional routes, whole-Demo translation, PR creation, merge, publication, Production deployment/promotion, shared qualification, reuse, extraction, and registry mutation.

## Remaining blockers and smallest next action

Blockers:

1. Targeted human re-review has not yet accepted correction commit `3f99f86967123ed89e59a17e3f615656f9c33d9b`.
2. Product Platform/Product Owner authority does not yet permit the remote push or hosted Preview.
3. Vercel team access is still `403`, so Preview-only behavior and exact deployment attribution cannot yet be verified.

Smallest next action: complete the targeted local re-review of the correction checkpoint and issue the exact bounded authorization above. Then authorize the existing Vercel connection for the linked team and repeat the read-only inspection before any push.
