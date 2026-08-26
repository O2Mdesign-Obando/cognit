import { Link } from "react-router";
import { User, Users, Calendar, Check } from "lucide-react";
import { Card, Button, Badge, PageTitle } from "../../components/ui";

const ctaLink = (cta: string) =>
  cta.startsWith("Review") ? "/center/observations" : cta === "Generate Reports" ? "/center/reports/generate" : "/center/coaches";

const STATS = [
  { label: "Total Observations Pending", value: "12", sub: "Awaiting your final sign-off" },
  { label: "Courses Ready for Review", value: "4 of 6", sub: "Most coaches have submitted" },
  { label: "Students Awaiting Reports", value: "18", sub: "Across Plainsboro cohorts" },
  { label: "Reports Sent This Month", value: "5", sub: "Target: 45 by month end" },
];

const COURSES = [
  { name: "Python Prodigy", coach: "Marcus", tag: "Ready for Review", tone: "teal" as const, line: <><span className="font-semibold text-navy">4 students</span> with pending observations</>, meta: "Last observation submitted: Jul 31 2026", cta: "Review Observations", variant: "primary" as const },
  { name: "Robotics Camp Sumo Bots", coach: "Marcus", tag: "Ready for Review", tone: "teal" as const, line: <><span className="font-semibold text-navy">3 students</span> with pending observations</>, meta: "Last observation submitted: Jul 30 2026", cta: "Review Observations", variant: "primary" as const },
  { name: "Scratch Creators", coach: "Sarah", tag: "Partially Ready", tone: "gold" as const, line: <><span className="font-semibold text-navy">3 students</span> with pending observations <span className="font-semibold text-gold">(2 of 5 observed)</span></>, meta: "Last observation submitted: Jul 29 2026", cta: "Review Available", variant: "outline" as const },
  { name: "Robotics Explorers", coach: "Marcus", tag: "Ready for Review", tone: "teal" as const, line: <><span className="font-semibold text-navy">2 students</span> with pending observations</>, meta: "Last observation submitted: Jul 28 2026", cta: "Review Observations", variant: "primary" as const },
  { name: "Web Dev Basics", coach: "Unassigned Coach", tag: "No Observations", tone: "red" as const, muted: true, line: <>0 students observed</>, meta: "Observations require coach assignment first", cta: "Assign Coach", variant: "outline" as const },
  { name: "Game Design Studio", coach: "Sarah", tag: "All Reviewed", tone: "blue" as const, reviewed: true, line: <span className="flex items-center gap-1.5"><Check size={15} className="text-teal" /> All student observations approved and signed off</span>, meta: "Reviewed by Jack on Jul 31 2026", cta: "Generate Reports", variant: "gold" as const },
];

export default function Reports() {
  return (
    <div className="animate-fade-up">
      <PageTitle title="Reports" subtitle="Review observations and generate family Learning Journey reports" />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="px-5 py-5">
            <p className="text-[13px] font-medium text-cool-600">{s.label}</p>
            <p className="mt-2 text-[34px] font-semibold tracking-tight text-navy">{s.value}</p>
            <p className="mt-2 text-xs text-cool-600">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {COURSES.map((c) => (
          <Card key={c.name} className="flex flex-col p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-[21px] font-semibold ${c.muted ? "text-cool-600" : "text-navy"}`}>{c.name}</h3>
                <p className={`mt-1 flex items-center gap-1.5 text-sm ${c.coach.includes("Unassigned") ? "font-semibold text-[#c23b3b]" : "text-cool-600"}`}>
                  <User size={14} /> {c.coach.includes("Unassigned") ? c.coach : `Coach ${c.coach}`}
                </p>
              </div>
              <Badge tone={c.tone}>{c.tag}</Badge>
            </div>
            <div className="mt-4 space-y-2 border-t border-cool-300/50 pt-4 text-sm text-cool-600">
              <p className="flex items-center gap-2">{c.reviewed ? null : <Users size={15} />} {c.line}</p>
              <p className="flex items-center gap-2"><Calendar size={15} /> {c.meta}</p>
            </div>
            <div className="mt-5 flex justify-end">
              <Link to={ctaLink(c.cta)}><Button variant={c.variant}>{c.cta}</Button></Link>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <h2 className="mb-4 text-[20px] font-semibold text-navy">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/center/reports/generate"><Button variant="primary">Generate All Reports (fully reviewed)</Button></Link>
          <Link to="/center/observations"><Button variant="outline">Bulk Review Mode</Button></Link>
        </div>
      </Card>
    </div>
  );
}
