import { Link } from "react-router";
import { ChevronRight, CalendarClock, Check, Plus } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const AVAILABLE = [
  { course: "Python Prodigy", missed: "Jul 24, 2026", reason: "Sick", expires: "Sep 24, 2026" },
  { course: "Robotics Camp: Sumo Bots", missed: "Aug 5, 2026", reason: "Family travel", expires: "Oct 5, 2026" },
];
const HISTORY = [
  { course: "Python Prodigy", missed: "Jun 12, 2026", status: "Redeemed", detail: "Made up Jun 19, 2026", tone: "teal" as const },
  { course: "Scratch Basics", missed: "Apr 3, 2026", status: "Expired", detail: "Window closed Jun 3, 2026", tone: "gray" as const },
];

export default function MakeupCredits() {
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/students" className="hover:text-navy">Students</Link>
        <ChevronRight size={14} /> Saúl Martinez <ChevronRight size={14} /> <span className="font-semibold text-navy">Makeup Credits</span>
      </p>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar name="Saúl Martinez" size={56} ring />
          <div>
            <p className="text-[22px] font-semibold text-navy">Saúl Martinez</p>
            <p className="text-sm text-cool-600">Hayes Family · 2 active courses</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[26px] font-semibold text-navy">2</p>
          <p className="text-xs text-cool-600">Available Credits</p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-navy">Available Makeup Credits</h2>
            <Button variant="outline"><Plus size={14} /> Add Credit</Button>
          </div>
          <div className="mt-4 space-y-3">
            {AVAILABLE.map((c) => (
              <div key={c.course + c.missed} className="rounded-[12px] border border-teal/40 bg-teal/6 px-4 py-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy">{c.course}</p>
                  <Badge tone="teal">Available</Badge>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <span><span className="block text-cool-600">Missed</span><span className="font-semibold text-navy">{c.missed}</span></span>
                  <span><span className="block text-cool-600">Reason</span><span className="font-semibold text-navy">{c.reason}</span></span>
                  <span><span className="block text-cool-600">Expires</span><span className="font-semibold text-navy">{c.expires}</span></span>
                </div>
                <Button variant="gold" full className="mt-3">Schedule Makeup Session</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-[22px] font-semibold text-navy">Credit History</h2>
          <div className="mt-4 space-y-3">
            {HISTORY.map((h) => (
              <div key={h.course + h.missed} className="flex items-start gap-3 rounded-[12px] border border-cool-300/60 px-4 py-3.5">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${h.status === "Redeemed" ? "bg-teal/12 text-teal" : "bg-cool-100 text-cool-600"}`}>{h.status === "Redeemed" ? <Check size={16} /> : <CalendarClock size={16} />}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between"><p className="font-semibold text-navy">{h.course}</p><Badge tone={h.tone}>{h.status}</Badge></div>
                  <p className="mt-0.5 text-xs text-cool-600">Missed {h.missed} · {h.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <Card accent="blue" className="mt-4 p-4 text-sm text-cool-600">
            Makeup credits expire 60 days after the missed session. Families are notified 2 weeks before expiration.
          </Card>
        </Card>
      </div>
    </div>
  );
}
