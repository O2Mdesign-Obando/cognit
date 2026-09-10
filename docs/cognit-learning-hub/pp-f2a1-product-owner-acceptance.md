# PP-F2A1 — Cognit Learning Product-Owner Acceptance and Exact Evidence Preservation 01

**Decision date:** September 10, 2026

**Decision authority:** Cognit product owner and Control Tower

**Status:** ACCEPTED

## Accepted responsibility

> **Cognit accepts `Learning Operations Continuity` as an owned product responsibility.**

Disposition: `ACCEPT_PRODUCT_RESPONSIBILITY`

This acceptance is limited to the bounded Cognit Learning Hub Demo expression evidenced below:

- learning context;
- courses and sessions;
- curriculum and progression;
- observation and evidence metadata;
- review and publication state;
- Student learning continuity;
- Family visibility following publication;
- Center, Coach, Student, and Family projections.

The responsibility is not expanded beyond the inspected evidence.

## Accepted source identity

| Field | Accepted value |
| --- | --- |
| Repository | `/Users/jorgeobando/Desktop/Projects/Cognit` |
| Remote | `https://github.com/O2Mdesign-Obando/cognit.git` |
| Branch | `main` |
| Accepted evidence commit | `292bee7fe7d28fcfdd3673a5ebe8ab377a33eee2` |
| Accepted evidence tree | `495642a666dae081c2b59b01d1cd9d4ae5c534ea` |
| Ordered source-manifest SHA-256 | `e16811c1ce4d9f49f2ec90543ccf44faa0cef3a67d772778047419ac2b73c184` |

> **The exact six-path bundle is accepted as bounded Cognit-local Demo evidence.**

## Exact accepted evidence

| Relative path | Git blob | SHA-256 | Exact bytes |
| --- | --- | --- | ---: |
| `docs/cognit-learning-hub/09-demo2-demo1-presentation-reconciliation.md` | `d83f34932a30b6a0122a1130dbcf44a5a8c4a2be` | `f78e74bda029770a1a7823f6c9669293c8ab0e39c30e02ff45ed04a2f663be03` | 30,021 |
| `docs/extraction-boundary.md` | `6fa97008d1be0aa957d191e552c051a9a3876543` | `369d463d580b92c3b80515b2b06eb029613f71fe1c02d8a2d8a71410ad78dd7e` | 1,416 |
| `src/components/demo/CognitStudentJourneyView.astro` | `696dc64469040b8e6ee754c793c064870bb7a6b5` | `6438f27a0202e63e0fcd954cbdc91ec00a94b9318c8696acf2ab47d884251eea` | 35,456 |
| `src/demo/cognit-demo-data.js` | `5969da277f1ee8602cffeece43c10ad73a677942` | `edb4c910552820d728bb2aabd4ed8394691fc7c99e462c09892c235d4983f20e` | 55,026 |
| `src/demo/cognit-demo-model.js` | `ab4a82bc2143dea21090020b82e8f0f972fea3f5` | `d6b085b17d549430c2c2cd1bfa6c7663bd7f00ed14c3f17f1a919944de8de600` | 5,735 |
| `src/demo/cognit-publication-sync.js` | `8019fcebbba748c2d4b559d869a4e3399e4004e5` | `ae57ebf17aaf9a0fab8c13f5c85b7b9555d18cb6d4632ac81159070ad6509653` | 1,090 |

Each value was calculated from the Git object at the accepted evidence commit, not from an assumed worktree equivalent.

### Ordered manifest method

1. Read each exact blob from commit `292bee7fe7d28fcfdd3673a5ebe8ab377a33eee2`.
2. Calculate SHA-256 over the exact blob bytes.
3. Sort relative paths in bytewise ascending order with `LC_ALL=C`.
4. Serialize each entry as:

   ```text
   relative/path<TAB>individual-sha256<LF>
   ```

5. Calculate SHA-256 over the complete serialization.

The reproduced ordered source-manifest SHA-256 is:

`e16811c1ce4d9f49f2ec90543ccf44faa0cef3a67d772778047419ac2b73c184`

## Normalized dispositions

