import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  Home,
  Globe,
  Building2,
  BookOpen,
  BarChart3,
  Award,
  ShieldCheck,
  LifeBuoy,
  UploadCloud,
  Menu,
  X,
} from "lucide-react";
import { LogoIcon, Avatar } from "../../lib/brand";
import { ROLES } from "../../data/roles";

const ICONS: Record<string, any> = {
  Home,
  "Network Overview": Globe,
  "Center Management": Building2,
  Curriculum: BookOpen,
  Insights: BarChart3,
  Performance: Award,
  Governance: ShieldCheck,
  Support: LifeBuoy,
  Deployment: UploadCloud,
};

export function SidebarLayout() {
  const role = ROLES.hq;
  const [open, setOpen] = useState(false);

  const sidebar = (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-cool-300/60 bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <LogoIcon className="h-9 w-9" />
        <div className="leading-tight">
          <p className="text-[17px] font-semibold text-navy">Cognit</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">Franchise Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {role.nav.map((item) => {
          const Icon = ICONS[item.label] ?? Home;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.endsWith("/home")}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[15px] font-medium transition ${
                  isActive
                    ? "border-l-[3px] border-l-teal bg-cool-50 text-navy"
                    : "border-l-[3px] border-l-transparent text-cool-600 hover:bg-cool-50 hover:text-navy"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={isActive ? "text-teal" : ""} />
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="m-3 flex items-center gap-3 rounded-[12px] border border-cool-300/60 px-3 py-2.5">
        <Avatar name={role.user} size={38} />
        <div className="leading-tight">
          <p className="text-sm font-semibold text-navy">{role.user}</p>
          <p className="text-xs text-cool-600">Franchise Director</p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-full">
      <div className="hidden lg:block">{sidebar}</div>

      <div className="flex w-full flex-1 flex-col">
        {/* mobile */}
        <header className="flex h-14 items-center justify-between border-b border-cool-300/60 bg-white px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <LogoIcon className="h-7 w-7" />
            <span className="text-[15px] font-semibold text-navy">Cognit HQ</span>
          </div>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="demo2-hq-navigation"
            className="rounded-lg p-2 hover:bg-cool-100"
          >
            <Menu size={20} />
          </button>
        </header>
        {open && (
          <div id="demo2-hq-navigation" className="fixed inset-0 z-50 flex">
            <div className="h-full">{sidebar}</div>
            <button aria-label="Close navigation" className="flex-1 bg-deepnavy/40" onClick={() => setOpen(false)}>
              <X className="m-4 text-white" />
            </button>
          </div>
        )}
        <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto lg:max-w-[1080px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
