# Full-Demo multilingual Authorization 06 preview readiness

## Human QA acceptance

Jorge Obando reports human QA `PASS` for the full-Demo English/Spanish candidate at exactly:

- commit: `13b52706d39b7877b185b060013b55ff60cc162d`
- tree: `acc4e469ddf13c09983c1eb3816d218b72edea1a`
- branch: `feat/demo-structured-curriculum-multilingual-01`
- repository: `O2Mdesign-Obando/cognit`
- executable route manifest: 385 concrete routes
- manifest fingerprint: `818ee5dd04351d544b4b73f214edc8fcfb8fccdcb3ebfdb36f3030b2a43533e4`

Acceptance covers the reviewed full-Demo candidate inside that exact manifest. It does not establish Production acceptance, exhaustive review of every possible interaction, authority for a changed runtime, or acceptance of any future copy or behavior.

The accepted behavior includes same-route `en-US`/`es-US` switching, preservation of original authored and user-entered content, entered-work and activity-position preservation, isolated preferences, Center enablement and explicit fallback behavior, existing audience and role boundaries, and read-only curriculum progression. Spanish is human accepted only as part of Jorge's bounded candidate review; this record does not broaden the accepted manifest or release boundary.

## Explicit billing and scheduling console capture

Captured locally on October 27, 2026 against the accepted runtime served from `127.0.0.1:4322`:

- exact Center billing routes: 12 relative routes across unscoped, Northfield, and Harbor contexts = 36 concrete routes;
- exact Center scheduling routes: 16 relative routes across unscoped, Northfield, and Harbor contexts = 48 concrete routes;
- English pass: 84 route loads, zero browser console warnings or errors;
- Spanish pass: 84 route loads, zero browser console warnings or errors, with `html[lang]` observed as `es-US`;
- total explicit capture: 168 route loads.

No runtime correction was required. This documentation record changes no bytes in the accepted runtime commit and must not be included in the exact accepted-commit push.

## Release boundary

The previously authorized four-route push and Preview allowance is consumed and remains historical evidence only. Authorization 06, if canonically admitted, is limited to one normal non-force update of the named feature branch to the exact accepted commit, one resulting Git-connected non-Production Preview, and hosted verification of that deployment. It does not authorize a PR, merge, manual deployment, hosted configuration or database change, Production action, dependency change, scope expansion, or a second push or Preview.
