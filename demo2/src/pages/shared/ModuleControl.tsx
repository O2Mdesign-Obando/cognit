import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { Card, Button } from "../../components/ui";

type Status = "Required" | "Available" | "Unavailable";
interface Mod {
  name: string;
  desc: string;
  mandated?: boolean;
  status: Status;
}

const DEFAULT_MODS: Mod[] = [
  { name: "Academic", desc: "Courses and curriculum visibility across local portals", mandated: true, status: "Required" },
  { name: "Scheduling", desc: "Class assignments, scheduling grids, and Today's Classes view", mandated: true, status: "Required" },
  { name: "Staffing", desc: "Coach roster management, credentials tracker, and class assignments", status: "Available" },
  { name: "Report Review", desc: "Review and audit submitted Coach operational records before finalizing", status: "Available" },
  { name: "Family Reporting", desc: "Prepare, compile, and release seasonal and milestone Family progress reports", status: "Available" },
  { name: "Students", desc: "Centralized student rosters, performance stats, and context profiles", mandated: true, status: "Required" },
  { name: "Communication", desc: "Operational correspondence templates and franchise-wide bulk messaging", status: "Available" },
  { name: "Finances", desc: "Billing sync, local payment operations, and localized tuition engines", status: "Available" },
];

export default function ModuleControl({
  eyebrow = "Governance Engine",
  intro = "Manage which Learning Hub capabilities are required, available, or unavailable across Centers. Centers retain local configuration where permitted.",
  banner = "Required modules are enabled across all Centers and cannot be changed at the Center level.",
  footerNote = "Saving changes updates module configuration across all Centers.",
}: {
  eyebrow?: string;
  intro?: string;
  banner?: string;
  footerNote?: string;
}) {
  const [mods, setMods] = useState<Mod[]>(DEFAULT_MODS);
  const options: Status[] = ["Required", "Available", "Unavailable"];

  const setStatus = (name: string, status: Status) =>
    setMods((m) => m.map((x) => (x.name === name && !x.mandated ? { ...x, status } : x)));

  return (
    <div className="animate-fade-up">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">{eyebrow}</p>
      <h1 className="mt-1 text-[34px] font-semibold tracking-tight text-navy">Module Control</h1>
      <p className="mt-1 max-w-3xl text-[15px] text-cool-600">{intro}</p>

      <Card className="mt-6 flex items-center gap-3 border-teal/40 bg-teal/5 px-5 py-4">
        <CheckCircle2 className="shrink-0 text-teal" size={22} />
        <div>
          <p className="text-sm font-semibold text-navy">Module Governance</p>
          <p className="text-sm text-cool-600">{banner}</p>
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-cool-300/60 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
          <span>Module Capability &amp; Description</span>
          <span>Status Setting</span>
        </div>
        <div className="divide-y divide-cool-300/40">
          {mods.map((m) => (
            <div key={m.name} className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 text-[16px] font-semibold text-navy">
                  {m.name}
                  {m.mandated && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal">
                      <Lock size={10} /> HQ Mandated
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-cool-600">{m.desc}</p>
              </div>
              <div className="inline-flex shrink-0 rounded-full bg-cool-100 p-1">
                {options.map((o) => {
                  const active = m.status === o;
                  const activeCls = m.mandated ? "bg-teal text-white" : "bg-navy text-white";
                  return (
                    <button
                      key={o}
                      disabled={m.mandated}
                      onClick={() => setStatus(m.name, o)}
                      className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                        active ? activeCls : "text-cool-600 hover:text-navy"
                      } ${m.mandated ? "cursor-not-allowed" : ""}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <p className="flex items-center gap-2 text-sm text-cool-600">
          <span className="h-2 w-2 rounded-full bg-gold" /> {footerNote}
        </p>
        <div className="flex gap-2">
          <Button variant="outline">Discard Changes</Button>
          <Button variant="primary">Save Configuration <ArrowRight size={16} /></Button>
        </div>
      </Card>
    </div>
  );
}
