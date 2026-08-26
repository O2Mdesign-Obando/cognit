Cognit Learning Hub Demo — Handoff Notes for Figma Make
Project Overview
Product: Cognit Learning Hub Demo — a multi-role learning management platform for coding education centers. Roles: Center Director, Coach, Family, Student, HQ Admin, Platform Admin. Target: Fully functional responsive prototype deployed to Vercel via GitHub.

Tech Stack & Deployment
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS with Cognit design tokens
Deployment: Vercel (automatic from GitHub main branch)
Responsive breakpoints: Desktop ≥1024px, Tablet 768–1023px, Mobile <768px
All screens designed at 1440px desktop; adapt fluidly. Mobile screens at 390px are provided for some loops.
Design System Tokens
Code block
Colors:
  --cognit-navy: #123F63         (primary brand / text / controls)
  --cognit-blue: #6FA8D3         (info / orientation / secondary)
  --cognit-teal: #18AAA5         (progress / positive / learning)
  --cognit-gold: #F2AB32         (meaningful emphasis / sparingly)
  --deep-navy: #092F4D           (high-contrast surfaces)
  --white: #FFFFFF               (primary canvas)
  --cool-50: #F6F8FA             (subtle background)
  --cool-100: #EEF2F5            (secondary surface)
  --cool-300: #CAD4DC            (borders / dividers)
Global Header Component
Present on ALL authenticated screens (not Login or Graduation).

Left: Cognit horizontal logo | vertical divider | "Learning Hub Demo" (Inter Medium 14px, cool-600)
Right: User avatar (32px circle) + name (Inter Medium 13px) + chevron down
Dropdown menu (200px wide, 10px radius, shadow): Support, [role-specific item], divider, Log Out (red)
Role-specific menu item: Center → "Settings", Family → "Account", Coach → "Profile"
Responsive: On mobile, logo collapses to icon-only; name hides, avatar remains.
LOOP 1: Login Screens
Frame: 
 Screens: 4 — login-center, login-coach, login-family, login-student Route: /login

Behavior
Single login page with role-based badge display (Center/Coach/Family/Student)
Centered card (max-width 420px) on white background
Top: Cognit full logo (stacked, centered)
Role badge (pill, teal background, white text)
Fields: Email (pre-filled demo values), Password
Checkbox: "Remember me" | Link: "Forgot password?"
Primary CTA: "Sign In" (full-width, Cognit Navy)
Footer: "Powered by Cognit.com" link
On submit → route to respective role's home page
Demo Data
Center: admin@cognit.com → /center/home
Coach: marcus@cognit.com → /coach/home
Family: martinez.family@gmail.com → /family/home
Student: saul@cognit.com → /student/home
Responsive
Card stays centered, max-width shrinks on mobile. Full-bleed on <480px.
LOOP 2: Center Loop (Center Director)
Frame: 
 Screens: 22 Route prefix: /center/

