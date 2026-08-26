import { useState } from "react";
import { useNavigate } from "react-router";
import { X, CalendarClock } from "lucide-react";
import { Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const REASONS = ["Sick", "Family travel", "Appointment", "Other"];
const WHEN = ["Today", "Future Date", "Date Range"];

export default function RecordAbsence() {
  const nav = useNavigate();
  const [reason, setReason] = useState("Sick");
  const [when, setWhen] = useState("Today");
  const close = () => nav("/center/students");

  return (
    <div className="fixed inset-0 z-40">
      {/* dimmed backdrop */}
      <button onClick={close} className="absolute inset-0 bg-deepnavy/45 backdrop-blur-[2px]" aria-label="Close" />

      {/* drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-cool-50 shadow-pop animate-fade-up">
        <div className="flex items-center justify-between border-b border-cool-300/60 bg-white px-6 py-5">
          <div className="flex items-center gap-2.5">
            <CalendarClock size={20} className="text-navy" />
            <h1 className="text-[22px] font-semibold text-navy">Record an Absence</h1>
          </div>
          <button onClick={close} className="flex h-9 w-9 items-center justify-center rounded-[10px] text-cool-600 hover:bg-cool-100"><X size={18} /></button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <div className="flex items-center gap-3 rounded-[12px] border border-cool-300/60 bg-white px-4 py-3">
            <Avatar name="Saúl Martinez" size={40} />
            <div><p className="font-semibold text-navy">Saúl Martinez</p><p className="text-xs text-cool-600">Python Prodigy · Robotics Camp</p></div>
          </div>

          <Group label="Date of Absence">
            <div className="flex gap-2">
              {WHEN.map((w) => (
                <button key={w} onClick={() => setWhen(w)} className={`flex-1 rounded-[10px] border px-2 py-2 text-sm font-semibold ${when === w ? "border-navy bg-navy/5 text-navy" : "border-cool-300 text-cool-600"}`}>{w}</button>
              ))}
            </div>
            {when !== "Today" && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input type="date" className="rounded-[8px] border border-cool-300 bg-white px-3 py-2 text-sm text-navy" />
                {when === "Date Range" && <input type="date" className="rounded-[8px] border border-cool-300 bg-white px-3 py-2 text-sm text-navy" />}
              </div>
            )}
          </Group>

          <Group label="Reason">
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map((r) => (
                <button key={r} onClick={() => setReason(r)} className={`rounded-[10px] border px-3 py-2.5 text-sm font-semibold ${reason === r ? "border-gold bg-gold/10 text-[#a9741a]" : "border-cool-300 text-cool-600"}`}>{r}</button>
              ))}
            </div>
          </Group>

          <Group label="Reported By">
            <select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Parent — Jennifer Hayes</option><option>Coach — Marcus Rivera</option><option>Center staff</option></select>
          </Group>

          <Group label="Entered By">
            <div className="flex items-center gap-2.5 rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5">
              <Avatar name="Jack Alvarez" size={28} />
              <span className="text-sm font-semibold text-navy">Jack Alvarez</span>
              <Badge tone="navy">Center Director</Badge>
            </div>
          </Group>

          <Group label="Staff Notes (optional)">
            <textarea rows={3} placeholder="Add context about this absence…" className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-3 text-sm text-navy" />
          </Group>

          <label className="flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" defaultChecked className="accent-navy" /> Issue a makeup credit for this session</label>
        </div>

        <div className="flex gap-3 border-t border-cool-300/60 bg-white px-6 py-4">
          <Button variant="ghost" full onClick={close}>Cancel</Button>
          <Button variant="primary" full onClick={close}>Save Absence Record</Button>
        </div>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>{children}</div>;
}
