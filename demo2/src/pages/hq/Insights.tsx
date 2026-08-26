import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { HeaderBar, Card, Button, Badge, Segmented, ProgressBar } from "../../components/ui";

const KPIS = [
  { label: "Total Enrollment", value: "1,284", delta: "+12%" },
  { label: "Average Attendance", value: "87%", delta: "+3%" },
  { label: "Coach Activity", value: "93", delta: "active" },
  { label: "Journey Completion", value: "72%", delta: "+4%" },
];

const ENROLL = [
  { name: "Downtown Orlando", n: 87 },
  { name: "St. Petersburg", n: 71 },
  { name: "Westside Tampa", n: 62 },
  { name: "Winter Park", n: 45 },
  { name: "Jacksonville", n: 34 },
];

export default function Insights() {
  const [range, setRange] = useState("This Month");
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Operational Insights"
        subtitle="Aggregate reporting across the network"
        actions={
          <>
            <Segmented options={["This Month", "Last Quarter", "This Year"]} value={range} onChange={setRange} />
            <Button variant="primary">Export Report <ChevronDown size={15} /></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k) => (
          <Card key={k.label} className="px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{k.label}</p>
            <p className="mt-2 flex items-center gap-2 text-[30px] font-semibold tracking-tight text-navy">
              {k.value}
              <Badge tone="teal" className="text-[10px]"><ArrowUpRight size={11} /> {k.delta}</Badge>
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between border-b border-cool-300/50 pb-4">
            <h2 className="text-[20px] font-semibold text-navy">Enrollment by Center</h2>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Top 5 Centers</span>
          </div>
          <div className="mt-5 space-y-5">
            {ENROLL.map((e) => (
              <div key={e.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-navy">{e.name}</span>
                  <span className="text-navy"><b>{e.n}</b> <span className="text-cool-600">students</span></span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={(e.n / 87) * 100} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Panel title="Family Engagement" rows={[
            ["Reports Viewed", "Parent dashboard reach", "89%"],
            ["Portal Logins", "Monthly average per family", "3.2"],
            ["Feedback Submitted", "Total surveys received", "156"],
          ]} />
          <Panel title="Evidence Capture" rows={[
            ["Observations This Month", "Skill milestones recorded", "342"],
            ["Average per Coach", "Weekly target achievement", "3.7"],
            ["Photos/Videos Uploaded", "Visual learning artifacts", "1,247"],
          ]} />
          <Panel
            title="Operational Issues"
            badge={<Badge tone="gold">● Action Required</Badge>}
            rows={[
              ["Open Support Tickets", "", "3 active"],
              ["Average Resolution Time", "", "1.8 days"],
              ["Oldest Open Issue", "", "4 days", true],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Panel({ title, rows, badge }: { title: string; rows: any[][]; badge?: React.ReactNode }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between border-b border-cool-300/50 pb-4">
        <h2 className="text-[20px] font-semibold text-navy">{title}</h2>
        {badge}
      </div>
      <div className="mt-2 divide-y divide-cool-300/40">
        {rows.map(([label, sub, val, danger]) => (
          <div key={label} className="flex items-center justify-between py-3">
            <div>
              <p className="text-[15px] font-semibold text-navy">{label}</p>
              {sub && <p className="text-xs text-cool-600">{sub}</p>}
            </div>
            <p className={`text-[22px] font-semibold ${danger ? "text-[#c23b3b]" : "text-navy"}`}>{val}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
