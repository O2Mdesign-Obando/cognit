import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronDown, ChevronUp, Calendar, Clock, Trash2, Plus, FileText, Video, Info } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const STUDENTS = ["Robert Hayes", "Saúl Martinez", "Emma Rivera", "Jake Thompson", "Lily Chen", "Noah Brooks"];
const MODULES = [
  { day: "Day 1 · Mon Jul 21", title: "Introduction & Design Brief", status: "Completed", tone: "teal" as const },
  { day: "Day 2 · Tue Jul 22", title: "Chassis Design & 3D Printing", status: "Completed", tone: "teal" as const },
  { day: "Day 8 · Fri Aug 1", title: "Sensor Integration & Code Logic", status: "Today", tone: "gold" as const, open: true },
  { day: "Day 9 · Mon Aug 4", title: "Battle Strategy & Code Optimization", status: "Upcoming", tone: "blue" as const },
  { day: "Day 10 · Tue Aug 5", title: "Tournament Practice Rounds", status: "Upcoming", tone: "blue" as const },
];

export default function CourseDetail() {
  const [open, setOpen] = useState("Day 8 · Fri Aug 1");
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/courses" className="hover:text-navy">Courses</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Robotics Camp: Sumo Bots</span>
      </p>

      <Card className="mb-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-semibold tracking-tight text-navy">Robotics Camp: Sumo Bots</h1>
            <p className="mt-1 text-sm text-cool-600">Course Code: RC-2026-SUM-04</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-[10px] border border-teal/40 bg-teal/8 px-3 py-2 text-sm font-semibold text-teal">● Active <ChevronDown size={14} /></button>
            <Button variant="outline">Edit Course Details</Button>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-12 gap-y-3 border-t border-cool-300/50 pt-5">
          <span className="flex items-center gap-2.5"><Calendar size={18} className="text-gold" /><span><span className="block text-[11px] font-semibold uppercase tracking-wide text-cool-600">Schedule</span><span className="font-semibold text-navy">Summer · Daily · M-F 10:00 AM - 12:00 PM</span></span></span>
          <span className="flex items-center gap-2.5"><Clock size={18} className="text-blue" /><span><span className="block text-[11px] font-semibold uppercase tracking-wide text-cool-600">Duration</span><span className="font-semibold text-navy">Jul 21 - Aug 15, 2026 (4 weeks)</span></span></span>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* left column */}
        <div className="space-y-6">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Assigned Coach</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Avatar name="Marcus Rivera" size={44} />
                <span><span className="block font-semibold text-navy">Marcus Rivera</span><span className="block text-xs text-cool-600">Lead Instructor</span></span>
              </span>
              <button className="text-sm font-semibold text-[#a9741a] underline underline-offset-2">Change Coach</button>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Enrolled Students ({STUDENTS.length})</p>
              <span className="text-xs font-semibold text-gold">6/8 Max</span>
            </div>
            <div className="mt-3 divide-y divide-cool-300/40">
              {STUDENTS.map((s) => (
                <div key={s} className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-2.5"><Avatar name={s} size={30} /><span className="text-sm font-medium text-navy">{s}</span></span>
                  <button className="text-[#dc4b4b] hover:text-[#c23b3b]"><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
            <Button variant="outline" full className="mt-3"><Plus size={15} /> Enroll Student</Button>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Course Description</p>
              <button className="text-sm font-semibold text-[#a9741a] underline underline-offset-2">Edit</button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cool-600">Students design, 3D print, program, and battle custom sumo robots. Combines mechanical engineering, CAD design, Arduino programming, and competitive strategy. Culminates in a class tournament.</p>
          </Card>
        </div>

        {/* right column: modules */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-[24px] font-semibold text-navy">Daily Modules</h2>
              <p className="text-sm text-cool-600">Summer course — one module per class day</p>
            </div>
            <Badge tone="gold">Day 8 of 20 complete</Badge>
          </div>

          <div className="space-y-3">
            {MODULES.map((m) => {
              const isOpen = open === m.day;
              return (
                <Card key={m.day} className={`overflow-hidden ${isOpen ? "border-gold/60" : ""}`}>
                  <button onClick={() => setOpen(isOpen ? "" : m.day)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                    <span>
                      <span className="flex items-center gap-2 text-[13px] font-semibold text-navy">{m.day} <Badge tone={m.tone}>{m.status}</Badge></span>
                      <span className="mt-1 block text-[18px] font-semibold text-navy">{m.title}</span>
                    </span>
                    {isOpen ? <ChevronUp size={18} className="text-cool-600" /> : <ChevronDown size={18} className="text-cool-600" />}
                  </button>
                  {isOpen && m.open && (
                    <div className="border-t border-cool-300/50 px-5 py-5">
                      <p className="text-sm leading-relaxed text-cool-600">Students wire proximity and line sensors to their bots and write conditional logic to respond to opponent detection and ring boundaries.</p>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[12px] bg-cool-50 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Objectives</p>
                          <ul className="mt-2 space-y-1 text-sm text-navy">
                            <li>• Wire and calibrate proximity sensor</li>
                            <li>• Implement if/else logic for sensor readings</li>
                            <li>• Test boundary detection on practice ring</li>
                          </ul>
                        </div>
                        <div className="rounded-[12px] bg-cool-50 p-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Expected Outcomes</p>
                          <ul className="mt-2 space-y-1 text-sm text-navy">
                            <li>• Bot detects opponent within 15cm range</li>
                            <li>• Bot stops at ring boundary line</li>
                            <li>• Student can explain their conditional logic verbally</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Coach Resources</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Resource icon={<FileText size={14} />} name="Arduino_Sensor_Wiring_Guide.pdf" />
                        <Resource icon={<FileText size={14} />} name="Sumo_Bot_Day8_Slides.pptx" />
                        <Resource icon={<Video size={14} />} name="Practice Ring Setup Video" />
                      </div>
                      <div className="mt-4 border-t border-cool-300/50 pt-4">
                        <Button variant="outline">Edit Module</Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <Button variant="gold"><Plus size={16} /> Add Module</Button>
            <button className="text-sm font-semibold text-navy underline underline-offset-2">Reorder Modules</button>
          </div>

          <Card accent="gold" className="mt-5 flex items-center gap-2.5 px-5 py-4 text-sm text-cool-600">
            <Info size={17} className="shrink-0 text-gold" /> For Fall/Spring courses, modules are organized weekly instead of daily.
          </Card>
        </div>
      </div>
    </div>
  );
}

function Resource({ icon, name }: { icon: React.ReactNode; name: string }) {
  return <span className="flex items-center gap-1.5 rounded-[8px] border border-cool-300 bg-white px-3 py-2 text-sm font-medium text-navy">{icon} {name}</span>;
}
