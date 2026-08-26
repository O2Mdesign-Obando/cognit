import { NavLink, Outlet } from "react-router";
import { GlobalHeader } from "./GlobalHeader";
import { ROLES, type RoleKey } from "../../data/roles";

export function TopNavLayout({ roleKey }: { roleKey: RoleKey }) {
  const role = ROLES[roleKey];
  return (
    <div className="flex min-h-full flex-col">
      <GlobalHeader role={role} />
      <nav className="sticky top-16 z-30 border-b border-cool-300/60 bg-white/90 px-2 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1200px] items-center gap-1 overflow-x-auto">
          {role.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to.endsWith("/home")}
              className={({ isActive }) =>
                `relative whitespace-nowrap px-3 py-3.5 text-[15px] font-medium transition ${
                  isActive
                    ? "text-navy after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-full after:bg-gold"
                    : "text-cool-600 hover:text-navy"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 py-10 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