| Subject | Disposition |
| --- | --- |
| Cognit ownership of `Learning Operations Continuity` | `ACCEPT_PRODUCT_RESPONSIBILITY` |
| Behavior implemented within the exact Cognit-local evidence boundary | `ACCEPT_PRODUCT_LOCAL_IMPLEMENTATION` |
| Runtime behavior authoritative only within the Demo | `ACCEPT_DEMO_ONLY_IMPLEMENTATION` |
| Fictional data, modeled records, and browser-local demonstration behavior | `ACCEPT_SYNTHETIC_ONLY_EVIDENCE` |
| Reusable, shared, Core, extracted, Production, or University implementation claims | `NO_QUALIFIED_IMPLEMENTATION` |
| Capabilities outside this gate's authority | `HELD_DO_NOT_IMPLEMENT` |
| Responsibilities or behavior absent from the accepted bundle | `NOT_SUPPORTED_BY_INSPECTED_EVIDENCE` |
| Later responsibility-equivalence, evidence-admission, or qualification decisions | `UNRESOLVED` |

## Accepted authority boundary

| Authority question | Preserved decision |
| --- | --- |
| Product responsibility | Accepted — `ACCEPT_PRODUCT_RESPONSIBILITY` |
| Exact Cognit-local evidence | Accepted — `ACCEPT_PRODUCT_LOCAL_IMPLEMENTATION` |
| Demo-only authority | Accepted — `ACCEPT_DEMO_ONLY_IMPLEMENTATION` |
| Synthetic and fictional operating records | Demonstration evidence only — `ACCEPT_SYNTHETIC_ONLY_EVIDENCE` |
| Browser-local state | Demo interaction evidence only — `ACCEPT_SYNTHETIC_ONLY_EVIDENCE` |
| Product-local implementation | Accepted only within the exact documented boundary — `ACCEPT_PRODUCT_LOCAL_IMPLEMENTATION` |
| Production operating truth | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Reusable implementation | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Responsibility equivalence with another product | Not accepted; later decision remains `UNRESOLVED` |
| Learning Hub Core designation | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Extraction authority | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Shared-package authority | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Flavor-runtime authority | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| Cognit University composition authority | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |
| KORA integration authority | Not accepted — `NO_QUALIFIED_IMPLEMENTATION` |

> **Product responsibility — accepted**
>
> **Exact local evidence — accepted**
>
> **Reusable implementation — not accepted**

## Evidence limitations

The accepted evidence is `NOT_SUPPORTED_BY_INSPECTED_EVIDENCE` for claims of:

- complete interaction implementation for every role;
- Production authentication or authorization;
- tenancy enforcement;
- durable persistence;
- Production audit or provenance controls;
- real evidence capture or uploads;
- real messaging or notification delivery;
- real support operation;
- real payment processing;
- operational integrations;
- reusable runtime compatibility;
- implementation equivalence across products.

Those capabilities remain `HELD_DO_NOT_IMPLEMENT` under this gate.

The exact publication mechanism uses browser-local state. It demonstrates visibility synchronization inside the Demo; it does not establish secure Production publication, authorization, persistence, or delivery.

## Narrower candidate boundaries

The following four-file Learning Story Spine may be reviewed later without promotion here:

1. `src/demo/cognit-demo-data.js`
2. `src/demo/cognit-demo-model.js`
3. `src/demo/cognit-publication-sync.js`
4. `src/components/demo/CognitStudentJourneyView.astro`

The following narrower data/model/publication seam may also be reviewed later:

1. `src/demo/cognit-demo-data.js`
2. `src/demo/cognit-demo-model.js`
3. `src/demo/cognit-publication-sync.js`

Both candidates remain Cognit-local, Demo-bound, non-canonical outside Cognit, non-extractable, and `UNRESOLVED` for responsibility equivalence. Neither has reusable-source authority: `NO_QUALIFIED_IMPLEMENTATION`.

## Later Product Platform boundary

A separately authorized Product Platform gate may later evaluate:

- evidence admission;
- responsibility equivalence;
- candidate implementation qualification;
- reusable-source authority;
- configuration boundaries;
- possible composition value.

All such decisions remain `UNRESOLVED`. This receipt does not update Product Platform authority and does not authorize implementation, extraction, packaging, or composition.

## Unrelated Guided Setup dependency

This receipt does not satisfy or replace `PP-GS01 — Guided Setup Responsibility Registration`. Guided Setup status and evidence are unchanged. Any related implementation remains `HELD_DO_NOT_IMPLEMENT` unless separately authorized.

## Preservation statement

This receipt accepts Cognit's bounded responsibility and the exact evidence identified above. It preserves with equal force every denial, exclusion, Demo boundary, synthetic-data boundary, browser-local boundary, product-local boundary, and future-review requirement recorded here.
