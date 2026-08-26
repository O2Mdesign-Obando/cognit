import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Check, FileText, Clock } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

const COURSES = [
  { name: "Python Prodigy", meta: "3 students · 12 approved observations" },
  { name: "Robotics Explorers", meta: "4 students · 18 approved observations" },
  { name: "Robotics Camp: Sumo Bots", meta: "6 students · 9 approved observations" },
  { name: "Scratch Basics", meta: "5 students · 20 approved observations" },
];

export default function ReportBuilder() {
  const [sel, setSel] = useState<string[]>(["Python Prodigy", "Robotics Explorers"]);
  const [when, setWhen] = useState("now");
  const toggle = (n: string) => setSel((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  const allOn = sel.length === COURSES.length;

  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/reports" className="hover:text-navy">Reports</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Generate Reports</span>
      </p>
      <h1 className="text-[38px] font-semibold tracking-tight text-navy">Generate Learning Journey Reports</h1>
      <p className="mt-1 mb-7 text-[15px] text-cool-600">Compile approved coach observations into family-ready progress reports.</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <Step n={1} title="Select Courses" />
              <button onClick={() => setSel(allOn ? [] : COURSES.map((c) => c.name))} className="text-sm font-semibold text-[#a9741a] underline underline-offset-2">{allOn ? "Deselect All" : "Select All"}</button>
            </div>
            <div className="mt-4 space-y-2.5">
              {COURSES.map((c) => {
                const on = sel.includes(c.name);
                return (
                  <button key={c.name} onClick={() => toggle(c.name)} className={`flex w-full items-center gap-3 rounded-[12px] border px-4 py-3.5 text-left ${on ? "border-teal/50 bg-teal/8" : "border-cool-300/60 hover:border-cool-300"}`}>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-[6px] border ${on ? "border-teal bg-teal text-white" : "border-cool-300"}`}>{on && <Check size={13} />}</span>
                    <span><span className="block font-semibold text-navy">{c.name}</span><span className="block text-xs text-cool-600">{c.meta}</span></span>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <Step n={2} title="Report Template" />
            <select className="mt-4 w-full rounded-[10px] border border-cool-300 bg-white px-4 py-2.5 text-sm font-medium text-navy">
              <option>Standard Learning Journey (Recommended)</option>
              <option>Milestone Summary</option>
              <option>End-of-Term Comprehensive</option>
            </select>
            <div className="mt-4 rounded-[12px] bg-cool-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Structure Highlights</p>
              <ul className="mt-2 space-y-1 text-sm text-navy">
                <li>• Skills growth narrative per student</li>
                <li>• Selected evidence photos &amp; work samples</li>
                <li>• Next learning opportunities</li>
                <li>• Center Director closing note</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <Step n={3} title="Center Director Notes" />
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Opening Message to Families</p>
            <textarea rows={3} defaultValue="What a productive month at the Plainsboro Center! Below you'll find your child's personalized learning journey." className="mt-1.5 w-full rounded-[10px] border border-cool-300 bg-white px-4 py-3 text-sm text-navy" />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Closing Note (signed Jack Alvarez)</p>
            <textarea rows={3} defaultValue="Thank you for trusting us with your child's education. Reach out anytime with questions." className="mt-1.5 w-full rounded-[10px] border border-cool-300 bg-white px-4 py-3 text-sm text-navy" />
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Report Preview</p>
            <div className="mt-3 rounded-[12px] border border-cool-300/60 bg-white p-4">
              <div className="h-3 w-1/3 rounded bg-navy/80" />
              <div className="mt-3 space-y-1.5">
                <div className="h-2 w-full rounded bg-cool-100" />
                <div className="h-2 w-5/6 rounded bg-cool-100" />
                <div className="h-2 w-4/6 rounded bg-cool-100" />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <div className="aspect-square rounded bg-gradient-to-br from-blue/30 to-navy/20" />
                <div className="aspect-square rounded bg-gradient-to-br from-teal/30 to-blue/20" />
                <div className="aspect-square rounded bg-gradient-to-br from-gold/30 to-gold/10" />
              </div>
            </div>
            <p className="mt-3 text-sm text-cool-600"><span className="font-semibold text-navy">{sel.length} courses</span> · ~{sel.length * 4} student reports</p>
          </Card>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Send Options</p>
            <div className="mt-3 space-y-2.5">
              {[["now", "Send Now", "Deliver to families immediately"], ["schedule", "Schedule", "Pick a delivery date & time"]].map(([v, t, d]) => (
                <button key={v} onClick={() => setWhen(v)} className={`flex w-full items-start gap-3 rounded-[10px] border px-3 py-2.5 text-left ${when === v ? "border-navy bg-navy/5" : "border-cool-300/60"}`}>
                  <span className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${when === v ? "border-navy" : "border-cool-300"}`}>{when === v && <span className="h-2 w-2 rounded-full bg-navy" />}</span>
                  <span><span className="block text-sm font-semibold text-navy">{t}</span><span className="block text-xs text-cool-600">{d}</span></span>
                </button>
              ))}
            </div>
            {when === "schedule" && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input type="date" className="rounded-[8px] border border-cool-300 px-3 py-2 text-sm text-navy" />
                <input type="time" className="rounded-[8px] border border-cool-300 px-3 py-2 text-sm text-navy" />
              </div>
            )}
            <label className="mt-3 flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" defaultChecked className="accent-navy" /> Also email a PDF copy</label>
            <label className="mt-2 flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" className="accent-navy" /> Notify coaches on send</label>
          </Card>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-end gap-3 border-t border-cool-300/60 pt-6">
        <Link to="/center/reports" className="text-sm font-semibold text-cool-600 hover:text-navy">Cancel</Link>
        <Button variant="ghost"><FileText size={15} /> Save Draft</Button>
        <Button variant="outline">Preview All</Button>
        <Button variant="primary">{when === "schedule" ? <><Clock size={15} /> Schedule Reports</> : "Send Reports"}</Button>
      </div>
    </div>
  );
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[22px] font-semibold text-navy">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">{n}</span>
      {title}
    </h2>
  );
}
