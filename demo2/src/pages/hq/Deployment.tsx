import { Cpu, Calendar, CheckCircle2, Clock, Download } from "lucide-react";
import { HeaderBar, Card, Button, Badge, ProgressBar } from "../../components/ui";

const UPCOMING = [
  { v: "v2.5.0", name: "Family Portal Redesign", status: "In Development", tone: "gold", target: "Sep 15, 2026", items: ["New family dashboard", "Mobile improvements", "Notification preferences"] },
  { v: "v2.6.0", name: "Coach Analytics", status: "Planning", tone: "gray", target: "Oct 30, 2026", items: ["Observation trends", "Student progress visualization"] },
];

const ROLLOUT = [
  { name: "Enhanced Family Reports", status: "Active", tone: "teal", pct: 100, note: "Rolled out to 100% of centers" },
  { name: "AI-Assisted Observations", status: "Beta", tone: "gold", pct: 20, note: "Testing on 5 centers" },
  { name: "Mobile Coach App", status: "Alpha", tone: "gray", pct: 5, note: "Internal only" },
];

const READINESS = [
  { center: "Boston Downtown", v: "v2.4.1", status: "Ready", tone: "teal", sync: "5 mins ago" },
  { center: "Austin North", v: "v2.4.1", status: "Ready", tone: "teal", sync: "1 hour ago" },
  { center: "Seattle West", v: "v2.3.9", status: "Needs Attention", tone: "gold", sync: "2 hours ago" },
  { center: "Orlando Park", v: "v2.4.1", status: "Ready", tone: "teal", sync: "23 mins ago" },
  { center: "Chicago Loop", v: "v2.3.8", status: "Needs Attention", tone: "gold", sync: "Yesterday" },
  { center: "San Jose East", v: "v2.4.1", status: "Pending", tone: "gray", sync: "Just now" },
];

export default function Deployment() {
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Deployment Readiness"
        subtitle="Platform versions, feature rollouts, and center readiness"
        actions={<Button variant="primary"><Download size={15} /> Export Deployment Manifest</Button>}
      />

      <h2 className="mb-3 text-[18px] font-semibold text-navy">Current Platform</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <PlatformCard icon={<Cpu size={20} />} label="Platform Version" value="v2.4.1" badge={<Badge tone="teal">● Stable</Badge>} />
        <PlatformCard icon={<Calendar size={20} className="text-gold" />} label="Release Date" value="Aug 1, 2026" />
        <PlatformCard icon={<CheckCircle2 size={20} className="text-teal" />} label="Centers on Latest" value="44 / 47" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,360px)]">
        <div>
          <h2 className="mb-3 text-[18px] font-semibold text-navy">Upcoming Releases</h2>
          <div className="space-y-4">
            {UPCOMING.map((r) => (
              <Card key={r.v} className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-[17px] font-semibold text-navy">
                    <span className="text-cool-600">{r.v}</span>&nbsp;&nbsp;{r.name}
                  </p>
                  <Badge tone={r.tone as any}>{r.status}</Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-cool-600" />
                  <span className="text-cool-600">Target:</span>
                  <span className="font-semibold text-navy">{r.target}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-8 gap-y-1.5 text-sm font-medium text-navy">
                  {r.items.map((i) => <span key={i}>{i}</span>)}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-[18px] font-semibold text-navy">Feature Rollout</h2>
          <Card className="space-y-5 p-6">
            {ROLLOUT.map((f) => (
              <div key={f.name} className="border-b border-cool-300/40 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-semibold text-navy">{f.name}</p>
                  <Badge tone={f.tone as any}>{f.status}</Badge>
                </div>
                <div className="mt-2"><ProgressBar value={f.pct} tone={f.tone === "teal" ? "teal" : "gold"} /></div>
                <p className="mt-1.5 text-xs text-cool-600">{f.note}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <Card className="mt-8 p-6">
        <h2 className="text-[18px] font-semibold text-navy">Center Readiness</h2>
        <table className="mt-4 w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">
              <th className="pb-3">Center</th>
              <th className="pb-3">Current Version</th>
              <th className="pb-3">Configuration</th>
              <th className="pb-3 text-right">Last Sync</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cool-300/40">
            {READINESS.map((r) => (
              <tr key={r.center}>
                <td className="py-3.5 font-semibold text-navy">{r.center}</td>
                <td className="py-3.5 text-navy">{r.v}</td>
                <td className="py-3.5"><Badge tone={r.tone as any}>{r.status}</Badge></td>
                <td className="py-3.5 text-right text-cool-600">{r.sync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function PlatformCard({ icon, label, value, badge }: { icon: React.ReactNode; label: string; value: string; badge?: React.ReactNode }) {
  return (
    <Card className="flex items-center gap-4 px-5 py-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-cool-100 text-navy">{icon}</span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>
        <p className="mt-0.5 flex items-center gap-2 text-[24px] font-semibold text-navy">
          {value} {badge}
        </p>
      </div>
    </Card>
  );
}
