import { useNavigate } from "react-router";
import { Check, Clock, Smile } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import heroPhoto from "../../imports/ChatGPT_Image_Aug_19__2026__10_50_04_AM.png";

export default function Complete() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cool-50">
      <div className="mx-auto max-w-[720px] px-6 py-14 text-center">
        <img src={heroPhoto} alt="Saúl" className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-gold" />
        <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal text-white shadow-[0_8px_24px_rgba(24,170,165,0.4)]"><Check size={34} /></div>
        <h1 className="mt-5 text-[38px] font-semibold tracking-tight text-navy">Lesson Complete!</h1>
        <p className="mt-1 text-[15px] text-cool-600">Python Prodigy · Week 3 · Day 2 · Loops</p>

        <Card className="mt-8 p-7 text-left">
          <Row label="Duration"><span className="font-semibold text-navy">47 minutes</span></Row>
          <div className="h-px bg-cool-300/40" />
          <Row label="Status"><span className="font-semibold text-navy">Project completed</span></Row>
          <div className="h-px bg-cool-300/40" />
          <Row label="Your Mood"><Badge tone="blue"><Smile size={13} /> Great</Badge></Row>
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Your Lesson Reflection</p>
            <div className="mt-2 rounded-[12px] border border-cool-300/60 bg-cool-50 p-4 text-sm leading-relaxed text-navy">
              "I learned that while loops keep going until the condition is false, which is super useful for running the robotic motor automatically without copying code 100 times!"
            </div>
          </div>
        </Card>

        <div className="my-9 h-px bg-cool-300/50" />

        <h2 className="text-[24px] font-semibold tracking-tight text-navy">What's Next</h2>
        <Card className="mt-4 p-5">
          <p className="text-[16px] font-semibold text-navy">Next session: Week 3 · Day 3 · Functions</p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-cool-600"><Clock size={14} /> Wednesday, March 12 · 3:30 PM</p>
        </Card>

        <div className="mt-8">
          <Button variant="primary" className="px-8 py-3.5 text-[16px]" onClick={() => navigate("/student/home")}>Back to Home</Button>
          <p className="mt-3 text-sm text-cool-600">Your coach will see your reflection along with their own observations.</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between py-3.5"><span className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</span>{children}</div>;
}
