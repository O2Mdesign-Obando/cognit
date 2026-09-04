// Fictional, local-only Cognit demonstration data.
// This module is never an operational seed, tenant loader, or authentication source.
export const SYNTHETIC_COGNIT_DEMO = Object.freeze({
  id: "demo-org-northfield-learning-collective",
  name: "Northfield Learning Collective",
  synthetic: true,
  contexts: [
    {
      id: "demo-context-northfield-studio",
      name: "Northfield Studio",
      displayName: "Northfield Studio",
      type: "learning_center",
      status: "active",
      operationalEmail: "hello@northfield.example",
      operationalPhone: "(555) 014-2000",
      address: "125 Learning Way, Princeton, NJ 08540",
      primaryContact: "Maya Chen",
      timezone: "America/New_York",
      localMark: "Cognit + Northfield Studio",
      purpose: "Primary center for direct-enrollment, after-school, weekend, and Family learning."
    },
    {
      id: "demo-context-harbor-academy",
      name: "Harbor Academy Program",
      displayName: "Harbor Academy Program",
      type: "school_program",
      status: "active",
      operationalEmail: "program@harbor.example",
      operationalPhone: "(555) 014-2400",
      address: "40 Harbor Avenue, Princeton, NJ 08540",
      primaryContact: "Maya Chen",
      timezone: "America/New_York",
      localMark: "Cognit at Harbor Academy",
      purpose: "School-based partner program with its own enrollment and teaching context."
    },
    {
      id: "demo-context-community-discovery",
      name: "Community Discovery Program",
      type: "partner_program",
      status: "historical",
      purpose: "Historical partner-program participation retained when a learner transitions."
    }
  ],
  people: {
    centerDirector: {
      id: "demo-director-maya-chen",
      name: "Maya Chen",
      contextIds: ["demo-context-northfield-studio"]
    },
    coaches: [
      {
        id: "demo-coach-jordan-ellis",
        name: "Jordan Ellis",
        focus: "Creative technology and app development",
        role: "Lead Coach",
        status: "active",
        workEmail: "jordan.ellis@northfield.example",
        workPhone: "(555) 014-2011",
        availability: "Monday–Thursday · 2:30–7:30 PM",
        expertise: ["App design", "Creative coding", "Interaction design"],
        assignmentHistory: "3 active classes · 4 completed course deliveries",
        centerNote: "Strong fit for multi-course learners and prototype critique. Available for Saturday coverage with advance confirmation.",
        contextIds: ["demo-context-northfield-studio", "demo-context-harbor-academy"]
      },
      {
        id: "demo-coach-priya-nair",
        name: "Priya Nair",
        focus: "Robotics and physical computing",
        role: "Coach",
        status: "active",
        workEmail: "priya.nair@northfield.example",
        workPhone: "(555) 014-2024",
        availability: "Tuesday–Friday · 4:00–8:00 PM",
        expertise: ["Robotics", "Physical computing", "Sensor systems"],
        assignmentHistory: "1 active class · 3 completed course deliveries",
        centerNote: "Primary robotics Coach. Protect setup time before sessions that require arena or sensor calibration.",
        contextIds: ["demo-context-northfield-studio"]
      },
      {
        id: "demo-coach-avery-cole",
        name: "Avery Cole",
        focus: "Digital storytelling and creative media",
        role: "Coach",
        status: "on_leave",
        workEmail: "avery.cole@northfield.example",
        workPhone: "(555) 014-2038",
        availability: "On leave through September 8",
        expertise: ["Digital storytelling", "Creative media", "Narrative design"],
        assignmentHistory: "0 active classes · 2 completed course deliveries",
        centerNote: "Keep inactive for new assignments until the recorded return date is confirmed.",
        contextIds: ["demo-context-northfield-studio"]
      }
    ],
    students: [
      { id: "demo-student-eli-morgan", name: "Eli Morgan", operatingStatus: "active", centerNote: "Keep the Morgan Family included when schedule changes affect Creative App Lab." },
      { id: "demo-student-sofia-reyes", name: "Sofia Reyes", operatingStatus: "active", centerNote: "One open report clarification; normal participation continues." },
      { id: "demo-student-noah-bennett", name: "Noah Bennett", operatingStatus: "active", centerNote: "Harbor Academy relationship only; do not expose Northfield records." },
      { id: "demo-student-mina-park", name: "Mina Park", operatingStatus: "active", centerNote: "Historical Community Discovery participation is preserved separately." },
      { id: "demo-student-lena-grant", name: "Lena Grant", operatingStatus: "active", centerNote: "Two active course relationships require course-scoped progress." },
      { id: "demo-student-ava-thompson", name: "Ava Thompson", operatingStatus: "waitlist", centerNote: "Waitlist state applies to the next course request; current Storytelling enrollment remains active." }
    ],
    families: [
      {
        id: "demo-family-morgan",
        name: "Morgan Family",
        guardian: { id: "demo-guardian-rachel-morgan", name: "Rachel Morgan" },
        primaryContact: { name: "Rachel Morgan", relationship: "Parent", email: "rachel.morgan@family.example", phone: "(555) 013-1101" },
        secondaryContact: { name: "Sam Morgan", relationship: "Parent", email: "sam.morgan@family.example", phone: "(555) 013-1102" },
        preferredEmail: "rachel.morgan@family.example",
        preferredPhone: "(555) 013-1101",
        communicationPreference: "Email first · text for same-day changes",
        billingResponsibleContact: "Rachel Morgan",
        accountStatus: "active",
        studentIds: ["demo-student-eli-morgan"]
      },
      {
        id: "demo-family-reyes",
        name: "Reyes Family",
        guardian: { id: "demo-guardian-daniel-reyes", name: "Daniel Reyes" },
        primaryContact: { name: "Daniel Reyes", relationship: "Parent", email: "daniel.reyes@family.example", phone: "(555) 013-1201" },
        secondaryContact: null,
        preferredEmail: "daniel.reyes@family.example",
        preferredPhone: "(555) 013-1201",
        communicationPreference: "Email",
        billingResponsibleContact: "Daniel Reyes",
        accountStatus: "active",
        studentIds: ["demo-student-sofia-reyes"]
      },
      {
        id: "demo-family-park",
        name: "Park Family",
        guardian: { id: "demo-guardian-jin-park", name: "Jin Park" },
        primaryContact: { name: "Jin Park", relationship: "Parent", email: "jin.park@family.example", phone: "(555) 013-1301" },
        secondaryContact: { name: "Alex Park", relationship: "Authorized adult", email: "alex.park@family.example", phone: "(555) 013-1302" },
        preferredEmail: "jin.park@family.example",
        preferredPhone: "(555) 013-1301",
        communicationPreference: "Phone for schedule changes · email otherwise",
        billingResponsibleContact: "Jin Park",
        accountStatus: "review_needed",
        studentIds: ["demo-student-mina-park"]
      }
    ]
  },
  courses: [
    {
      id: "demo-course-creative-app-lab",
      name: "Creative App Lab",
      code: "CAL-201",
      focus: "App design, interaction logic, and iterative building.",
      description: "Learners turn a personally meaningful idea into a working app prototype, test it with peers, and explain how feedback changed the experience.",
      status: "active",
      duration: "8 weeks · 90-minute sessions",
      capacity: 8,
      coachId: "demo-coach-jordan-ellis",
      curriculum: { source: "hq", owner: "Cognit Curriculum Studio", template: "Creative App Lab", version: "3.2", editableAtCenter: false },
      deliveryByContext: {
        "demo-context-northfield-studio": { pattern: "Monday and Thursday · 4:00–5:30 PM", room: "Studio 2", status: "active" },
        "demo-context-harbor-academy": { pattern: "Wednesday · 3:30–5:00 PM", room: "Media Lab", status: "active" }
      },
      waitlistByContext: { "demo-context-northfield-studio": [] },
      modules: [
        { id: "creative-foundations", sequence: 1, title: "Frame the problem", state: "completed", delivery: "Week 1–2", summary: "Choose a useful habit, map the primary user journey, and define the smallest meaningful prototype.", activities: ["Interview a peer about one recurring habit", "Sketch the primary screen flow"], objectives: ["Translate a learner-selected need into a clear app purpose", "Sequence a usable first interaction"], outcomes: ["A tested problem statement", "A screen-flow map ready to build"], resources: [{ label: "Problem-framing prompts", type: "Facilitation guide" }, { label: "Screen-flow template", type: "Planning canvas" }] },
        { id: "creative-prototype", sequence: 2, title: "Prototype the core flow", state: "current", delivery: "Week 3–5 · current", summary: "Build the primary interaction, test it with a classmate, and revise one confusing step using observed feedback.", activities: ["Build navigation and reusable interface elements", "Run a peer interaction test", "Record one evidence-backed revision"], objectives: ["Create a functional multi-screen interaction", "Use testing evidence to prioritize an improvement"], outcomes: ["A working core flow", "A documented interaction revision"], resources: [{ label: "Interaction test protocol", type: "Coach guide" }, { label: "Prototype review checklist", type: "Learner checklist" }] },
        { id: "creative-share", sequence: 3, title: "Refine and share", state: "upcoming", delivery: "Week 6–8", summary: "Strengthen feedback, accessibility, and explanation before sharing the finished prototype.", activities: ["Add clear system feedback", "Prepare a short design walkthrough"], objectives: ["Refine the experience using evidence", "Explain key design decisions"], outcomes: ["A shareable prototype", "A concise design reflection"], resources: [{ label: "Showcase preparation guide", type: "Learner guide" }] }
      ]
    },
    {
      id: "demo-course-robotics-studio",
      name: "Robotics Studio",
      code: "ROB-220",
      focus: "Robot design, sensors, testing, and iterative engineering.",
      description: "Learners assemble and tune a sensor-guided robot through repeatable arena trials, using recorded evidence to explain each engineering adjustment.",
      status: "active",
      duration: "8 weeks · 90-minute sessions",
      capacity: 6,
      coachId: "demo-coach-priya-nair",
      curriculum: { source: "hq", owner: "Cognit Curriculum Studio", template: "Robotics Studio", version: "2.4", editableAtCenter: false },
      deliveryByContext: { "demo-context-northfield-studio": { pattern: "Tuesday and Friday · 5:45–7:15 PM", room: "Robotics Arena", status: "active" } },
      waitlistByContext: { "demo-context-northfield-studio": [] },
      modules: [
        { id: "robotics-build", sequence: 1, title: "Build a reliable base", state: "completed", delivery: "Week 1–2", summary: "Assemble the drive system and verify repeatable movement.", activities: ["Build and inspect the chassis", "Run baseline movement trials"], objectives: ["Identify essential robot subsystems", "Use a repeatable test setup"], outcomes: ["A stable moving robot", "A baseline trial record"], resources: [{ label: "Arena safety checklist", type: "Safety guide" }] },
        { id: "robotics-sensors", sequence: 2, title: "Calibrate sensor response", state: "current", delivery: "Week 3–5 · current", summary: "Collect sensor readings, adjust thresholds, and compare performance across trials.", activities: ["Capture three distance readings", "Tune the trigger threshold", "Test a complete arena route"], objectives: ["Interpret sensor evidence", "Make and justify a controlled adjustment"], outcomes: ["A calibrated response", "An evidence-backed engineering explanation"], resources: [{ label: "Sensor trial record", type: "Data sheet" }, { label: "Calibration reference", type: "Coach reference" }] },
        { id: "robotics-challenge", sequence: 3, title: "Complete the arena challenge", state: "upcoming", delivery: "Week 6–8", summary: "Integrate sensing and movement into a dependable challenge run.", activities: ["Combine route behaviors", "Complete a final reliability test"], objectives: ["Integrate multiple systems", "Evaluate reliability across repeated trials"], outcomes: ["A complete arena run", "A final engineering reflection"], resources: [{ label: "Challenge criteria", type: "Assessment guide" }] }
      ]
    },
    {
      id: "demo-course-digital-storytelling-lab",
      name: "Digital Storytelling Lab",
      code: "DSL-110",
      focus: "Interactive storytelling, media, and creative computing.",
      description: "Learners author a branching digital story, connect media and interaction feedback, and test whether each choice communicates the intended narrative consequence.",
      status: "active",
      duration: "6 weeks · 90-minute sessions",
      capacity: 7,
      coachId: "demo-coach-jordan-ellis",
      curriculum: { source: "center", owner: "Northfield Studio", template: null, version: "1.1", editableAtCenter: true },
      deliveryByContext: { "demo-context-northfield-studio": { pattern: "Saturday · 10:00–11:30 AM", room: "Media Studio", status: "active" } },
      waitlistByContext: { "demo-context-northfield-studio": ["demo-student-sofia-reyes"] },
      modules: [
        { id: "story-structure", sequence: 1, title: "Map the story branches", state: "completed", delivery: "Week 1–2", summary: "Define the central choice and map how each branch changes the story.", activities: ["Draft a choice map", "Review branch clarity with a peer"], objectives: ["Connect narrative choices to consequences"], outcomes: ["A coherent branching map"], resources: [{ label: "Branch-mapping canvas", type: "Planning template" }] },
        { id: "story-interaction", sequence: 2, title: "Connect media and feedback", state: "current", delivery: "Week 3–4 · current", summary: "Build two connected scenes and use sound and visual feedback to clarify each choice.", activities: ["Connect two scenes", "Add sound feedback", "Test choice clarity"], objectives: ["Use media to support narrative meaning", "Test an interactive story with an audience"], outcomes: ["A working two-branch scene", "One revision based on audience feedback"], resources: [{ label: "Media attribution checklist", type: "Learner checklist" }, { label: "Interaction feedback examples", type: "Reference set" }] },
        { id: "story-share", sequence: 3, title: "Polish and present", state: "upcoming", delivery: "Week 5–6", summary: "Refine pacing, verify media attribution, and prepare a short audience walkthrough.", activities: ["Complete an attribution review", "Practice the story walkthrough"], objectives: ["Prepare an audience-ready interactive story"], outcomes: ["A finished story experience", "A creator reflection"], resources: [{ label: "Presentation prompts", type: "Facilitation guide" }] }
      ]
    }
  ],
  enrollments: [
    { id: "demo-enrollment-eli-creative", studentId: "demo-student-eli-morgan", courseId: "demo-course-creative-app-lab", contextId: "demo-context-northfield-studio", source: "direct", status: "active" },
    { id: "demo-enrollment-sofia-robotics", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", contextId: "demo-context-northfield-studio", source: "direct", status: "active" },
    { id: "demo-enrollment-noah-creative", studentId: "demo-student-noah-bennett", courseId: "demo-course-creative-app-lab", contextId: "demo-context-harbor-academy", source: "school_program", status: "active" },
    { id: "demo-enrollment-mina-community", studentId: "demo-student-mina-park", courseId: "demo-course-digital-storytelling-lab", contextId: "demo-context-community-discovery", source: "partner_program", status: "historical" },
    { id: "demo-enrollment-mina-storytelling", studentId: "demo-student-mina-park", courseId: "demo-course-digital-storytelling-lab", contextId: "demo-context-northfield-studio", source: "direct", status: "active" },
    { id: "demo-enrollment-lena-creative", studentId: "demo-student-lena-grant", courseId: "demo-course-creative-app-lab", contextId: "demo-context-northfield-studio", source: "direct", status: "active" },
    { id: "demo-enrollment-lena-robotics", studentId: "demo-student-lena-grant", courseId: "demo-course-robotics-studio", contextId: "demo-context-northfield-studio", source: "direct", status: "active" },
    { id: "demo-enrollment-ava-storytelling", studentId: "demo-student-ava-thompson", courseId: "demo-course-digital-storytelling-lab", contextId: "demo-context-northfield-studio", source: "direct", status: "active" }
  ],
  sessions: [
    {
      id: "demo-session-creative-today",
      courseId: "demo-course-creative-app-lab",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-jordan-ellis",
      date: "2026-08-31",
      startTime: "16:00",
      endTime: "17:30",
      recurrence: "Monday and Thursday",
      season: "Fall 2026",
      room: "Studio 2",
      capacity: 8,
      moduleId: "creative-prototype",
      status: "in_progress",
      exception: null,
      conflicts: [],
      cancellation: null,
      learningFocus: "Prototype a simple habit-tracking app and improve the interaction flow after testing.",
      studentIds: ["demo-student-eli-morgan", "demo-student-lena-grant"]
    },
    {
      id: "demo-session-robotics-today",
      courseId: "demo-course-robotics-studio",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-priya-nair",
      date: "2026-08-31",
      startTime: "17:45",
      endTime: "19:15",
      recurrence: "Tuesday and Friday",
      season: "Fall 2026",
      room: "Robotics Arena",
      capacity: 6,
      moduleId: "robotics-sensors",
      status: "scheduled",
      exception: "Launch-week Monday session",
      conflicts: [],
      cancellation: null,
      learningFocus: "Test a sensor-guided robot and improve its response after each trial.",
      studentIds: ["demo-student-sofia-reyes", "demo-student-lena-grant"]
    },
    {
      id: "demo-session-storytelling-today",
      courseId: "demo-course-digital-storytelling-lab",
      contextId: "demo-context-northfield-studio",
      coachId: null,
      date: "2026-09-05",
      startTime: "10:00",
      endTime: "11:30",
      recurrence: "Saturday",
      season: "Fall 2026",
      room: "Media Studio",
      capacity: 7,
      moduleId: "story-interaction",
      status: "staffing_required",
      exception: "Coach assignment required before activation",
      conflicts: [{ type: "staffing", severity: "hard", label: "Coach unassigned" }],
      cancellation: null,
      learningFocus: "Connect a branching story scene with sound and visual feedback.",
      studentIds: ["demo-student-mina-park", "demo-student-ava-thompson"]
    },
    {
      id: "demo-session-robotics-extension-draft",
      courseId: "demo-course-robotics-studio",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-priya-nair",
      date: "2026-09-01",
      startTime: "17:45",
      endTime: "19:15",
      recurrence: "One-time session",
      season: "Fall 2026",
      room: "Robotics Arena",
      capacity: 4,
      moduleId: "robotics-sensors",
      status: "draft",
      exception: "Room must be resolved before activation",
      conflicts: [{ type: "room", severity: "hard", label: "Robotics Arena is already reserved at this time", affectedSessionId: "demo-session-robotics-recurring-tuesday" }],
      cancellation: null,
      learningFocus: "Optional sensor calibration clinic for learners needing another trial.",
      studentIds: []
    },
    {
      id: "demo-session-robotics-recurring-tuesday",
      courseId: "demo-course-robotics-studio",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-priya-nair",
      date: "2026-09-01",
      startTime: "17:45",
      endTime: "19:15",
      recurrence: "Tuesday and Friday",
      season: "Fall 2026",
      room: "Robotics Arena",
      capacity: 6,
      moduleId: "robotics-sensors",
      status: "scheduled",
      exception: null,
      conflicts: [],
      cancellation: null,
      learningFocus: "Calibrate sensor response through repeated arena trials.",
      studentIds: ["demo-student-sofia-reyes", "demo-student-lena-grant"]
    },
    {
      id: "demo-session-harbor-creative",
      courseId: "demo-course-creative-app-lab",
      contextId: "demo-context-harbor-academy",
      coachId: "demo-coach-jordan-ellis",
      date: "2026-09-02",
      startTime: "15:30",
      endTime: "17:00",
      recurrence: "Wednesday",
      season: "Fall 2026",
      room: "Media Lab",
      capacity: 8,
      moduleId: "creative-prototype",
      status: "scheduled",
      exception: null,
      conflicts: [],
      cancellation: null,
      learningFocus: "Prototype an app interaction and explain one design decision.",
      studentIds: ["demo-student-noah-bennett"]
    },
    {
      id: "demo-session-harbor-showcase",
      courseId: "demo-course-creative-app-lab",
      contextId: "demo-context-harbor-academy",
      coachId: "demo-coach-jordan-ellis",
      date: "2026-09-05",
      startTime: "10:00",
      endTime: "11:30",
      recurrence: "One-time session",
      season: "Fall 2026",
      room: "Media Lab",
      capacity: 8,
      moduleId: "creative-share",
      status: "scheduled",
      exception: "Partner-program showcase",
      conflicts: [],
      cancellation: null,
      learningFocus: "Share prototype decisions with the Harbor learning community.",
      studentIds: ["demo-student-noah-bennett"]
    }
  ],
  scheduling: {
    operatingDate: "2026-08-31",
    season: { id: "fall-2026", label: "Fall 2026", startDate: "2026-08-24", endDate: "2026-10-17" },
    roomsByContext: {
      "demo-context-northfield-studio": [
        { id: "studio-2", name: "Studio 2", capacity: 8, type: "Creative technology", status: "active", availability: "Working hours" },
        { id: "robotics-arena", name: "Robotics Arena", capacity: 6, type: "Robotics and physical computing", status: "active", availability: "Working hours · setup buffer applies" },
        { id: "media-studio", name: "Media Studio", capacity: 8, type: "Storytelling and media", status: "active", availability: "Working hours" },
        { id: "project-room", name: "Project Room", capacity: 5, type: "Small-group project work", status: "inactive", availability: "Unavailable for scheduling" }
      ],
      "demo-context-harbor-academy": [
        { id: "media-lab", name: "Media Lab", capacity: 8, type: "Creative technology", status: "active", availability: "Program hours" },
        { id: "innovation-room", name: "Innovation Room", capacity: 6, type: "Project and robotics work", status: "active", availability: "Program hours" }
      ]
    },
    workingHoursByContext: {
      "demo-context-northfield-studio": { weekdays: "2:30–8:00 PM", saturday: "9:00 AM–1:00 PM", sunday: "Closed", schedulingDefault: "90 minutes" },
      "demo-context-harbor-academy": { weekdays: "3:00–6:30 PM", saturday: "Closed", sunday: "Closed", schedulingDefault: "90 minutes" }
    },
    milestones: [
      { id: "demo-milestone-fall-launch", contextId: "demo-context-northfield-studio", date: "2026-08-31", label: "Fall learning season begins", type: "milestone" },
      { id: "demo-milestone-labor-day", contextId: "demo-context-northfield-studio", date: "2026-09-07", label: "Center closed · Labor Day", type: "closure" }
    ]
  },
  learningEvents: [
    {
      id: "demo-event-eli-habit-flow",
      studentId: "demo-student-eli-morgan",
      sessionId: "demo-session-creative-today",
      courseId: "demo-course-creative-app-lab",
      attendance: "present",
      challenge: "Prototype the core habit-tracking flow.",
      completed: "Set up the primary screen and basic navigation.",
      next: "Test the interaction flow and revise one confusing step.",
      progression: { completed: 2, total: 3, label: "2 of 3 steps in today’s learning focus" },
      observation: "Eli built the core navigation independently, then revised one interaction after testing it with a classmate.",
      evidence: {
        id: "demo-evidence-eli-habit-flow",
        label: "Habit Tracker — interaction flow prototype",
        type: "project_artifact",
        status: "available"
      },
      report: { id: "demo-report-eli-habit-flow", status: "no_review_required", label: "No review required" },
      familyUpdate: "Eli completed the first working flow for his habit-tracking app and revised part of the experience after testing it.",
      publishedStory: "A working first flow, improved through testing"
    },
    {
      id: "demo-event-sofia-sensor-test",
      studentId: "demo-student-sofia-reyes",
      sessionId: "demo-session-robotics-today",
      courseId: "demo-course-robotics-studio",
      attendance: "present",
      challenge: "Tune the distance sensor after repeated arena trials.",
      completed: "Recorded three sensor readings and adjusted the trigger distance.",
      next: "Attach the final evidence artifact and explain the adjustment.",
      progression: { completed: 1, total: 3, label: "1 of 3 steps in the current robotics focus" },
      observation: "Sofia compared three sensor readings and used them to adjust the robot’s trigger distance.",
      evidence: {
        id: "demo-evidence-sofia-sensor-test",
        label: "Sensor trial record",
        type: "project_artifact",
        status: "referenced_missing"
      },
      report: {
        id: "demo-report-sofia-sensor-test",
        status: "needs_clarification",
        label: "Needs clarification",
        reason: "Evidence referenced in the report is not available for review."
      },
      familyUpdate: "Sofia tested how her robot responds to distance and used the results to improve its sensor settings.",
      publishedStory: null
    }
  ],
  courseProgress: [
    { id: "demo-progress-eli-creative", studentId: "demo-student-eli-morgan", courseId: "demo-course-creative-app-lab", completed: 2, total: 3, current: "Prototype the core habit-tracking flow", next: "Test and revise one confusing interaction" },
    { id: "demo-progress-sofia-robotics", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", completed: 1, total: 3, current: "Tune the distance sensor", next: "Attach the trial record" },
    { id: "demo-progress-noah-creative", studentId: "demo-student-noah-bennett", courseId: "demo-course-creative-app-lab", completed: 1, total: 3, current: "Map the first screen flow", next: "Build the navigation" },
    { id: "demo-progress-mina-storytelling", studentId: "demo-student-mina-park", courseId: "demo-course-digital-storytelling-lab", completed: 1, total: 3, current: "Connect two branching scenes", next: "Add sound feedback" },
    { id: "demo-progress-lena-creative", studentId: "demo-student-lena-grant", courseId: "demo-course-creative-app-lab", completed: 1, total: 3, current: "Build a reusable screen component", next: "Test the component in two flows" },
    { id: "demo-progress-lena-robotics", studentId: "demo-student-lena-grant", courseId: "demo-course-robotics-studio", completed: 2, total: 4, current: "Calibrate the line sensor", next: "Run the full arena route" },
    { id: "demo-progress-ava-storytelling", studentId: "demo-student-ava-thompson", courseId: "demo-course-digital-storytelling-lab", completed: 2, total: 3, current: "Add visual feedback to a choice", next: "Share the finished scene" }
  ],
  attendancePolicy: {
    id: "demo-policy-northfield-makeup-fall-2026",
    contextId: "demo-context-northfield-studio",
    label: "Northfield recognized-absence policy",
    rule: "A reported illness or appointment before class, or a Center cancellation, automatically adds one Make-Up Token when the Student was enrolled for the class.",
    expiryDays: 45,
    automaticReasons: ["illness", "appointment", "center_cancellation"],
    financialBoundary: "Make-Up Tokens are separate from tuition and billing."
  },
  attendance: [
    { id: "demo-attendance-eli-today", studentId: "demo-student-eli-morgan", courseId: "demo-course-creative-app-lab", sessionId: "demo-session-creative-today", contextId: "demo-context-northfield-studio", sessionDate: "2026-08-31", status: "present", reportedBy: "Coach Jordan Ellis", reportedAt: "2026-08-31T15:58:00-04:00", classification: "confirmed_present", centerNote: "Check-in confirmed before the session began.", eligibility: { ruleResult: "not_applicable", reason: "Attendance is present; no Make-Up Token applies." }, history: [{ at: "2026-08-31T15:58:00-04:00", action: "Present confirmed", by: "Coach Jordan Ellis" }] },
    { id: "demo-attendance-lena-today", studentId: "demo-student-lena-grant", courseId: "demo-course-creative-app-lab", sessionId: "demo-session-creative-today", contextId: "demo-context-northfield-studio", sessionDate: "2026-08-31", status: "needs_review", reportedBy: "System expectation", reportedAt: "2026-08-31T16:05:00-04:00", classification: "unconfirmed", centerNote: "No check-in or Family notice is recorded. Do not infer absence from inactivity.", eligibility: { ruleResult: "pending", reason: "Center classification is required before eligibility is evaluated." }, history: [{ at: "2026-08-31T16:05:00-04:00", action: "Needs review created", by: "Attendance expectation" }] },
    { id: "demo-attendance-sofia-today", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", sessionId: "demo-session-robotics-today", contextId: "demo-context-northfield-studio", sessionDate: "2026-08-31", status: "late", reportedBy: "Coach Priya Nair", reportedAt: "2026-08-31T18:02:00-04:00", classification: "confirmed_late", centerNote: "Arrival confirmed after the scheduled start.", eligibility: { ruleResult: "not_applicable", reason: "Late attendance does not add a Make-Up Token." }, history: [{ at: "2026-08-31T18:02:00-04:00", action: "Late arrival confirmed", by: "Coach Priya Nair" }] },
    { id: "demo-attendance-mina-storytelling", studentId: "demo-student-mina-park", courseId: "demo-course-digital-storytelling-lab", sessionId: "demo-session-storytelling-today", contextId: "demo-context-northfield-studio", sessionDate: "2026-09-05", status: "confirmed_absent", reasonCategory: "illness", reportedBy: "Jin Park · authorized Family", reportedAt: "2026-09-04T18:12:00-04:00", classifiedBy: "Center policy", classifiedAt: "2026-09-04T18:12:00-04:00", classification: "recognized_absence", centerNote: "Family reported illness before class. The standard Center policy applied automatically.", eligibility: { ruleResult: "eligible", reason: "The reported illness qualifies under the standard Center policy.", entitlementId: "demo-makeup-mina-storytelling" }, history: [{ at: "2026-09-04T18:12:00-04:00", action: "Absence reported", by: "Jin Park" }, { at: "2026-09-04T18:12:00-04:00", action: "Center policy checked automatically", by: "Cognit" }, { at: "2026-09-04T18:12:00-04:00", action: "Make-Up Token added to Family account", by: "Cognit" }] },
    { id: "demo-attendance-sofia-prior", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", sessionId: "demo-session-robotics-prior", contextId: "demo-context-northfield-studio", sessionDate: "2026-08-18", status: "confirmed_absent", reasonCategory: "appointment", reportedBy: "Daniel Reyes · authorized Family", reportedAt: "2026-08-17T14:20:00-04:00", classifiedBy: "Center policy", classifiedAt: "2026-08-17T14:20:00-04:00", classification: "recognized_absence", centerNote: "Appointment notice was received before the session and processed automatically.", eligibility: { ruleResult: "eligible", reason: "The reported appointment qualifies under Northfield policy.", entitlementId: "demo-makeup-sofia-robotics" }, history: [{ at: "2026-08-17T14:20:00-04:00", action: "Absence reported", by: "Daniel Reyes" }, { at: "2026-08-17T14:20:00-04:00", action: "Make-Up Token added automatically", by: "Cognit" }] },
    { id: "demo-attendance-ava-prior", studentId: "demo-student-ava-thompson", courseId: "demo-course-digital-storytelling-lab", sessionId: "demo-session-storytelling-prior", contextId: "demo-context-northfield-studio", sessionDate: "2026-08-15", status: "confirmed_absent", reasonCategory: "other", reportedBy: "Center follow-up", reportedAt: "2026-08-16T10:30:00-04:00", classifiedBy: "Maya Chen", classifiedAt: "2026-08-16T11:00:00-04:00", classification: "unrecognized_absence", centerNote: "Reason did not meet the automatic policy rule.", eligibility: { ruleResult: "ineligible", reason: "This absence does not qualify for a Make-Up Token under the normal Center policy.", override: null }, history: [{ at: "2026-08-16T11:00:00-04:00", action: "No Make-Up Token under the standard Center policy", by: "Maya Chen" }] }
  ],
  makeupEntitlements: [
    { id: "demo-makeup-mina-storytelling", studentId: "demo-student-mina-park", courseId: "demo-course-digital-storytelling-lab", contextId: "demo-context-northfield-studio", originType: "recognized_absence", originId: "demo-attendance-mina-storytelling", issuanceReason: "Illness reported before class", ruleResult: "eligible", issuedAt: "2026-09-04", expiresAt: "2026-10-19", status: "available", replacementSessionId: null, redeemedAt: null, label: "Make-Up Token available" },
    { id: "demo-makeup-sofia-robotics", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", contextId: "demo-context-northfield-studio", originType: "recognized_absence", originId: "demo-attendance-sofia-prior", issuanceReason: "Appointment reported before class", ruleResult: "eligible", issuedAt: "2026-08-18", expiresAt: "2026-10-02", status: "available", replacementSessionId: null, redeemedAt: null, label: "Make-Up Token available" },
    { id: "demo-makeup-eli-creative-weather", studentId: "demo-student-eli-morgan", courseId: "demo-course-creative-app-lab", contextId: "demo-context-northfield-studio", originType: "center_cancellation", originId: "demo-cancellation-creative-weather", issuanceReason: "Creative App Lab cancelled by the Center", ruleResult: "eligible", issuedAt: "2026-08-24", expiresAt: "2026-10-08", status: "available", replacementSessionId: null, redeemedAt: null, label: "Make-Up Token available" },
    { id: "demo-makeup-lena-creative-weather", studentId: "demo-student-lena-grant", courseId: "demo-course-creative-app-lab", contextId: "demo-context-northfield-studio", originType: "center_cancellation", originId: "demo-cancellation-creative-weather", issuanceReason: "Creative App Lab cancelled by the Center", ruleResult: "eligible", issuedAt: "2026-08-24", expiresAt: "2026-10-08", status: "available", replacementSessionId: null, redeemedAt: null, label: "Make-Up Token available" },
    { id: "demo-makeup-sofia-robotics-redeemed", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", contextId: "demo-context-northfield-studio", originType: "center_cancellation", originId: "demo-cancellation-robotics-weather", issuanceReason: "Robotics Studio cancelled by the Center", ruleResult: "eligible", issuedAt: "2026-07-20", expiresAt: "2026-09-03", status: "redeemed", replacementSessionId: "demo-session-robotics-recurring-tuesday", redeemedAt: "2026-09-01", label: "Make-Up Token used" },
    { id: "demo-makeup-sofia-robotics-expired", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", contextId: "demo-context-northfield-studio", originType: "recognized_absence", originId: "demo-attendance-sofia-spring", issuanceReason: "Illness reported before class", ruleResult: "eligible", issuedAt: "2026-04-02", expiresAt: "2026-05-17", status: "expired", replacementSessionId: null, redeemedAt: null, label: "Make-Up Token expired" }
  ],
  cancellationConsequences: [
    { id: "demo-cancellation-creative-weather", sessionId: "demo-session-creative-weather", contextId: "demo-context-northfield-studio", courseId: "demo-course-creative-app-lab", sessionDate: "2026-08-24", reason: "Center closure · severe weather", recordedAt: "2026-08-24T13:05:00-04:00", affectedStudentIds: ["demo-student-eli-morgan", "demo-student-lena-grant"], ruleResult: "eligible", consequenceStatus: "ready_to_process", notificationState: "prepared", financialCreditCreated: false }
  ],
  communications: {
    threads: [
      {
        id: "demo-thread-priya-evidence",
        slug: "priya-evidence",
        recipientType: "coach",
        participantIds: ["demo-coach-priya-nair", "demo-director-maya-chen"],
        participantLabel: "Priya Nair",
        contextId: "demo-context-northfield-studio",
        relatedStudentId: "demo-student-sofia-reyes",
        relatedCourseId: "demo-course-robotics-studio",
        subject: "Evidence needed for Sofia’s update",
        summary: "Priya needs clarification before resubmitting Sofia’s learning update.",
        priority: "high",
        readState: "unread",
        replyNeeded: true,
        state: "ready_to_send",
        updatedAt: "Today · 9:18 AM",
        messages: [
          { id: "demo-thread-priya-evidence-1", senderId: "demo-coach-priya-nair", senderLabel: "Priya Nair", timestamp: "Today · 9:18 AM", body: "The referenced sensor trial record is not available for review. Should I attach the arena screenshot or the full sensor-trial summary?", state: "sent", attachment: { name: "sensor-trial-reference.png", type: "Image reference", size: "420 KB" } }
        ]
      },
      {
        id: "demo-thread-reyes-makeup",
        slug: "reyes-makeup",
        recipientType: "family",
        participantIds: ["demo-family-reyes", "demo-director-maya-chen"],
        participantLabel: "Reyes Family",
        contextId: "demo-context-northfield-studio",
        relatedStudentId: "demo-student-sofia-reyes",
        relatedCourseId: "demo-course-robotics-studio",
        subject: "Sofia’s Robotics Studio Make-Up Token",
        summary: "Daniel asked whether Sofia’s missed session added a Make-Up Token.",
        priority: "normal",
        readState: "read",
        replyNeeded: false,
        state: "sent",
        updatedAt: "Yesterday · 4:42 PM",
        messages: [
          { id: "demo-thread-reyes-makeup-1", senderId: "demo-guardian-daniel-reyes", senderLabel: "Daniel Reyes", timestamp: "Yesterday · 4:20 PM", body: "Did Sofia’s missed Robotics Studio session add a Make-Up Token?", state: "sent" },
          { id: "demo-thread-reyes-makeup-2", senderId: "demo-director-maya-chen", senderLabel: "Maya Chen", timestamp: "Yesterday · 4:42 PM", body: "Yes. One Make-Up Token is available on the Reyes Family account, and your family can choose when to use it before October 2.", state: "sent" }
        ]
      },
      {
        id: "demo-thread-jordan-materials",
        slug: "jordan-materials",
        recipientType: "coach",
        participantIds: ["demo-coach-jordan-ellis", "demo-director-maya-chen"],
        participantLabel: "Jordan Ellis",
        contextId: "demo-context-northfield-studio",
        relatedStudentId: null,
        relatedCourseId: "demo-course-creative-app-lab",
        subject: "Creative App Lab materials check",
        summary: "Jordan confirmed the prototype kits and needs one adapter decision.",
        priority: "normal",
        readState: "read",
        replyNeeded: true,
        state: "ready_to_send",
        updatedAt: "Mon · 2:05 PM",
        messages: [
          { id: "demo-thread-jordan-materials-1", senderId: "demo-coach-jordan-ellis", senderLabel: "Jordan Ellis", timestamp: "Mon · 2:05 PM", body: "The prototype kits are ready. May I use the two spare USB-C adapters from Studio 1 for Thursday’s class?", state: "sent", attachment: { name: "creative-lab-materials.pdf", type: "PDF checklist", size: "184 KB" } }
        ]
      },
      {
        id: "demo-thread-morgan-schedule",
        slug: "morgan-schedule",
        recipientType: "family",
        participantIds: ["demo-family-morgan", "demo-director-maya-chen"],
        participantLabel: "Morgan Family",
        contextId: "demo-context-northfield-studio",
        relatedStudentId: "demo-student-eli-morgan",
        relatedCourseId: "demo-course-creative-app-lab",
        subject: "Thursday class time confirmed",
        summary: "Rachel confirmed Eli’s Thursday schedule.",
        priority: "normal",
        readState: "read",
        replyNeeded: false,
        state: "sent",
        updatedAt: "Aug 29 · 6:10 PM",
        messages: [
          { id: "demo-thread-morgan-schedule-1", senderId: "demo-director-maya-chen", senderLabel: "Maya Chen", timestamp: "Aug 29 · 5:55 PM", body: "Creative App Lab remains scheduled for Thursday from 4:00–5:30 PM in Studio 2.", state: "sent" },
          { id: "demo-thread-morgan-schedule-2", senderId: "demo-guardian-rachel-morgan", senderLabel: "Rachel Morgan", timestamp: "Aug 29 · 6:10 PM", body: "Thank you. Eli will be there.", state: "sent" }
        ]
      },
      {
        id: "demo-thread-harbor-jordan",
        slug: "harbor-jordan",
        recipientType: "coach",
        participantIds: ["demo-coach-jordan-ellis", "demo-director-maya-chen"],
        participantLabel: "Jordan Ellis",
        contextId: "demo-context-harbor-academy",
        relatedStudentId: "demo-student-noah-bennett",
        relatedCourseId: "demo-course-creative-app-lab",
        subject: "Harbor showcase room check",
        summary: "Confirm the Harbor room setup before the showcase session.",
        priority: "normal",
        readState: "unread",
        replyNeeded: true,
        state: "ready_to_send",
        updatedAt: "Today · 8:35 AM",
        messages: [
          { id: "demo-thread-harbor-jordan-1", senderId: "demo-coach-jordan-ellis", senderLabel: "Jordan Ellis", timestamp: "Today · 8:35 AM", body: "Is the Harbor Media Room available thirty minutes before the showcase for setup?", state: "sent" }
        ]
      }
    ],
    announcements: [
      { id: "demo-announcement-weekend", slug: "weekend-schedule", contextId: "demo-context-northfield-studio", title: "Weekend schedule reminder", body: "Saturday sessions begin at 10:00 AM. Please arrive ten minutes early for room check-in.", audience: "All Families", audienceType: "all_families", createdAt: "Aug 31, 2026", state: "published", visibleAt: "Published Aug 31 · 8:00 AM" },
      { id: "demo-announcement-staff-meeting", slug: "staff-meeting", contextId: "demo-context-northfield-studio", title: "Coach planning huddle", body: "Coaches meet in Studio 2 at 3:15 PM Thursday to review next week’s materials.", audience: "All Coaches", audienceType: "all_coaches", createdAt: "Sep 1, 2026", state: "scheduled", visibleAt: "Scheduled for Sep 3 · 9:00 AM" },
      { id: "demo-announcement-showcase", slug: "creative-showcase", contextId: "demo-context-northfield-studio", title: "Creative App Lab showcase", body: "Families in Creative App Lab are invited to the September showcase.", audience: "Creative App Lab group", audienceType: "course_group", relatedCourseId: "demo-course-creative-app-lab", createdAt: "Sep 2, 2026", state: "draft", visibleAt: "Draft" },
      { id: "demo-announcement-harbor", slug: "harbor-showcase", contextId: "demo-context-harbor-academy", title: "Harbor showcase setup", body: "Harbor Coaches should arrive thirty minutes early for room setup.", audience: "All Coaches", audienceType: "all_coaches", createdAt: "Sep 2, 2026", state: "published", visibleAt: "Published Sep 2 · 8:00 AM" }
    ],
    audiencesByContext: {
      "demo-context-northfield-studio": [
        { id: "coach:priya", type: "coach", label: "Coach · Priya Nair", personId: "demo-coach-priya-nair" },
        { id: "coach:jordan", type: "coach", label: "Coach · Jordan Ellis", personId: "demo-coach-jordan-ellis" },
        { id: "family:reyes", type: "family", label: "Family · Reyes Family", familyId: "demo-family-reyes" },
        { id: "family:morgan", type: "family", label: "Family · Morgan Family", familyId: "demo-family-morgan" },
        { id: "family:park", type: "family", label: "Family · Park Family", familyId: "demo-family-park" },
        { id: "family:thompson", type: "family", label: "Family · Thompson Family", billingAccountId: "demo-billing-thompson" },
        { id: "group:all-coaches", type: "all_coaches", label: "All Coaches · Northfield Studio" },
        { id: "group:all-families", type: "all_families", label: "All Families · Northfield Studio" },
        { id: "course:creative-app-lab", type: "course_group", label: "Course group · Creative App Lab", courseId: "demo-course-creative-app-lab" },
        { id: "course:robotics-studio", type: "course_group", label: "Course group · Robotics Studio", courseId: "demo-course-robotics-studio" },
        { id: "course:digital-storytelling-lab", type: "course_group", label: "Course group · Digital Storytelling Lab", courseId: "demo-course-digital-storytelling-lab" }
      ],
      "demo-context-harbor-academy": [
        { id: "coach:jordan", type: "coach", label: "Coach · Jordan Ellis", personId: "demo-coach-jordan-ellis" },
        { id: "group:all-coaches", type: "all_coaches", label: "All Coaches · Harbor Academy Program" },
        { id: "course:creative-app-lab", type: "course_group", label: "Course group · Creative App Lab", courseId: "demo-course-creative-app-lab" }
      ]
    }
  },
  financials: {
    accounts: [
      {
        id: "demo-billing-morgan",
        accountId: "BILL-MORGAN",
        slug: "morgan",
        contextId: "demo-context-northfield-studio",
        studentId: "demo-student-eli-morgan",
        familyId: "demo-family-morgan",
        familyName: "Morgan Family",
        courseId: "demo-course-creative-app-lab",
        billingContact: { name: "Rachel Morgan" },
        monthlyTuition: 180,
        openBalance: 0,
        status: "current",
        statusLabel: "Current",
        reason: "",
        autoPay: true,
        paymentMethod: { brand: "Visa", last4: "4242", expiration: "09/28", status: "active", cardholder: "Rachel Morgan", zip: "08540" },
        lastPayment: "Aug 15, 2026",
        nextPayment: "Sep 15, 2026",
        payments: [
          { id: "demo-receipt-morgan-aug", date: "Aug 15, 2026", description: "Creative App Lab tuition", amount: 180, status: "paid", method: "Visa ending 4242", reference: "MOR-0826" },
          { id: "demo-receipt-morgan-jul", date: "Jul 15, 2026", description: "Creative App Lab tuition", amount: 180, status: "paid", method: "Visa ending 4242", reference: "MOR-0726" }
        ]
      },
      {
        id: "demo-billing-reyes",
        accountId: "BILL-REYES",
        slug: "reyes",
        contextId: "demo-context-northfield-studio",
        studentId: "demo-student-sofia-reyes",
        familyId: "demo-family-reyes",
        familyName: "Reyes Family",
        courseId: "demo-course-robotics-studio",
        billingContact: { name: "Daniel Reyes" },
        monthlyTuition: 190,
        openBalance: 190,
        status: "past_due",
        statusLabel: "Past due",
        reason: "Payment failed",
        autoPay: true,
        paymentMethod: { brand: "Visa", last4: "8901", expiration: "11/28", status: "declined", cardholder: "Daniel Reyes", zip: "08542" },
        lastPayment: "Jul 15, 2026",
        nextPayment: "Due now",
        payments: [
          { id: "demo-attempt-reyes-aug", date: "Aug 15, 2026", description: "Robotics Studio tuition", amount: 190, status: "failed", method: "Visa ending 8901", reference: "REY-FAIL-0826" },
          { id: "demo-receipt-reyes-jul", date: "Jul 15, 2026", description: "Robotics Studio tuition", amount: 190, status: "paid", method: "Visa ending 8901", reference: "REY-0726" }
        ]
      },
      {
        id: "demo-billing-park",
        accountId: "BILL-PARK",
        slug: "park",
        contextId: "demo-context-northfield-studio",
        studentId: "demo-student-mina-park",
        familyId: "demo-family-park",
        familyName: "Park Family",
        courseId: "demo-course-digital-storytelling-lab",
        billingContact: { name: "Jin Park" },
        monthlyTuition: 175,
        openBalance: 175,
        status: "action_required",
        statusLabel: "Action required",
        reason: "Card expired",
        autoPay: false,
        paymentMethod: { brand: "Visa", last4: "1020", expiration: "07/26", status: "expired", cardholder: "Jin Park", zip: "08544" },
        lastPayment: "Jul 5, 2026",
        nextPayment: "Due now",
        payments: [{ id: "demo-attempt-park-aug", date: "Aug 5, 2026", description: "Digital Storytelling Lab tuition", amount: 175, status: "failed", method: "Visa ending 1020", reference: "PAR-EXP-0826" }]
      },
      {
        id: "demo-billing-grant",
        accountId: "BILL-GRANT",
        slug: "grant",
        contextId: "demo-context-northfield-studio",
        studentId: "demo-student-lena-grant",
        familyId: null,
        familyName: "Grant Family",
        courseId: "demo-course-creative-app-lab",
        billingContact: { name: "Taylor Grant" },
        monthlyTuition: 180,
        openBalance: 0,
        status: "current",
        statusLabel: "Current",
        reason: "",
        autoPay: false,
        paymentMethod: { brand: "Mastercard", last4: "6732", expiration: "04/29", status: "active", cardholder: "Taylor Grant", zip: "08540" },
        lastPayment: "Aug 15, 2026",
        nextPayment: "Sep 15, 2026",
        payments: [{ id: "demo-receipt-grant-aug", date: "Aug 15, 2026", description: "Creative App Lab tuition", amount: 180, status: "paid", method: "Mastercard ending 6732", reference: "GRA-0826" }]
      },
      {
        id: "demo-billing-thompson",
        accountId: "BILL-THOMPSON",
        slug: "thompson",
        contextId: "demo-context-northfield-studio",
        studentId: "demo-student-ava-thompson",
        familyId: null,
        familyName: "Thompson Family",
        courseId: "demo-course-digital-storytelling-lab",
        billingContact: { name: "Morgan Thompson" },
        monthlyTuition: 175,
        openBalance: 175,
        status: "action_required",
        statusLabel: "Action required",
        reason: "No payment method",
        autoPay: false,
        paymentMethod: null,
        lastPayment: "No payment yet",
        nextPayment: "Due now",
        payments: []
      }
    ],
    dashboardByContext: {
      "demo-context-northfield-studio": {
        period: "September 2026",
        totalIncome: 48750,
        totalExpenses: 31200,
        netRevenue: 17550,
        revenueThisMonth: 550,
        outstandingTuition: 540,
        trend: [
          { month: "Apr", income: 42100, expenses: 29800 }, { month: "May", income: 44700, expenses: 30500 },
          { month: "Jun", income: 46900, expenses: 32100 }, { month: "Jul", income: 43800, expenses: 31800 },
          { month: "Aug", income: 47200, expenses: 30700 }, { month: "Sep", income: 48750, expenses: 31200 }
        ],
        expenseBreakdown: [
          { name: "Staff and instruction", percent: 58, amount: 18200 }, { name: "Facility and maintenance", percent: 15, amount: 4680 },
          { name: "Supplies and materials", percent: 12, amount: 3744 }, { name: "Insurance", percent: 8, amount: 2496 }, { name: "Utilities", percent: 7, amount: 2180 }
        ],
        upcomingBills: [
          { name: "Building lease", vendor: "Acme Properties", due: "Sep 5", amount: 4500, action: "Review bill" },
          { name: "Insurance premium", vendor: "Hartford Coverage Co.", due: "Sep 20", amount: 1850, action: "View detail" },
          { name: "Learning supplies", vendor: "School Supply Co.", due: "Sep 30", amount: 1240, action: "Mark planned" }
        ],
        recentTransactions: [
          { name: "Tuition payments", date: "Sep 1", amount: 550, category: "Tuition" },
          { name: "Cleaning service", date: "Aug 30", amount: -350, category: "Facility" },
          { name: "Art supplies", date: "Aug 28", amount: -125, category: "Supplies" }
        ],
        budget: [
          { category: "Staff and instruction", budgeted: 20000, actual: 18200 }, { category: "Facility and maintenance", budgeted: 5000, actual: 4850 },
          { category: "Educational supplies", budgeted: 2500, actual: 2840 }, { category: "Marketing and administration", budgeted: 1500, actual: 850 },
          { category: "Utilities", budgeted: 1000, actual: 1120 }
        ]
      }
    }
  },
  settings: {
    learningPeriodLabel: "Learning focus",
    reviewMode: "Review by exception",
    familyPublishing: "Published learning updates only",
    activeContextIds: ["demo-context-northfield-studio", "demo-context-harbor-academy"],
    modules: [
      { id: "academic", name: "Academic", detail: "Courses and curriculum visibility", allocation: "required", enabled: true, owner: "HQ" },
      { id: "scheduling", name: "Scheduling", detail: "Sessions, rooms, seasons, and closures", allocation: "required", enabled: true, owner: "HQ" },
      { id: "students", name: "Students", detail: "Center learner operations", allocation: "required", enabled: true, owner: "HQ" },
      { id: "staffing", name: "Staffing", detail: "Coach availability and assignments", allocation: "available", enabled: true, owner: "Center" },
      { id: "report-review", name: "Report Review", detail: "Center review and publication", allocation: "available", enabled: true, owner: "Center" },
      { id: "family-reporting", name: "Family Reporting", detail: "Published Family learning updates", allocation: "available", enabled: true, owner: "Center" },
      { id: "communication", name: "Communication", detail: "Center messages and announcements", allocation: "available", enabled: true, owner: "Center" },
      { id: "financials", name: "Financials", detail: "Tuition accounts and financial planning", allocation: "available", enabled: true, owner: "Center" },
      { id: "migration", name: "Migration", detail: "Data transition tooling", allocation: "unavailable", enabled: false, owner: "HQ" }
    ],
    systemStatuses: [
      { name: "Authentication", status: "Platform managed", owner: "Cognit", detail: "Identity and sign-in settings are not configurable by the Center." },
      { name: "Curriculum library", status: "Managed by HQ", owner: "HQ", detail: "Canonical templates and required modules remain governed by HQ." },
      { name: "Email delivery", status: "Not connected", owner: "Cognit", detail: "Email delivery is not connected." },
      { name: "Payment collection", status: "Not connected", owner: "Cognit", detail: "Payment collection is not connected." },
      { name: "Accounting", status: "Not connected", owner: "Cognit", detail: "No accounting connection is configured." }
    ]
  }
});
