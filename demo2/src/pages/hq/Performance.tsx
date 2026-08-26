import { useState } from "react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle } from "lucide-react";
import { HeaderBar, Card, Button, Badge, Segmented } from "../../components/ui";

const KPIS = [
  { label: "Operational Health", value: "94/100", delta: "+8% QoQ" },
  { label: "Net Enrollment Growth", value: "+147", delta: "+12.4%" },
  { label: "Retention Rate", value: "91%" },
  { label: "Average Center Health", value: "94/100" },
];

const CENTERS = [
  { name: "Westford HQ (MA)", rev: "$184,000", enr: 245, ret: "94%", health: 96 },
  { name: "Downtown Boston (MA)", rev: "$152,000", enr: 198, ret: "89%", health: 91 },
  { name: "Newton-Needham (MA)", rev: "$141,000", enr: 186, ret: "92%", health: 95 },
  { name: "Austin Northwest (TX)", rev: "$98,000", enr: 134, ret: "88%", health: 89 },
  { name: "Orlando Park (FL)", rev: "$84,000", enr: 112, ret: "85%", health: 84 },
];

const GROWTH = [
  { m: "Jan", v: 1000 },
  { m: "Feb", v: 1060 },
  { m: "Mar", v: 1110 },
  { m: "Apr", v: 1180 },
  { m: "May", v: 1230 },
  { m: "Jun", v: 1284 },
];

export default function Performance() {
  const [range, setRange] = useState("This Quarter");
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Franchise Performance"
        subtitle="Operational health, growth, and center performance across the network"
        actions={
          <>
            <Segmented options={["This Quarter", "Last Quarter", "YTD"]} value={range} onChange={setRange} />
            <Button variant="primary">Export Network Report</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((k) => (
          <Card key={k.label} className="px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{k.label}</p>
            <p className="mt-2 flex items-center gap-2 text-[30px] font-semibold tracking-tight text-navy">
              {k.value}
              {k.delta && <Badge tone="teal" className="text-[10px]">{k.delta}</Badge>}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)]">
        <Card className="p-6">
          <h2 className="text-[20px] font-semibold text-navy">Center Comparison</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                <th className="pb-3">Center</th>
                <th className="pb-3">Revenue</th>
                <th className="pb-3">Enrollment</th>
                <th className="pb-3">Retention</th>
                <th className="pb-3">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cool-300/40">
              {CENTERS.map((c) => (
                <tr key={c.name}>
                  <td className="py-3.5 font-semibold text-navy">{c.name}</td>
                  <td className="py-3.5 text-navy">{c.rev}</td>
                  <td className="py-3.5 text-navy">{c.enr}</td>
                  <td className="py-3.5 text-navy">{c.ret}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-navy">{c.health}%</span>
                      <span className="h-1.5 w-14 overflow-hidden rounded-full bg-cool-100">
                        <span className="block h-full rounded-full bg-teal" style={{ width: `${c.health}%` }} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 text-[20px] font-semibold text-navy">
            <AlertTriangle size={18} className="text-gold" /> Needs Attention
          </h2>
          <div className="mt-4 space-y-4">
            <Attn tone="red" tag="Action Required" title="Needs Decision · Kissimmee inactive for 45 days" body="Inactive for 45 days — requires urgent operational check-in and local community outreach." />
            <Attn tone="gold" tag="Warning" title="Needs Attention · Lakewood Ranch onboarding delayed" body="Onboarding delayed — awaiting coach assignment and safety certifications." />
            <Attn tone="gold" tag="Warning" title="Downtown Orlando" body="Coach-to-student ratio is above threshold. Urgent hire recommended to safeguard experience quality." />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)]">
        <Card className="p-6">
          <h2 className="text-[20px] font-semibold text-navy">Growth Trends</h2>
          <p className="text-sm text-cool-600">Active monthly enrollment growth over the last 6 months</p>
          <div className="mt-4 w-full">
            <ResponsiveContainer width="100%" height={260} minWidth={0} minHeight={260}>
              <LineChart data={GROWTH} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid #cad4dc", fontSize: 12 }}
                  labelStyle={{ color: "#123f63", fontWeight: 600 }}
                />
                <Line type="monotone" dataKey="v" stroke="#123f63" strokeWidth={2.5} dot={{ r: 4, fill: "#fff", stroke: "#123f63", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-deepnavy p-6 text-white">
          <h2 className="text-[20px] font-semibold">Network Pulse</h2>
          <p className="mt-3 text-sm text-white/80">
            Overall enrollment is up 14% this quarter with stable performance metrics across all physical locations. Zero active system downtime has been logged in the past 14 days.
          </p>
          <Button variant="gold" full className="mt-5">Open Operations Center</Button>
        </Card>
      </div>
    </div>
  );
}

function Attn({ tone, tag, title, body }: { tone: "red" | "gold"; tag: string; title: string; body: string }) {
  return (
    <div className="border-b border-cool-300/40 pb-4 last:border-0">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-navy">{title}</p>
        <Badge tone={tone}>{tag}</Badge>
      </div>
      <p className="mt-1 text-sm text-cool-600">{body}</p>
    </div>
  );
}
