import { LogoIcon } from "../../lib/brand";
import { Avatar } from "../../lib/brand";

/** Immersive header for coach focus-mode screens (live class, post-class review). */
export function CoachFocusHeader({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const dark = variant === "dark";
  return (
    <header
      className={`flex items-center justify-between px-6 py-4 ${
        dark ? "bg-deepnavy text-white" : "border-b border-cool-300/60 bg-white text-navy"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <LogoIcon className="h-8 w-8 rounded-[8px]" />
        <span className="text-[20px] font-semibold tracking-tight">Cognit</span>
      </span>

      <span className="hidden items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] md:flex">
        <span className={dark ? "text-white/60" : "text-cool-600"}>Current Context:</span>
        <span
          className={`rounded-full px-3 py-1 ${
            dark ? "border border-gold/60 text-gold" : "bg-cool-100 text-navy"
          }`}
        >
          Plainsboro Center
        </span>
      </span>

      <span className="flex items-center gap-3">
        <span className="text-right leading-tight">
          <span className="block text-sm font-semibold">Marcus</span>
          <span className={`block text-xs ${dark ? "text-white/60" : "text-cool-600"}`}>Lead Robotics Coach</span>
        </span>
        <Avatar name="Marcus Reed" size={40} ring />
      </span>
    </header>
  );
}
