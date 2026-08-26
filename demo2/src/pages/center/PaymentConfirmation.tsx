import { Link } from "react-router";
import { CheckCircle2, XCircle, Mail, ArrowLeft, User } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";

const DETAILS = [
  ["Transaction ID", "TXN-8F2A1C93"],
  ["Date", "Aug 26, 2026 · 2:14 PM"],
  ["Payment Method", "Visa •••• 8901"],
  ["Processed By", "Jack Alvarez"],
];

export default function PaymentConfirmation() {
  return (
    <div className="animate-fade-up">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/billing" className="hover:text-navy">Billing</Link>
        <span>/</span> <span className="font-semibold text-navy">Payment Result</span>
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/12">
              <CheckCircle2 size={38} className="text-teal" />
            </div>
            <h1 className="mt-4 text-[30px] font-semibold tracking-tight text-navy">Payment Successful</h1>
            <p className="mt-1 text-sm text-cool-600">Payment for Jake Thompson has been processed.</p>
            <p className="mt-4 text-[44px] font-semibold tracking-tight text-navy">$350.00</p>

            <div className="mt-6 mx-auto max-w-sm divide-y divide-cool-300/40 text-left">
              {DETAILS.map(([l, v]) => (
                <div key={l} className="flex justify-between py-2.5 text-sm"><span className="text-cool-600">{l}</span><span className="font-semibold text-navy">{v}</span></div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="primary"><Mail size={15} /> Send Receipt</Button>
              <Button variant="outline"><ArrowLeft size={15} /> Return to Billing</Button>
              <Button variant="ghost"><User size={15} /> View Student Profile</Button>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#c23b3b]">Error State Example</p>
            <div className="mt-3 flex items-start gap-4 rounded-[12px] border border-[#dc4b4b]/40 bg-[#dc4b4b]/8 p-5">
              <XCircle size={30} className="shrink-0 text-[#c23b3b]" />
              <div>
                <p className="text-[18px] font-semibold text-navy">Payment Failed</p>
                <p className="mt-1 text-sm text-cool-600">The card was declined — <span className="font-semibold text-[#c23b3b]">insufficient funds</span>. No charge was made.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button variant="primary">Try a Different Card</Button>
                  <Button variant="outline">Message Family</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 lg:sticky lg:top-6 lg:self-start">
          <h2 className="text-[20px] font-semibold text-navy">Account Summary</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between"><span className="text-cool-600">Previous Balance</span><span className="font-semibold text-navy">$350.00</span></div>
            <div className="flex justify-between"><span className="text-cool-600">Payment Applied</span><span className="font-semibold text-teal">−$350.00</span></div>
            <div className="flex justify-between border-t border-cool-300/60 pt-2.5"><span className="font-semibold text-navy">Current Balance</span><span className="text-[18px] font-semibold text-navy">$0.00</span></div>
          </div>
          <div className="mt-5 rounded-[12px] bg-cool-50 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Breakdown</p>
            <div className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-cool-600">August tuition</span><span className="text-navy">$175.00</span></div>
              <div className="flex justify-between"><span className="text-cool-600">September tuition</span><span className="text-navy">$175.00</span></div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2"><Badge tone="teal">Account Current</Badge><Badge tone="blue">Auto-Pay On</Badge></div>
        </Card>
      </div>
    </div>
  );
}
