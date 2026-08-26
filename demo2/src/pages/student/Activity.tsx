import { useNavigate } from "react-router";
import { Check, FileText, HelpCircle, Clock } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { StudentFocusHeader } from "../../components/shell/StudentFocusHeader";

const STEPS = [
  { n: 1, state: "done", title: "Review the for loop syntax", desc: "Open the workspace terminal and inspect how 'for i in range(5)' executes five times. Change the range argument to see its output adapt." },
  { n: 2, state: "current", title: "Practice with the sample exercises", desc: "Complete the three challenge loops in 'exercise_loops.py'. Make sure your printed lines exactly match the target output shown in your task panel." },
  { n: 3, state: "upcoming", title: "Build your guessing game", desc: "Combine loops and conditional statements to create an interactive number guessing game. Prompt the user until they find the magic number!" },
  { n: 4, state: "upcoming", title: "Test and debug your code", desc: "Run your complete script through the debugger loop. Resolve any indentation or syntax roadblocks before calling Coach Marcus over for review." },
];

const RESOURCES = [
  { name: "Cognit Python Loop Cheat Sheet", tag: "PDF" },
  { name: "Syntax Guide: For vs. While", tag: "MD" },
  { name: "Keyboard Shortcuts Reference", tag: "PDF" },
];

export default function Activity() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cool-50 pb-24">
      <StudentFocusHeader crumbs={[{ text: "Lesson in progress" }, { text: "Python Prodigy" }, { text: "Loops", accent: true }, { text: "23 min remaining" }]} />

      <div className="mx-auto max-w-[1160px] px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="p-8">
            <h1 className="text-[30px] font-semibold tracking-tight text-navy">Lesson Reference</h1>
            <p className="mt-1 text-[15px] text-cool-600">Follow the checklist below to complete today's adventure. Work at your own pace!</p>
            <div className="my-6 h-px bg-cool-300/50" />

            <div className="space-y-4">
              {STEPS.map((s) => {
                const done = s.state === "done";
                const current = s.state === "current";
                return (
                  <div key={s.n} className={`flex gap-4 rounded-[14px] border px-5 py-4 ${current ? "border-gold/60 bg-gold/[0.04]" : done ? "border-cool-300/40 bg-cool-50" : "border-cool-300/40"}`}>
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${done ? "bg-teal/15 text-teal" : current ? "bg-navy text-white" : "bg-cool-100 text-cool-600"}`}>{done ? <Check size={16} /> : s.n}</span>
                    <div>
                      <p className={`flex items-center gap-2 text-[17px] font-semibold ${s.state === "upcoming" ? "text-cool-600" : "text-navy"}`}>{s.title} {current && <Badge tone="gold">Current Step</Badge>}</p>
                      <p className={`mt-1 text-sm leading-relaxed ${s.state === "upcoming" ? "text-cool-300" : "text-cool-600"}`}>{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">Scratchpad</p>
              <h2 className="mt-1 text-[20px] font-semibold text-navy">Quick Notes</h2>
              <textarea rows={5} placeholder="Anything you want to remember… E.g. variables save state, loop control syntax." className="mt-3 w-full rounded-[12px] border border-cool-300 bg-cool-50 px-4 py-3 text-sm text-navy outline-none focus:border-navy" />
              <p className="mt-3 text-xs text-cool-600">Notes are auto-saved and can be accessed after class ends.</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-[20px] font-semibold text-navy">Resources</h2>
              <p className="text-sm text-cool-600">Helpful documents for today's tasks</p>
              <div className="mt-4 space-y-2.5">
                {RESOURCES.map((r) => (
                  <button key={r.name} className="flex w-full items-center justify-between rounded-[10px] border border-cool-300/60 px-4 py-3 text-left hover:border-navy">
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-navy"><FileText size={16} className="text-cool-600" /> {r.name}</span>
                    <span className="text-[11px] font-semibold text-cool-600">{r.tag}</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-cool-300/60 bg-white">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-4">
          <Button variant="outline" onClick={() => navigate("/student/lesson/loops/reflect")}>I'm done with lesson</Button>
          <p className="flex items-center gap-2 text-sm text-cool-600"><Clock size={15} /> Elapsed Time: <span className="font-semibold text-navy">23:47</span></p>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-[#a9741a] underline underline-offset-2"><HelpCircle size={15} /> I need help</button>
        </div>
      </div>
    </div>
  );
}
