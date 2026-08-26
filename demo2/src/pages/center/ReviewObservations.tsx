import { Link } from "react-router";
import { ChevronRight, MessageSquare, SkipForward, Check } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const EVIDENCE = ["from-blue/30 to-navy/20", "from-teal/30 to-blue/20", "from-gold/30 to-gold/10"];
const SKILLS = ["Debugging", "Loop Logic", "Peer Collaboration", "Persistence"];

export default function ReviewObservations() {
  return (
    <div className="animate-fade-up pb-28">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/reports" className="hover:text-navy">Reports</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Review Observations</span>
      </p>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[38px] font-semibold tracking-tight text-navy">Coach Observations for Review</h1>
          <p className="mt-1 text-[15px] text-cool-600">Approve observations before they appear in family Learning Journey reports.</p>
        </div>
        <Badge tone="gold">Reviewing 1 of 3</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 border-b border-cool-300/50 pb-4">
              <Avatar name="Saúl Martinez" size={52} ring />
              <div>
                <p className="text-[20px] font-semibold text-navy">Saúl Martinez</p>
                <p className="text-sm text-cool-600">Python Prodigy · Week 1, Day 3 · Coach: Marcus Rivera</p>
              </div>
              <Badge tone="blue" >Aug 1, 2026</Badge>
            </div>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Selected Evidence</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {EVIDENCE.map((g, i) => (
                <div key={i} className={`aspect-video rounded-[12px] bg-gradient-to-br ${g} ring-1 ring-cool-300/60`} />
              ))}
            </div>

            <div className="mt-6 space-y-5">
              <Field label="Coach Observation">
                Saúl worked through a stubborn off-by-one error in his loop entirely on his own. He added print statements to trace the counter, identified the boundary condition, and fixed it without prompting. He then explained the fix to Emma.
              </Field>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Skills Demonstrated</p>
                <div className="mt-2 flex flex-wrap gap-2">{SKILLS.map((s) => <Badge key={s} tone="teal">{s}</Badge>)}</div>
              </div>
              <Field label="Next Learning Opportunity">
                Introduce list comprehensions to build on his growing comfort with loops. He is ready for a slightly harder challenge next session.
              </Field>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Review Queue</p>
            <div className="mt-3 space-y-2">
              {[["Saúl Martinez", "Python Prodigy", true], ["Emma Rivera", "Robotics Explorers", false], ["Jake Thompson", "Scratch Basics", false]].map(([n, c, active]) => (
                <div key={n as string} className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 ${active ? "bg-gold/10 ring-1 ring-gold/40" : ""}`}>
                  <Avatar name={n as string} size={32} />
                  <div className="min-w-0"><p className="truncate text-sm font-semibold text-navy">{n}</p><p className="truncate text-xs text-cool-600">{c}</p></div>
                </div>
              ))}
            </div>
          </Card>
          <Card accent="blue" className="p-5 text-sm text-cool-600">
            Approved observations are published to the family's Learning Journey. Requesting clarification returns the note to Marcus.
          </Card>
        </div>
      </div>

      {/* sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-deepnavy/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-3 px-6 py-4">
          <p className="text-sm text-white/70">Observation 1 of 3 · Saúl Martinez</p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-[10px] border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10"><MessageSquare size={15} /> Request Clarification</button>
            <button className="flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white"><SkipForward size={15} /> Skip for now</button>
            <button className="flex items-center gap-2 rounded-[10px] bg-teal px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105"><Check size={16} /> Approve &amp; Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-navy">{children}</p>
    </div>
  );
}
