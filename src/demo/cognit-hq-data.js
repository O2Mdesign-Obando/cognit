export const COGNIT_HQ_DEMO = Object.freeze({
  meta: {
    synthetic: true,
    label: "Cognit HQ network",
    steward: "Avery Chen",
    role: "Network Operations",
    authorizationPrinciple: "Hierarchy describes structure. Grants describe access."
  },
  centers: [
    { id: "riverton", name: "Riverton Learning Studio", city: "Riverton, CO", status: "Active", learners: 86, coaches: 7, version: "2.4", sync: "12 min ago", readiness: "Ready", adoption: 92 },
    { id: "oak-harbor", name: "Oak Harbor Lab", city: "Oak Harbor, WA", status: "Active", learners: 61, coaches: 5, version: "2.4", sync: "28 min ago", readiness: "Ready", adoption: 84 },
    { id: "cedar-grove", name: "Cedar Grove Collective", city: "Cedar Grove, MN", status: "Onboarding", learners: 0, coaches: 2, version: "Setup", sync: "Yesterday", readiness: "Needs attention", adoption: 0 },
    { id: "sunfield", name: "Sunfield Learning Works", city: "Sunfield, AZ", status: "Active", learners: 48, coaches: 4, version: "2.3", sync: "2 hours ago", readiness: "Update ready", adoption: 76 },
    { id: "maple-crossing", name: "Maple Crossing Studio", city: "Maple Crossing, VT", status: "Active", learners: 35, coaches: 3, version: "2.4", sync: "1 hour ago", readiness: "Ready", adoption: 68 },
    { id: "bluewater", name: "Bluewater Learning Lab", city: "Bluewater, MI", status: "Inactive", learners: 14, coaches: 1, version: "2.2", sync: "5 days ago", readiness: "Needs decision", adoption: 41 }
  ],
  attention: [
    { type: "Curriculum", title: "Two Centers need template adoption review", detail: "Creative App Foundations 2.4 is pending local review.", href: "/learninghub/demo/hq/curriculum" },
    { type: "Support", title: "One Center-impacting issue is escalated", detail: "A roster sync issue needs a network operations owner.", href: "/learninghub/demo/hq/support" },
    { type: "Onboarding", title: "Cedar Grove onboarding needs a Coach assignment", detail: "Training can continue after the local staffing checkpoint.", href: "/learninghub/demo/hq/centers" },
    { type: "Reporting", title: "Monthly network summary is ready", detail: "Aggregate trends are available for review.", href: "/learninghub/demo/hq/performance" },
    { type: "Credentials", title: "Three Coach credentials approach review", detail: "Three credential records are ready for governance review.", href: "/learninghub/demo/hq/governance" }
  ],
  curriculum: [
    { name: "Creative App Foundations", category: "Digital making", status: "Published", version: "2.4", adoption: "5 of 6 Centers" },
    { name: "Robotics Systems", category: "Engineering", status: "Published", version: "1.8", adoption: "4 of 6 Centers" },
    { name: "Digital Storytelling", category: "Creative computing", status: "Draft", version: "1.2", adoption: "0 of 6 Centers" },
    { name: "AI Foundations", category: "AI literacy", status: "Published", version: "1.0", adoption: "3 of 6 Centers" }
  ],
  journeyTemplates: [
    { name: "Creative Computing Journey", duration: "8 weeks", status: "Published", centers: 5 },
    { name: "Engineering Design Journey", duration: "6 weeks", status: "Published", centers: 4 },
    { name: "Advanced Problem Solving", duration: "10 weeks", status: "Draft", centers: 0 }
  ],
  policies: [
    { name: "Data handling standard", version: "3.2", status: "Active" },
    { name: "Student safety guideline", version: "2.1", status: "Active" },
    { name: "Coach conduct standard", version: "1.4", status: "Active" },
    { name: "Center operations standard", version: "4.0", status: "Under review" }
  ],
  support: [
    { id: "HQ-0842", center: "Riverton Learning Studio", summary: "Roster sync unavailable for one teaching block", priority: "High", status: "Escalated", owner: "Avery Chen", age: "4 hours" },
    { id: "HQ-0839", center: "Sunfield Learning Works", summary: "Journey image is incomplete", priority: "Medium", status: "In progress", owner: "Platform support", age: "1 day" },
    { id: "HQ-0835", center: "Oak Harbor Lab", summary: "Schedule configuration question", priority: "Low", status: "Awaiting Center", owner: "Network operations", age: "2 days" }
  ],
  releases: [
    { name: "Family journey refinements", version: "2.5", stage: "In development", target: "September planning window" },
    { name: "Coach aggregate insights", version: "2.6", stage: "Planning", target: "October planning window" }
  ],
  modules: [
    { id: "academic", name: "Academic", detail: "Course templates and curriculum visibility", state: "required" },
    { id: "scheduling", name: "Scheduling", detail: "Teaching blocks and schedule visibility", state: "required" },
    { id: "staffing", name: "Staffing", detail: "Coach roster and assignment tools", state: "available" },
    { id: "report-review", name: "Report Review", detail: "Review submitted learning updates", state: "available" },
    { id: "family-reporting", name: "Family Reporting", detail: "Prepare and release family-facing stories", state: "available" },
    { id: "students", name: "Students", detail: "Roster totals and granted context profiles", state: "required" },
    { id: "communication", name: "Communication", detail: "Operational correspondence", state: "available" },
    { id: "finances", name: "Finances", detail: "Local billing and payment capabilities", state: "unavailable" }
  ]
});

export const HQ_VIEWS = Object.freeze(["home", "network", "centers", "curriculum", "insights", "performance", "governance", "support", "deployment", "modules", "allocation"]);
