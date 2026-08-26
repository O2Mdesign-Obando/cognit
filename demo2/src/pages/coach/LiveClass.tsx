import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Camera } from "lucide-react";
import { CoachFocusHeader } from "../../components/shell/CoachFocusHeader";
import { Card, Button } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const STUDENTS = ["Saúl", "Emma", "Jake"];
const TOTAL = 3600;

export default function LiveClass() {
  const nav = useNavigate();
  const [remaining, setRemaining] = useState(2832); // 0:47:12
  const [active, setActive] = useState("Saúl");
  const [note, setNote] = useState("Saúl noticed the nesting loop error himself and successfully corrected the indentation. Good focus!");

  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const pct = (remaining / TOTAL) * 100;
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  const clock = `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  const R = 130;
  const C = 2 * Math.PI * R;

  return (
    <div className="flex min-h-screen flex-col bg-cool-50">
      <CoachFocusHeader variant="dark" />

      <div className="flex items-center gap-2 border-b border-cool-300/60 bg-white px-6 py-3.5 text-sm font-semibold text-navy">
        <Sparkles size={16} className="text-gold" />
        Class in progress. Python Prodigy · Week 1 · Day 3
      </div>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-14 lg:grid-cols-2">
        {/* Timer */}
        <div className="flex flex-col items-center">
          <div className="relative h-[300px] w-[300px]">
            <svg viewBox="0 0 300 300" className="h-full w-full -rotate-90">
              <circle cx="150" cy="150" r={R} fill="none" stroke="#eef2f5" strokeWidth="16" />
              <circle
                cx="150" cy="150" r={R} fill="none" stroke="#f2ab32" strokeWidth="16" strokeLinecap="round"
                strokeDasharray={C} strokeDashoffset={C - (pct / 100) * C}
                className="transition-[stroke-dashoffset] duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[56px] font-semibold tracking-tight text-navy tabular-nums">{clock}</span>
              <span className="text-sm text-cool-600">of 1:00:00</span>
            </div>
          </div>
          <p className="mt-6 text-[24px] font-semibold text-navy">Python Prodigy</p>
          <p className="text-sm text-cool-600">3 students present today</p>
          <Button variant="outline" className="mt-5 rounded-full px-6" onClick={() => nav("/coach/class/python-prodigy/review")}>
            End Class Early
          </Button>
        </div>

        {/* Quick note */}
        <Card className="p-7">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">Quick Note (optional)</p>
          <h2 className="mt-1 text-[26px] font-semibold text-navy">Jot observations</h2>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Select Student:</p>
          <div className="mt-3 flex gap-3">
            {STUDENTS.map((st) => {
              const on = active === st;
              return (
                <button
                  key={st}
                  onClick={() => setActive(st)}
                  className={`flex flex-col items-center gap-1.5 rounded-[14px] border px-4 py-3 transition ${
                    on ? "border-navy bg-cool-50" : "border-transparent hover:bg-cool-50"
                  }`}
                >
                  <Avatar name={`${st} Student`} size={48} ring={on} />
                  <span className={`text-sm font-semibold ${on ? "text-navy" : "text-cool-600"}`}>{st}</span>
                </button>
              );
            })}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="mt-5 w-full resize-none rounded-[12px] border border-cool-300 bg-white p-4 text-sm text-navy outline-none focus:border-navy"
          />

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm text-cool-600">
              <span className="h-2 w-2 rounded-full bg-teal" /> 3 notes captured this session
            </span>
            <Button variant="primary">Save Note</Button>
          </div>
        </Card>
      </main>

      <footer className="flex items-center justify-between border-t border-cool-300/60 bg-white px-6 py-4 text-sm">
        <span className="text-cool-600">Full observations will be entered after class ends</span>
        <button
          onClick={() => nav("/coach/class/python-prodigy/review")}
          className="flex items-center gap-1.5 font-semibold text-navy underline underline-offset-2"
        >
          <Camera size={16} /> Capture Evidence
        </button>
      </footer>
    </div>
  );
}
