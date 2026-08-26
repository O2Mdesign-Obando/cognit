import { useNavigate } from "react-router";
import { Clock, BookOpen, Calendar, MessageSquare, Users, ArrowRight } from "lucide-react";
import { Card, PageTitle, SectionHeading, Eyebrow, Badge, Button } from "../../components/ui";

const SCHEDULE = [
  { time: "10:00 AM", name: "Python Prodigy", count: 3 },
  { time: "1:00 PM", name: "Robotics Explorers", count: 4 },
  { time: "3:30 PM", name: "Scratch Creators", count: 5 },
];
const STUDENTS = [
  { name: "Saúl M.", course: "Python Prodigy" },
  { name: "Emma R.", course: "Python Prodigy" },
  { name: "Jake T.", course: "Robotics Explorers" },
  { name: "Lily C.", course: "Robotics Explorers" },
  { name: "Noah B.", course: "Scratch Creators" },
  { name: "Ava S.", course: "Scratch Creators" },
];

export default function CoachHome() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-up">
      <PageTitle title="Good afternoon, Marcus." subtitle="Here's what you need to know before class starts." />

      {/* Upcoming class banner */}
      <Card className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[26px] font-semibold tracking-tight text-navy">Python Prodigy starts in 18 minutes</h2>
            <p className="mt-1 text-sm text-cool-600">Week 1 · Day 3 · 3 students enrolled · Everything is ready.</p>
          </div>
          <Badge tone="blue" className="shrink-0 text-[13px]">
            <Clock size={13} /> 3:42 PM
          </Badge>
        </div>

        <div className="mt-6 grid gap-6 border-t border-cool-300/50 pt-6 md:grid-cols-2">
          <Detail label="Objective">
            Students will write their first Python program using variables and print statements to display custom messages in the terminal.
          </Detail>
          <Detail label="Expected Outcomes">
            Every student declares a variable, assigns a string or integer value, and outputs it to the debug log successfully.
          </Detail>
          <Detail label="Continuity From Last Session">
            Confirm setup checklist is complete. Check if Saúl has resolved the environment sync blocker discussed last Wednesday.
          </Detail>
          <Detail label="Special Coach Notes">
            Keep an eye out for quick solvers and have the "Creative Variable Naming" bonus worksheet printed and prepared on your desk.
          </Detail>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-cool-300/50 pt-5">
          <button className="flex items-center gap-2 text-sm font-semibold text-navy hover:underline">
            <BookOpen size={16} /> View Lesson Plan
          </button>
          <Button variant="gold" onClick={() => navigate("/coach/class/python-prodigy/live")}>
            Begin Class <ArrowRight size={16} />
          </Button>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionHeading icon={<Calendar size={20} />}>Today's Schedule</SectionHeading>
          <p className="-mt-3 mb-4 text-sm text-cool-600">Your assigned roster tracks for today</p>
          <div className="space-y-3">
            {SCHEDULE.map((s) => (
              <div key={s.name} className="flex items-center gap-4 rounded-[12px] border border-cool-300/60 px-4 py-3">
                <span className="w-16 text-sm font-semibold text-navy">{s.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{s.name}</p>
                  <p className="text-xs text-cool-600">{s.count} students enrolled</p>
                </div>
                <button className="text-sm font-semibold text-navy hover:underline">View Lesson Plan</button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeading icon={<Users size={20} />}>My Students</SectionHeading>
          <p className="-mt-3 mb-4 text-sm text-cool-600">Enrolled across your assigned courses (view only)</p>
          <div className="divide-y divide-cool-300/50">
            {STUDENTS.map((s) => (
              <div key={s.name} className="flex items-center justify-between py-2.5">
                <span className="flex items-center gap-2.5 text-sm font-medium text-navy">
                  <span className="h-2 w-2 rounded-full bg-teal" /> {s.name}
                </span>
                <Badge tone="gray">{s.course}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <SectionHeading>Communications Hub</SectionHeading>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Eyebrow>Messages from Jack</Eyebrow>
            <div className="mt-3 rounded-[12px] bg-cool-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">Jack (Director)</p>
                <span className="text-xs text-cool-600">Today, 11:24 AM</span>
              </div>
              <p className="mt-1.5 text-sm text-cool-600">
                "Hi Marcus, Saúl's mother requested a quick overview after class regarding his variable declaration progress. Please capture a detailed note today."
              </p>
            </div>
          </div>
          <div>
            <Eyebrow>Send a Message</Eyebrow>
            <div className="mt-3 space-y-3">
              <Button variant="outline" full className="justify-start">
                <MessageSquare size={16} /> Message Jack (Director)
              </Button>
              <Button variant="outline" full className="justify-start">
                <Users size={16} /> Message a Student's Family
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-1.5 text-sm leading-relaxed text-navy/85">{children}</p>
    </div>
  );
}
