import { useState } from "react";
import { useNavigate } from "react-router";
import { Cpu, Code2, Mail, Building2, CalendarCheck, HelpCircle, ArrowRight } from "lucide-react";
import { Card, PageTitle, SectionHeading, Eyebrow, Badge, Button } from "../../components/ui";
import { Avatar } from "../../lib/brand";
import studentPhoto from "../../imports/Male_Student_Placeholder.png";
import coachPhoto from "../../imports/Generic_Coach_Placeholder.png";

const CHILDREN = ["Robert", "Emma"];

export default function FamilyHome() {
  const navigate = useNavigate();
  const [child, setChild] = useState("Robert");

  return (
    <div className="animate-fade-up">
      <PageTitle title="Welcome back, Hayes Family." subtitle="Here is what is new with Robert's learning journey." />

      <div className="mb-8 flex items-center gap-3">
        <Eyebrow>Viewing for</Eyebrow>
        <div className="flex gap-1.5">
          {CHILDREN.map((c) => (
            <button
              key={c}
              onClick={() => setChild(c)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                child === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <SectionHeading>{child}'s Latest Journey</SectionHeading>
      <Card className="grid gap-0 overflow-hidden md:grid-cols-[minmax(0,340px)_1fr]">
        <div className="bg-gradient-to-br from-blue to-navy p-6">
          <img src={studentPhoto} alt={child} className="mx-auto aspect-square w-full max-w-[260px] rounded-full object-cover" />
        </div>
        <div className="p-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Robotics Camp · Sumo Bots</p>
            <Badge tone="green">Week 1 Complete</Badge>
          </div>
          <h3 className="mt-2 text-[24px] font-semibold leading-snug tracking-tight text-navy">
            "The Sumo-Bot Chassis is ready for battle!"
          </h3>
          <div className="mt-4 flex gap-3 rounded-[12px] bg-cool-50 p-4">
            <Avatar name="Coach Marcus" src={coachPhoto} size={40} />
            <div>
              <p className="text-sm font-semibold text-navy">Coach Marcus</p>
              <p className="mt-0.5 text-sm text-cool-600">
                "Robert did an amazing job programming his bot's light sensors today. He helped two other students configure their code as well!"
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <Button variant="gold" onClick={() => navigate("/family/journey")}>
              View Full Journey <ArrowRight size={16} />
            </Button>
            <span className="text-xs text-cool-600">Updated 2 hours ago</span>
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <SectionHeading>Class Enrollment Status</SectionHeading>
        <Card className="divide-y divide-cool-300/50">
          <EnrollRow
            icon={<Cpu size={20} />}
            tint="bg-blue/15 text-navy"
            name="Robotics Camp: Sumo Bots"
            meta="Mon/Wed/Fri 10:00 AM · Coach Marcus · Week 1 of 4"
            status={<Badge tone="green">Active</Badge>}
          />
          <EnrollRow
            icon={<Code2 size={20} />}
            tint="bg-gold/20 text-[#a9741a]"
            name="Python Prodigy"
            meta="Tue/Thu 2:00 PM · Coach Marcus · Week 3 of 8"
            status={<Badge tone="blue">Upcoming</Badge>}
          />
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <SectionHeading>Messages</SectionHeading>
          <Card className="divide-y divide-cool-300/50">
            <MsgRow name="Coach Marcus" src={coachPhoto} subject="Sumo Bot Python files" preview="Hi Hayes family, I uploaded Robert's code structure so he can review…" when="Yesterday" />
            <MsgRow name="Jack (Center Director)" subject="Upcoming Parent Night RSVP" preview="We'd love to see you at the upcoming August meetup! Please confirm your…" when="3 days ago" />
          </Card>
        </div>
        <div>
          <SectionHeading>Center Announcements</SectionHeading>
          <Card className="space-y-4 p-6">
            <Announce eyebrow="Camps Update" title="Summer Schedule Update — July camps now open" body="Camps are filling up fast! July robotics and game dev enrollments are officially live in the portal." />
            <div className="h-px bg-cool-300/50" />
            <Announce eyebrow="Events" title="Parent Night — August 15th, 6:00 PM" body="Join us at the center for live student project showcases, parent Q&A, and refreshments." />
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <SectionHeading>Quick Actions</SectionHeading>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <QuickAction icon={<Mail size={20} />} label="Message Coach" onClick={() => navigate("/family/messages")} />
          <QuickAction icon={<Building2 size={20} />} label="Message Center" onClick={() => navigate("/family/messages")} />
          <QuickAction icon={<CalendarCheck size={20} />} label="Report Absence" onClick={() => navigate("/family/absence/report")} />
          <QuickAction icon={<HelpCircle size={20} />} label="Ask a Question" onClick={() => navigate("/support")} />
        </div>
      </div>
    </div>
  );
}

function EnrollRow({ icon, tint, name, meta, status }: any) {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <span className={`flex h-11 w-11 items-center justify-center rounded-[12px] ${tint}`}>{icon}</span>
      <div className="flex-1">
        <p className="text-[17px] font-semibold text-navy">{name}</p>
        <p className="text-sm text-cool-600">{meta}</p>
      </div>
      {status}
    </div>
  );
}

function MsgRow({ name, src, subject, preview, when }: any) {
  return (
    <div className="flex gap-3 px-5 py-4">
      <Avatar name={name} src={src} size={36} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-navy">{name}</p>
          <span className="text-xs text-cool-600">{when}</span>
        </div>
        <p className="text-sm font-medium text-navy">{subject}</p>
        <p className="truncate text-sm text-cool-600">{preview}</p>
      </div>
    </div>
  );
}

function Announce({ eyebrow, title, body }: any) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">{eyebrow}</p>
      <p className="mt-1 text-[15px] font-semibold text-navy">{title}</p>
      <p className="mt-1 text-sm text-cool-600">{body}</p>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: any) {
  return (
    <Card onClick={onClick} className="flex flex-col items-center gap-3 px-4 py-6 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cool-100 text-navy">{icon}</span>
      <span className="text-sm font-semibold text-navy">{label}</span>
    </Card>
  );
}
