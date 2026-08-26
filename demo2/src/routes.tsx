import { createBrowserRouter, Navigate } from "react-router";
import Landing from "./pages/Landing";
import Placeholder from "./pages/Placeholder";
import { TopNavLayout } from "./components/shell/TopNavLayout";
import { SidebarLayout } from "./components/shell/SidebarLayout";
import CenterHome from "./pages/center/Home";
import CenterClasses from "./pages/center/TodaysClasses";
import CenterComms from "./pages/center/Communication";
import CenterCoaches from "./pages/center/Coaches";
import CenterStudents from "./pages/center/Students";
import CenterSchedule from "./pages/center/Scheduling";
import CenterCourses from "./pages/center/Courses";
import CenterBilling from "./pages/center/Billing";
import CenterReports from "./pages/center/Reports";
import CoachHome from "./pages/coach/Home";
import CoachLiveClass from "./pages/coach/LiveClass";
import CoachPostReview from "./pages/coach/PostClassReview";
import CoachDayReview from "./pages/coach/DayReview";
import CoachProfile from "./pages/center/CoachProfile";
import CenterCourseDetail from "./pages/center/CourseDetail";
import CenterStudentProfile from "./pages/center/StudentProfile";
import CenterReviewObs from "./pages/center/ReviewObservations";
import CenterReportBuilder from "./pages/center/ReportBuilder";
import CenterCompose from "./pages/center/ComposeMessage";
import CenterUpdatePayment from "./pages/center/UpdatePayment";
import CenterPaymentConfirm from "./pages/center/PaymentConfirmation";
import CenterMakeupCredits from "./pages/center/MakeupCredits";
import CenterRecordAbsence from "./pages/center/RecordAbsence";
import CenterAddCoach from "./pages/center/AddCoach";
import CenterEnrollStudent from "./pages/center/EnrollStudent";
import FamilyHome from "./pages/family/Home";
import FamilyJourney from "./pages/family/LearningJourney";
import FamilyMessages from "./pages/family/Messages";
import FamilyCourses from "./pages/family/Courses";
import FamilyBilling from "./pages/family/Billing";
import FamilyAbsence from "./pages/family/ReportAbsence";
import FamilyMakeup from "./pages/family/MakeupCredits";
import FamilyAccount from "./pages/family/AccountSettings";
import StudentHome from "./pages/student/Home";
import StudentTodaysWork from "./pages/student/TodaysWork";
import StudentLesson from "./pages/student/Lesson";
import StudentActivity from "./pages/student/Activity";
import StudentReflection from "./pages/student/Reflection";
import StudentComplete from "./pages/student/Complete";
import HqHome from "./pages/hq/Home";
import NetworkOverview from "./pages/hq/NetworkOverview";
import CenterManagement from "./pages/hq/CenterManagement";
import Curriculum from "./pages/hq/Curriculum";
import Insights from "./pages/hq/Insights";
import Performance from "./pages/hq/Performance";
import Governance from "./pages/hq/Governance";
import HqSupport from "./pages/hq/Support";
import Deployment from "./pages/hq/Deployment";
import ModuleControl from "./pages/shared/ModuleControl";

