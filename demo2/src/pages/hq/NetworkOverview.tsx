import { HeaderBar, Card, Button, Badge } from "../../components/ui";
import { CheckCircle2 } from "lucide-react";

const STATS = [
  { label: "Active Centers", value: "47" },
  { label: "Active Students", value: "1,284" },
  { label: "Active Coaches", value: "93" },
  { label: "Programs Running", value: "12" },
  { label: "Needs Attention", value: "3", warn: true },
];

const ACTIVITY = [
  { title: "Orlando Park center activated", when: "2 hours ago" },
  { title: "Coach Sarah Kim onboarded at Downtown center", when: "5 hours ago" },
  { title: "Needs Review · Curriculum v2.4 pushed to 12 centers", when: "Yesterday" },
  { title: "Needs Attention · Support ticket #CW-0842 escalated", when: "Yesterday" },
  { title: "Quarterly report generated", when: "2 days ago" },
];

export default function NetworkOverview() {
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Network Overview"
        subtitle="Operational health across all Cognit centers"
        actions={<Button variant="primary">Export Network Report</Button>}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {STATS.map((s) => (
          <Card key={s.label} className="px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{s.label}</p>
            <p className="mt-2 flex items-center gap-2 text-[34px] font-semibold tracking-tight text-navy">
              {s.value}
              {s.warn && <span className="h-2.5 w-2.5 rounded-full bg-gold" />}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between border-b border-cool-300/50 pb-4">
            <h2 className="text-[20px] font-semibold text-navy">Platform Health</h2>
            <Badge tone="teal">● System Operational</Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-[12px] bg-cool-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Network Uptime</p>
              <p className="mt-1 text-[26px] font-semibold text-navy">99.97%</p>
            </div>
            <div className="rounded-[12px] bg-cool-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Last Synced</p>
              <p className="mt-1 text-[26px] font-semibold text-navy">Today, 2:15 PM</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2.5 rounded-[12px] bg-teal/8 p-4">
            <CheckCircle2 size={18} className="shrink-0 text-teal" />
            <p className="text-sm text-navy">All 47 booking portals and curriculum servers are currently synced with zero lag.</p>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="border-b border-cool-300/50 pb-4 text-[20px] font-semibold text-navy">Attention &amp; Activity</h2>
          <div className="divide-y divide-cool-300/40">
            {ACTIVITY.map((a) => (
              <div key={a.title} className="flex items-start justify-between gap-4 py-3.5">
                <span className="flex items-start gap-2.5 text-sm font-medium text-navy">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {a.title}
                </span>
                <span className="shrink-0 text-xs text-cool-600">{a.when}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
