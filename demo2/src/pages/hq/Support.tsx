import { Clock, Check, CheckCircle2, Star, Award } from "lucide-react";
import { HeaderBar, Card, Button, Badge, ProgressBar } from "../../components/ui";

const STATS = [
  { label: "Open Issues · Needs Review", value: "7" },
  { label: "Escalated", value: "2", sub: "requires action", warn: true },
  { label: "Avg Response Time", value: "4.2", sub: "hours" },
  { label: "Avg Resolution", value: "1.8", sub: "days" },
];

const ESCALATED = [
  { id: "#CW-0842", center: "Downtown Orlando", tone: "red", body: "Login issues affecting 12 students trying to access Curriculum v2.4 server sync.", age: "Escalated 2 days ago" },
  { id: "#CW-0839", center: "Westside Tampa", tone: "gold", body: "Family report generation failing globally upon student milestone completion.", age: "Escalated 1 day ago" },
];

const OPEN = [
  { id: "#CW-0850", center: "Downtown Orlando", pri: "High", status: "New", statusTone: "teal", age: "4 hrs", who: "Sarah Kim" },
  { id: "#CW-0847", center: "Downtown Orlando", pri: "Medium", status: "In Progress", statusTone: "blue", age: "1 day", who: "John Doe" },
  { id: "#CW-0845", center: "North Austin", pri: "Low", status: "Awaiting Response", statusTone: "gold", age: "2 days", who: "Alex Vance" },
  { id: "#CW-0841", center: "East Boston", pri: "Medium", status: "In Progress", statusTone: "blue", age: "2 days", who: "Emma Watson" },
];

const priTone = (p: string) => (p === "High" ? "red" : p === "Medium" ? "gold" : "gray");

export default function Support() {
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Support Escalation"
        subtitle="Open issues and support status across all centers"
        actions={
          <>
            <Button variant="outline">Export Support Log</Button>
            <Button variant="primary">Escalate New Issue</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Card key={s.label} className="px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{s.label}</p>
            <p className={`mt-2 text-[30px] font-semibold tracking-tight ${s.warn ? "text-gold" : "text-navy"}`}>
              {s.value} {s.sub && <span className="text-sm font-medium text-cool-600">{s.sub}</span>}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
        <div>
          <h2 className="mb-3 text-[20px] font-semibold text-navy">Needs Immediate Attention</h2>
          <div className="space-y-4">
            {ESCALATED.map((e) => (
              <Card key={e.id} accent={e.tone as any} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-navy">
                    {e.id} · <span className="text-navy">{e.center}</span>
                  </p>
                  <Badge tone="red">High Priority</Badge>
                </div>
                <p className="mt-1.5 text-sm text-cool-600">{e.body}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-cool-600"><Clock size={13} /> {e.age}</span>
                  <button className="text-sm font-semibold text-navy hover:underline">Take Case</button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-[20px] font-semibold text-navy">Resolution Tracking</h2>
          <div className="mt-4 space-y-3.5">
            <Track icon={<Check size={16} />} label="Resolved This Week" value="14" />
            <Track icon={<CheckCircle2 size={16} />} label="Resolved This Month" value="52" />
            <Track icon={<Star size={16} />} label="Average Satisfaction" value="4.6 / 5" gold />
            <Track icon={<Award size={16} />} label="SLA Compliance" value="96%" />
          </div>
          <div className="mt-5 border-t border-cool-300/50 pt-4">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="uppercase tracking-wide text-cool-600">SLA Target (95%)</span>
              <span className="text-teal">96% Met</span>
            </div>
            <div className="mt-2"><ProgressBar value={96} tone="teal" /></div>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Open Issues</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">
              <th className="pb-3">Ticket #</th>
              <th className="pb-3">Center</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Age</th>
              <th className="pb-3">Assigned To</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cool-300/40">
            {OPEN.map((o) => (
              <tr key={o.id}>
                <td className="py-3.5 font-medium text-navy">{o.id}</td>
                <td className="py-3.5 text-navy">{o.center}</td>
                <td className="py-3.5"><Badge tone={priTone(o.pri) as any}>{o.pri}</Badge></td>
                <td className="py-3.5"><Badge tone={o.statusTone as any}>{o.status}</Badge></td>
                <td className="py-3.5 text-cool-600">{o.age}</td>
                <td className="py-3.5 text-navy">{o.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Track({ icon, label, value, gold }: { icon: React.ReactNode; label: string; value: string; gold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2.5 text-sm text-navy">
        <span className="text-cool-600">{icon}</span> {label}
      </span>
      <span className={`text-[18px] font-semibold ${gold ? "text-gold" : "text-teal"}`}>{value}</span>
    </div>
  );
}
