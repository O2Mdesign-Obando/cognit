import { Link } from "react-router";
import { Pencil, ChevronRight, Calendar, BookOpen, Users, Plus } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const CONTACT = [
  ["First Name", "Marcus"],
  ["Last Name", "Rivera"],
  ["Home Address", "123 Oak Street, Plainsboro, NJ 08536"],
  ["Phone Number", "(609) 555-0142"],
  ["Cell Phone", "(609) 555-0198"],
  ["Cognit Email", "marcus.r@cognit-plainsboro.com"],
  ["Personal Email", "marcus.rivera@gmail.com"],
];

const STATS = [
  ["22", "Total Students Taught"],
  ["2", "Courses Completed"],
  ["3", "Courses Active"],
  ["4.8/5", "Observation Quality"],
];

const EXPERTISE = ["Python", "Robotics", "Arduino", "Scratch", "3D Printing"];

const TRACK = [
  { name: "Python Prodigy", tag: "Current", tone: "gold" as const, meta: "Week 1 of 8 · 3 students · Started Aug 1" },
  { name: "Robotics Explorers", tag: "Current", tone: "gold" as const, meta: "Week 3 of 8 · 4 students · Started Jul 14" },
  { name: "Robotics Camp: Sumo Bots", tag: "Current", tone: "gold" as const, meta: "Week 2 of 4 · 6 students" },
  { name: "Scratch Basics", tag: "Completed", tone: "gray" as const, meta: "8 weeks · 5 students · May - Jun 2026" },
  { name: "Intro to Python", tag: "Completed", tone: "gray" as const, meta: "10 weeks · 4 students · Mar - May 2026" },
];

export default function CoachProfile() {
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/coaches" className="hover:text-navy">Coaches</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Marcus Rivera</span>
      </p>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-5">
          <Avatar name="Marcus Rivera" size={72} ring />
          <div>
            <h1 className="flex items-center gap-3 text-[30px] font-semibold tracking-tight text-navy">
              Marcus Rivera <Badge tone="teal">● Active</Badge>
            </h1>
            <p className="mt-0.5 text-[15px] text-cool-600">Lead Robotics Coach</p>
          </div>
        </div>
        <div className="text-right">
          <Button variant="outline"><Pencil size={15} /> Edit Profile</Button>
          <p className="mt-2 text-sm font-semibold text-[#c23b3b] underline underline-offset-2">Deactivate Coach Account</p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Contact Information</h2>
            <div className="mt-5 divide-y divide-cool-300/40">
              {CONTACT.map(([label, val]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>
                    <p className="mt-0.5 font-semibold text-navy">{val}</p>
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-cool-300 text-cool-600 hover:border-navy hover:text-navy"><Pencil size={13} /></button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Expertise</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {EXPERTISE.map((e) => <Badge key={e} tone="blue">{e}</Badge>)}
              <button className="flex items-center gap-1 rounded-full border border-gold/50 px-3 py-0.5 text-[11px] font-semibold text-[#a9741a] hover:bg-gold/10"><Plus size={12} /> Add</button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-navy">Notes from Center Director</h2>
              <button className="flex items-center gap-1.5 rounded-[8px] border border-gold/50 px-3 py-1.5 text-xs font-semibold text-[#a9741a] hover:bg-gold/10"><Pencil size={13} /> Edit Notes</button>
            </div>
            <div className="mt-4 rounded-[12px] bg-cool-50 px-4 py-3.5 text-sm text-cool-600">
              Marcus is excellent with younger students. Consider him for the advanced Python track in fall. Completed SafeSport certification July 2026.
            </div>
            <p className="mt-3 text-xs text-cool-600">Last updated: <span className="font-semibold text-navy">Jul 28, 2026</span></p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Quick Stats</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {STATS.map(([v, l]) => (
                <div key={l} className="rounded-[12px] bg-cool-50 px-5 py-4">
                  <p className="text-[28px] font-semibold tracking-tight text-navy">{v}</p>
                  <p className="mt-0.5 text-xs text-cool-600">{l}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 border-t border-cool-300/50 pt-4 text-sm text-cool-600">
              <Calendar size={14} /> Member since: <span className="font-semibold text-navy">March 2026</span>
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Course Track Record</h2>
            <div className="mt-4 space-y-3">
              {TRACK.map((t) => (
                <div key={t.name} className="rounded-[12px] border border-cool-300/60 px-4 py-3.5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-navy">{t.name}</p>
                    <Badge tone={t.tone}>{t.tag}</Badge>
                  </div>
                  <p className="mt-1.5 flex items-center gap-3 text-xs text-cool-600">
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {t.meta.split(" · ")[0]}</span>
                    {t.meta.split(" · ").slice(1).map((m) => (
                      <span key={m} className="flex items-center gap-1"><Users size={12} /> {m}</span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
