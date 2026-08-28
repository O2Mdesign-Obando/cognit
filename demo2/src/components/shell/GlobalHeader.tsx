import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronDown, LifeBuoy, Settings, LogOut } from "lucide-react";
import { LogoHorizontal, LogoIcon, Avatar } from "../../lib/brand";
import type { RoleConfig } from "../../data/roles";

export function GlobalHeader({ role }: { role: RoleConfig }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-cool-300/60 bg-white/90 px-5 backdrop-blur sm:px-8">
      <Link to={role.home} className="flex items-center gap-3">
        <LogoHorizontal className="hidden h-7 sm:block" />
        <LogoIcon className="h-8 w-8 sm:hidden" />
        <span className="hidden h-6 w-px bg-cool-300 sm:block" />
        <span className="hidden text-sm font-medium text-cool-600 sm:block">Learning Hub Demo</span>
      </Link>

      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={`Open ${role.user} account menu`}
          aria-expanded={open}
          aria-controls="demo2-account-menu"
          aria-haspopup="true"
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition hover:bg-cool-100"
        >
          <Avatar name={role.user} size={32} />
          <span className="hidden text-[13px] font-medium text-navy sm:block">{role.user.split(" ")[0]} {role.user.split(" ")[1]?.[0]}.</span>
          <ChevronDown size={16} className={`text-cool-600 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div id="demo2-account-menu" className="absolute right-0 mt-2 w-[200px] overflow-hidden rounded-[10px] border border-cool-300/60 bg-white py-1.5 [box-shadow:var(--shadow-pop)]">
            <MenuItem icon={<LifeBuoy size={16} />} onClick={() => navigate("/support")}>
              Support
            </MenuItem>
            <MenuItem icon={<Settings size={16} />} onClick={() => navigate(role.accountTo)}>
              {role.accountLabel}
            </MenuItem>
            <div className="my-1.5 h-px bg-cool-300/60" />
            <MenuItem icon={<LogOut size={16} />} danger onClick={() => navigate("/login")}>
              Log Out
            </MenuItem>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuItem({
  children,
  icon,
  danger,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm font-medium transition hover:bg-cool-100 ${
        danger ? "text-[#dc4b4b]" : "text-navy"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
