import { useNavigate } from "react-router";
import { CoachFocusHeader } from "../../components/shell/CoachFocusHeader";
import { Card, Button, ProgressBar } from "../../components/ui";

const REPORTS = [
  { name: "Minecraft Innovators", done: 2, total: 3 },
  { name: "Roblox Game Makers", done: 0, total: 2 },
  { name: "Python Prodigy", done: 1, total: 4 },
];

export default function DayReview() {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-cool-50">
      <CoachFocusHeader variant="light" />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <Card className="w-full max-w-2xl p-8">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold">
            <span className="h-2 w-2 rounded-full bg-gold" /> Pending Deliverables
          </p>
          <h1 className="mt-2 text-[34px] font-semibold tracking-tight text-navy">End-of-Day Review</h1>
          <p className="mt-1 text-[15px] text-cool-600">3 class reports need attention to finalize today&apos;s BEI loop.</p>

          <div className="my-6 h-px bg-cool-300/60" />

          <div className="space-y-4">
            {REPORTS.map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-4 rounded-[12px] bg-cool-50 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] font-semibold text-navy">{r.name}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-40"><ProgressBar value={(r.done / r.total) * 100} tone="gold" /></div>
                    <span className="text-sm font-semibold text-navy">{r.done}/{r.total} complete</span>
                  </div>
                </div>
                <Button variant="outline" className="rounded-full" onClick={() => nav("/coach/class/python-prodigy/review")}>Resume Report</Button>
              </div>
            ))}
          </div>

          <div className="my-6 h-px bg-cool-300/60" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button onClick={() => nav("/coach/home")} className="font-semibold text-navy underline underline-offset-2">Continue Later</button>
            <Button variant="gold" className="rounded-full px-6" onClick={() => nav("/coach/class/python-prodigy/live")}>Return to Today&apos;s Teaching</Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
