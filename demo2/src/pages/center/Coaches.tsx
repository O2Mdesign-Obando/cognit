import { Link } from "react-router";
import { Plus, Search, ChevronDown } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const COACHES = [
  { name: "Marcus Rivera", status: "Active", tone: "teal" as const, courses: ["Python Prodigy", "Robotics Explorers"], students: "7 students", active: "Today" },
  { name: "Sarah Chen", status: "Active", tone: "teal" as const, courses: ["Scratch Creators"], students: "5 students", active: "Today" },
  { name: "David Park", status: "On Leave", tone: "gold" as const, courses: [], students: "0 students", active: "Jul 15" },
  { name: "Lisa Torres", status: "Inactive", tone: "gray" as const, courses: [], students: "0 students", active: "Jun 28" },
];

export default function Coaches() {
  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[38px] font-semibold tracking-tight text-navy">Coach Roster</h1>
          <p className="mt-1 text-[15px] text-cool-600">4 coaches · <span className="font-semibold text-teal">2 active today</span></p>
        </div>
        <Link to="/center/coaches/new"><Button variant="gold"><Plus size={16} /> Add New Coach</Button></Link>
      </div>

      <Card className="mb-5 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="relative min-w-[260px] flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cool-600" />
          <input
            placeholder="Search coaches..."
            className="w-full rounded-[10px] border border-cool-300 bg-white py-2.5 pl-9 pr-3 text-sm text-navy outline-none focus:border-navy"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-cool-600">Filter by Status:</span>
          <button className="flex items-center gap-2 rounded-[10px] border border-cool-300 bg-white px-3 py-2.5 text-sm font-semibold text-navy">
            All Statuses <ChevronDown size={15} />
          </button>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                <th className="px-5 py-3.5">Coach Name</th>
                <th className="py-3.5">Status</th>
                <th className="py-3.5">Assigned Courses</th>
                <th className="py-3.5">Students</th>
                <th className="py-3.5">Last Active</th>
                <th className="py-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cool-300/40">
              {COACHES.map((c) => (
                <tr key={c.name}>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-3 font-semibold text-navy">
                      <Avatar name={c.name} size={34} /> {c.name}
                    </span>
                  </td>
                  <td className="py-4"><Badge tone={c.tone}>● {c.status}</Badge></td>
                  <td className="py-4">
                    {c.courses.length ? (
                      <span className="flex flex-wrap gap-1.5">
                        {c.courses.map((co) => <Badge key={co} tone="blue">{co}</Badge>)}
                      </span>
                    ) : (
                      <span className="text-cool-300">None Assigned</span>
                    )}
                  </td>
                  <td className="py-4 text-navy">{c.students}</td>
                  <td className="py-4 text-cool-600">{c.active}</td>
                  <td className="py-4 pr-5 text-right">
                    <span className="inline-flex gap-2">
                      <Link to="/center/coaches/1" className="rounded-[8px] border border-cool-300 px-3 py-1.5 text-xs font-semibold text-navy hover:border-navy">Profile</Link>
                      <Link to="/center/coaches/1" className="rounded-[8px] border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-[#a9741a] hover:bg-gold/20">Edit</Link>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 flex items-center justify-between text-sm text-cool-600">
        <p>Showing <span className="font-semibold text-navy">4</span> of <span className="font-semibold text-navy">4</span> coaches</p>
        <div className="flex gap-2">
          <button className="rounded-[8px] border border-cool-300 px-3 py-1.5 font-semibold text-cool-300" disabled>Previous</button>
          <button className="rounded-[8px] border border-cool-300 px-3 py-1.5 font-semibold text-cool-300" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