const ph = (title: string, note?: string) => ({ element: <Placeholder title={title} note={note} /> });

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Navigate to="/" replace /> },
  { path: "/support", element: <Placeholder title="Support Hub" note="Role-specific support hub — contact form and FAQ. Building next." /> },

  {
    element: <TopNavLayout roleKey="center" />,
    children: [
      { path: "/center/home", element: <CenterHome /> },
      { path: "/center/classes", element: <CenterClasses /> },
      { path: "/center/messages", element: <CenterComms /> },
      { path: "/center/coaches", element: <CenterCoaches /> },
      { path: "/center/coaches/new", element: <CenterAddCoach /> },
      { path: "/center/coaches/:id", element: <CoachProfile /> },
      { path: "/center/students", element: <CenterStudents /> },
      { path: "/center/students/new", element: <CenterEnrollStudent /> },
      { path: "/center/students/absence", element: <CenterRecordAbsence /> },
      { path: "/center/students/:id", element: <CenterStudentProfile /> },
      { path: "/center/students/:id/makeup", element: <CenterMakeupCredits /> },
      { path: "/center/schedule", element: <CenterSchedule /> },
      { path: "/center/courses", element: <CenterCourses /> },
      { path: "/center/courses/:id", element: <CenterCourseDetail /> },
      { path: "/center/messages/compose", element: <CenterCompose /> },
      { path: "/center/billing", element: <CenterBilling /> },
      { path: "/center/billing/:id/update", element: <CenterUpdatePayment /> },
      { path: "/center/billing/:id/confirm", element: <CenterPaymentConfirm /> },
      { path: "/center/reports", element: <CenterReports /> },
      { path: "/center/reports/generate", element: <CenterReportBuilder /> },
      { path: "/center/observations", element: <CenterReviewObs /> },
      {
        path: "/center/settings",
        element: (
          <ModuleControl
            eyebrow="Center Configuration"
            intro="Manage which Learning Hub capabilities are active for the Plainsboro Center. HQ-mandated modules are locked and cannot be disabled locally."
            banner="Modules marked HQ Mandated are enforced by the Franchise Console and cannot be changed at this Center."
            footerNote="Saving changes updates module availability for the Plainsboro Center."
          />
        ),
      },
    ],
  },
  {
    element: <TopNavLayout roleKey="coach" />,
    children: [
      { path: "/coach/home", element: <CoachHome /> },
    ],
  },
  { path: "/coach/class/:id/live", element: <CoachLiveClass /> },
  { path: "/coach/class/:id/review", element: <CoachPostReview /> },
  { path: "/coach/day-review", element: <CoachDayReview /> },
  { path: "/coach/profile", element: <CoachProfile /> },
  {
    element: <TopNavLayout roleKey="family" />,
    children: [
      { path: "/family/home", element: <FamilyHome /> },
      { path: "/family/journey", element: <FamilyJourney /> },
      { path: "/family/messages", element: <FamilyMessages /> },
      { path: "/family/courses", element: <FamilyCourses /> },
      { path: "/family/billing", element: <FamilyBilling /> },
      { path: "/family/makeup", element: <FamilyMakeup /> },
      { path: "/family/absence/report", element: <FamilyAbsence /> },
      { path: "/account/settings", element: <FamilyAccount /> },
    ],
  },
  {
    element: <TopNavLayout roleKey="student" />,
    children: [
      { path: "/student/home", element: <StudentHome /> },
      { path: "/student/today", element: <StudentTodaysWork /> },
    ],
  },
  { path: "/student/lesson/:id", element: <StudentLesson /> },
  { path: "/student/lesson/:id/activity", element: <StudentActivity /> },
  { path: "/student/lesson/:id/reflect", element: <StudentReflection /> },
  { path: "/student/lesson/:id/complete", element: <StudentComplete /> },
  {
    element: <SidebarLayout />,
    children: [
      { path: "/hq/home", element: <HqHome /> },
      { path: "/hq/network", element: <NetworkOverview /> },
      { path: "/hq/centers", element: <CenterManagement /> },
      { path: "/hq/curriculum", element: <Curriculum /> },
      { path: "/hq/insights", element: <Insights /> },
      { path: "/hq/performance", element: <Performance /> },
      { path: "/hq/governance", element: <Governance /> },
      { path: "/hq/support", element: <HqSupport /> },
      { path: "/hq/deployment", element: <Deployment /> },
      { path: "/hq/modules", element: <ModuleControl eyebrow="Franchise Console" /> },
    ],
  },

  { path: "*", element: <Navigate to="/" replace /> },
], {
  basename: "/learninghub/demo2",
});
