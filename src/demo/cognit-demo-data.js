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
      focus: "App design, interaction logic, and iterative building.",
      coachId: "demo-coach-jordan-ellis"
    },
    {
      id: "demo-course-robotics-studio",
      name: "Robotics Studio",
      focus: "Robot design, sensors, testing, and iterative engineering.",
      coachId: "demo-coach-priya-nair"
    },
    {
      id: "demo-course-digital-storytelling-lab",
      name: "Digital Storytelling Lab",
      focus: "Interactive storytelling, media, and creative computing.",
      coachId: "demo-coach-jordan-ellis"
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
      label: "Today · 4:00–5:30 PM",
      status: "in_progress",
      learningFocus: "Prototype a simple habit-tracking app and improve the interaction flow after testing.",
      studentIds: ["demo-student-eli-morgan", "demo-student-lena-grant"]
    },
    {
      id: "demo-session-robotics-today",
      courseId: "demo-course-robotics-studio",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-priya-nair",
      label: "Today · 5:45–7:15 PM",
      status: "scheduled",
      learningFocus: "Test a sensor-guided robot and improve its response after each trial.",
      studentIds: ["demo-student-sofia-reyes", "demo-student-lena-grant"]
    },
    {
      id: "demo-session-storytelling-today",
      courseId: "demo-course-digital-storytelling-lab",
      contextId: "demo-context-northfield-studio",
      coachId: "demo-coach-jordan-ellis",
      label: "Saturday · 10:00–11:30 AM",
      status: "scheduled",
      learningFocus: "Connect a branching story scene with sound and visual feedback.",
      studentIds: ["demo-student-mina-park", "demo-student-ava-thompson"]
    },
    {
      id: "demo-session-harbor-creative",
      courseId: "demo-course-creative-app-lab",
      contextId: "demo-context-harbor-academy",
      coachId: "demo-coach-jordan-ellis",
      label: "Wednesday · 3:30–5:00 PM",
      status: "scheduled",
      learningFocus: "Prototype an app interaction and explain one design decision.",
      studentIds: ["demo-student-noah-bennett"]
    }
  ],
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
