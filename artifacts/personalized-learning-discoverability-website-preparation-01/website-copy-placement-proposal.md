# Cognit Learning website capability copy and placement proposal

Status: proposal only. Publication follows capability verification and release. No website source was changed.

## Repository and release boundary

- Demo evidence source: `O2Mdesign-Obando/cognit`, canonical Astro Learning Hub Demo under `/learninghub/demo`.
- Public website source: `O2Mdesign-Obando/cognit-learning-site`, locally checked out at `/Users/jorgeobando/Desktop/Projects/Cognit Learning Hub/website` and linked to the Vercel project `cognit-learning-site`.
- The repositories and release paths are separate. A local Cognit Demo checkpoint is not a public website release.

## Capability-to-evidence table

| Capability | Classification | Verified evidence | Claim boundary |
|---|---|---|---|
| English and Spanish Demo experience with a saved language preference | Working product capability in the canonical Demo | Existing localization runtime, English/Spanish dictionaries, route manifest, and language persistence checks | Say “English and Spanish in the Demo.” Do not imply every future language or every authored observation is automatically translated. |
| Japanese and Hindi on seven bounded routes | Planned/held local candidate | Existing candidate copy and verification explicitly say qualified linguistic and browser review remain pending | Do not present as whole-product support. |
| Coach typed observations | Working browser-local demonstration | Coach capture/reporting views save attributed notes and preserve review state locally | Demo data only; no external delivery claim. |
| Coach device-local audio recording | Working browser-local demonstration where the browser grants microphone access | `MediaRecorder`, local blob persistence, validation, replay, and version linkage in the connected-class Demo | Audio remains on the device. Browser permission and codec support apply. No shared audio storage. |
| Photo/video evidence controls and prepared examples | Working presentation with prepared synthetic evidence; live capture not verified for this proposal | Coach capture UI and seeded evidence cards | Do not claim verified live camera/video recording or upload from this evidence alone. |
| Audio transcription | Simulated behavior | Explicit simulated-pending and simulated-unreviewed transcript states followed by Coach correction/confirmation | No live speech recognition or transcription provider. |
| Family report drafting from Center rules | Working browser-local demonstration with simulated draft generation | Source IDs, rule selection, Coach review, Center exact-version acceptance, stale-version protection, and Family visibility rules | Draft generation is simulated. Human review and exact-version acceptance are real Demo interactions. |
| Report delivery | Simulated behavior | Browser-local “share” state and Family projection | No operational publication, notification, email, or real Family delivery. |
| Assessment-informed personalized learning | Working browser-local demonstration with prepared fictional evidence | Robert’s assessment, rationale, Coach decision, lesson, attempts, support record, monthly review, approval invalidation, and Family comment continuity | Assessment and recommendations are fictional prepared context; no live AI inference or learner profiling. |

## Recommended placement and proposed copy

### Homepage — prominent section after the primary product overview

Eyebrow: **Personalized learning, connected to the people who support it**

Heading: **One curriculum can meet a student in more than one way.**

Body:

> Cognit connects what a Center and Coach know about a student with the teaching approach they choose, the work the student actually demonstrates, and the progress a family can understand. Preferences remain changeable, support stays visible, and people—not an automated label—retain the decisions.

Supporting line:

> Families can see specific progress in their preferred language.

Required qualifier immediately below:

> The current Learning Hub Demo supports English and Spanish. Additional language candidates remain bounded and under review.

Primary link: **See personalized learning in action** → `/learninghub/demo/personalized-learning`

Secondary links: **Explore the Center assessment**, **Review the Coach decision**, **Try the Student activity**, **View the Family progress report**.

### Product page — add a focused capability block after “The Lifecycle of a Single Lesson”

Heading: **Assessment informs the approach. Evidence informs what happens next.**

Body:

> A prepared assessment can bring together current knowledge, skills, interests, presentation preferences, support needs, and prior learning evidence. A Coach reviews the recommendation and rationale, chooses or adjusts the approach, and keeps supported practice distinct from independent achievement. Monthly review connects those decisions to demonstrated progress and remaining uncertainty.

Boundary note:

> The interactive example uses fictional students and browser-local state. It does not perform live AI assessment or create an operational learner profile.

Link: **Follow Robert’s connected learning story** → `/learninghub/demo/personalized-learning?moment=2&from=center&entry=prepared`

### How it works — refine Capture, Review, and Publish; add personalized-learning bridge

Capture:

> Coaches can write observations and work with prepared photo or video evidence. The local Demo also supports optional device-local audio recording when the browser grants permission. Audio remains on that device.

Review:

> A clearly labeled simulated transcript or report draft can organize source-linked evidence for review. The Coach corrects and confirms the record; the Center’s rules guide the workflow without replacing explicit human acceptance.

Publish:

> Only the exact Center-approved Demo version becomes visible in the Family perspective. Pending drafts, stale approvals, raw audio, and transcripts remain outside the Family report. Sharing is simulated in the browser and does not deliver a real message.

Personalized-learning bridge:

> The same loop can begin with assessment: understand the student, choose support, teach, review what was demonstrated, and carry a human-approved next step forward.

Link: **Open the six-moment personalized-learning Demo** → `/learninghub/demo/personalized-learning`

### For Centers — place beside existing assessment/reporting content

Heading: **Understand the student before choosing support.**

Body:

> Cognit can keep current knowledge, skills, interests, preferences, support history, and prior evidence in view together. New-student questions establish a starting point; existing evidence adds context without becoming a permanent label. The Center can then see how the Coach’s decision connects to reviewed monthly progress.

Link: **Explore Robert’s assessment** → `/learninghub/demo/personalized-learning?moment=2&from=center&entry=prepared`

### For Coaches — place after “Capture what happened”

Heading: **Choose the approach, then keep the evidence honest.**

Body:

> Review the assessment, recommendation, supporting observations, and rationale together. Accept, adjust, or dismiss the approach; then keep incorrect responses, supported practice, and independent achievement distinct. Typed observations work in the Demo. Device-local audio is optional, while transcription remains explicitly simulated until reviewed by the Coach.

Link: **Review Robert’s learning plan** → `/learninghub/demo/personalized-learning?moment=3&from=coach&entry=prepared`

### For Students — place near lesson resources and help

Heading: **An explanation that fits the moment—not a fixed label.**

Body:

> A student can see the chosen explanation, try one meaningful task, request a useful hint, revise a response, and use an alternative illustrated or written explanation. The record distinguishes help from independent evidence so completion is not mistaken for understanding.

Link: **Try your learning activity** → `/learninghub/demo/personalized-learning?moment=4&from=student&entry=prepared`

### For Families — place near the existing learning-journey report section

Heading: **Specific progress, reviewed by people who know the learning.**

Body:

> Families can see specific progress in their preferred language. A reviewed report connects curriculum objectives, demonstrated achievements, support used, remaining uncertainty, and the next teaching step. In the Demo, a fictional Family comment stays in the browser and becomes visible to the Coach.

Required qualifier:

> English and Spanish are supported in the current Demo. Report sharing and Family comments are browser-local simulations; no message is sent.

Link: **View Robert’s progress** → `/learninghub/demo/personalized-learning?moment=6&from=family&entry=prepared`

## Claims held for later verification

- Whole-product Japanese or Hindi support.
- Live photo/video capture, upload, storage, or delivery.
- Live speech recognition or automated transcription.
- Live AI assessment, recommendation, or report generation.
- Automatic Family publication, notification, email, or messaging.
- Production persistence or customer-data operation for the personalized-learning flow.

No new public page is recommended. The homepage, product, how-it-works, and existing audience pages can explain the capability with direct links into the canonical Demo.
