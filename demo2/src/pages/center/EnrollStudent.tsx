import { Link } from "react-router";
import { ChevronRight, UserPlus, Check } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

export default function EnrollStudent() {
  return (
    <div className="animate-fade-up mx-auto max-w-[820px]">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/students" className="hover:text-navy">Students</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Enroll New Student</span>
      </p>
      <h1 className="flex items-center gap-3 text-[34px] font-semibold tracking-tight text-navy"><UserPlus size={28} className="text-gold" /> Enroll New Student</h1>
      <p className="mt-1 mb-7 text-[15px] text-cool-600">Register a student and link them to a family and course.</p>

      <Card className="p-6">
        <h2 className="text-[20px] font-semibold text-navy">Student Information</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="First Name"><I placeholder="First name" /></F>
          <F label="Last Name"><I placeholder="Last name" /></F>
          <F label="Age"><I placeholder="10" /></F>
          <F label="Grade"><I placeholder="5th" /></F>
          <div className="md:col-span-2"><F label="Home Address"><I placeholder="Street, City, State ZIP" /></F></div>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Family &amp; Contact</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="Link to Existing Family"><select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Hayes Family</option><option>Thompson Family</option><option>+ Create new family</option></select></F>
          <F label="Primary Parent"><I placeholder="Parent name" /></F>
          <F label="Parent Email"><I placeholder="parent@email.com" /></F>
          <F label="Parent Cell"><I placeholder="(609) 555-0000" /></F>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Course Enrollment</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="Course"><select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Python Prodigy</option><option>Robotics Camp: Sumo Bots</option><option>Scratch Basics</option></select></F>
          <F label="Start Date"><input type="date" className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy" /></F>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" defaultChecked className="accent-navy" /> Enable auto-pay ($175/mo)</label>
          <label className="flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" className="accent-navy" /> Send welcome email to family</label>
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-[20px] font-semibold text-navy">Medical &amp; Emergency</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <F label="Emergency Contact"><I placeholder="Name" /></F>
          <F label="Emergency Phone"><I placeholder="(609) 555-0000" /></F>
          <div className="md:col-span-2"><F label="Medical Notes / Allergies"><textarea rows={2} placeholder="Allergies, conditions, medications…" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-3 text-sm text-navy" /></F></div>
        </div>
      </Card>

      <div className="mt-7 flex items-center justify-end gap-3 border-t border-cool-300/60 pt-6">
        <Link to="/center/students" className="text-sm font-semibold text-cool-600 hover:text-navy">Cancel</Link>
        <Button variant="outline">Save as Draft</Button>
        <Button variant="primary"><Check size={15} /> Enroll Student</Button>
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
