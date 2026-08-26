import { Link } from "react-router";
import { ChevronRight, CreditCard, AlertTriangle, Lock } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const HISTORY = [
  { date: "Aug 1, 2026", amt: "$175.00", status: "Failed", tone: "red" as const },
  { date: "Jul 1, 2026", amt: "$175.00", status: "Paid", tone: "teal" as const },
  { date: "Jun 1, 2026", amt: "$175.00", status: "Paid", tone: "teal" as const },
];

export default function UpdatePayment() {
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/billing" className="hover:text-navy">Billing</Link>
        <ChevronRight size={14} /> Jake Thompson <ChevronRight size={14} /> <span className="font-semibold text-navy">Update Payment</span>
      </p>

      <Card accent="red" className="mb-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <Avatar name="Jake Thompson" size={56} ring />
          <div>
            <p className="text-[22px] font-semibold text-navy">Jake Thompson</p>
            <p className="text-sm text-cool-600">Scratch Basics · Thompson Family</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[26px] font-semibold text-[#c23b3b]">$175.00</p>
          <Badge tone="red">Past Due</Badge>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Card on File</p>
            <div className="mt-3 flex items-center justify-between rounded-[12px] border border-[#dc4b4b]/40 bg-[#dc4b4b]/8 px-4 py-3.5">
              <span className="flex items-center gap-3"><CreditCard size={20} className="text-[#c23b3b]" /><span><span className="block font-semibold text-navy">Visa •••• 4242</span><span className="block text-xs text-[#c23b3b]">Expired 06/2026</span></span></span>
              <AlertTriangle size={18} className="text-[#c23b3b]" />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-[22px] font-semibold text-navy">New Payment Method</h2>
            <div className="mt-4 space-y-4">
              <F label="Card Number"><input placeholder="1234 5678 9012 3456" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" /></F>
              <div className="grid grid-cols-2 gap-4">
                <F label="Expiration"><input placeholder="MM / YY" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" /></F>
                <F label="CVC"><input placeholder="123" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" /></F>
              </div>
              <F label="Cardholder Name"><input placeholder="Name on card" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" /></F>
              <F label="Billing Zip"><input placeholder="08536" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" /></F>
              <label className="flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" defaultChecked className="accent-navy" /> Save this card for future payments</label>
              <label className="flex items-center gap-2 text-sm text-cool-600"><input type="checkbox" defaultChecked className="accent-navy" /> Re-enable auto-pay on this account</label>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Payment Summary</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-cool-600">Past due (Aug)</span><span className="font-semibold text-navy">$175.00</span></div>
              <div className="flex justify-between"><span className="text-cool-600">Current (Sep)</span><span className="font-semibold text-navy">$175.00</span></div>
              <div className="mt-2 flex justify-between border-t border-cool-300/60 pt-2.5"><span className="font-semibold text-navy">Total Due Today</span><span className="text-[20px] font-semibold text-navy">$350.00</span></div>
            </div>
            <div className="mt-4 space-y-2.5">
              <Button variant="primary" full>Process Payment</Button>
              <Button variant="outline" full>Save Card Only</Button>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-cool-600"><Lock size={12} /> Secured &amp; PCI compliant</p>
          </Card>

          <Card className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Payment History</p>
            <div className="mt-3 divide-y divide-cool-300/40">
              {HISTORY.map((h) => (
                <div key={h.date} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-cool-600">{h.date}</span>
                  <span className="flex items-center gap-2"><span className="font-semibold text-navy">{h.amt}</span><Badge tone={h.tone}>{h.status}</Badge></span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>{children}</div>;
}
