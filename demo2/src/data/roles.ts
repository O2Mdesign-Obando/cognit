export type RoleKey = "center" | "coach" | "family" | "student" | "hq";

export interface NavItem {
  label: string;
  to: string;
}

export interface RoleConfig {
  key: RoleKey;
  /** display name in header */
  user: string;
  home: string;
  /** header dropdown role-specific item */
  accountLabel: string;
  accountTo: string;
  nav: NavItem[];
}

export const ROLES: Record<RoleKey, RoleConfig> = {
  center: {
    key: "center",
    user: "Jack Alvarez",
    home: "/center/home",
    accountLabel: "Settings",
    accountTo: "/center/settings",
    nav: [
      { label: "Home", to: "/center/home" },
      { label: "Today's Classes", to: "/center/classes" },
      { label: "Communication", to: "/center/messages" },
      { label: "Coaches", to: "/center/coaches" },
      { label: "Students", to: "/center/students" },
      { label: "Scheduling", to: "/center/schedule" },
      { label: "Courses", to: "/center/courses" },
      { label: "Tuition & Billing", to: "/center/billing" },
      { label: "Reports", to: "/center/reports" },
    ],
  },
  coach: {
    key: "coach",
    user: "Marcus Reed",
    home: "/coach/home",
    accountLabel: "Profile",
    accountTo: "/coach/profile",
    nav: [
      { label: "Home", to: "/coach/home" },
      { label: "Live Class", to: "/coach/class/python-prodigy/live" },
      { label: "Reviews", to: "/coach/class/python-prodigy/review" },
      { label: "Day Review", to: "/coach/day-review" },
    ],
  },
  family: {
    key: "family",
    user: "Danielle Hayes",
    home: "/family/home",
    accountLabel: "Account",
    accountTo: "/account/settings",
    nav: [
      { label: "Home", to: "/family/home" },
      { label: "Learning Journey", to: "/family/journey" },
      { label: "Messages", to: "/family/messages" },
      { label: "Courses", to: "/family/courses" },
      { label: "Tuition & Billing", to: "/family/billing" },
    ],
  },
  student: {
    key: "student",
    user: "Saúl Mendez",
    home: "/student/home",
    accountLabel: "Profile",
    accountTo: "/student/home",
    nav: [
      { label: "Home", to: "/student/home" },
      { label: "Today's Lesson", to: "/student/lesson/loops" },
      { label: "Today's Work", to: "/student/today" },
    ],
  },
  hq: {
    key: "hq",
    user: "Sarah Chen",
    home: "/hq/home",
    accountLabel: "Settings",
    accountTo: "/hq/home",
    nav: [
      { label: "Home", to: "/hq/home" },
      { label: "Network Overview", to: "/hq/network" },
      { label: "Center Management", to: "/hq/centers" },
      { label: "Curriculum", to: "/hq/curriculum" },
      { label: "Insights", to: "/hq/insights" },
      { label: "Performance", to: "/hq/performance" },
      { label: "Governance", to: "/hq/governance" },
      { label: "Support", to: "/hq/support" },
      { label: "Deployment", to: "/hq/deployment" },
    ],
  },
};
