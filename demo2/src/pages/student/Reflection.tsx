import { useState } from "react";
import { useNavigate } from "react-router";
import { Smile, Meh, Frown, HelpCircle } from "lucide-react";
import { Card, Button } from "../../components/ui";
import { StudentFocusHeader } from "../../components/shell/StudentFocusHeader";

const MOODS = [
  { key: "Great", icon: <Smile size={30} /> },
  { key: "Okay", icon: <Meh size={30} /> },
  { key: "Struggled", icon: <Frown size={30} /> },
];
const OUTCOMES = ["I finished the project", "I got stuck", "I need more time"];

export default function Reflection() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("Great");
  const [outcome, setOutcome] = useState("I finished the project");

  return (
    <div className="min-h-screen bg-cool-50">
      <StudentFocusHeader crumbs={[{ text: "Wrapping up" }, { text: "Python Prodigy" }, { text: "Loops", accent: true }]} />

      <div className="mx-auto max-w-[880px] px-6 py-12">
        <Card className="p-8 md:p-10">
          <h1 className="text-[34px] font-semibold tracking-tight text-navy">How did today go?</h1>
          <p className="mt-2 text-[15px] text-cool-600">This is optional — share as much or as little as you'd like.</p>
          <div className="my-7 h-px bg-cool-300/50" />

          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">My Energy / Mood Today</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {MOODS.map((m) => (
              <button key={m.key} onClick={() => setMood(m.key)} className={`flex flex-col items-center gap-2 rounded-[14px] border py-6 font-semibold transition ${mood === m.key ? "border-gold bg-gold/[0.06] text-gold" : "border-cool-300 text-cool-600 hover:border-navy hover:text-navy"}`}>
                {m.icon}<span className={mood === m.key ? "text-navy" : ""}>{m.key}</span>
              </button>
            ))}
          </div>

          <p className="mt-7 text-[11px] font-semibold uppercase tracking-wide text-cool-600">What Happened?</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {OUTCOMES.map((o) => (
              <button key={o} onClick={() => setOutcome(o)} className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${outcome === o ? "border-navy bg-navy text-white" : "border-cool-300 bg-white text-navy hover:border-navy"}`}>{o}</button>
            ))}
          </div>

          <p className="mt-7 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Want to Share Anything Else? (Optional)</p>
          <textarea rows={4} defaultValue="I learned that while loops keep going until the condition is false. It was cool coding the robot to do laps on its own!" className="mt-3 w-full rounded-[12px] border border-cool-300 bg-cool-50 px-4 py-3 text-sm leading-relaxed text-navy outline-none focus:border-navy" />

          <p className="mt-5 flex items-center gap-1.5 text-sm text-cool-600"><HelpCircle size={15} /> Your reflection helps Coach Marcus understand your progress.</p>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={() => navigate("/student/lesson/loops/complete")} className="text-sm font-semibold text-cool-600 hover:text-navy">Skip &amp; Close</button>
            <Button variant="primary" onClick={() => navigate("/student/lesson/loops/complete")}>Submit Reflection</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
