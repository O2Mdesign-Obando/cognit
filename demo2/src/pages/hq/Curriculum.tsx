import { useState } from "react";
import { Search, Plus, MoreHorizontal, CloudUpload, ArrowRight } from "lucide-react";
import { HeaderBar, Card, Button, Badge, ProgressBar } from "../../components/ui";

const TEMPLATES = [
  { cat: "Coding", name: "Python Prodigy", v: "2.4", status: "Published", adopt: 42, updated: "Aug 3, 2026" },
  { cat: "Coding", name: "Scratch Explorers", v: "3.1", status: "Published", adopt: 47, updated: "Jul 28, 2026" },
  { cat: "Mobile Dev", name: "App Inventor", v: "1.2", status: "Draft", adopt: 0, updated: "Aug 1, 2026" },
  { cat: "AI/ML", name: "AI Foundations", v: "1.0", status: "Published", adopt: 28, updated: "Jun 15, 2026" },
];

const JOURNEYS = [
  { name: "Beginner Coding Journey", meta: "12 weeks Duration · 45 Centers Active", status: "Published" },
  { name: "Advanced Problem Solving", meta: "8 weeks Duration · 0 Centers Active", status: "Draft" },
  { name: "Creative Computing", meta: "10 weeks Duration · 38 Centers Active", status: "Published" },
];

export default function Curriculum() {
  const [tab, setTab] = useState("All");
  return (
    <div className="animate-fade-up">
      <HeaderBar
        title="Curriculum Management"
        subtitle="Prepare and distribute course templates and learning journeys across the network"
        actions={<Button variant="primary"><Plus size={16} /> New Template</Button>}
      />

      <Card className="mb-6 flex flex-wrap items-center gap-3 p-4">
        <div className="flex flex-1 items-center gap-2 rounded-[10px] border border-cool-300 px-3 py-2">
          <Search size={16} className="text-cool-600" />
          <input placeholder="Search templates…" className="w-full bg-transparent text-sm outline-none" />
        </div>
        <div className="flex gap-1.5">
          {["All", "Published", "Draft", "Archived"].map((f) => (
            <button
              key={f}
              onClick={() => setTab(f)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                tab === f ? "bg-navy text-white" : "border border-cool-300 text-cool-600 hover:border-navy"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </Card>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-navy">Course Templates</h2>
        <span className="text-xs text-cool-600">4 Total Courses</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {TEMPLATES.map((t) => (
          <Card key={t.name} className="flex flex-col p-5">
            <div className="flex items-center justify-between">
              <Badge tone="gray">{t.cat}</Badge>
              <Badge tone={t.status === "Published" ? "teal" : "gold"}>● {t.status}</Badge>
            </div>
            <h3 className="mt-4 text-[19px] font-semibold text-navy">{t.name}</h3>
            <p className="text-xs text-cool-600">Template Version {t.v}</p>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wide text-cool-600">Adoption</span>
                <span className="font-semibold text-navy">{t.adopt}/47 Centers</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={(t.adopt / 47) * 100} />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-cool-300/50 pt-3">
              <span className="text-xs text-cool-600">Updated {t.updated}</span>
              <button className="rounded-lg p-1.5 text-cool-600 hover:bg-cool-100">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,380px)]">
        <div>
          <h2 className="mb-4 text-[20px] font-semibold text-navy">Learning Journey Templates</h2>
          <div className="space-y-3">
            {JOURNEYS.map((j) => (
              <Card key={j.name} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-[15px] font-semibold text-navy">{j.name}</p>
                  <p className="text-xs text-cool-600">{j.meta}</p>
                </div>
                <Badge tone={j.status === "Published" ? "teal" : "gold"}>● {j.status}</Badge>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[20px] font-semibold text-navy">Active Deployment Status</h2>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cool-100 text-navy">
                <CloudUpload size={18} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-navy">Latest Curriculum Push</p>
                <p className="text-xs text-cool-600">Aug 3, 2026</p>
              </div>
            </div>
            <div className="mt-4 rounded-[12px] bg-cool-50 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cool-600">Course Template</p>
              <p className="text-[15px] font-semibold text-navy">Python Prodigy v2.4</p>
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-cool-300/50 pt-4">
                <div>
                  <p className="text-xs text-cool-600">Adopted</p>
                  <p className="text-[18px] font-semibold text-teal">10 Centers</p>
                </div>
                <div>
                  <p className="text-xs text-cool-600">Needs Review</p>
                  <p className="text-[18px] font-semibold text-gold">2 Centers</p>
                </div>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline">
              Track deployment in live-sync console <ArrowRight size={15} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
