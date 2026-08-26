import { useState } from "react";
import { Search } from "lucide-react";
import { HeaderBar, Card, Button, Badge } from "../../components/ui";

const CENTERS = [
  { name: "Downtown Orlando", city: "Orlando, FL", status: "Active", students: 87, coaches: 8, synced: "Today, 10:15 AM" },
  { name: "Westside Tampa", city: "Tampa, FL", status: "Active", students: 62, coaches: 5, synced: "Today, 09:30 AM" },
  { name: "Lakewood Ranch", city: "Bradenton, FL", status: "Onboarding", students: 0, coaches: 2, synced: "Yesterday" },
  { name: "Winter Park", city: "Winter Park, FL", status: "Active", students: 45, coaches: 4, synced: "Today, 11:00 AM" },
  { name: "Jacksonville Beach", city: "Jacksonville, FL", status: "Active", students: 34, coaches: 3, synced: "Yesterday" },
  { name: "St. Petersburg", city: "St. Petersburg, FL", status: "Active", students: 71, coaches: 6, synced: "2 days ago" },
];

const PIPELINE = ["Application", "Onboarding", "Configuration", "Training", "Activation", "Active"];

export default function CenterManagement() {
  const [filter, setFilter] = useState("All Centers");
  const filters = ["All Centers", "Active", "Onboarding", "Inactive"];
  const rows = CENTERS.filter((c) => filter === "All Centers" || c.status === filter);

  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Center Management"
        subtitle="Onboarding, activation, and lifecycle management for all centers"
        actions={<Button variant="primary">Add New Center</Button>}
      />

      <Card className="mb-6 flex flex-wrap items-center gap-3 p-4">
        <div className="flex flex-1 items-center gap-2 rounded-[10px] border border-cool-300 px-3 py-2">
          <Search size={16} className="text-cool-600" />
          <input placeholder="Search by center, owner, city, or state…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="flex gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                filter === f ? "bg-navy text-white" : "border border-cool-300 text-cool-600 hover:border-navy"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
              <th className="px-6 py-3.5">Center Name</th>
              <th className="px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Students</th>
              <th className="px-4 py-3.5">Coaches</th>
              <th className="px-4 py-3.5">Last Synced</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cool-300/40">
            {rows.map((c) => (
              <tr key={c.name} className="transition hover:bg-cool-50">
                <td className="px-6 py-4">
                  <p className="font-semibold text-navy">{c.name}</p>
                  <p className="text-xs text-cool-600">{c.city}</p>
                </td>
                <td className="px-4 py-4">
                  <Badge tone={c.status === "Active" ? "teal" : "gold"}>● {c.status}</Badge>
                </td>
                <td className="px-4 py-4 font-semibold text-navy">{c.students}</td>
                <td className="px-4 py-4 font-semibold text-navy">{c.coaches}</td>
                <td className="px-4 py-4 text-cool-600">{c.synced}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="outline" className="px-3 py-1.5 text-xs">Manage</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Center Lifecycle Pipeline</h2>
        <p className="mt-1 text-sm text-cool-600">Standardized franchise onboarding milestones to reach fully active network status</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {PIPELINE.map((step, i) => (
            <div
              key={step}
              className={`flex items-center gap-3 rounded-[10px] border px-4 py-2.5 text-sm font-semibold ${
                i === 4 ? "border-gold text-gold" : "border-cool-300 text-navy"
              }`}
            >
              {step}
              <span className={`h-2.5 w-2.5 rounded-full ${i === 4 ? "bg-gold" : i === 5 ? "bg-transparent" : "bg-navy"}`} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
