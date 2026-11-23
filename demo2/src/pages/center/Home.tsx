import { useNavigate } from "react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageTitle, ActionRow, Badge, Button, Card } from "../../components/ui";

export default function CenterHome() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-up">
      <PageTitle title="Good morning, Jack." subtitle="Here is what needs your attention today." />

      <Card accent="gold" className="mb-6 flex flex-wrap items-center justify-between gap-5 p-6">
        <div>
          <Badge tone="gold">Local synthetic demo</Badge>
          <h2 className="mt-3 text-[22px] font-semibold text-navy">Understand Robert's learning needs</h2>
          <p className="mt-1 max-w-2xl text-sm text-cool-600">
            See how prepared evidence informs a changeable assessment before Marcus chooses a teaching approach.
          </p>
        </div>
        <Button variant="gold" onClick={() => navigate("/personalized-learning")}>
          Open connected journey <ArrowRight size={16} />
        </Button>
      </Card>

      <div className="space-y-4">
        <ActionRow
          accent="gold"
          title="3 observations ready for review"
          meta="Saúl, Emma, Jake — submitted by Marcus yesterday"
          cta="Review"
          onCta={() => navigate("/center/observations")}
        />
        <ActionRow
          title="2 Learning Journeys ready to publish"
          meta="Leo (Web Dev Intro), Maya (Robotics Level 2)"
          cta="Publish"
          onCta={() => navigate("/center/students")}
        />
        <ActionRow
          title="1 coach message needs reply"
          meta="Sarah: Question about Robotics Week 2 materials"
          cta="Reply"
          onCta={() => navigate("/center/messages")}
        />
        <ActionRow
          accent="red"
          title="Schedule gap: No coach assigned to Scratch Creators Thursday 3:30 PM"
          meta="There are currently 5 enrolled students waiting for a coach assignment."
          cta="Assign Coach"
          onCta={() => navigate("/center/schedule")}
        />
        <ActionRow
          accent="gold"
          title="Billing: 2 accounts have expired payment methods & 1 declined payment"
          meta="3 families need updated payment information to continue enrollment"
          cta="Resolve"
          ctaVariant="gold"
          onCta={() => navigate("/center/billing")}
        />
      </div>

      <Card className="mt-6 flex items-center gap-3 border-teal/40 bg-teal/5 px-5 py-4">
        <CheckCircle2 className="text-teal" size={22} />
        <p className="text-sm text-navy">
          <span className="font-semibold">All clear on:</span> Today's Classes · Student Roster · Course Setup
        </p>
      </Card>
    </div>
  );
}
