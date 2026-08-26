import { useState } from "react";
import { Link } from "react-router";
import { Wallet, Receipt, BookOpen, CreditCard, AlertCircle } from "lucide-react";
import { Card, Button, Badge, Eyebrow } from "../../components/ui";

const HISTORY = [
  "Aug 1, 2026", "Jul 1, 2026", "Jun 1, 2026", "May 1, 2026", "Apr 1, 2026",
].map((date) => ({ date, desc: "Monthly Tuition Plan - Combined Family View (Robert + Emma)", amt: "$350.00" }));

const ENROLLED = [
  { kid: "Robert Hayes", dot: "bg-blue", course: "Python Prodigy", time: "Mon/Wed • 10:00 AM", fee: "$175/mo" },
  { kid: "Emma Hayes", dot: "bg-[#e0559a]", course: "Scratch Creators", time: "Tue/Thu • 1:00 PM", fee: "$175/mo" },
];

export default function Billing() {
  const [kid, setKid] = useState("All Kids");
  return (
    <div className="animate-fade-up">
      <div className="mb-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="text-[38px] font-semibold tracking-tight text-navy">Tuition &amp; Billing</h1>
        <p className="text-[15px] text-cool-600">Manage your payment methods, tuition schedules, and billing records.</p>
      </div>
      <div className="mb-6 mt-3 flex items-center gap-3">
        <Eyebrow>Viewing for</Eyebrow>
        <div className="flex gap-1.5">
          {["All Kids", "Robert", "Emma"].map((c) => (
            <button key={c} onClick={() => setKid(c)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${kid === c ? "bg-gold text-deepnavy" : "border border-cool-300 bg-white text-cool-600 hover:border-navy"}`}>{c === "All Kids" ? "● All Kids" : c}</button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* payment summary */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 text-[20px] font-semibold text-navy"><Wallet size={20} className="text-gold" /> Payment Summary</h2>
              <Badge tone="teal">Account Status: Current</Badge>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Tile>
                <p className="text-sm text-cool-600">Monthly Tuition</p>
                <p className="mt-1 text-[28px] font-semibold tracking-tight text-navy">$350<span className="text-base font-normal text-cool-600"> / month</span></p>
                <p className="mt-1 text-xs text-cool-600">Robert ($175) + Emma ($175)</p>
              </Tile>
              <Tile>
                <p className="text-sm text-cool-600">Next Payment</p>
                <p className="mt-1 text-[24px] font-semibold tracking-tight text-navy">Sept 1, 2026</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-teal"><span className="h-2 w-2 rounded-full bg-teal" /> Auto-Pay Active</p>
              </Tile>
              <Tile>
                <p className="text-sm text-cool-600">Primary Method</p>
                <p className="mt-1 flex items-center gap-2 text-[16px] font-semibold text-navy"><span className="rounded bg-navy px-1.5 py-0.5 text-[10px] font-bold text-white">VISA</span> •••• 8901</p>
                <p className="mt-1 text-xs text-cool-600">Charges clear at 5:00 AM EST</p>
              </Tile>
            </div>
          </Card>

          {/* payment history */}
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2.5 text-[20px] font-semibold text-navy"><Receipt size={20} className="text-navy" /> Payment History</h2>
              <button className="text-sm font-semibold text-[#a9741a] hover:underline">Download All Receipts</button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead><tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600"><th className="pb-3">Date</th><th className="pb-3">Description</th><th className="pb-3 text-right">Amount</th><th className="pb-3 pl-6">Status</th></tr></thead>
                <tbody className="divide-y divide-cool-300/40">
                  {HISTORY.map((h) => (
                    <tr key={h.date}>
                      <td className="py-3.5 font-semibold text-navy">{h.date}</td>
                      <td className="py-3.5 text-cool-600">{h.desc}</td>
                      <td className="py-3.5 text-right font-semibold text-navy">{h.amt}</td>
                      <td className="py-3.5 pl-6"><Badge tone="teal">Paid</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* right rail */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="flex items-center gap-2.5 text-[20px] font-semibold text-navy"><BookOpen size={20} className="text-gold" /> Enrolled Courses</h2>
            <div className="mt-4 space-y-3">
              {ENROLLED.map((e) => (
                <div key={e.kid} className="rounded-[12px] border border-cool-300/60 p-4">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 text-sm font-semibold text-navy"><span className={`h-2 w-2 rounded-full ${e.dot}`} /> {e.kid}</p>
                    <span className="text-sm font-semibold text-gold">{e.fee}</span>
                  </div>
                  <p className="mt-2 font-semibold text-navy">{e.course}</p>
                  <p className="mt-0.5 text-xs text-cool-600">📅 {e.time}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="flex items-center gap-2.5 text-[20px] font-semibold text-navy"><CreditCard size={20} className="text-gold" /> Payment Method</h2>
            <div className="mt-4 rounded-[14px] bg-gradient-to-br from-navy to-deepnavy p-5 text-white">
              <div className="flex items-center justify-between">
                <CreditCard size={26} />
                <span className="text-lg font-bold italic">VISA</span>
              </div>
              <p className="mt-6 text-[18px] tracking-[0.2em]">•••• •••• •••• 8901</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span><span className="block text-white/50">CARDHOLDER</span><span className="font-semibold">DAVID THOMPSON</span></span>
                <span className="text-right"><span className="block text-white/50">EXPIRES</span><span className="font-semibold">09 / 2028</span></span>
              </div>
            </div>
            <Button variant="outline" full className="mt-4">Update Payment Method</Button>
          </Card>

          <Card accent="blue" className="p-5">
            <Link to="/family/makeup" className="flex items-center justify-between text-sm font-semibold text-navy hover:text-blue">
              View makeup credits <span>→</span>
            </Link>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-cool-300/50 pt-5 text-sm text-cool-600">
        <p className="flex items-center gap-2"><AlertCircle size={15} className="text-gold" /> Next billing cycle executes on <span className="font-semibold text-navy">September 1, 2026</span>. You can cancel or pause enrollment up to 3 days prior.</p>
        <p>Have questions about your statement? <Link to="/family/messages" className="font-semibold text-[#a9741a] hover:underline">Contact us</Link></p>
      </div>
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return <div className="rounded-[12px] border border-cool-300/60 bg-cool-50 p-4">{children}</div>;
}
