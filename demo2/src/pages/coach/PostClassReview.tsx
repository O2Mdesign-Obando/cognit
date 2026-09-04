import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Plus, Check, Upload, Image as ImageIcon } from "lucide-react";
import { CoachFocusHeader } from "../../components/shell/CoachFocusHeader";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const STUDENTS = ["Saúl", "Emma", "Jake"];
const SKILLS = ["Indentation Logic", "Pattern Coding", "Debugging Loops"];
const CHANNELS = ["Equipment not working", "Issue with student", "Supplies needed", "Schedule concern", "Positive highlight", "Other"];

export default function PostClassReview() {
  const nav = useNavigate();
  const [active, setActive] = useState("Saúl");
  const [evidence, setEvidence] = useState<number[]>([0, 1]);
  const [channel, setChannel] = useState("Schedule concern");

  const toggle = (i: number) => setEvidence((e) => (e.includes(i) ? e.filter((x) => x !== i) : [...e, i]));

  return (
    <div className="min-h-screen bg-cool-50">
      <CoachFocusHeader variant="light" />

      <div className="flex items-center gap-2 border-b-2 border-gold bg-white px-6 py-3.5 text-sm font-semibold text-navy">
        <Sparkles size={16} className="text-gold" />
        Class complete. Time to reflect on what happened today. Enter student observations below to complete the BEI feedback loop.
      </div>

      <main className="mx-auto w-full max-w-3xl px-6 py-8">
        <h1 className="sr-only">Post-class observation review</h1>
        {/* Session summary */}
        <Card className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">Today&apos;s Completed Session</p>
            <h2 className="mt-1 text-[22px] font-semibold text-navy">Python Prodigy · Week 1 · Day 3</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-navy">58 minutes · 3 students</p>
            <p className="text-xs text-cool-600">Captured: 7 photos, 1 video</p>
          </div>
          <Badge tone="blue">Review Phase</Badge>
        </Card>

        {/* Progress */}
        <Card className="mt-5 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Observation Progress</p>
            <div className="mt-3 flex items-center gap-2">
              {STUDENTS.map((st, i) => (
                <span key={st} className="flex items-center gap-2">
                  <button
                    onClick={() => setActive(st)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                      active === st ? "border border-gold text-gold" : "border border-cool-300 text-cool-600 hover:text-navy"
                    }`}
                  >
                    <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${active === st ? "bg-gold" : "bg-cool-300"}`} />
                    {st}
                  </button>
                  {i < STUDENTS.length - 1 && <span className="h-px w-6 bg-cool-300" />}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm font-semibold text-navy">0 of 3 student observations complete</p>
        </Card>

        {/* Student feedback loop */}
        <Card className="mt-5 p-7">
          <div className="flex items-center justify-between border-b border-cool-300/50 pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Student Feedback Loop</p>
              <h3 className="mt-1 text-[24px] font-semibold text-navy">Observation for {active}</h3>
            </div>
            <Avatar name={`${active} Student`} size={44} />
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Evidence from class (select moments for this student)</p>
            <button className="flex items-center gap-1.5 rounded-[8px] border border-cool-300 px-3 py-1.5 text-xs font-semibold text-navy hover:border-navy">
              <Upload size={13} /> Upload Evidence
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => {
              const on = evidence.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`relative flex aspect-square items-center justify-center rounded-[10px] border-2 ${
                    on ? "border-teal" : "border-transparent"
                  }`}
                  style={{ background: `linear-gradient(135deg, hsl(${200 + i * 12} 40% ${on ? 78 : 88}%), hsl(${190 + i * 10} 30% 70%))` }}
                >
                  <ImageIcon size={18} className="text-white/70" />
                  {on && <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-white"><Check size={12} /></span>}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-cool-600">Selected moments support your observation and are saved directly to {active}&apos;s learning timeline.</p>

          <FieldLabel>What happened today?</FieldLabel>
          <div className="rounded-[12px] border-2 border-navy/70 p-4">
            <p className="text-sm leading-relaxed text-navy">
              {active} showed fantastic persistence when troubleshooting his Python code loops. At first, the robotic motor didn&apos;t execute due to indentation confusion. Instead of getting frustrated, {active} used his debugger guide, corrected the nesting levels step-by-step, and celebrated when the wheels began to spin.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="primary" className="px-3 py-1.5"><Sparkles size={14} /> AI Assist</Button>
              <span className="text-xs text-cool-600">Auto-saved · Last saved 2 seconds ago</span>
            </div>
          </div>

          <FieldLabel>Skills demonstrated</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((sk) => <Badge key={sk} tone="navy" className="normal-case">{sk}</Badge>)}
            <button className="flex items-center gap-1 rounded-full border border-cool-300 px-3 py-0.5 text-[11px] font-semibold text-navy hover:border-navy"><Plus size={12} /> Add Skill</button>
          </div>

          <FieldLabel>Any roadblocks? (optional)</FieldLabel>
          <Input value="No major bottlenecks. Saúl worked independently after loop indentation was cleared." />

          <FieldLabel>Where should learning continue?</FieldLabel>
          <Input value="Introduce multiple nested variable controls inside Python patterns next session." />

          <div className="mt-6 flex items-center justify-between">
            <button className="rounded-[10px] border border-cool-300 px-4 py-2.5 text-sm font-semibold text-cool-300" disabled>Previous Student</button>
            <Button variant="gold">Save &amp; Next Student</Button>
          </div>
          <p className="mt-3 text-center text-xs text-cool-600">You can pause and resume later. All observations auto-save.</p>
        </Card>

        <h2 className="mb-4 mt-10 text-[26px] font-semibold text-navy">Overall Session Observations</h2>

        <Card className="p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Global Engagement</p>
          <h3 className="mt-1 text-[19px] font-semibold text-navy">Overall Class Observation (Optional)</h3>
          <textarea rows={3} placeholder="Describe how the students worked as a cohort today, any dynamic struggles, or environment highlights..." className="mt-4 w-full resize-none rounded-[12px] border border-cool-300 bg-white p-4 text-sm text-navy outline-none focus:border-navy" />
        </Card>

        <Card className="mt-5 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Direct Channel</p>
          <h3 className="mt-1 text-[19px] font-semibold text-navy">Send a note to Plainsboro Center (Jack)</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {CHANNELS.map((c) => (
              <button
                key={c}
                onClick={() => setChannel(c)}
                className={`rounded-[8px] border px-3 py-1.5 text-xs font-semibold transition ${
                  channel === c ? "border-navy bg-white text-navy" : "border-transparent bg-cool-100 text-cool-600 hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <textarea rows={3} defaultValue="Need to shift Saúl's makeup slot slightly next Saturday. We ran into a conflict with Plainsboro Robotics competition." className="mt-4 w-full resize-none rounded-[12px] border border-cool-300 bg-white p-4 text-sm text-navy outline-none focus:border-navy" />
          <Button variant="primary" className="mt-4">Send to Jack</Button>
        </Card>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-cool-300/60 pt-6">
          <Button variant="outline" className="rounded-full" onClick={() => nav("/coach/day-review")}>Save Draft &amp; Pause</Button>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-[10px] bg-navy px-4 py-2.5 text-sm font-semibold text-white sm:inline">Complete all student observations to submit</span>
            <button className="rounded-full bg-gold/50 px-6 py-2.5 text-sm font-semibold text-deepnavy/60" disabled>Submit All Observations</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{children}</p>;
}
function Input({ value }: { value: string }) {
  return <input defaultValue={value} className="w-full rounded-[10px] border border-cool-300 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy" />;
}
