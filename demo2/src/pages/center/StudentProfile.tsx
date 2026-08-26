import { Link } from "react-router";
import { ChevronRight, Pencil, User, Users, Mail, Phone, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const ENROLLED = [
  { name: "Robotics Camp: Sumo Bots", meta: "Week 2 of 4 · Coach: Marcus" },
  { name: "Python Prodigy", meta: "Week 1 of 8 · Coach: Marcus" },
];
const COMPLETED = [
  { name: "Scratch Basics", meta: "Completed May 2026 · Coach: Sarah · 8 weeks" },
  { name: "Intro to Robotics", meta: "Completed Jun 2026 · Coach: Marcus · 6 weeks" },
];
const NOTES = [
  { who: "Marcus", date: "Aug 1, 2026", text: "Robert showed great persistence debugging his motor code. Helped two classmates configure their bots." },
  { who: "Marcus", date: "Jul 30, 2026", text: "Strong spatial reasoning. Excels at mechanical assembly, takes longer with code syntax." },
  { who: "Sarah", date: "May 15, 2026", text: "Completed Scratch with enthusiasm. Ready for Python track." },
];
const PAYMENTS = [
  { date: "Aug 1, 2026", amt: "$350.00", status: "Paid", tone: "teal", method: "Visa 8901", tx: "TXN-8F2A1C" },
  { date: "Jul 1, 2026", amt: "$175.00", status: "Failed", tone: "gold", method: "Visa 4242", tx: "TXN-7D1E9B" },
  { date: "Jun 1, 2026", amt: "$175.00", status: "Paid", tone: "teal", method: "Visa 4242", tx: "TXN-6C3D4E" },
  { date: "May 1, 2026", amt: "$175.00", status: "Paid", tone: "teal", method: "Visa 8901", tx: "TXN-5B2A1D" },
  { date: "Apr 1, 2026", amt: "$175.00", status: "Paid", tone: "teal", method: "Visa 8901", tx: "TXN-4A9B8C" },
];

export default function StudentProfile() {
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/students" className="hover:text-navy">Students</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Robert Hayes</span>
      </p>

      <Card className="mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-5">
          <Avatar name="Robert Hayes" size={72} ring />
          <div>
            <h1 className="flex items-center gap-3 text-[30px] font-semibold tracking-tight text-navy">Robert Hayes <Badge tone="teal">Active</Badge></h1>
            <p className="mt-0.5 flex items-center gap-4 text-[15px] text-cool-600">
              <span className="flex items-center gap-1.5"><User size={14} /> 10 years old</span>
              <span className="flex items-center gap-1.5"><Users size={14} /> Hayes Family</span>
            </p>
          </div>
        </div>
        <Button variant="outline"><Pencil size={15} /> Edit Profile</Button>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,420px)]">
        {/* left */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Student Information</h2>
            <div className="mt-4 divide-y divide-cool-300/40 text-sm">
              {[["First Name", "Robert"], ["Last Name", "Hayes"], ["Address", "456 Maple Drive, Plainsboro, NJ 08536"]].map(([l, v]) => (
                <div key={l} className="flex justify-between gap-4 py-3"><span className="text-cool-600">{l}</span><span className="font-semibold text-navy">{v}</span></div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Parent/Guardian Information</h2>
            <div className="mt-4 flex items-center justify-between">
              <p className="font-semibold text-navy">Jennifer Hayes</p>
              <Badge tone="navy">Primary Parent</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Pill icon={<Mail size={13} />}>jennifer.hayes@email.com</Pill>
              <Pill icon={<Phone size={13} />}>Home: (609) 555-0234</Pill>
              <Pill icon={<Phone size={13} />}>Cell: (609) 555-0267</Pill>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Emergency Contact</h2>
            <div className="mt-4 space-y-4">
              {[["Michael Hayes", "Father", "(609) 555-0301"], ["Rose Hayes", "Grandma", "(609) 555-0345"]].map(([n, rel, ph]) => (
                <div key={n} className="border-b border-cool-300/40 pb-4 last:border-0 last:pb-0">
                  <p className="flex items-center gap-2 font-semibold text-navy">{n} <Badge tone="gray">{rel}</Badge></p>
                  <Pill icon={<Phone size={13} />} className="mt-2 inline-flex">{ph}</Pill>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-navy">Medical Notes</h2>
              <span className="text-xs text-cool-600">Last updated: Jun 15, 2026</span>
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-[12px] border border-gold/40 bg-gold/10 p-4">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#c23b3b]" />
              <p className="text-sm text-navy"><span className="font-semibold text-[#c23b3b]">CRITICAL INFORMATION</span><br />Mild peanut allergy — has EpiPen in backpack. No other known allergies or conditions.</p>
            </div>
            <Button variant="outline" className="mt-4">Edit Medical Notes</Button>
          </Card>
        </div>

        {/* right */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Currently Enrolled</h2>
            <div className="mt-4 space-y-3">
              {ENROLLED.map((e) => (
                <div key={e.name} className="rounded-[12px] border border-cool-300/60 px-4 py-3.5">
                  <div className="flex items-center justify-between"><p className="font-semibold text-navy">{e.name}</p><Badge tone="teal">Active</Badge></div>
                  <p className="mt-1 text-xs text-cool-600">{e.meta}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">Courses Completed</h2>
            <div className="mt-4 space-y-3">
              {COMPLETED.map((c) => (
                <div key={c.name} className="flex items-start gap-2.5 border-b border-cool-300/40 pb-3 last:border-0 last:pb-0">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-teal" />
                  <div><p className="font-semibold text-navy">{c.name}</p><p className="text-xs text-cool-600">{c.meta}</p></div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-navy">Notes from Coaches</h2>
              <button className="text-sm font-semibold text-[#a9741a] underline underline-offset-2">View All Notes</button>
            </div>
            <div className="mt-4 space-y-3.5">
              {NOTES.map((n, i) => (
                <div key={i} className="border-b border-cool-300/40 pb-3.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-navy"><span className="h-1.5 w-1.5 rounded-full bg-gold" /> {n.who}</span>
                    <span className="text-xs text-cool-600">{n.date}</span>
                  </div>
                  <p className="mt-1 text-sm italic text-cool-600">"{n.text}"</p>
                </div>
              ))}
            </div>
          </Card>

          <Card accent="gold" className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-navy">Notes from Center Director</h2>
              <span className="text-xs text-cool-600">Last updated: Jul 20, 2026</span>
            </div>
            <p className="mt-3 text-sm italic text-cool-600">"Hayes family enrolled both Robert and sister Emma (Scratch). Parents very engaged — attend all showcases. Consider for advanced track."</p>
            <Button variant="outline" className="mt-4">Edit Notes</Button>
          </Card>
        </div>
      </div>

      {/* billing */}
      <div className="mt-10 border-t border-cool-300/60 pt-8">
        <h2 className="mb-5 text-[24px] font-semibold text-navy">Tuition &amp; Billing</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-[20px] font-semibold text-navy">Payment Status</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Row l="Current Status"><Badge tone="teal">Current</Badge></Row>
              <Row l="Monthly Tuition Amount"><span className="font-semibold text-navy">$175.00</span></Row>
              <Row l="Next Payment Due"><span className="font-semibold text-navy">September 1, 2026</span></Row>
              <Row l="Auto-Pay"><span className="flex items-center gap-1.5 font-semibold text-teal"><span className="h-2 w-2 rounded-full bg-teal" /> Enabled</span></Row>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-[20px] font-semibold text-navy">Payment Method on File</h3>
            <div className="mt-4 space-y-3 text-sm">
              <Row l="Card type"><span className="font-semibold text-navy">Visa •••• 8901</span></Row>
              <Row l="Expiration"><span className="font-semibold text-navy">09/2028</span></Row>
              <Row l="Cardholder Name"><span className="font-semibold text-navy">David Thompson</span></Row>
              <Row l="Status"><Badge tone="teal">Active</Badge></Row>
            </div>
            <div className="mt-5 flex gap-3">
              <Button variant="outline" full>Update Card</Button>
              <Button variant="primary" full>Process Payment</Button>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-[20px] font-semibold text-navy">Payment History</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead><tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600"><th className="pb-3">Date</th><th className="pb-3">Amount</th><th className="pb-3">Status</th><th className="pb-3">Method</th><th className="pb-3">Transaction ID</th></tr></thead>
                <tbody className="divide-y divide-cool-300/40">
                  {PAYMENTS.map((p) => (
                    <tr key={p.tx}><td className="py-3 font-semibold text-navy">{p.date}</td><td className="py-3 font-semibold text-navy">{p.amt}</td><td className="py-3"><Badge tone={p.tone as any}>{p.status}</Badge></td><td className="py-3 text-navy">{p.method}</td><td className="py-3 text-cool-600">{p.tx}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="outline">Message Family About Billing</Button>
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, children, className = "" }: { icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-[8px] border border-cool-300 bg-white px-3 py-1.5 text-cool-600 ${className}`}>{icon} {children}</span>;
}
function Row({ l, children }: { l: string; children: React.ReactNode }) {
  return <div className="flex items-center justify-between"><span className="text-cool-600">{l}</span>{children}</div>;
}
