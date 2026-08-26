import { useState } from "react";
import { ChevronRight, User, Users, AlertTriangle, BookOpen, Star } from "lucide-react";
import { Card, Button, Badge, Segmented } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const CLASSES = [
  { time: "10:00 AM", name: "Python Prodigy (Intermediate)", coach: "Marcus", students: 3, status: "IN PROGRESS", tone: "teal" as const },
  { time: "1:00 PM", name: "Robotics Explorers (Level 1)", coach: "Marcus", students: 4, status: "UPCOMING", tone: "blue" as const },
  { time: "3:30 PM", name: "Scratch Creators (Beginner)", coach: "Sarah", students: 5, status: "UPCOMING", tone: "blue" as const },
];

export default function TodaysClasses() {
  const [view, setView] = useState("Daily View");
  return (
    <div className="animate-fade-up">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[38px] font-semibold tracking-tight text-navy">Today&apos;s Schedule</h1>
          <p className="mt-1 text-[15px] text-cool-600">Friday, August 1 — Plainsboro Center</p>
        </div>
        <Segmented options={["Daily View", "Weekly", "Monthly"]} value={view} onChange={setView} />
      </div>

      <div className="space-y-4">
        {CLASSES.map((c) => (
          <Card key={c.name} className="flex items-center gap-5 px-5 py-4">
            <span className="shrink-0 rounded-[10px] bg-cool-100 px-4 py-2.5 text-sm font-bold text-navy">{c.time}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[19px] font-semibold text-navy">{c.name}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cool-600">
                <span className="flex items-center gap-1.5"><User size={14} /> Coach: {c.coach}</span>
                <span className="flex items-center gap-1.5"><Users size={14} /> {c.students} students enrolled</span>
              </p>
            </div>
            <Badge tone={c.tone}>● {c.status}</Badge>
            <ChevronRight size={20} className="text-cool-600" />
          </Card>
        ))}

        {/* Attention-required class */}
        <Card accent="red" className="overflow-hidden">
          <div className="flex items-center gap-5 px-5 py-4">
            <span className="shrink-0 rounded-[10px] bg-cool-100 px-4 py-2.5 text-sm font-bold text-navy">5:00 PM</span>
            <div className="min-w-0 flex-1">
              <p className="text-[19px] font-semibold text-navy">Web Dev Basics</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-[#c23b3b]"><User size={14} /> Coach: Unassigned</span>
                <span className="flex items-center gap-1.5 text-cool-600"><Users size={14} /> 2 students enrolled</span>
              </p>
            </div>
            <Badge tone="red">● Needs Coach</Badge>
            <Button variant="primary">Assign Coach</Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cool-300/50 bg-[#dc4b4b]/5 px-5 py-4">
            <div className="max-w-2xl">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-[#c23b3b]">
                <AlertTriangle size={14} /> Attention Required
              </p>
              <p className="mt-1 text-sm text-cool-600">
                There are currently 2 enrolled students waiting for a coach assignment. Sarah and Marcus are both teaching prior sessions and may be available for back-to-back assignment.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline"><Avatar name="Sarah Chen" size={20} ring /> Assign Sarah</Button>
              <Button variant="outline"><Avatar name="Marcus Reed" size={20} /> Assign Marcus</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4 px-6 py-5">
        <Summary icon={<BookOpen size={18} />} value="4 Classes" label="Scheduled Today" tint="bg-gold/15 text-gold" />
        <Summary icon={<Users size={18} />} value="14 Students" label="Attending Total" tint="bg-blue/15 text-blue" />
        <Summary icon={<Star size={18} />} value="2 Coaches" label="Active Today" tint="bg-teal/15 text-teal" />
        <span className="ml-auto flex items-center gap-2 rounded-full bg-[#dc4b4b]/10 px-4 py-2 text-sm font-semibold text-[#c23b3b]">
          <AlertTriangle size={15} /> 1 Class requires immediate assignment
        </span>
      </Card>
    </div>
  );
}

function Summary({ icon, value, label, tint }: { icon: React.ReactNode; value: string; label: string; tint: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${tint}`}>{icon}</span>
      <div>
        <p className="text-[19px] font-semibold text-navy">{value}</p>
        <p className="text-xs text-cool-600">{label}</p>
      </div>
    </div>
  );
}
