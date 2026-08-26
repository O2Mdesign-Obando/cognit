import { useState } from "react";
import { User, BookOpen, GraduationCap, Paperclip, Send, ImageIcon } from "lucide-react";
import { Card, Button, Badge, Eyebrow } from "../../components/ui";
import { Avatar } from "../../lib/brand";
import studentPhoto from "../../imports/Male_Student_Placeholder.png";
import coachPhoto from "../../imports/Generic_Coach_Placeholder.png";

const THREADS = [
  { id: "marcus", name: "Coach Marcus", tag: "Robert • Python Prodigy", when: "2:45 PM", preview: "Looking forward to next week's challenge. He's d…", kind: "Coaches", src: coachPhoto },
  { id: "jack", name: "Jack (Center Director)", tag: "All Students • Fall Session", when: "Yesterday", preview: "Welcome back to the Fall session! Please check…", kind: "Center", unread: true },
  { id: "sarah", name: "Coach Sarah", tag: "Emma • Scratch Creators", when: "Wed", preview: "Great week in Scratch! Emma created an awesom…", kind: "Coaches" },
  { id: "amy", name: "Front Desk Amy", tag: "Tuition • Hayes Family", when: "Oct 12", preview: "Your October tuition invoice is now ready for view…", kind: "Center" },
  { id: "liam", name: "Coach Liam", tag: "Robert • Roblox Developer", when: "Oct 8", preview: "Hey Robert, excellent job publishing your first Ob…", kind: "Coaches" },
  { id: "jessica", name: "Coach Jessica", tag: "Emma • Web Dev Basics", when: "Oct 4", preview: "Emma made great progress learning CSS grids to…", kind: "Coaches" },
];

const TABS = ["All", "Coaches", "Center"];

export default function Messages() {
  const [kid, setKid] = useState("All Kids");
  const [tab, setTab] = useState("All");
  const [active, setActive] = useState("marcus");
  const list = THREADS.filter((t) => tab === "All" || t.kind === tab);
  const cur = THREADS.find((t) => t.id === active)!;

  return (
    <div className="animate-fade-up">
      <div className="mb-6 flex items-center gap-3">
        <Eyebrow>Viewing messages for</Eyebrow>
        <div className="flex gap-1.5">
          {["All Kids", "Robert", "Emma"].map((c) => (
            <button key={c} onClick={() => setKid(c)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${kid === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{c === "All Kids" ? "● All Kids" : c}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        {/* conversation list */}
        <Card className="flex flex-col p-5">
          <h2 className="text-[22px] font-semibold text-navy">Conversations</h2>
          <div className="mt-4 inline-flex rounded-[10px] border border-cool-300/70 bg-cool-50 p-1">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-[8px] px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-white text-navy shadow-sm" : "text-cool-600"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {list.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)} className={`flex w-full gap-3 rounded-[12px] border px-3.5 py-3 text-left transition ${active === t.id ? "border-gold/50 bg-gold/[0.05]" : "border-transparent hover:bg-cool-50"}`}>
                <Avatar name={t.name} src={t.src} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-navy">{t.name}</p>
                    <span className="flex items-center gap-1 whitespace-nowrap text-xs text-cool-600">{t.when}{t.unread && <span className="h-1.5 w-1.5 rounded-full bg-teal" />}</span>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{t.tag}</p>
                  <p className={`truncate text-sm ${t.unread ? "font-semibold text-navy" : "text-cool-600"}`}>{t.preview}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* thread */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-cool-300/50 px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar name={cur.name} src={cur.src} size={44} />
              <div>
                <p className="flex items-center gap-2 font-semibold text-navy">{cur.name} {cur.kind === "Coaches" && <Badge tone="gold">Instructor</Badge>}</p>
                <p className="text-sm text-cool-600">Regarding: <span className="font-semibold text-navy">{cur.tag.split(" • ")[0]}</span> · {cur.tag.split(" • ")[1]}</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-sm text-cool-600"><span className="h-2 w-2 rounded-full bg-teal" /> Active Now</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-cool-300/50 bg-cool-50 px-6 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Quick Links:</span>
            <QuickLink icon={<User size={14} />}>Robert's Profile</QuickLink>
            <QuickLink icon={<BookOpen size={14} />}>{cur.name} Info</QuickLink>
            <QuickLink icon={<GraduationCap size={14} />}>Curriculum</QuickLink>
          </div>

          <div className="flex-1 space-y-4 px-6 py-6">
            <p className="text-center text-xs font-semibold text-cool-600">Today</p>
            <div className="max-w-[80%] rounded-[14px] rounded-tl-sm bg-cool-50 p-4">
              <div className="flex items-center justify-between"><span className="text-sm font-semibold text-navy">{cur.name}</span><span className="text-xs text-cool-600">2:30 PM</span></div>
              <p className="mt-2 text-sm leading-relaxed text-navy">Hi Hayes Family! Robert showed great persistence debugging his script today. He hit an issue where his loop ran infinitely, but he systematically traced his variables and solved it himself. See his proud game face below!</p>
              <img src={studentPhoto} alt="" className="mt-3 w-full max-w-[280px] rounded-[12px] bg-gradient-to-br from-blue to-navy object-cover" />
              <p className="mt-2 flex items-center gap-1.5 text-xs text-cool-600"><ImageIcon size={13} /> robert_game_debug_complete.png</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-cool-300/50 px-6 py-4">
            <input placeholder={`Write a reply to ${cur.name}…`} className="flex-1 rounded-[10px] border border-cool-300 bg-white px-4 py-2.5 text-sm text-navy outline-none focus:border-navy" />
            <Button variant="outline"><Paperclip size={15} /> Attach</Button>
            <Button variant="gold"><Send size={15} /> Send</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function QuickLink({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <button className="flex items-center gap-1.5 rounded-[8px] border border-cool-300 bg-white px-3 py-1.5 text-xs font-semibold text-navy hover:border-navy">{icon} {children}</button>;
}
