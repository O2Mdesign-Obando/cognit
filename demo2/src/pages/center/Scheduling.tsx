import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, User, Users, MapPin, ChevronDown, Check } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

/* ------------------------------------------------------------------ shared */
function Header({ view, setView }: { view: string; setView: (v: string) => void }) {
  const subtitle = view === "Season" ? "High-level visual timeline of the active season and resources." : "Read-only overview — editing happens on a follow-up screen.";
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[38px] font-semibold tracking-tight text-navy">Schedule Overview</h1>
        <p className="mt-1 text-[15px] text-cool-600">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-full border border-cool-300/70 bg-white p-1">
          {["Daily", "Weekly", "Monthly", "Season"].map((o) => (
            <button key={o} onClick={() => setView(o)} className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${view === o ? "bg-navy text-white" : "text-cool-600 hover:text-navy"}`}>{o}</button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-[10px] border border-cool-300 bg-white px-3 py-2 text-sm font-semibold text-navy">Summer 2026 <ChevronDown size={14} /></button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ page */
export default function Scheduling() {
  const [view, setView] = useState("Weekly");
  return (
    <div className="animate-fade-up">
      <Header view={view} setView={setView} />
      {view === "Daily" && <DailyView />}
      {view === "Weekly" && <WeeklyView />}
      {view === "Monthly" && <MonthlyView />}
      {view === "Season" && <SeasonView />}
    </div>
  );
}

/* ------------------------------------------------------------------ Daily */
const DAILY = [
  { time: "9:00 AM", empty: "No classes scheduled" },
  { time: "10:00 AM", classes: [
    { name: "Python Prodigy", coach: "Marcus", students: "Students (3): Saúl, Emma, Jake", room: "Lab A", dur: "2 Hours", tone: "navy" },
    { name: "Robotics Camp: Sumo Bots", coach: "Marcus", students: "Students (6): Robert, Lily, Noah + 3 more", room: "Workshop", dur: "2 Hours", tone: "gold" },
  ] },
  { time: "12:00 PM", empty: "Lunch / No classes" },
  { time: "1:00 PM", classes: [{ name: "Robotics Explorers", coach: "Marcus", students: "Students (4): Jake, Lily, Noah, Emma", room: "Workshop", dur: "1.5 Hours", tone: "navy" }] },
  { time: "2:00 PM", empty: "No classes scheduled" },
  { time: "3:30 PM", classes: [{ name: "Scratch Creators", coach: "Sarah", students: "Students: 5 enrolled", room: "Lab B", dur: "1.5 Hours", tone: "outline" }] },
  { time: "5:00 PM", classes: [{ name: "Web Dev Basics", students: "2 students enrolled", room: "Lab A", dur: "1 Hour", tone: "unassigned" }] },
];

function DailyView() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline"><ChevronLeft size={16} /> Previous Day</Button>
        <p className="flex items-center gap-2 text-[17px] font-semibold text-navy">Friday, August 1, 2026 <Badge tone="gold">Today</Badge></p>
        <Button variant="outline">Next Day <ChevronRight size={16} /></Button>
      </div>
      <div className="divide-y divide-cool-300/40">
        {DAILY.map((row) => (
          <div key={row.time} className="grid grid-cols-[90px_1fr] gap-4 py-4">
            <span className="pt-1 text-sm font-bold text-navy">{row.time}</span>
            {row.empty ? (
              <p className="pt-1 text-sm text-cool-600">{row.empty}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {row.classes!.map((c) => <DailyBlock key={c.name} c={c} />)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[12px] bg-cool-50 px-5 py-4">
        <p className="text-sm font-semibold text-navy">This day: 5 sessions · 14 unique students · 2 active coaches (Marcus: 3, Sarah: 1) · 1 unassigned slot · Peak: 10:00 AM</p>
        <Button variant="outline">Edit Schedule <ArrowRight size={16} /></Button>
      </div>
    </Card>
  );
}

function DailyBlock({ c }: { c: any }) {
  if (c.tone === "unassigned") {
    return (
      <div className="rounded-[12px] border border-dashed border-[#dc4b4b]/60 bg-[#dc4b4b]/5 p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2"><span className="rounded-full bg-[#dc4b4b] px-2 py-0.5 text-[9px] font-bold uppercase text-white">Unassigned</span><span className="text-sm text-cool-600">{c.students}</span></span>
          <Badge tone="red">{c.dur}</Badge>
        </div>
        <p className="mt-2 text-[18px] font-semibold text-navy">{c.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-cool-600"><MapPin size={13} /> Room: {c.room}</p>
      </div>
    );
  }
  const style = c.tone === "gold" ? "bg-gold text-deepnavy" : c.tone === "outline" ? "border border-blue/40 bg-blue/[0.06] text-navy" : "bg-navy text-white";
  const sub = c.tone === "navy" ? "text-white/75" : c.tone === "gold" ? "text-deepnavy/75" : "text-cool-600";
  return (
    <div className={`rounded-[12px] p-4 ${style}`}>
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-semibold">{c.name}</p>
        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.tone === "outline" ? "bg-blue/20 text-[#2e6ba0]" : "bg-black/15"}`}>{c.dur}</span>
      </div>
      <div className={`mt-2 space-y-1 text-sm ${sub}`}>
        {c.coach && <p className="flex items-center gap-1.5 font-semibold"><User size={13} /> Coach: {c.coach}</p>}
        <p className="flex items-center gap-1.5"><Users size={13} /> {c.students}</p>
        <p className="flex items-center gap-1.5"><MapPin size={13} /> Room: {c.room}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Weekly */
type Slot = { name: string; coach: string; students: number; tone: "navy" | "outline" | "gold" | "unassigned" };
const WEEK: { time: string; days: (Slot | null)[] }[] = [
  { time: "10:00 AM", days: [
    { name: "Python Prodigy", coach: "Marcus", students: 3, tone: "navy" },
    { name: "Robotics Camp: Sumo Bots", coach: "Marcus", students: 6, tone: "gold" },
    { name: "Python Prodigy", coach: "Marcus", students: 3, tone: "navy" },
    { name: "Robotics Camp", coach: "Marcus", students: 6, tone: "gold" },
    { name: "Python Prodigy", coach: "Marcus", students: 3, tone: "navy" },
  ] },
  { time: "1:00 PM", days: [
    { name: "Robotics Explorers", coach: "Marcus", students: 4, tone: "navy" }, null,
    { name: "Robotics Explorers", coach: "Marcus", students: 4, tone: "navy" }, null,
    { name: "Robotics Explorers", coach: "Marcus", students: 4, tone: "navy" },
  ] },
  { time: "2:00 PM", days: [null, { name: "Python Prodigy", coach: "Marcus", students: 3, tone: "navy" }, null, { name: "Python Prodigy", coach: "Marcus", students: 3, tone: "navy" }, null] },
  { time: "3:30 PM", days: [
    { name: "Scratch Creators", coach: "Sarah", students: 5, tone: "outline" }, null,
    { name: "Scratch Creators", coach: "Sarah", students: 5, tone: "outline" },
    { name: "Scratch Creators", coach: "Sarah", students: 5, tone: "outline" }, null,
  ] },
  { time: "5:00 PM", days: [null, null, null, { name: "Web Dev Basics", coach: "Unassigned", students: 2, tone: "unassigned" }, null] },
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function WeeklyView() {
  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline"><ChevronLeft size={16} /> Previous Week</Button>
          <p className="text-[17px] font-semibold text-navy">Week of July 28 - August 1, 2026</p>
          <Button variant="outline">Next Week <ChevronRight size={16} /></Button>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[880px]">
            <div className="grid grid-cols-[90px_repeat(5,1fr)] border-b border-cool-300/60 pb-2 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
              <span>Time</span>{DAYS.map((d) => <span key={d} className="text-center">{d}</span>)}
            </div>
            {WEEK.map((row) => (
              <div key={row.time} className="grid grid-cols-[90px_repeat(5,1fr)] gap-2 border-b border-cool-300/40 py-3">
                <span className="pt-2 text-sm font-bold text-navy">{row.time}</span>
                {row.days.map((slot, i) => <div key={i} className="px-0.5">{slot && <WeekSlot slot={slot} />}</div>)}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[12px] bg-cool-50 px-5 py-4">
          <p className="text-sm font-semibold text-navy">This week: 18 class sessions · 4 courses active · 2 coaches scheduled · 1 unassigned slot</p>
          <Button variant="primary">Edit Schedule <ArrowRight size={16} /></Button>
        </div>
      </Card>
      <Card className="mt-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-navy">Summer 2026 Overview</h2>
          <span className="text-sm text-cool-600">Jun 16 - Aug 22</span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[["Active Courses", "4"], ["Coaches", "2"], ["Students", "14"], ["Sessions", "18"]].map(([l, v]) => (
            <div key={l} className="rounded-[12px] bg-cool-50 px-5 py-4"><p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{l}</p><p className="mt-1 text-[28px] font-semibold text-navy">{v}</p></div>
          ))}
        </div>
      </Card>
    </>
  );
}

function WeekSlot({ slot }: { slot: Slot }) {
  if (slot.tone === "unassigned") {
    return (
      <div className="rounded-[10px] border border-dashed border-[#dc4b4b]/60 bg-[#dc4b4b]/5 px-3 py-2.5">
        <span className="rounded-full bg-[#dc4b4b] px-2 py-0.5 text-[9px] font-bold uppercase text-white">Unassigned</span>
        <span className="ml-1.5 text-xs text-cool-600">{slot.students} enrolled</span>
        <p className="mt-1 text-[13px] font-semibold text-navy">{slot.name}</p>
      </div>
    );
  }
  const style = slot.tone === "gold" ? "bg-gold text-deepnavy" : slot.tone === "outline" ? "border border-blue/40 bg-white text-navy" : "bg-navy text-white";
  const sub = slot.tone === "navy" ? "text-white/70" : slot.tone === "gold" ? "text-deepnavy/70" : "text-cool-600";
  return (
    <div className={`rounded-[10px] px-3 py-2.5 ${style}`}>
      <p className="text-[13px] font-semibold leading-tight">{slot.name}</p>
      <p className={`mt-1 text-[11px] font-medium ${sub}`}>{slot.coach} · {slot.students} students</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Monthly */
const DOTS: Record<string, string> = { p: "bg-navy", r: "bg-gold", e: "bg-blue", s: "bg-[#7fb2dd]", u: "bg-[#dc4b4b]" };
const CAL: { d: number; muted?: boolean; today?: boolean; dots?: string[]; tag?: { text: string; tone: "teal" | "gold" } }[] = [
  { d: 27, muted: true, dots: ["p", "r", "e"] }, { d: 28, muted: true, dots: ["r", "p"] }, { d: 29, muted: true, dots: ["p", "e", "s"] }, { d: 30, muted: true, dots: ["r", "p", "e", "u"] }, { d: 1, today: true, dots: ["p", "r", "s"] }, { d: 2 }, { d: 3 },
  { d: 4, dots: ["p", "r", "e"] }, { d: 5, dots: ["r", "p"] }, { d: 6, dots: ["p", "e", "s"] }, { d: 7, dots: ["r", "p", "e", "u"] }, { d: 8, dots: ["p", "r", "s"] }, { d: 9 }, { d: 10 },
  { d: 11, dots: ["p", "r", "e"] }, { d: 12, dots: ["r", "p"] }, { d: 13, dots: ["p", "e"] }, { d: 14, dots: ["r", "p", "s"] }, { d: 15, tag: { text: "Robotics Camp Ends", tone: "teal" } }, { d: 16 }, { d: 17 },
  { d: 18, dots: ["p", "e"] }, { d: 19, dots: ["p"] }, { d: 20, dots: ["p", "e"] }, { d: 21, dots: ["s"] }, { d: 22, tag: { text: "End of Summer", tone: "gold" } }, { d: 23 }, { d: 24 },
  { d: 25, muted: true }, { d: 26, muted: true }, { d: 27, muted: true }, { d: 28, muted: true }, { d: 29, muted: true }, { d: 30 }, { d: 31 },
];
const KEY = [["p", "Python Prodigy"], ["r", "Robotics Camp: Sumo Bots"], ["e", "Robotics Explorers"], ["s", "Scratch Creators"], ["u", "Unassigned / Needs Attention"]];

function MonthlyView() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline"><ChevronLeft size={16} /> July</Button>
        <p className="text-[17px] font-semibold text-navy">August 2026</p>
        <Button variant="outline">September <ChevronRight size={16} /></Button>
      </div>
      <div className="grid grid-cols-7 border-b border-cool-300/60 pb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-cool-600">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7">
        {CAL.map((c, i) => (
          <div key={i} className={`min-h-[92px] border-b border-r border-cool-300/40 p-2 ${c.today ? "rounded-[8px] border-2 border-gold bg-gold/[0.06]" : ""} ${(i + 1) % 7 === 0 || (i + 1) % 7 === 6 ? "bg-cool-50/60" : ""}`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${c.muted ? "text-cool-300" : "text-navy"}`}>{c.d}</span>
              {c.today && <Badge tone="gold" className="text-[9px]">Today</Badge>}
            </div>
            {c.dots && <div className="mt-2 flex gap-1">{c.dots.map((d, j) => <span key={j} className={`h-2 w-2 rounded-full ${DOTS[d]}`} />)}</div>}
            {c.tag && <span className={`mt-2 inline-block rounded-[6px] border px-1.5 py-0.5 text-[9px] font-semibold uppercase ${c.tag.tone === "teal" ? "border-teal/50 text-teal" : "border-gold/50 text-[#a9741a]"}`}>{c.tag.text}</span>}
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Course Color Key</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy">
          {KEY.map(([k, label]) => <span key={k} className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-full ${DOTS[k]}`} /> {label}</span>)}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[12px] bg-cool-50 px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-navy">August 2026: 22 class days · 88 total sessions · 4 active courses · 2 coaches</p>
          <p className="mt-0.5 text-xs text-cool-600">Key Dates: Aug 15 — Robotics Camp ends · Aug 22 — Summer session ends</p>
        </div>
        <Button variant="outline">Edit Schedule <ArrowRight size={16} /></Button>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ Season */
const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"];
const WEEK_DATES = ["Jun 16", "Jun 23", "Jun 30", "Jul 7", "Jul 14", "Jul 21", "Jul 28", "Aug 4", "Aug 11", "Aug 18"];
const TIMELINE = [
  { name: "Game Design Studio", coach: "Sarah", ct: "s", weeks: "10 weeks", start: 0, span: 10, label: "10 Weeks Active", range: "W1 - W10", tone: "navy" },
  { name: "Robotics Explorers", coach: "Marcus", ct: "m", weeks: "8 weeks", start: 2, span: 8, label: "8 Weeks Active", range: "W3 - W10", tone: "navy" },
  { name: "Python Prodigy", coach: "Marcus", ct: "m", weeks: "7 weeks", start: 3, span: 7, label: "7 Weeks Active", range: "W4 - W10", tone: "navy" },
  { name: "Scratch Creators", coach: "Sarah", ct: "s", weeks: "6 weeks", start: 4, span: 6, label: "6 Weeks Active", range: "W5 - W10", tone: "navy" },
  { name: "Robotics Camp: Sumo Bots", coach: "Marcus", ct: "m", weeks: "4 weeks", start: 5, span: 4, label: "4 Weeks Active", range: "W6 - W9", tone: "gold" },
  { name: "Web Dev Basics", coach: "UNASSIGNED", ct: "u", weeks: "3 weeks", start: 7, span: 3, label: "3 Weeks Active", range: "W8 - W10", tone: "unassigned" },
];
const MILESTONES = [
  { text: "Summer session begins", date: "Jun 16", done: true }, { text: "Robotics Camp starts", date: "Jul 21", done: true },
  { text: "TODAY marker", date: "Aug 1", today: true }, { text: "Robotics Camp ends", date: "Aug 15" }, { text: "Summer session ends & Fall planning", date: "Aug 22" },
];

function SeasonView() {
  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button variant="primary">Edit Schedule</Button>
      </div>
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[22px] font-semibold text-navy">Season Timeline — Summer 2026</h2>
            <p className="text-sm text-cool-600">June 16 - August 22, 2026 (10 weeks)</p>
          </div>
          <div className="flex gap-4 text-xs font-medium text-cool-600">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-navy" /> Marcus</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#7fb2dd]" /> Sarah</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-dashed border-[#dc4b4b]" /> Unassigned</span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[190px_repeat(10,1fr)] border-b border-cool-300/50 pb-3">
              <span />
              {WEEKS.map((w, i) => (
                <span key={w} className="text-center">
                  <span className={`block text-sm font-bold ${i === 6 ? "text-gold" : "text-navy"}`}>{w}</span>
                  <span className={`block text-[11px] ${i === 6 ? "text-gold" : "text-cool-600"}`}>{WEEK_DATES[i]}</span>
                </span>
              ))}
            </div>
            {TIMELINE.map((t) => (
              <div key={t.name} className="grid grid-cols-[190px_repeat(10,1fr)] items-center border-b border-cool-300/30 py-3">
                <div className="pr-3">
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-cool-600"><span className={`h-2 w-2 rounded-full ${t.ct === "m" ? "bg-navy" : t.ct === "s" ? "bg-[#7fb2dd]" : "bg-cool-300"}`} /> {t.coach} · {t.weeks}</p>
                </div>
                <div className="relative col-span-10 h-9">
                  <div
                    className={`absolute flex h-9 items-center justify-between rounded-[8px] px-3 text-[11px] font-semibold ${
                      t.tone === "gold" ? "bg-gold/25 text-[#a9741a]" : t.tone === "unassigned" ? "border border-dashed border-[#dc4b4b]/60 bg-[#dc4b4b]/5 text-[#c23b3b]" : "bg-blue/12 text-navy"
                    }`}
                    style={{ left: `${(t.start / 10) * 100}%`, width: `${(t.span / 10) * 100}%` }}
                  >
                    <span>{t.label}</span><span className="opacity-70">{t.range}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[["Total Courses", "6", "5 assigned · 1 unassigned"], ["Total Students", "23", "Enrolled & active"], ["Coaches Active", "2", "Marcus, Sarah"], ["Sessions Delivered", "45 / 88", "51% of plan completed"]].map(([l, v, s]) => (
          <Card key={l} className="px-5 py-5"><p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{l}</p><p className="mt-1 text-[30px] font-semibold tracking-tight text-navy">{v}</p><p className="mt-1 text-xs text-cool-600">{s}</p></Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-[22px] font-semibold text-navy">Coach Resource Workload</h2>
          <div className="mt-4 space-y-3">
            {[{ n: "Marcus", ct: "navy", courses: 4, st: "17 Students", peak: "3 Simultan." }, { n: "Sarah", ct: "#7fb2dd", courses: 2, st: "8 Students", peak: "1 Simultan." }].map((c) => (
              <div key={c.n} className="rounded-[12px] bg-cool-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-2 font-semibold text-navy"><span className="h-3 w-3 rounded-full" style={{ background: c.ct }} /> {c.n}</p>
                  <span className="rounded-[8px] border border-cool-300 bg-white px-2.5 py-1 text-xs font-semibold text-navy">{c.courses} Courses</span>
                </div>
                <div className="mt-3 flex gap-10 text-sm">
                  <span><span className="block text-[11px] font-semibold uppercase text-cool-600">Students Enrolled</span><span className="font-semibold text-navy">{c.st}</span></span>
                  <span><span className="block text-[11px] font-semibold uppercase text-cool-600">Concurrency Peak</span><span className="font-semibold text-navy">{c.peak}</span></span>
                </div>
              </div>
            ))}
            <div className="rounded-[12px] border border-dashed border-[#dc4b4b]/50 bg-[#dc4b4b]/5 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#c23b3b]">Unassigned Slots</p>
                <Badge tone="red">Action Req</Badge>
              </div>
              <p className="mt-1 text-sm text-cool-600">1 Active Course (Web Dev Basics) currently lacks an assigned coach. Starts in W8.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-[22px] font-semibold text-navy">Key Season Milestones</h2>
          <div className="mt-4 space-y-4">
            {MILESTONES.map((m) => (
              <div key={m.text} className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${m.done ? "bg-navy text-white" : m.today ? "bg-gold text-white" : "border-2 border-cool-300 bg-white"}`}>
                  {m.done && <Check size={12} />}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${m.done ? "text-cool-600 line-through" : "text-navy"}`}>{m.text}</p>
                  <p className={`text-xs ${m.today ? "text-gold" : "text-cool-600"}`}>{m.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