Navigation
Left sidebar (248px desktop): Cognit icon + "Cognit Hub" title + "ADMIN CONSOLE" subtitle
Sidebar items: Center, Branding, Academics, Integrations, Staff, Reports, Security
Active item: teal left border + teal icon
Responsive: Sidebar collapses to hamburger menu on tablet/mobile
Screens & Routes
Screen	Route	Description
kevin-hub-home	/center/home	Dashboard: greeting, today's schedule summary, quick stats, announcements editor, enrollment overview
kevin-hub-todays-classes	/center/classes	Today's class list: class cards with time, coach, room, student count, status chips (Active/Upcoming/Completed)
kevin-hub-coaches	/center/coaches	Coach roster: table with avatar, name, specialties, active classes, status. Click → coach profile
coach-profile-page	/center/coaches/:id	Coach detail: hero card with avatar (100px), bio, certifications, schedule, assigned courses
kevin-hub-students	/center/students	Student roster: table with avatar, name, enrollment, grade level, attendance. Click → student profile
student-profile-page	/center/students/:id	Student detail: avatar with ring, contact info, course history, progress charts, family link, coach notes
kevin-hub-courses	/center/courses	Course catalog: filterable list with course cards, enrollment, schedule, coach assignment
course-detail-page	/center/courses/:id	Course detail: description, syllabus, enrolled students, schedule, materials
kevin-hub-communication	/center/messages	Message center: inbox list (left) + message detail (right). Tabs: All, Families, Coaches
compose-message-screen	/center/messages/compose	Compose: To field (autocomplete), subject, rich text body, attachments
codewiz-read-message-family	/center/messages/:id	Read message from family: threaded conversation view
codewiz-read-message-coach	/center/messages/:id	Read message from coach: threaded conversation view
kevin-hub-scheduling	/center/schedule	Calendar: default daily view, room-based time grid
schedule-daily-view	/center/schedule/day	Daily: hour blocks, drag-to-reschedule, room columns
schedule-monthly-view	/center/schedule/month	Monthly: traditional calendar grid with class dots
schedule-season-view	/center/schedule/season	Season: term overview, enrollment windows, breaks
kevin-hub-tuition-billing	/center/billing	Billing dashboard: outstanding balances, payment history, family accounts
kevin-hub-payment-confirmation	/center/billing/confirm	Payment confirmation overlay/page
kevin-hub-update-payment	/center/billing/payment-method	Update payment method form
kevin-hub-reports-overview	/center/reports	Reports dashboard: pre-built report cards (Attendance, Revenue, Enrollment, etc.)
kevin-hub-report-builder	/center/reports/builder	Custom report builder: filters, columns, date range, preview, export
kevin-hub-review-observation	/center/observations	Coach observation review: session notes, ratings, feedback
Key Interactions
Sidebar navigation with active state
Data tables: sortable columns, search, pagination
Calendar: view switching (daily/monthly/season)
Message compose: recipient autocomplete, send confirmation
Reports: filter controls, chart rendering (use Recharts)
LOOP 3: Coach Loop — Single Course
Frame: 
 Screens: 4 (includes 1 mobile) Route prefix: /coach/

Screens & Routes
Screen	Route	Description
coach-homepage-desktop	/coach/home	Dashboard: greeting "Good afternoon, Marcus.", upcoming class card with countdown timer (circular progress, gold accent), today's schedule, student roster, curriculum notes
coach-during-class-desktop	/coach/class/:id/live	Live class view: top context banner (gradient navy→teal), timer, student grid with attendance checkboxes, real-time notes
coach-during-class-mobile	/coach/class/:id/live	Mobile version: stacked layout, swipeable student cards
coach-after-class-desktop-v2	/coach/class/:id/review	Post-class review: per-student observation cards with tags (Strength/Needs Support/Breakthrough), coach reflection, photo uploads, parent note drafts
Key Interactions
Countdown timer: circular progress ring (Cognit Gold border), real-time
Student attendance: checkbox toggles
Observation tagging: multi-select chips (Cognit Teal for positive, Gold for highlight)
Session notes: auto-save rich text
Responsive: Mobile layout provided for during-class — prioritize attendance and timer
LOOP 4: Coach Loop — Multiple Concurrent Classes
Frame: 
 Screens: 7 (includes 3 mobile) Route prefix: /coach/

Screens & Routes
Screen	Route	Description
coach-home-multiclass	/coach/home	Same home but with multiple class cards in "Today's Schedule"
during-class-multiclass	/coach/class/live	Multi-class live: tabs or selector to switch between concurrent sessions
after-class-multiclass	/coach/class/review	Multi-class review: tabbed review for each completed session
end-of-day-review	/coach/day-review	End-of-day summary across all sessions
mobile-class-selector-drawer	(mobile)	Bottom drawer: class selector list for switching
during-class-mobile-drawer-collapsed	(mobile)	Mobile live class with collapsed selector
during-class-mobile-multiclass	(mobile)	Mobile live class with expanded multi-class tabs
Key Interactions
Class switcher: tab bar or dropdown for concurrent classes
Mobile: bottom sheet drawer pattern for class selection
End-of-day: summary cards that can be submitted collectively
LOOP 5: Family Loop
Frame: 
 Screens: 5 Route prefix: /family/

