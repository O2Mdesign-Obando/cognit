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
      type: "learning_center",
      status: "active",
      purpose: "Primary center for direct-enrollment, after-school, weekend, and Family learning."
    },
    {
      id: "demo-context-harbor-academy",
      name: "Harbor Academy Program",
      type: "school_program",
      status: "active",
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
        workEmail: "jordan.ellis@northfield.demo",
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
        workEmail: "priya.nair@northfield.demo",
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
        workEmail: "avery.cole@northfield.demo",
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
        primaryContact: { name: "Rachel Morgan", relationship: "Parent", email: "rachel.morgan@family.demo", phone: "(555) 013-1101" },
        secondaryContact: { name: "Sam Morgan", relationship: "Parent", email: "sam.morgan@family.demo", phone: "(555) 013-1102" },
        preferredEmail: "rachel.morgan@family.demo",
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
        primaryContact: { name: "Daniel Reyes", relationship: "Parent", email: "daniel.reyes@family.demo", phone: "(555) 013-1201" },
        secondaryContact: null,
        preferredEmail: "daniel.reyes@family.demo",
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
        primaryContact: { name: "Jin Park", relationship: "Parent", email: "jin.park@family.demo", phone: "(555) 013-1301" },
        secondaryContact: { name: "Alex Park", relationship: "Authorized adult", email: "alex.park@family.demo", phone: "(555) 013-1302" },
        preferredEmail: "jin.park@family.demo",
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
        { id: "creative-share", sequence: 3, title: "Refine and share", state: "upcoming", delivery: "Week 6–8", summary: "Strengthen feedback, accessibility, and explanation before sharing the finished prototype.", activities: ["Add clear system feedback", "Prepare a short design walkthrough"], objectives: ["Refine the experience using evidence", "Explain key design decisions"], outcomes: ["A shareable prototype", "A concise design reflection"], resources: [{ label: "Demo preparation guide", type: "Learner guide" }] }
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
      "demo-context-northfield-studio": ["Studio 2", "Robotics Arena", "Media Studio", "Project Room"],
      "demo-context-harbor-academy": ["Media Lab", "Innovation Room"]
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
  attendance: [
    { id: "demo-attendance-eli-today", studentId: "demo-student-eli-morgan", courseId: "demo-course-creative-app-lab", sessionId: "demo-session-creative-today", status: "present" },
    { id: "demo-attendance-sofia-prior", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", sessionId: "demo-session-robotics-prior", status: "absent" },
    { id: "demo-attendance-sofia-today", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", sessionId: "demo-session-robotics-today", status: "present" }
  ],
  makeupEntitlements: [
    { id: "demo-makeup-sofia-robotics", studentId: "demo-student-sofia-reyes", courseId: "demo-course-robotics-studio", status: "available", label: "1 makeup available", expiresAt: null }
  ],
  messages: [
    {
      id: "demo-message-sofia-makeup",
      parties: ["demo-guardian-daniel-reyes", "demo-director-maya-chen"],
      subject: "Robotics Studio makeup",
      preview: "Will Sofia’s missed session create a makeup option?",
      status: "answered",
      response: "Yes. One makeup option is available for Sofia."
    },
    {
      id: "demo-message-sofia-clarification",
      parties: ["demo-coach-priya-nair", "demo-director-maya-chen"],
      subject: "Evidence needed for Sofia’s update",
      preview: "The referenced sensor trial record is not available for review.",
      status: "needs_reply",
      response: null
    }
  ],
  settings: {
    learningPeriodLabel: "Learning focus",
    reviewMode: "Review by exception",
    familyPublishing: "Published learning updates only",
    activeContextIds: ["demo-context-northfield-studio", "demo-context-harbor-academy"]
  }
});
