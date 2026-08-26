import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import { Card, Button } from "../../components/ui";

export default function AccountSettings() {
  const nav = useNavigate();
  const [prefs, setPrefs] = useState({ reminders: true, observations: true, billing: false });

  return (
    <div className="animate-fade-up mx-auto max-w-[900px]">
      <h1 className="text-[36px] font-semibold tracking-tight text-navy">Account Settings</h1>
      <p className="mt-1 mb-8 text-[15px] text-cool-600">Manage your family account preferences.</p>

      <Card className="p-7">
        <h2 className="text-[20px] font-semibold text-navy">Security</h2>
        <Field label="Password" value="•••••••••" action="Change" />
        <div className="h-px bg-cool-300/40" />
        <Field label="Email" value="hayes.family@gmail.com" action="Change" />
      </Card>

      <Card className="mt-6 p-7">
        <h2 className="text-[20px] font-semibold text-navy">Contact Information</h2>
        <Field label="Address" value="42 Oak Street, Plainsboro, NJ 08536" action="Edit" />
        <div className="h-px bg-cool-300/40" />
        <Field label="Phone" value="(609) 555-0142" action="Edit" />
      </Card>

      <Card className="mt-6 p-7">
        <h2 className="text-[20px] font-semibold text-navy">Preferences</h2>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Notifications</p>
            <p className="mt-0.5 font-semibold text-navy">Email &amp; In-App</p>
            <div className="mt-4 flex flex-wrap gap-6">
              <Toggle label="Session reminders" on={prefs.reminders} onClick={() => setPrefs((p) => ({ ...p, reminders: !p.reminders }))} />
              <Toggle label="Coach observations" on={prefs.observations} onClick={() => setPrefs((p) => ({ ...p, observations: !p.observations }))} />
              <Toggle label="Billing alerts" on={prefs.billing} onClick={() => setPrefs((p) => ({ ...p, billing: !p.billing }))} />
            </div>
          </div>
          <button className="rounded-[8px] bg-cool-100 px-4 py-1.5 text-sm font-semibold text-navy hover:bg-cool-300/50">Manage</button>
        </div>
        <div className="mt-6 h-px bg-cool-300/40" />
        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Language</p>
          <div className="relative mt-1 max-w-xs">
            <select className="w-full appearance-none rounded-[10px] border border-cool-300 bg-white px-4 py-2.5 font-semibold text-navy outline-none focus:border-navy"><option>English (US)</option><option>Español</option><option>Français</option></select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cool-600" />
          </div>
        </div>
      </Card>

      <div className="mt-8 flex justify-end gap-3">
        <Button variant="outline" onClick={() => nav(-1)}>Cancel</Button>
        <Button variant="primary" onClick={() => nav(-1)}>Save Changes</Button>
      </div>
    </div>
  );
}

function Field({ label, value, action }: { label: string; value: string; action: string }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">{label}</p>
        <p className="mt-0.5 font-semibold text-navy">{value}</p>
      </div>
      <button className="rounded-[8px] bg-cool-100 px-4 py-1.5 text-sm font-semibold text-navy hover:bg-cool-300/50">{action}</button>
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5">
      <span className={`relative h-6 w-11 rounded-full transition ${on ? "bg-navy" : "bg-cool-300"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </span>
      <span className="text-sm font-medium text-navy">{label}</span>
    </button>
  );
}