Screens & Routes
Screen	Route	Description
family-homepage-desktop	/family/home	Welcome "Welcome back, Hayes Family": child's learning journey hero card with student avatar + coach quote, class enrollment status, messages preview, quick actions grid
learning-journey-enhanced-desktop	/family/journey	Deep learning timeline: hero banner with student photo, "What an incredible week of creation!" narrative, coach notes with avatar, "Moments Worth Remembering" photo gallery, reflection cards, achievement badges
family-tuition-billing	/family/billing	Billing: current balance, payment history, auto-pay settings, payment method on file
family-messages-inbox	/family/messages	Messages inbox: conversation list with coach/center avatars, unread indicators, timestamp
family-course-registration	/family/courses	Course catalog: browse/register for upcoming courses, filter by subject/age/schedule, enrollment CTA
Key Interactions
Learning journey: scrollable timeline with photos, coach notes, and student reflections
Course registration: filter → select → confirm enrollment flow
Billing: payment method update, receipt download
Messages: click to open thread, reply inline
Responsive: Single-column stack on mobile; hero images scale proportionally
LOOP 6: Student Loop
Frame: 
 Screens: 7 Route prefix: /student/

Design Notes — FUN & ENGAGING for kids/teens
Hero welcome banner with character illustration (student with robot) on navy→blue gradient
Context banners use gradient navy→teal for energy
Celebratory completion screen with student avatar (gold ring border) + teal checkmark
Gold time chip for urgency ("3:30 – 4:30 PM")
Larger type, more generous spacing, friendlier language
Screens & Routes
Screen	Route	Description
student-home-desktop	/student/home	Dashboard: "Good afternoon, Saúl" greeting, hero banner "Ready to code something amazing?", learning continuity stepper (Completed → Current → Upcoming), before-class card with lesson preview, My Courses list, Coach Notes
student-lesson-desktop	/student/lesson/:id	Lesson detail: gradient context banner, "Loops: For & While" objective, resource cards (Slides, Video, Code, Docs), external tool launcher ("Launch Codio →")
student-activity-desktop	/student/lesson/:id/activity	Active workspace: code editor area, instruction sidebar, bottom action bar with progress
student-resource-video-modal	/student/lesson/:id/resource/video	Modal overlay: video/slides player (900×700), close button, title
student-resource-code-modal	/student/lesson/:id/resource/code	Modal overlay: code sample viewer with syntax highlighting
student-reflection-desktop	/student/lesson/:id/reflect	Reflection form: mood selector, "What did you learn?" text area, rating
student-complete-desktop	/student/lesson/:id/complete	Celebration: student avatar with gold ring, teal ✓ circle, "Lesson Complete!", session summary (duration, status, mood, reflection text), "What's Next" card, "Back to Home" CTA
Key Interactions
Learning continuity stepper: visual progress through lesson stages
Resource cards: click to open modal overlays
External tool launch: opens Codio in new tab, Learning Hub stays open alongside
Reflection: mood emoji selector, free-text reflection
Completion: animated/celebratory state, session data summary
Responsive: Stack to single column on mobile; modals become full-screen on mobile
LOOP 7: Graduation Loop (Onboarding Wizard)
Frame: 
 Screens: 7 Route prefix: /onboarding/

Screens & Routes (linear wizard flow)
Screen	Route	Step	Description
graduation-welcome	/onboarding/welcome	1	Welcome to Cognit Learning Hub. Begin migration CTA
graduation-source-selection	/onboarding/source	2	"Where is your current infrastructure?" — select source system (iClassPro, Codio, manual) with radio cards
graduation-data-selection	/onboarding/data	3	Select data to bring forward: checkboxes for Students, Families, Coaches, Courses, Schedules
graduation-field-mapping	/onboarding/mapping	4	Field mapping table: source fields → Cognit fields with dropdowns
graduation-preview	/onboarding/preview	5	Preview imported data with counts and sample records
graduation-processing	/onboarding/processing	6	Progress animation: "Everything looks good..." with step indicators
graduation-success	/onboarding/success	7	"Everything important came with you." — success state, CTA to enter Learning Hub
Key Interactions
Linear stepper with progress indicator
Back/Next navigation with validation
Source selection: radio cards with icons
Field mapping: drag-drop or dropdown matching
Preview: expandable data table sections
Processing: animated progress bar or spinner
No sidebar navigation — standalone wizard flow
Responsive: Single column wizard, full-width cards on mobile
LOOP 8: Settings Screens
Frame: 
 Screens: 2 Route prefix: /settings/ or /account/

