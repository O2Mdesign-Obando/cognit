import { useState } from "react";
import { Link } from "react-router";
import { Plus, ChevronDown, ChevronRight, Search, User, Calendar, Users, Clock, Info } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

const COURSES = [
  { name: "Python Prodigy", coach: "Marcus", schedule: "M/W/F 10:00 AM", enrolled: "3 students", week: "Week 1 of 8" },
  { name: "Robotics Explorers", coach: "Marcus", schedule: "M/W/F 1:00 PM", enrolled: "4 students", week: "Week 3 of 8" },
  { name: "Scratch Creators", coach: "Sarah", schedule: "Tu/Th 3:30 PM", enrolled: "5 students", week: "Week 2 of 6" },
  { name: "Web Dev Basics", coach: "Unassigned", schedule: "M/W 5:00 PM", enrolled: "2 students", week: "Week 1 of 4" },
  { name: "Robotics Camp: Sumo Bots", coach: "Marcus", schedule: "Daily (Summer)", enrolled: "6 students", week: "Week 2 of 4" },
  { name: "Game Design Studio", coach: "Sarah", schedule: "Sat 10:00 AM", enrolled: "3 students", week: "Week 5 of 10" },
];

export default function Courses() {
  const [tab, setTab] = useState("Active");
  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[38px] font-semibold tracking-tight text-navy">Courses</h1>
          <p className="mt-1 text-[15px] text-cool-600">6 active · 2 inactive</p>
        </div>
        <div className="text-right">
          <Button variant="gold"><Plus size={16} /> New Course <ChevronDown size={15} /></Button>
          <p className="mt-1.5 text-xs text-cool-600">Start from scratch, copy existing, or copy past course</p>
        </div>
      </div>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="inline-flex rounded-[10px] border border-cool-300/70 bg-white p-1">
          {["Active", "Inactive", "All"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-[8px] px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-navy text-white" : "text-cool-600 hover:text-navy"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cool-600" />
          <input placeholder="Search courses..." className="w-full rounded-[10px] border border-cool-300 bg-white py-2.5 pl-9 pr-3 text-sm text-navy outline-none focus:border-navy" />
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {COURSES.map((c) => {
          const unassigned = c.coach === "Unassigned";
          return (
            <Card key={c.name} className="p-6">
              <div className="flex items-start justify-between border-b border-cool-300/50 pb-4">
                <h3 className="text-[22px] font-semibold text-navy">{c.name}</h3>
                <Badge tone="teal">Active</Badge>
              </div>
              <div className="mt-4 space-y-2.5 text-sm text-cool-600">
                <p className="flex items-center gap-2"><User size={15} /> Coach: {unassigned ? <span className="font-semibold text-[#c23b3b]">Unassigned</span> : <span className="font-semibold text-navy">{c.coach}</span>}</p>
                <p className="flex items-center gap-2"><Calendar size={15} /> Schedule: <span className="font-semibold text-navy">{c.schedule}</span></p>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2"><Users size={15} /> Enrolled: <span className="font-semibold text-navy">{c.enrolled}</span></p>
                  <p className="flex items-center gap-2"><Clock size={15} /> Current: <span className="font-semibold text-gold">{c.week}</span></p>
                </div>
              </div>
              <Link to="/center/courses/1" className="mt-5 block"><Button variant="outline" full>Manage Course <ChevronRight size={15} /></Button></Link>
            </Card>
          );
        })}
      </div>

      <Card accent="gold" className="mt-6 flex items-start gap-2.5 px-5 py-4 text-sm text-cool-600">
        <Info size={17} className="mt-0.5 shrink-0 text-gold" />
        <p>Click <span className="font-semibold text-navy">Manage Course</span> to edit curriculum, daily/weekly goals, expected outcomes, scheduling, and enrollment.</p>
      </Card>
    </div>
  );
}
