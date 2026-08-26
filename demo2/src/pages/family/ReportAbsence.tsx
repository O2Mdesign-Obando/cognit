import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Heart, Plane, Calendar, HelpCircle, CheckCircle2 } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const REASONS = [
  { key: "Sick", icon: <Heart size={16} /> },
  { key: "Travel", icon: <Plane size={16} /> },
  { key: "Appointment", icon: <Calendar size={16} /> },
  { key: "Other", icon: <HelpCircle size={16} /> },
];

export default function ReportAbsence() {
  const nav = useNavigate();
  const [kid, setKid] = useState("Robert");
  const [when, setWhen] = useState("Today");
  const [reason, setReason] = useState("Sick");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="animate-fade-up mx-auto max-w-[520px] py-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/12"><CheckCircle2 size={38} className="text-teal" /></div>
        <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-navy">Absence Reported</h1>
        <p className="mt-2 text-[15px] text-cool-600">We've notified {kid}'s coaches. A makeup credit has been added to your account for the missed session.</p>
        <Card className="mt-6 p-5 text-left">
          <div className="flex items-center justify-between text-sm"><span className="text-cool-600">Student</span><span className="font-semibold text-navy">{kid} Hayes</span></div>
          <div className="mt-2 flex items-center justify-between text-sm"><span className="text-cool-600">When</span><span className="font-semibold text-navy">{when}</span></div>
          <div className="mt-2 flex items-center justify-between text-sm"><span className="text-cool-600">Reason</span><Badge tone="gold">{reason}</Badge></div>
        </Card>
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={() => nav("/family/makeup")}>View Makeup Credits</Button>
          <Button variant="primary" onClick={() => nav("/family/home")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up mx-auto max-w-[560px]">
      <button onClick={() => nav(-1)} className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-cool-600 hover:text-navy"><ChevronLeft size={16} /> Report Absence</button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[34px] font-semibold tracking-tight text-navy">Report an absence</h1>
          <p className="mt-1 text-[15px] text-cool-600">We'll notify {kid}'s coaches and keep track of his progress milestones.</p>
        </div>
        <Badge tone="gold">Camp</Badge>
      </div>

      <div className="mt-5 flex gap-1.5">
        {["Robert", "Emma"].map((c) => (
          <button key={c} onClick={() => setKid(c)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${kid === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{c}</button>
        ))}
      </div>

      <Card className="mt-4 flex items-center gap-4 p-5">
        <Avatar name={`${kid} Hayes`} size={48} ring />
        <div><p className="font-semibold text-navy">{kid} Hayes</p><p className="text-sm text-cool-600">Python Prodigy · Mon/Wed/Fri 4:00 PM</p></div>
      </Card>

      <Group label={`When will ${kid} be absent?`}>
        <div className="flex gap-2">
          {["Today", "Future Date", "Date Range"].map((w) => (
            <button key={w} onClick={() => setWhen(w)} className={`flex-1 rounded-[10px] border px-3 py-2.5 text-sm font-semibold transition ${when === w ? "border-gold bg-gold text-deepnavy" : "border-cool-300 bg-white text-navy hover:border-navy"}`}>{w}</button>
          ))}
        </div>
        {when !== "Today" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input type="date" className="rounded-[8px] border border-cool-300 bg-white px-3 py-2 text-sm text-navy" />
            {when === "Date Range" && <input type="date" className="rounded-[8px] border border-cool-300 bg-white px-3 py-2 text-sm text-navy" />}
          </div>
        )}
      </Group>

      <Group label="Reason for absence">
        <div className="grid grid-cols-2 gap-2.5">
          {REASONS.map((r) => (
            <button key={r.key} onClick={() => setReason(r.key)} className={`flex items-center gap-2 rounded-[10px] border px-4 py-3 text-sm font-semibold transition ${reason === r.key ? "border-gold bg-gold/10 text-[#a9741a]" : "border-cool-300 bg-white text-navy hover:border-navy"}`}>{r.icon} {r.key}</button>
          ))}
        </div>
      </Group>

      <Group label="Optional note for the center">
        <textarea rows={3} placeholder="Add a note for the center (optional)" className="w-full rounded-[10px] border border-cool-300 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy" />
      </Group>

      <Button variant="gold" full className="mt-6" onClick={() => setDone(true)}>Submit Absence Report</Button>
      <button onClick={() => nav(-1)} className="mt-4 block w-full text-center text-sm font-semibold text-cool-600 underline underline-offset-2 hover:text-navy">Cancel</button>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mt-6"><p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>{children}</div>;
}
