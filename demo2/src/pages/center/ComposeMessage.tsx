import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, X, Paperclip, Send } from "lucide-react";
import { Card, Button, Badge } from "../../components/ui";
import { Avatar } from "../../lib/brand";

const RECIPIENTS = ["Jennifer Hayes (Parent)", "Marcus Rivera (Coach)"];

export default function ComposeMessage() {
  const [chips, setChips] = useState(RECIPIENTS);
  const [priority, setPriority] = useState("Normal");
  return (
    <div className="animate-fade-up mx-auto max-w-[860px]">
      <p className="mb-5 flex items-center gap-1.5 text-sm text-cool-600">
        <Link to="/center/messages" className="hover:text-navy">Communication</Link>
        <ChevronRight size={14} /> <span className="font-semibold text-navy">Compose</span>
      </p>

      <div className="mb-6 flex items-center gap-3">
        <h1 className="text-[34px] font-semibold tracking-tight text-navy">New Message</h1>
        <Badge tone="gold">Draft Mode</Badge>
      </div>

      <Card className="p-6">
        <Row label="To">
          <div className="flex flex-wrap items-center gap-2 rounded-[10px] border border-cool-300 px-3 py-2">
            {chips.map((c) => (
              <span key={c} className="flex items-center gap-1.5 rounded-full bg-navy/8 px-3 py-1 text-sm font-medium text-navy">
                <Avatar name={c} size={18} /> {c}
                <button onClick={() => setChips((x) => x.filter((y) => y !== c))} className="text-cool-600 hover:text-[#c23b3b]"><X size={13} /></button>
              </span>
            ))}
            <input placeholder="Add recipient…" className="min-w-[140px] flex-1 bg-transparent py-1 text-sm text-navy outline-none" />
          </div>
        </Row>

        <Row label="Subject">
          <input defaultValue="Saúl's progress this week" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-2.5 text-sm text-navy" />
        </Row>

        <div className="grid gap-4 md:grid-cols-2">
          <Row label="Related Student">
            <select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Saúl Martinez</option><option>Robert Hayes</option><option>None</option></select>
          </Row>
          <Row label="Related Course">
            <select className="w-full rounded-[10px] border border-cool-300 bg-white px-3.5 py-2.5 text-sm text-navy"><option>Python Prodigy</option><option>Robotics Camp: Sumo Bots</option><option>None</option></select>
          </Row>
        </div>

        <Row label="Priority">
          <div className="flex gap-2">
            {["Normal", "High", "Urgent"].map((p) => (
              <button key={p} onClick={() => setPriority(p)} className={`rounded-[10px] border px-4 py-2 text-sm font-semibold ${priority === p ? (p === "Urgent" ? "border-[#c23b3b] bg-[#dc4b4b]/10 text-[#c23b3b]" : p === "High" ? "border-gold bg-gold/10 text-[#a9741a]" : "border-navy bg-navy/5 text-navy") : "border-cool-300 text-cool-600"}`}>{p}</button>
            ))}
          </div>
        </Row>

        <Row label="Message">
          <textarea rows={7} defaultValue="Hi Jennifer,&#10;&#10;I wanted to share how well Saúl did in Python this week — he debugged a tricky loop entirely on his own and even helped a classmate. We're really proud of his progress.&#10;&#10;Best,&#10;Jack" className="w-full rounded-[10px] border border-cool-300 px-3.5 py-3 text-sm leading-relaxed text-navy" />
        </Row>

        <button className="flex items-center gap-2 rounded-[10px] border border-dashed border-cool-300 px-4 py-3 text-sm font-medium text-cool-600 hover:border-navy hover:text-navy"><Paperclip size={15} /> Attach File</button>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-cool-300/60 pt-5">
          <Link to="/center/messages" className="text-sm font-semibold text-cool-600 hover:text-navy">Cancel</Link>
          <Button variant="outline">Save as Draft</Button>
          <Button variant="primary"><Send size={15} /> Send Message</Button>
        </div>
      </Card>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>
      {children}
    </div>
  );
}
