import { useState } from "react";
import { Link } from "react-router";
import { Users, CheckCircle2, Clock, AlertCircle, DollarSign, Search, ShieldAlert, CreditCard } from "lucide-react";
import { Card, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const STATS = [
  { label: "Total Enrolled", value: "23", icon: <Users size={18} /> },
  { label: "Current", value: "18", badge: { text: "Healthy", tone: "teal" as const }, icon: <CheckCircle2 size={18} /> },
  { label: "Past Due", value: "3", badge: { text: "At Risk", tone: "gold" as const }, icon: <Clock size={18} /> },
  { label: "Action Required", value: "2", badge: { text: "Alert", tone: "red" as const }, icon: <AlertCircle size={18} /> },
  { label: "Revenue This Month", value: "$12,450", icon: <DollarSign size={18} /> },
];

const ROWS = [
  { name: "Liam Henderson", course: "Python Wizards (L1)", parent: "Sarah Henderson", fee: "$180", status: "Current", tone: "teal", note: "", last: "Oct 01, 2026", next: "Nov 01, 2026", action: "view" },
  { name: "Emma Watson", course: "Minecraft Modding Jr.", parent: "David Watson", fee: "$160", status: "Past Due", tone: "red", note: "Payment declined - insufficient funds", last: "Sep 01, 2026", next: "Oct 01, 2026", action: "manage" },
  { name: "Noah Vance", course: "Roblox Create Academy", parent: "Marcus Vance", fee: "$160", status: "Failed", tone: "red", note: "Card expired 07/2026", last: "Sep 15, 2026", next: "Oct 15, 2026", action: "manage" },
  { name: "Lucas Sterling", course: "Web Dev Junior Pro", parent: "Amanda Sterling", fee: "$200", status: "No Card", tone: "gold", note: "No payment method on file", last: "Never", next: "Oct 20, 2026", action: "manage" },
  { name: "Sophia Martinez", course: "Python Wizards (L1)", parent: "Jennifer Martinez", fee: "$180", status: "Current", tone: "teal", note: "", last: "Oct 02, 2026", next: "Nov 02, 2026", action: "view" },
  { name: "Mason Albright", course: "Roblox Create Academy", parent: "Thomas Albright", fee: "$160", status: "Past Due", tone: "red", note: "Payment declined - insufficient funds", last: "Sep 05, 2026", next: "Oct 05, 2026", action: "manage" },
];

const TABS = [
  { label: "All Students", count: 23, tone: "navy" },
  { label: "Current", count: 18, tone: "gray" },
  { label: "Past Due", count: 3, tone: "gray" },
  { label: "Action Required", count: 2, tone: "gray" },
];

export default function Billing() {
  const [tab, setTab] = useState("All Students");
  return (
    <div className="animate-fade-up">
      <div className="mb-7">
        <h1 className="text-[38px] font-semibold tracking-tight text-navy">Tuition &amp; Billing</h1>
        <p className="mt-1 text-[15px] text-cool-600">Payment status for all enrolled students</p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <Card key={s.label} className="px-5 py-5">
            <div className="flex items-center justify-between text-cool-600">
              <p className="text-[11px] font-semibold uppercase tracking-wide">{s.label}</p>
              {s.icon}
            </div>
            <p className="mt-3 flex items-center gap-2 text-[30px] font-semibold tracking-tight text-navy">
              {s.value}
              {s.badge && <Badge tone={s.badge.tone}>{s.badge.text}</Badge>}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.label}
                onClick={() => setTab(t.label)}
                className={`flex items-center gap-2 rounded-[10px] px-4 py-2 text-sm font-semibold transition ${tab === t.label ? "bg-navy text-white" : "border border-cool-300 bg-white text-navy hover:border-navy"}`}
              >
                {t.label}
                <span className={`rounded-full px-1.5 text-xs ${tab === t.label ? "bg-gold text-deepnavy" : "bg-cool-100 text-cool-600"}`}>{t.count}</span>
              </button>
            ))}
          </div>
          <div className="relative min-w-[220px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cool-600" />
            <input placeholder="Search students..." className="w-full rounded-[10px] border border-cool-300 bg-white py-2.5 pl-9 pr-3 text-sm text-navy outline-none focus:border-navy" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                <th className="py-3.5">Student &amp; Course</th>
                <th className="py-3.5">Parent Details</th>
                <th className="py-3.5">Monthly Fee</th>
                <th className="py-3.5">Payment Status</th>
                <th className="py-3.5">Activity History</th>
                <th className="py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cool-300/40">
              {ROWS.map((r) => (
                <tr key={r.name}>
                  <td className="py-4">
                    <span className="flex items-center gap-3">
                      <Avatar name={r.name} size={34} />
                      <span>
                        <span className="block font-semibold text-navy">{r.name}</span>
                        <span className="block text-xs text-cool-600">{r.course}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="block font-semibold text-navy">{r.parent}</span>
                    <span className="block text-xs text-cool-600">Primary Billing</span>
                  </td>
                  <td className="py-4"><span className="font-semibold text-navy">{r.fee}</span><span className="block text-xs text-cool-600">/month</span></td>
                  <td className="py-4">
                    <Badge tone={r.tone as any}>{r.status}</Badge>
                    {r.note && <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-[#c23b3b]"><AlertCircle size={12} /> {r.note}</p>}
                  </td>
                  <td className="py-4 text-xs text-cool-600">
                    <p>Last: <span className="text-navy">{r.last}</span></p>
                    <p>Next Due: <span className="text-navy">{r.next}</span></p>
                  </td>
                  <td className="py-4 text-right">
                    {r.action === "view" ? (
                      <Link to="/center/billing/1/confirm" className="text-sm font-semibold text-navy hover:underline">View Account</Link>
                    ) : (
                      <span className="inline-flex gap-2">
                        <Link to="/center/messages/compose" className="rounded-[8px] border border-gold/60 px-3 py-1.5 text-xs font-semibold text-[#a9741a] hover:bg-gold/10">Message Family</Link>
                        <Link to="/center/billing/1/update" className="rounded-[8px] bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-deepnavy">Update Payment</Link>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[16px] bg-deepnavy px-6 py-4 text-white">
        <p className="flex items-center gap-2.5 text-sm">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-deepnavy"><ShieldAlert size={16} /></span>
          Outstanding balance: <span className="font-bold text-gold">$1,250</span> across 5 families
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-gold"><CreditCard size={16} /> 2 cards expiring this month</p>
      </div>
    </div>
  );
}
