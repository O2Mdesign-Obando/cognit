import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { Card, Button, Badge, Eyebrow } from "../../components/ui";
import { Avatar } from "../../lib/brand";
import studentPhoto from "../../imports/Male_Student_Placeholder.png";
import coachPhoto from "../../imports/Generic_Coach_Placeholder.png";

const MEMORIES = [
  { caption: "Robert and a teammate celebrating their first successful edge-detection test run. The robot spun back on a dime!" },
  { caption: "Detailing the sloped scoop attachment. Robert carefully adjusted the scoop's angle of incidence to maximize mechanical leverage." },
];

export default function LearningJourney() {
  const navigate = useNavigate();
  const [child, setChild] = useState("Robert");

  return (
    <div className="animate-fade-up -mx-6 -mt-6 md:-mx-10">
      {/* child selector */}
      <div className="flex items-center gap-3 px-6 pt-6 md:px-10">
        <Eyebrow>Learning Journey for</Eyebrow>
        <div className="flex gap-1.5">
          {["Robert", "Emma"].map((c) => (
            <button key={c} onClick={() => setChild(c)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${child === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* hero */}
      <div className="relative mt-6 overflow-hidden">
        <div className="relative flex items-end bg-gradient-to-r from-navy via-blue to-navy px-6 pb-8 pt-24 md:px-14 md:pt-32">
          <img src={studentPhoto} alt={child} className="absolute right-6 top-1/2 hidden w-[300px] -translate-y-1/2 opacity-95 md:block" />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy">Camp Wrap-Up</span>
            <h1 className="mt-3 text-[46px] font-semibold leading-none tracking-tight text-white">{child} Hayes</h1>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-gold">Robotics Camp &amp; Compilation</p>
            <p className="mt-1 text-[15px] font-medium text-white/90">Sumo Bots — Design, Build &amp; Battle · Week of July 20–27, 2026</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-6 pb-16">
        {/* headline */}
        <div className="pt-14 text-center">
          <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-navy">What an incredible week of creation!</h2>
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-cool-600">Robots designed, code compiled, and friendships forged. Celebrate the hard work, bright ideas, and technological breakthroughs of your young engineer.</p>
        </div>

        {/* coach note */}
        <Card accent="gold" className="mt-10 p-7">
          <div className="grid gap-5 sm:grid-cols-[120px_1fr]">
            <div className="text-center">
              <Avatar name="Coach Marcus" src={coachPhoto} size={64} ring className="mx-auto" />
              <p className="mt-2 text-sm font-semibold text-navy">Coach Marcus</p>
              <p className="text-xs text-cool-600">Lead Instructor</p>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-navy">A Note from Coach Marcus</h3>
              <p className="mt-3 text-sm leading-relaxed text-cool-600">I'm excited to share {child}'s progress throughout this week's Robotics Camp. He developed an outstanding foundation in mechanics and logic, demonstrating exceptional critical thinking during the physical design phase of his custom battle bot.</p>
              <p className="mt-3 text-sm leading-relaxed text-cool-600">{child} tackled troubleshooting challenges with patience and resourcefulness. He was instrumental in helping teammates debug their edge sensors and consistently showed natural leadership and mechanical persistency. It's been highly rewarding to guide him this week!</p>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#a9741a]"><Heart size={15} /> We're so proud of {child}'s journey!</p>
            </div>
          </div>
        </Card>

        {/* memories */}
        <div className="mt-16 text-center">
          <Badge tone="blue">Memories</Badge>
          <h2 className="mt-3 text-[30px] font-semibold tracking-tight text-navy">Moments Worth Remembering</h2>
          <p className="mt-2 text-sm text-cool-600">A spatial story of concentration, breakthrough, and proud triumphs captured live.</p>
        </div>
        <div className="mt-8 space-y-8">
          {MEMORIES.map((m, i) => (
            <figure key={i}>
              <img src={studentPhoto} alt="" className="w-full rounded-[16px] bg-gradient-to-br from-blue to-navy object-cover" />
              <figcaption className="mt-3 text-sm text-cool-600">{m.caption}</figcaption>
            </figure>
          ))}
        </div>

        {/* reflection */}
        <Card className="mt-16 bg-cool-50 p-8">
          <Badge tone="blue">Student Voice</Badge>
          <h3 className="mt-3 text-[22px] font-semibold text-navy">{child}'s Reflection</h3>
          <div className="mt-4 rounded-[14px] border border-cool-300/60 bg-white p-6">
            <p className="text-[19px] font-semibold leading-snug text-navy">"The hardest part was getting the robot to detect the edge of the ring, but I finally figured it out."</p>
            <p className="mt-3 text-sm font-semibold text-cool-600">— {child}</p>
          </div>
        </Card>

        {/* narrative arc */}
        <div className="mt-16 text-center">
          <h2 className="text-[26px] font-semibold tracking-tight text-navy">The Narrative Arc</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cool-600">This week, {child} went from building his first basic robot chassis to engineering a custom Sumo competitor with a clever plow attachment he fully planned, wired, and compiled by himself.</p>
        </div>

        {/* looking ahead */}
        <Card className="mt-12 bg-blue/10 p-7">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_140px]">
            <div>
              <Eyebrow>What's Next</Eyebrow>
              <h3 className="mt-2 text-[22px] font-semibold text-navy">Looking Ahead</h3>
              <p className="mt-2 text-sm leading-relaxed text-cool-600">Next week, {child} will begin teaching his robot to see and interact with the world around it using ultrasonic sensory waves and coordinated decision logic.</p>
              <ul className="mt-4 space-y-2 text-sm font-medium text-navy">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal" /> Sensor synthesis and coordinate translation</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-teal" /> Writing programs with custom libraries</li>
              </ul>
            </div>
            <img src={studentPhoto} alt="" className="mx-auto w-full max-w-[140px] rounded-[16px] bg-gradient-to-br from-blue to-navy object-cover" />
          </div>
        </Card>

        <div className="mt-10 flex justify-center">
          <Button variant="gold" onClick={() => navigate("/family/home")}>Continue {child}'s Learning Journey <ArrowRight size={16} /></Button>
        </div>
      </div>
    </div>
  );
}
