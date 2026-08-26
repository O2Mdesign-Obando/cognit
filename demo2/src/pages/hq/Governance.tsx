import { HeaderBar, Card, Button, Badge } from "../../components/ui";

const POLICIES = [
  { name: "Data Privacy Policy", v: "v3.2", updated: "Jul 2026", status: "Active" },
  { name: "Student Safety Guidelines", v: "v2.1", updated: "Jun 2026", status: "Active" },
  { name: "Coach Code of Conduct", v: "v1.4", updated: "May 2026", status: "Active" },
  { name: "Center Operations Manual", v: "v4.0", updated: "Aug 2026", status: "Under Review" },
];

const CONFIG = [
  ["Minimum coach-to-student ratio", "1:8"],
  ["Required observations per student / mo", "2"],
  ["Family report frequency", "Weekly"],
  ["Learning Journey review cycle", "Quarterly"],
];

const COMPLIANCE = [
  { center: "Boston North", score: 98, audit: "Jul 12, 2026", status: "Compliant" },
  { center: "Austin South", score: 95, audit: "Jul 18, 2026", status: "Compliant" },
  { center: "San Francisco", score: 82, audit: "Jul 22, 2026", status: "Minor Issue" },
  { center: "Seattle Metro", score: 100, audit: "Jul 25, 2026", status: "Compliant" },
  { center: "Denver East", score: 91, audit: "Jul 29, 2026", status: "Compliant" },
];

const AUDIT = [
  ["Policy v3.2 approved by Sarah Chen", "Aug 1, 2026"],
  ["Center standards updated", "Jul 28, 2026"],
  ["Quarterly compliance review completed", "Jul 15, 2026"],
  ["Coach certification requirements updated", "Jul 10, 2026"],
];

export default function Governance() {
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Governance"
        subtitle="Policies, standards, and compliance oversight"
        actions={<Button variant="primary">Export Governance Audit</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-navy">Franchise Policies</h2>
              <Button variant="outline" className="px-3 py-1.5 text-xs">Update Policy</Button>
            </div>
            <div className="mt-4 space-y-3">
              {POLICIES.map((p) => (
                <div key={p.name} className="flex items-center justify-between rounded-[12px] border border-cool-300/60 px-4 py-3.5">
                  <div>
                    <p className="text-[15px] font-semibold text-navy">
                      {p.name} <span className="ml-1 text-xs font-medium text-cool-600">{p.v}</span>
                    </p>
                    <p className="text-xs text-cool-600">Last updated: {p.updated}</p>
                  </div>
                  <Badge tone={p.status === "Active" ? "teal" : "gold"}>{p.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[20px] font-semibold text-navy">Center Standards Compliance</h2>
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                  <th className="pb-3">Center</th>
                  <th className="pb-3">Compliance Score</th>
                  <th className="pb-3">Last Audit</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cool-300/40">
                {COMPLIANCE.map((c) => (
                  <tr key={c.center}>
                    <td className="py-3.5 font-semibold text-navy">{c.center}</td>
                    <td className={`py-3.5 font-semibold ${c.score < 90 ? "text-gold" : "text-teal"}`}>{c.score}%</td>
                    <td className="py-3.5 text-cool-600">{c.audit}</td>
                    <td className="py-3.5">
                      <Badge tone={c.status === "Compliant" ? "teal" : "gold"}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[20px] font-semibold text-navy">Program Configuration</h2>
            <div className="mt-3 divide-y divide-cool-300/40">
              {CONFIG.map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-3.5">
                  <span className="text-sm text-navy">{label}</span>
                  <span className="rounded-full bg-cool-100 px-3 py-1 text-sm font-semibold text-navy">{val}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[20px] font-semibold text-navy">Audit Log</h2>
            <div className="mt-4 space-y-4">
              {AUDIT.map(([title, when]) => (
                <div key={title} className="flex gap-2.5">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div>
                    <p className="text-sm font-medium text-navy">{title}</p>
                    <p className="text-xs text-cool-600">{when}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
