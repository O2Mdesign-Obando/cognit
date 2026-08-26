import { Link } from "react-router";
import { Plus, Search, ChevronDown, ArrowUpDown, CalendarX } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const STUDENTS = [
  { name: "Saúl Martinez", age: 10, course: "Python Prodigy", coach: "Marcus", coachTone: "gold", status: "Active", statusTone: "teal" as const, family: "Martinez Family" },
  { name: "Emma Rivera", age: 9, course: "Python Prodigy", coach: "Marcus", coachTone: "gold", status: "Active", statusTone: "teal" as const, family: "Rivera Family" },
  { name: "Jake Thompson", age: 11, course: "Robotics Explorers", coach: "Marcus", coachTone: "gold", status: "Active", statusTone: "teal" as const, family: "Thompson Family" },
  { name: "Lily Chen", age: 8, course: "Scratch Creators", coach: "Sarah", coachTone: "gold", status: "Active", statusTone: "teal" as const, family: "Chen Family" },
  { name: "Noah Brooks", age: 12, course: "Web Dev Basics", coach: "Unassigned", coachTone: "gray", status: "Waitlist", statusTone: "gold" as const, family: "Brooks Family" },
  { name: "Robert Hayes", age: 10, course: "Robotics Camp: Sumo Bots, Python…", coach: "Marcus", coachTone: "gold", status: "Active", statusTone: "teal" as const, family: "Hayes Family" },
];

const FILTERS = ["All Courses", "Active / Inactive", "All Coaches"];

export default function Students() {
  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[38px] font-semibold tracking-tight text-navy">Student Roster</h1>
          <p className="mt-1 text-[15px] text-cool-600">14 students enrolled · <span className="font-semibold text-teal">12 active</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/center/students/absence"><Button variant="outline"><CalendarX size={15} /> Record Absence</Button></Link>
          <Link to="/center/students/new"><Button variant="gold"><Plus size={16} /> Enroll New Student</Button></Link>
        </div>
      </div>

      <Card className="mb-5 p-5">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Search</p>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cool-600" />
              <input placeholder="Search students..." className="w-full rounded-[10px] border border-cool-300 bg-white py-2.5 pl-9 pr-3 text-sm text-navy outline-none focus:border-navy" />
            </div>
          </div>
          {FILTERS.map((f) => (
            <div key={f}>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{f.split(" ")[1] ? f : f}</p>
              <button className="flex items-center gap-2 rounded-[10px] border border-cool-300 bg-white px-3 py-2.5 text-sm font-semibold text-navy">
                {f} <ChevronDown size={15} />
              </button>
            </div>
          ))}
          <button className="rounded-[10px] border border-cool-300 bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:border-navy">Reset Filters</button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                <th className="px-5 py-3.5"><span className="inline-flex items-center gap-1">Name <ArrowUpDown size={12} /></span></th>
                <th className="py-3.5">Age</th>
                <th className="py-3.5">Enrolled Courses</th>
                <th className="py-3.5">Coach</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Family</th>
                <th className="py-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cool-300/40">
              {STUDENTS.map((s) => (
                <tr key={s.name}>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-3 font-semibold text-navy">
                      <Avatar name={s.name} size={34} /> {s.name}
                    </span>
                  </td>
                  <td className="py-4 text-navy">{s.age}</td>
                  <td className="py-4 font-medium text-navy">{s.course}</td>
                  <td className="py-4">
                    <span className="flex items-center gap-2 text-navy">
                      <span className={`h-1.5 w-1.5 rounded-full ${s.coachTone === "gold" ? "bg-gold" : "bg-cool-300"}`} /> {s.coach}
                    </span>
                  </td>
                  <td className="py-4"><Badge tone={s.statusTone}>{s.status}</Badge></td>
                  <td className="py-4 text-cool-600">{s.family}</td>
                  <td className="py-4 pr-5 text-right">
                    <Link to="/center/students/1" className="rounded-[8px] border border-cool-300 px-3 py-1.5 text-xs font-semibold text-navy hover:border-navy">View Profile</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 flex items-center justify-between text-sm text-cool-600">
        <p>Showing <span className="font-semibold text-navy">6</span> of <span className="font-semibold text-navy">14</span> students · Page 1 of 3</p>
        <div className="flex items-center gap-2">
          <button className="rounded-[8px] border border-cool-300 px-2.5 py-1.5 font-semibold text-navy">‹</button>
          <button className="rounded-[8px] bg-navy px-3 py-1.5 font-semibold text-white">1</button>
          <button className="rounded-[8px] border border-cool-300 px-3 py-1.5 font-semibold text-navy">2</button>
          <button className="rounded-[8px] border border-cool-300 px-3 py-1.5 font-semibold text-navy">3</button>
          <button className="rounded-[8px] border border-cool-300 px-2.5 py-1.5 font-semibold text-navy">›</button>
        </div>
      </div>
    </div>
  );
}
