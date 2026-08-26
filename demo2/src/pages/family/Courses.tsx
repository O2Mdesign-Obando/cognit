import { useState } from "react";
import { Calendar, Clock, User, ChevronDown } from "lucide-react";
import { Card, Button, Badge, Eyebrow } from "../../components/ui";

type Course = {
  name: string; ages: string; desc: string; time: string; length: string; spots: string;
  price: string; state: "open" | "full" | "enrolled" | "rolling"; badge?: string; rec?: boolean;
};

const COURSES: Course[] = [
  { name: "Intro to AI and Machine Learning", ages: "Ages 11-13", desc: "Learn foundational Artificial Intelligence concepts. Explore neural networks, simple machine learning models, and ethical AI applications using interactive child-friendly tools.", time: "Tue/Thu 4:00 PM", length: "8 Weeks", spots: "6 of 8 spots left", price: "$200", state: "open", badge: "New" },
  { name: "Robotics Level 2", ages: "Ages 10-12", desc: "Take your robotics engineering and visual state coding to the next level. Build robust custom autonomous vehicles, integrate sound sensors, and solve advanced physical challenges.", time: "Mon/Wed 4:00 PM", length: "8 Weeks", spots: "4 of 6 spots left", price: "$185", state: "open" },
  { name: "Python Prodigy", ages: "Ages 9-12", desc: "Beginner to advanced concepts in Python syntax. Master structured control flows, custom algorithmic game builds, and real text-based application development.", time: "Mon/Wed 10:00 AM", length: "Ongoing", spots: "Class Full", price: "$175", state: "enrolled" },
  { name: "Game Design Advanced", ages: "Ages 11-14", desc: "Code immersive custom arcade levels with modular physics scripts. Learn logic variables, asset importing, coordinate positioning systems, and full structural logic testing.", time: "Fri 3:00 PM", length: "8 Weeks", spots: "7 of 8 spots left", price: "$175", state: "open" },
  { name: "Web Dev for Kids", ages: "Ages 10-13", desc: "Unlock the code behind the world wide web. Get comfortable writing semantic HTML tags, styling responsive cards with custom CSS, and deploying interactive JavaScript.", time: "Sat 10:00 AM", length: "8 Weeks", spots: "8 of 10 spots left", price: "$175", state: "open" },
  { name: "Scratch Creators", ages: "Ages 7-10", desc: "The ultimate sandbox introduction to computer science logic. Use colorful snap-together visual logic blocks to construct fun interactive stories, music videos, and custom games.", time: "Tue/Thu 1:00 PM", length: "Ongoing", spots: "Open Enrollment", price: "$175", state: "rolling", rec: true },
];

export default function Courses() {
  const [kid, setKid] = useState("Robert");
  const [age, setAge] = useState("All");
  const [cat, setCat] = useState("All");

  return (
    <div className="animate-fade-up">
      <div className="mb-4 flex items-center gap-3">
        <Eyebrow>Registering for</Eyebrow>
        <div className="flex gap-1.5">
          {["Robert", "Emma"].map((c) => (
            <button key={c} onClick={() => setKid(c)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${kid === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{kid === c ? "● " : ""}{c}</button>
          ))}
        </div>
      </div>

      <h1 className="text-[42px] font-semibold tracking-tight text-navy">Course Catalog</h1>
      <p className="mt-1 mb-6 text-[15px] text-cool-600">Browse and register for upcoming courses at Cognit Plainsboro.</p>

      <Card className="mb-7 flex flex-wrap items-end gap-6 px-5 py-5">
        <Filter label="Season"><Select>{["Fall 2026", "Winter 2027", "Summer 2026"]}</Select></Filter>
        <Filter label="Age Group"><Pills value={age} onChange={setAge} options={["All", "8-10", "11-13"]} /></Filter>
        <Filter label="Category"><Pills value={cat} onChange={setCat} options={["All", "Robotics", "Coding", "Game Design"]} /></Filter>
        <Filter label="Day/Time"><Select>{["All Times", "Mornings", "Afternoons", "Weekends"]}</Select></Filter>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {COURSES.map((c) => (
          <Card key={c.name} className="flex flex-col p-6">
            <div className="flex items-center gap-2">
              <Badge tone="navy">{c.ages}</Badge>
              {c.badge && <Badge tone="gold">{c.badge}</Badge>}
              {c.rec && <Badge tone="green">Recommended for Emma</Badge>}
            </div>
            <h3 className="mt-3 text-[22px] font-semibold text-navy">{c.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cool-600">{c.desc}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-cool-300/50 pt-4 text-sm text-cool-600">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {c.time}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {c.length}</span>
              <span className={`flex items-center gap-1.5 font-semibold ${c.state === "enrolled" ? "text-[#c23b3b]" : "text-gold"}`}><User size={14} /> {c.spots}</span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-[24px] font-semibold tracking-tight text-navy">{c.price}<span className="block text-xs font-normal text-cool-600">monthly tuition</span></p>
              {c.state === "enrolled" ? (
                <Badge tone="green">● Enrolled ({kid})</Badge>
              ) : c.state === "full" ? (
                <Button variant="outline" disabled>Join Waitlist</Button>
              ) : (
                <Button variant="gold">Register Now</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[16px] bg-deepnavy px-8 py-7 text-white">
        <div>
          <h3 className="text-[24px] font-semibold">Can't find what you're looking for?</h3>
          <p className="mt-1.5 max-w-xl text-sm text-white/70">We offer bespoke scheduling for private micro-groups, personalized advanced project mentoring, and flexible school holiday camps to fit your family's dynamic routine.</p>
        </div>
        <Button variant="gold">Contact Plainsboro Center</Button>
      </div>
    </div>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>{children}</div>;
}
function Pills({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="flex gap-1.5">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} className={`rounded-[8px] border px-3.5 py-2 text-sm font-semibold transition ${value === o ? "border-navy bg-navy text-white" : "border-cool-300 bg-white text-navy hover:border-navy"}`}>{o}</button>
      ))}
    </div>
  );
}
function Select({ children }: { children: string[] }) {
  return (
    <div className="relative">
      <select className="appearance-none rounded-[10px] border border-cool-300 bg-white py-2 pl-3.5 pr-9 text-sm font-semibold text-navy outline-none focus:border-navy">
        {children.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cool-600" />
    </div>
  );
}