Screens & Routes
Screen	Route	Description
family-account-settings	/account/settings	Family settings: Security (password, 2FA), Contact Information (address, phone), Preferences (notifications toggles, language). Cancel/Save Changes buttons
center-configuration	/center/settings	Center config: left sidebar nav (Center, Branding, Academics, Integrations, Staff, Reports, Security). Right panel: Center Details, Academic Calendar, Staff & Permissions, Branding (logo upload, welcome message), Integrations (iClassPro, Codio, Stripe, OpenAI status cards), Data Imports, Security & Authentication
Key Interactions
Form validation on save
Toggle switches for notifications
Logo upload with preview
Integration status cards: Connected (green) / Not Connected (gray)
Calendar: add/edit academic terms and closures
Responsive: Sidebar collapses on mobile; sections stack vertically
LOOP 9: Support
Frame: 
 Screens: 3 Route prefix: /support/

Screens & Routes
Screen	Route	Description
coach-support-desktop	/support (coach)	Coach Support Hub: contact form (subject, priority, category, description), FAQ accordion by category
center-support-desktop	/support (center)	Center Support: same pattern, plus Active Support Tickets table with status chips
family-support-desktop	/support (family)	Family "How can we help you today?": contact form with problem type chips, FAQ grid cards, "Find Your Center" CTA at bottom
Key Interactions
Support form: validation, submit confirmation toast
FAQ: accordion expand/collapse, category filter tabs
Ticket tracking: status chips (Open/In Progress/Resolved)
"Find Your Center" → external map/locator
Responsive: Single column on mobile, FAQs stack
LOOP 10: Headquarters (HQ Admin)
Frame: 
 Screens: 9 Route prefix: /hq/

Navigation
Left sidebar: Cognit icon + "Cognit HQ" + "FRANCHISE CONSOLE"
Items: Dashboard, Network, Centers, Curriculum, Insights, Performance, Governance, Support, Deployment
Screens & Routes
Screen	Route	Description
hq-home	/hq/home	Dashboard: operational health across all centers, key metrics, alerts
hq-network-overview	/hq/network	Network map: all centers, health status, enrollment stats
hq-center-management	/hq/centers	Center list: management table with drill-down
hq-curriculum-management	/hq/curriculum	Curriculum catalog: courses, versioning, center adoption status
hq-operational-insights	/hq/insights	Charts: attendance trends, revenue, enrollment pipeline (use Recharts)
hq-franchise-performance	/hq/performance	Franchise performance: KPI cards, comparison tables, rankings
hq-governance	/hq/governance	Policies, compliance, audit trail
hq-support-escalation	/hq/support	Escalated support tickets from centers
hq-deployment-readiness	/hq/deployment	Platform version, feature rollouts, center readiness matrix
Key Interactions
Data-heavy tables with sort, filter, search, pagination
Chart rendering (Recharts or similar)
Status indicators: color-coded health dots
Drill-down navigation: HQ → Center → specific data
Responsive: Tables become card lists on mobile; charts resize fluidly
LOOP 11: Release Notes
Frame: 
 Screens: 10 (includes 2 mobile) Route prefix: /releases/

