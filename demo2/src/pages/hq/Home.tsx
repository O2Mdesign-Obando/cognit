import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { PageTitle, ActionRow, Card } from "../../components/ui";

export default function HqHome() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-up">
      <PageTitle title="Good morning, Sarah." subtitle="Here is what needs your attention across the network." />

      <div className="space-y-4">
        <ActionRow accent="gold" title="2 centers need curriculum update approval" meta="Lakewood Ranch and Jacksonville Beach — Python Prodigy v2.4 pending adoption" cta="Review" onCta={() => navigate("/hq/curriculum")} />
        <ActionRow accent="gold" title="3 support tickets escalated" meta="Downtown Orlando login issues (High), Tampa report generation (High), Austin scheduling (Medium)" cta="View Tickets" onCta={() => navigate("/hq/support")} />
        <ActionRow accent="gold" title="Lakewood Ranch onboarding stalled — awaiting coach assignment" meta="Center has been in Onboarding status for 18 days. 2 enrolled students waiting." cta="Assign Coach" onCta={() => navigate("/hq/centers")} />
        <ActionRow accent="gold" title="Quarterly franchise performance report ready" meta="Q2 2026 report generated — revenue up 8%, enrollment up 12%" cta="View Report" onCta={() => navigate("/hq/performance")} />
        <ActionRow accent="gold" title="Coach certification renewal due for 4 coaches" meta="Certifications expiring within 30 days across 3 centers" cta="Review" onCta={() => navigate("/hq/governance")} />
      </div>

      <Card className="mt-6 flex items-center gap-3 border-teal/40 bg-teal/5 px-5 py-4">
        <CheckCircle2 className="text-teal" size={22} />
        <p className="text-sm text-navy">
          <span className="font-semibold">All clear on:</span> Platform Health · Compliance · Deployment
        </p>
      </Card>
    </div>
  );
}
