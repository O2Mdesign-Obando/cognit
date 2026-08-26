import { useState } from "react";
import { useNavigate } from "react-router";
import { Presentation, PlayCircle, FileCode2, BookOpen, ChevronRight, Monitor, ArrowRight, X, Copy, Terminal } from "lucide-react";
import { Card, Button } from "../../components/ui";
import { StudentFocusHeader } from "../../components/shell/StudentFocusHeader";

const RESOURCES = [
  { key: "presentation", eyebrow: "Presentation", label: "Lesson Slides", icon: <Presentation size={20} /> },
  { key: "video", eyebrow: "Video", label: "Video Walkthrough", icon: <PlayCircle size={20} /> },
  { key: "code", eyebrow: "Code", label: "Sample Code", icon: <FileCode2 size={20} /> },
  { key: "docs", eyebrow: "Documentation", label: "Reference Guide", icon: <BookOpen size={20} /> },
];

const CODE_TABS = ["Example 1: Guessing Game", "Example 2: For Loops", "Example 3: Nested Loops"];
const SAMPLE = `# Number Guessing Game with limits
import random
secret = random.randint(1, 100)
guess = 0
attempts = 0
while guess != secret:
    guess = int(input('Guess a number: '))
    attempts += 1
    if guess < secret:
        print('Too low!')
    elif guess > secret:
        print('Too high!')

print(f'You got it in {attempts} tries!')`;

export default function Lesson() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<string | null>(null);
  const [tab, setTab] = useState(CODE_TABS[0]);

  return (
    <div className="min-h-screen bg-cool-50">
      <StudentFocusHeader crumbs={[{ text: "Python Prodigy" }, { text: "Week 3" }, { text: "Day 2" }, { text: "Loops", accent: true }]} />

      <div className="mx-auto max-w-[1160px] px-6 py-10">
        <Card className="p-8 md:p-10">
          <h1 className="text-[34px] font-semibold tracking-tight text-navy">Loops: For &amp; While</h1>
          <p className="mt-2 text-[15px] text-cool-600"><span className="font-semibold text-gold">Objective:</span> Understand loop structures and build a number guessing game using while loops.</p>

          <div className="my-8 h-px bg-cool-300/50" />

          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Today's Resources</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map((r) => (
              <button key={r.key} onClick={() => setModal(r.key)} className="flex items-center justify-between rounded-[14px] border border-cool-300/70 bg-white px-4 py-4 text-left transition hover:border-navy hover:shadow-sm">
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-cool-100 text-gold">{r.icon}</span>
                  <span><span className="block text-[11px] font-semibold uppercase tracking-wide text-cool-600">{r.eyebrow}</span><span className="block font-semibold text-navy">{r.label}</span></span>
                </span>
                <ChevronRight size={18} className="text-cool-600" />
              </button>
            ))}
          </div>

          <div className="my-8 h-px bg-cool-300/50" />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">What You'll Need</p>
              <div className="mt-2 flex items-center gap-2.5 rounded-[12px] bg-blue/15 px-4 py-3.5 font-semibold text-navy"><Monitor size={18} /> Codio — Online Python IDE</div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Previous Session Recap</p>
              <div className="mt-2 rounded-[12px] bg-teal/12 px-4 py-3.5 font-semibold text-teal">Last Session: Variables &amp; Data Types</div>
            </div>
          </div>

          <div className="my-8 h-px bg-cool-300/50" />

          <div className="text-center">
            <Button variant="primary" className="px-8 py-3.5 text-[16px]" onClick={() => navigate("/student/lesson/loops/activity")}>Launch Codio <ArrowRight size={17} /></Button>
            <p className="mt-3 text-sm text-cool-600">Learning Hub stays open alongside Codio for reference.</p>
          </div>
        </Card>
      </div>

      {modal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-deepnavy/50 backdrop-blur-[2px]" />
          <div className="relative w-full max-w-[880px] rounded-[18px] bg-white p-7 shadow-pop animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-3 text-[22px] font-semibold text-navy">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-cool-100 text-navy">{modal === "code" ? <FileCode2 size={18} /> : modal === "video" ? <PlayCircle size={18} /> : modal === "presentation" ? <Presentation size={18} /> : <BookOpen size={18} />}</span>
                {modal === "code" ? "Sample Code — Loop Examples" : modal === "video" ? "Video Walkthrough" : modal === "presentation" ? "Lesson Slides" : "Reference Guide"}
              </h2>
              <button onClick={() => setModal(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-cool-300 text-cool-600 hover:border-navy hover:text-navy"><X size={16} /></button>
            </div>

            {modal === "code" ? (
              <>
                <div className="mt-5 flex gap-6 border-b border-cool-300/50 text-sm font-semibold">
                  {CODE_TABS.map((t) => (
                    <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-2.5 ${tab === t ? "border-gold text-navy" : "border-transparent text-cool-600 hover:text-navy"}`}>{t}</button>
                  ))}
                </div>
                <pre className="mt-4 overflow-x-auto rounded-[12px] bg-deepnavy p-5 text-[13px] leading-relaxed text-blue/90"><code>{SAMPLE}</code></pre>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-cool-600">This model executes perfectly in Python 3.</p>
                  <div className="flex gap-3">
                    <Button variant="outline"><Copy size={15} /> Copy Code</Button>
                    <Button variant="primary"><Terminal size={15} /> Open in Codio</Button>
                  </div>
                </div>
              </>
            ) : modal === "video" ? (
              <div className="mt-5">
                <div className="flex aspect-video items-center justify-center rounded-[14px] bg-gradient-to-br from-navy to-deepnavy text-white"><PlayCircle size={64} className="opacity-90" /></div>
                <p className="mt-3 text-sm text-cool-600">Coach Marcus walks through for and while loops step by step (8:24).</p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                <div className="aspect-[16/9] rounded-[14px] bg-cool-100" />
                <p className="text-sm text-cool-600">{modal === "presentation" ? "12 slides covering loop syntax, iteration, and control flow." : "Quick-reference cheat sheet for Python loop constructs and common patterns."}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
