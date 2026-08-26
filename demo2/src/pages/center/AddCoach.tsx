import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, Plus, UserPlus } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

const EXPERTISE = ["Python", "Robotics", "Arduino", "Scratch", "3D Printing", "Game Design", "Web Dev", "AI Basics"];

export default function AddCoach() {
  const [tags, setTags] = useState<string[]>(["Python", "Robotics"]);
  const toggle = (t: string) => setTags((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div className="animate-fade-up mx-auto max-w-[820px]">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/coaches" className="hover:text-navy">Coaches</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Add New Coach</span>
      </p>
      <h1 className="flex items-center gap-3 text-[34px] font-semibold tracking-tight text-navy"><UserPlus size={28} className="text-gold" /> Add New Coach</h1>
      <p className="mt-1 mb-7 text-[15px] text-cool-600">Create a coach profile for the Plainsboro Center.</p>

      <Card className="p-6">
        <h2 className="text-[20px] font-semibold text-navy">Personal Information</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="First Name"><I placeholder="First name" /></F>
          <F label="Last Name"><I placeholder="Last name" /></F>
          <F label="Cognit Email"><I placeholder="name@cognit-plainsboro.com" /></F>
          <F label="Personal Email"><I placeholder="name@email.com" /></F>
          <F label="Cell Phone"><I placeholder="(609) 555-0000" /></F>
          <F label="Home Phone"><I placeholder="(609) 555-0000" /></F>
          <div className="md:col-span-2"><F label="Home Address"><I placeholder="Street, City, State ZIP" /></F></div>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Expertise</h2>
        <p className="mt-1 text-sm text-cool-600">Select the subject areas this coach can teach.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {EXPERTISE.map((e) => {
            const on = tags.includes(e);
            return <button key={e} onClick={() => toggle(e)} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? "border-blue bg-blue/12 text-navy" : "border-cool-300 text-cool-600 hover:border-cool-600"}`}>{on ? "✓ " : ""}{e}</button>;
          })}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Status &amp; Notes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="Employment Status"><select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Active</option><option>Onboarding</option><option>Substitute</option></select></F>
          <F label="Start Date"><input type="date" className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy" /></F>
        </div>
        <div className="mt-4"><F label="Director Notes (optional)"><textarea rows={3} placeholder="Certifications, availability, notes…" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-3 text-sm text-navy" /></F></div>
      </Card>

      <div className="mt-7 flex items-center justify-end gap-3 border-t border-cool-300/60 pt-6">
        <Link to="/center/coaches" className="text-sm font-semibold text-cool-600 hover:text-navy">Cancel</Link>
        <Button variant="primary"><Plus size={15} /> Create Coach Profile</Button>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>{children}</div>;
}
function I(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" />;
}
