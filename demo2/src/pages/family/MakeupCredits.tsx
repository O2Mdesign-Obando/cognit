import { useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronDown, CalendarClock, Check } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

const CREDITS: Record<string, { course: string; missed: string; reason: string; expires: string }[]> = {
  Robert: [
    { course: "Python Prodigy", missed: "Aug 22", reason: "Absent — Sick", expires: "Sep 22" },
    { course: "Robotics Explorers", missed: "Aug 20", reason: "Session cancelled — Weather", expires: "Sep 20" },
  ],
  Emma: [
    { course: "Scratch Creators", missed: "Aug 18", reason: "Absent — Appointment", expires: "Sep 18" },
  ],
};

const PAST = [
  { course: "Python Prodigy", detail: "Redeemed Jun 19 · made up Jun 26", status: "Redeemed", tone: "teal" as const },
  { course: "Scratch Creators", detail: "Expired Jun 3 · window closed", status: "Expired", tone: "gray" as const },
];

export default function MakeupCredits() {
  const [kid, setKid] = useState("Robert");
  const [showPast, setShowPast] = useState(false);
  const credits = CREDITS[kid];

  return (
    <div className="animate-fade-up mx-auto max-w-[620px]">
      <Link to="/family/billing" className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-cool-600 hover:text-navy"><ChevronLeft size={16} /> Makeup Credits</Link>

      <div className="flex gap-1.5">
        {["Robert", "Emma"].map((c) => (
          <button key={c} onClick={() => { setKid(c); setShowPast(false); }} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${kid === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{c}</button>
        ))}
      </div>

      <h1 className="mt-5 text-[30px] font-semibold tracking-tight text-navy">{kid} has {credits.length} available credit{credits.length === 1 ? "" : "s"}</h1>
      <p className="mt-1 text-[15px] text-cool-600">Redeemable for scheduling makeup classes.</p>

      <div className="mt-6 space-y-3">
        {credits.map((c) => (
          <Card key={c.course + c.missed} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-semibold text-navy">{c.course}</p>
              <Badge tone="teal">Available</Badge>
            </div>
            <p className="mt-2 text-sm font-semibold text-navy">Missed Date: {c.missed}</p>
            <p className="text-sm text-cool-600">{c.reason}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gold">Expires {c.expires}</p>
              <Button variant="outline" className="px-4 py-1.5">Schedule Makeup</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card as="button" onClick={() => setShowPast((s) => !s)} className="mt-3 flex w-full items-center justify-between p-4 text-left">
        <span className="font-semibold text-navy">Past credits ({PAST.length})</span>
        <ChevronDown size={18} className={`text-cool-600 transition ${showPast ? "rotate-180" : ""}`} />
      </Card>
      {showPast && (
        <div className="mt-3 space-y-2.5">
          {PAST.map((p) => (
            <div key={p.course + p.detail} className="flex items-start gap-3 rounded-[12px] border border-cool-300/60 bg-white px-4 py-3.5">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${p.status === "Redeemed" ? "bg-teal/12 text-teal" : "bg-cool-100 text-cool-600"}`}>{p.status === "Redeemed" ? <Check size={16} /> : <CalendarClock size={16} />}</span>
              <div className="flex-1"><div className="flex items-center justify-between"><p className="font-semibold text-navy">{p.course}</p><Badge tone={p.tone}>{p.status}</Badge></div><p className="mt-0.5 text-xs text-cool-600">{p.detail}</p></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
