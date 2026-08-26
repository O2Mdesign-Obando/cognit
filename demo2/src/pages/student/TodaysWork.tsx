import { useNavigate } from "react-router";
import { Cpu, ArrowRight } from "lucide-react";
import { Card, Badge, Button } from "../../components/ui";
import { Avatar } from "../../lib/brand";
import heroPhoto from "../../imports/ChatGPT_Image_Aug_19__2026__10_50_04_AM.png";

export default function TodaysWork() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-up">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[42px] font-semibold tracking-tight text-navy">Good afternoon, Saúl!</h1>
          <p className="mt-1 text-[16px] text-cool-600">Ready for your next learning adventure?</p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-cool-300/70 bg-white px-4 py-2">
          <Avatar name="Saúl Hayes" size={36} ring />
          <span className="leading-tight"><span className="block text-sm font-semibold text-navy">Saúl Hayes</span><span className="block text-xs text-cool-600">Cognit Explorer</span></span>
        </div>
      </div>

      <Card className="grid overflow-hidden md:grid-cols-[minmax(0,420px)_1fr]">
        <div className="flex items-center justify-center bg-gradient-to-br from-blue to-navy p-6">
          <img src={heroPhoto} alt="Saúl" className="aspect-square w-full max-w-[320px] rounded-full object-cover" />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <Badge tone="gold">Today · 4:00 PM</Badge>
            <Badge tone="blue">Python Adventure Quest</Badge>
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-widest text-gold">Your Next Challenge</p>
          <h2 className="mt-1 text-[34px] font-semibold leading-tight tracking-tight text-navy">Chapter 7 — The Variable Vault</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-cool-600">Use variables to unlock the vault and escape the dungeon. Help your team decode the hidden message block!</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button variant="gold" onClick={() => navigate("/student/lesson/loops")}>Start today's work <ArrowRight size={16} /></Button>
            <span className="flex items-center gap-1.5 text-sm font-medium text-teal"><span className="h-2 w-2 rounded-full bg-teal" /> Your coach and team are in the lobby</span>
          </div>
        </div>
      </Card>

      <p className="mt-8 mb-3 text-[11px] font-semibold uppercase tracking-wide text-cool-600">Upcoming Session</p>
      <Card className="flex items-center justify-between p-5">
        <span className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-gold/20 text-[#a9741a]"><Cpu size={20} /></span>
          <span><span className="block text-[17px] font-semibold text-navy">Robotics Explorers</span><span className="block text-sm text-cool-600">Sumo Battle Arena Setup</span></span>
        </span>
        <span className="text-[15px] font-semibold text-navy">Wednesday 5:30 PM</span>
      </Card>
    </div>
  );
}
