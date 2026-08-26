import { useNavigate, Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { LogoHorizontal, LogoIcon } from "../lib/brand";

const LOOPS = [
  {
    key: "center",
    label: "Center",
    headline: "Run today's learning operation.",
    body: "See what needs attention across schedules, learners, reporting, communication, and operational exceptions.",
    to: "/center/home",
  },
  {
    key: "coach",
    label: "Coach",
    headline: "Move teaching forward.",
    body: "See today's learners, learning plan, progress, observations, evidence, and reporting responsibilities.",
    to: "/coach/home",
  },
  {
    key: "student",
    label: "Student",
    headline: "Know what you're working on next.",
    body: "See today's learning, current progress, completed work, and what comes next.",
    to: "/student/home",
  },
  {
    key: "family",
    label: "Family",
    headline: "Stay connected to the learning journey.",
    body: "See progress, attendance, messages, and published learning updates for the learner.",
    to: "/family/home",
  },
  {
    key: "hq",
    label: "Headquarters",
    headline: "Govern the whole network.",
    body: "See operational health, performance, curriculum adoption, and escalations across every center.",
    to: "/hq/home",
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full flex-col bg-white">
      {/* Header */}
      <header className="flex h-[72px] items-center justify-between border-b border-cool-300/50 px-6 sm:px-10">
        <div className="flex items-center gap-3">
          <LogoHorizontal className="hidden h-8 sm:block" />
          <LogoIcon className="h-9 w-9 sm:hidden" />
          <span className="h-6 w-px bg-gold" />
          <span className="text-[15px] font-semibold text-navy">Learning Hub Demo</span>
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-cool-300/70 px-3 py-1.5 md:flex">
          <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-cool-600">
            Demo Perspective
          </span>
          {LOOPS.map((l) => (
            <Link
              key={l.key}
              to={l.to}
              className="rounded-full px-3 py-1 text-sm font-semibold text-navy transition hover:bg-cool-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Cards */}
      <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-14 sm:px-10">
        <div className="grid gap-7 md:grid-cols-2">
          {LOOPS.map((l, i) => (
            <button
              key={l.key}
              onClick={() => navigate(l.to)}
              className={`group animate-fade-up flex flex-col items-start rounded-[16px] border border-cool-300/60 bg-white p-9 text-left transition hover:-translate-y-1 hover:[box-shadow:var(--shadow-pop)] [box-shadow:var(--shadow-card)] ${
                i === 4 ? "md:col-span-2" : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="rounded-full bg-cool-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-navy">
                {l.label}
              </span>
              <h2 className="mt-6 max-w-[15ch] text-[34px] font-bold leading-[1.08] tracking-tight text-navy">
                {l.headline}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-cool-600">{l.body}</p>
              <span className="mt-8 inline-flex items-center gap-1.5 rounded-[10px] bg-deepnavy px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-navy">
                View {l.label} <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-start justify-between gap-2 border-t border-cool-300/50 bg-cool-50 px-6 py-6 sm:flex-row sm:items-center sm:px-10">
        <p className="text-sm font-semibold text-navy">Know what happened. Understand what comes next.</p>
        <p className="text-sm text-cool-600">© 2026 Cognit. All rights reserved.</p>
      </footer>
    </div>
  );
}
