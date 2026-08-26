import { Link } from "react-router";
import { Plus, BellOff, Info } from "lucide-react";
import { Card, Button, Badge, PageTitle } from "../../components/ui";

const PARENT = [
  { name: "Hayes Family", time: "10:24 AM", body: "Hi Jack, Saúl had a blast in Web Dev yesterday. Just wanted to ask if he needs to bring his own l…", unread: true },
  { name: "Martinez Family", time: "Yesterday", body: "Good morning! Emma will be late today by 15 mins because of dentist appointment.", unread: true },
  { name: "Jake's Mom", time: "Jul 28", body: "Thanks for the feedback yesterday. We will keep practicing Python variables at home.", unread: false },
];

const COACH = [
  { name: "Sarah", time: "9:15 AM", body: "Sarah: Question about Robotics Week 2 materials. Do we have extra LEGO hubs in cabinet B?", unread: true },
  { name: "Marcus", time: "Yesterday", body: "All observations for Saúl, Emma, and Jake are submitted and ready for your review.", unread: false },
];

const ANNOUNCEMENTS = [
  { title: "Summer Schedule Update", audience: ["Coaches", "Families"], status: "Active", tone: "teal" as const, created: "Jul 28" },
  { title: "Parent Night Aug 15", audience: ["Families"], status: "Active", tone: "teal" as const, created: "Jul 25" },
  { title: "Equipment Maintenance", audience: ["Coaches"], status: "Draft", tone: "gray" as const, created: "Today" },
];

export default function Communication() {
  return (
    <div className="animate-fade-up">
      <PageTitle title="Communication Hub" subtitle="Bridge the communication gaps. Reach families, sync with coaches, and manage center announcements." />

      <h2 className="mb-4 text-[22px] font-semibold tracking-tight text-navy">Direct Messages</h2>
      <div className="grid gap-5 lg:grid-cols-3">
        <MessageColumn title="Parent Messages" unread={2} messages={PARENT} />
        <MessageColumn title="Coach Messages" unread={1} messages={COACH} />
        <MessageColumn title="Student Messages" unread={0} messages={[]} />
      </div>

      <Card className="mt-8 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight text-navy">Center Announcements</h2>
            <p className="mt-1 text-sm text-cool-600">Announcements display in the Learning Hub for selected audiences. Website publishing coming soon.</p>
          </div>
          <Link to="/center/messages/compose"><Button variant="gold"><Plus size={16} /> New Announcement</Button></Link>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-cool-300/60 text-[11px] font-semibold uppercase tracking-wide text-cool-600">
                <th className="pb-3">Announcement Title</th>
                <th className="pb-3">Audience</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Created</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cool-300/40">
              {ANNOUNCEMENTS.map((a) => (
                <tr key={a.title}>
                  <td className="py-3.5 font-semibold text-navy">{a.title}</td>
                  <td className="py-3.5">
                    <span className="flex flex-wrap gap-1.5">
                      {a.audience.map((au) => <Badge key={au} tone="blue">{au}</Badge>)}
                    </span>
                  </td>
                  <td className="py-3.5"><Badge tone={a.tone}>{a.status}</Badge></td>
                  <td className="py-3.5 text-cool-600">{a.created}</td>
                  <td className="py-3.5 text-right">
                    <button className="text-sm font-semibold text-navy hover:underline">Edit</button>
                    <span className="ml-3 text-sm font-semibold text-cool-300">Archive</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-[12px] bg-cool-50 px-4 py-3 text-sm text-cool-600">
          <Info size={16} className="mt-0.5 shrink-0 text-gold" />
          <p><span className="font-semibold text-navy">Audience selector note:</span> Select who sees each announcement: Coaches · Students · Families · Website <Badge tone="gray" className="ml-1">Future</Badge></p>
        </div>
      </Card>
    </div>
  );
}

function MessageColumn({ title, unread, messages }: { title: string; unread: number; messages: { name: string; time: string; body: string; unread: boolean }[] }) {
  return (
    <Card className="flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[17px] font-semibold text-navy">
          {title}
          {unread > 0 && <Badge tone="gold">{unread} unread</Badge>}
        </h3>
        <Link to="/center/messages/compose"><Button variant="outline" className="px-3 py-1.5"><Plus size={14} /> Compose</Button></Link>
      </div>
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-14 text-cool-300">
          <BellOff size={30} />
          <p className="text-sm text-cool-600">No student messages</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div
              key={m.name}
              className={`rounded-[12px] border px-4 py-3 ${m.unread ? "border-gold/50 bg-gold/[0.04]" : "border-cool-300/60 bg-white"}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">{m.name}</p>
                <span className="text-xs text-cool-600">{m.time}</span>
              </div>
              <p className="mt-1 text-sm leading-snug text-cool-600">{m.body}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