Screens & Routes
Screen	Route	Description
coach-release-overlay-desktop	/releases/latest (coach)	Modal overlay on existing page: version, date, what's new list, action badges
center-release-overlay-desktop	/releases/latest (center)	Same pattern for center directors
coach-release-archive-desktop	/releases/archive (coach)	Full page: release history list, expandable cards
center-release-archive-desktop	/releases/archive (center)	Extended version with more detail
coach-release-overlay-mobile	(mobile)	Full-screen release notes on mobile
center-release-overlay-mobile	(mobile)	Full-screen release notes on mobile
release-archive-empty	/releases/archive	Empty state: no previous releases
release-known-issue-variant		Release with "Known Issue" badge (amber)
release-action-required-variant		Release with "Action Required" badge (red)
release-no-action-variant		Release with "No Action Needed" badge (green)
Key Interactions
Overlay dismiss (X or click outside)
Archive: expandable/collapsible release cards
Badge variants: visual status indicators
Responsive: Overlay becomes full-screen sheet on mobile
LOOP 12: Module Control
Frame: 
 Screens: 5 (includes 2 mobile) Route prefix: /admin/modules/

Screens & Routes
Screen	Route	Description
center-module-control-desktop	/center/modules	Center-level: toggle available Learning Hub capabilities. Required modules locked
platform-admin-module-control	/admin/modules	Platform admin: manage which capabilities are required/available/unavailable across ALL centers
hq-module-control	/hq/modules	HQ view: franchise-wide module governance
center-module-control-mobile	(mobile)	Mobile center modules
platform-admin-module-mobile	(mobile)	Mobile platform admin modules
Key Interactions
Module toggle switches: Available/Unavailable
Required modules: locked indicator, can't be disabled
Hierarchical control: Platform Admin → HQ → Center
Audit log: actions are signed and captured
Responsive: Module cards stack on mobile
LOOP 13: New Screens (Attendance & Makeup Credits)
Frame: 
 Screens: 12 (mixed desktop/mobile/tablet) Route prefix: various

Screens & Routes
Screen	Route	Description
family-report-absence-mobile	/family/absence/report	Mobile form: report upcoming absence, date picker, reason
family-absence-confirmed-mobile	/family/absence/confirmed	Confirmation: absence recorded, makeup credit info
center-record-absence-desktop	/center/attendance/absence	Center records absence on behalf of family
session-attendance-desktop	/center/attendance/:sessionId	Session attendance: student roster with present/absent/late toggles
session-attendance-mobile	(mobile)	Mobile attendance taking
center-cancel-sessions-desktop	/center/schedule/cancel	Bulk session cancellation: select sessions, reason, notification preview
center-cancel-confirmed-desktop	/center/schedule/cancel/confirmed	Cancellation confirmed, makeup credits auto-issued
center-student-makeup-credits-desktop	/center/credits	Makeup credit management: student credit balances, usage history
family-makeup-credits-mobile	/family/credits	Family view: available makeup credits, book makeup session
family-messages-attendance-mobile	/family/messages	Attendance-related message notification
student-loop-todays-work	/student/today	Tablet (1024px): today's work overview
student-loop-active-learning	/student/today/active	Tablet (1024px): active learning session
Key Interactions
Absence reporting: date picker, reason dropdown, confirmation
Attendance: toggle switches per student (Present/Absent/Late)
Makeup credits: balance display, booking flow
Session cancellation: multi-select, reason, auto-notification
Responsive: Mobile-first for family flows; desktop-first for center admin flows
Routing Architecture Summary
Code block
/login                          → Login (all roles)
/onboarding/*                   → Graduation wizard (7 steps)
/center/*                       → Center Director loop (sidebar nav)
/coach/*                        → Coach loop (top nav / context banner)
/family/*                       → Family loop (simple top nav)
/student/*                      → Student loop (contextual, fun)
/hq/*                           → HQ Admin loop (sidebar nav)
/admin/modules/*                → Platform Admin module control
/support                        → Support (role-specific)
/releases/*                     → Release notes
Responsive Strategy
Breakpoint	Width	Layout
Desktop	≥1024px	Sidebar + content (or full-width)
Tablet	768–1023px	Collapsed sidebar (hamburger), content adapts
Mobile	<768px	Single column, bottom sheet for navigation, full-screen modals
All images, avatars, and logos are already embedded in the Figma file. Export them as assets for the build.

These notes cover all 97 screens across 13 loops. You can feed each LOOP section individually into Figma Make for incremental builds. I'd recommend starting with Login → Center Loop → Coach Loop → Family Loop → Student Loop as the core demo flow, then layering in HQ, Settings, Support, and the remaining screens.

