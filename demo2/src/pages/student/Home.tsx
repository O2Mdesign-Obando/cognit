import { useNavigate } from "react-router";
import { Check, Clock, Calendar, Info, ArrowRight } from "lucide-react";
import { Card, PageTitle, SectionHeading, Eyebrow, Badge, Button } from "../../components/ui";
import { Avatar } from "../../lib/brand";
import heroPhoto from "../../imports/ChatGPT_Image_Aug_19__2026__10_50_04_AM.png";
import coachPhoto from "../../imports/Generic_Coach_Placeholder.png";

export default function StudentHome() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-up">
      <PageTitle title="Good afternoon, Saúl." subtitle="Your next class starts in 12 minutes." />

      {/* Hero */}
      <div className="flex items-center justify-between gap-6 overflow-hidden rounded-[16px] bg-gradient-to-r from-deepnavy via-navy to-blue px-8 py-7 [box-shadow:var(--shadow-card)]">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-white">Ready to code something amazing?</h2>
          <p className="mt-1 text-blue/90">Your learning journey continues — let's build!</p>
        </div>
        <img src={heroPhoto} alt="" className="hidden h-24 w-32 rounded-[12px] object-cover sm:block" />
      </div>

      {/* Stepper */}
      <div className="my-8 grid grid-cols-3 items-center gap-2 text-center">
        <Step state="done" caption="Where you've been" label="Completed Variables" />
        <Step state="current" caption="Where you are" label="Loops" />
        <Step state="upcoming" caption="Where you're going" label="Functions" />
      </div>

      {/* Before class card */}
      <Card className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge tone="navy">Python Prodigy</Badge>
              <Badge tone="gray">Week 3 · Day 2</Badge>
            </div>
            <h3 className="text-[26px] font-semibold tracking-tight text-navy">Variables and Loops Adventure</h3>
            <p className="mt-1 text-sm text-cool-600">Coach Marcus · Plainsboro Tech Room B</p>
          </div>
          <Badge tone="gold" className="shrink-0 text-[13px]">
            <Clock size={13} /> 3:30 – 4:30 PM
          </Badge>
        </div>

        <div className="mt-6 grid gap-6 border-t border-cool-300/50 pt-6 md:grid-cols-2">
          <div>
            <Eyebrow>Your Goal Today</Eyebrow>
            <p className="mt-1.5 text-sm leading-relaxed text-navy/85">
              Master loop constructs! You will write Python programs that repeat actions using <b>for</b> and <b>while</b> loops to make your robotic motor run automatically.
            </p>
          </div>
          <div>
            <Eyebrow>Previous Milestone</Eyebrow>
            <p className="mt-1.5 text-sm text-navy">
              <Badge tone="green" className="mr-2">Completed</Badge>
              Variable Declarations & print() Statements
            </p>
            <p className="mt-1.5 text-sm text-cool-600">Great job resolving the indentation loop logic on Wednesday!</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-cool-300/50 pt-5">
          <button className="text-sm font-semibold text-navy hover:underline">View Learning Roadmap</button>
          <Button variant="primary" onClick={() => navigate("/student/lesson/loops")}>
            Start Today's Lesson <ArrowRight size={16} />
          </Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionHeading icon={<Calendar size={20} />}>My Courses</SectionHeading>
          <p className="-mt-3 mb-4 text-sm text-cool-600">Track your learning modules</p>
          <div className="space-y-3">
            <CourseRow status="Active" tone="gold" name="Python Prodigy" meta="Progressing smoothly · Next: Week 3 Day 2" action="Resume" onAction={() => navigate("/student/lesson/loops")} />
            <CourseRow status="Upcoming" tone="gray" name="Roblox Game Design" meta="Starts in 2 weeks · Intro to Lua Scripting" action="Locked" />
            <CourseRow status="Passed" tone="green" name="Web Development with Scratch" meta="Earned Cognit Junior badge" action="View Certificate" />
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeading>Coach Notes for You</SectionHeading>
          <p className="-mt-3 mb-4 text-sm text-cool-600">Direct feedback and words of encouragement</p>
          <div className="rounded-[12px] border border-cool-300/60 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-navy">
                <Avatar name="Coach Marcus" src={coachPhoto} size={28} /> Coach Marcus
              </span>
              <span className="text-xs text-cool-600">Wednesday Session</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-navy/85">
              "Saúl, you showed amazing resilience on Wednesday! Troubleshooting that variable assignment logic yourself was a huge milestone. For today's session, let's carry that same focus into looping syntax. You're going to do great!"
            </p>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-cool-600">
            <Info size={13} /> Notes auto-update after each attended session
          </p>
        </Card>
      </div>
    </div>
  );
}

function Step({ state, caption, label }: { state: "done" | "current" | "upcoming"; caption: string; label: string }) {
  const dot =
    state === "done" ? (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-white">
        <Check size={14} />
      </span>
    ) : state === "current" ? (
      <span className="h-3 w-3 rounded-full bg-navy ring-4 ring-navy/15" />
    ) : (
      <span className="h-3 w-3 rounded-full bg-cool-300" />
    );
  return (
    <div className="flex flex-col items-center">
      <Eyebrow>{caption}</Eyebrow>
      <div className="mt-2 flex items-center gap-2">
        {dot}
        <span className={`text-[15px] font-semibold ${state === "upcoming" ? "text-cool-600" : state === "done" ? "text-teal" : "text-navy"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

function CourseRow({ status, tone, name, meta, action, onAction }: any) {
  return (
    <div className="flex items-center gap-4 rounded-[12px] border border-cool-300/60 px-4 py-3.5">
      <Badge tone={tone} className="w-20 justify-center">{status}</Badge>
      <div className="flex-1">
        <p className="text-[15px] font-semibold text-navy">{name}</p>
        <p className="text-xs text-cool-600">{meta}</p>
      </div>
      {onAction ? (
        <button onClick={onAction} className="text-sm font-semibold text-navy hover:underline">{action}</button>
      ) : (
        <span className="text-sm font-medium text-cool-600">{action}</span>
      )}
    </div>
  );
}
