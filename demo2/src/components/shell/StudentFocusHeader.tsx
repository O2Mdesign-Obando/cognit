import { Sparkles } from "lucide-react";

/** Thin immersive top bar for student lesson-flow screens. */
export function StudentFocusHeader({ crumbs }: { crumbs: { text: string; accent?: boolean }[] }) {
  return (
    <header className="flex items-center gap-2.5 bg-gradient-to-r from-deepnavy via-navy to-teal px-6 py-4 text-white">
      <Sparkles size={18} className="text-gold" />
      <p className="flex flex-wrap items-center gap-2 text-[15px] font-semibold">
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/40">·</span>}
            <span className={c.accent ? "text-gold" : ""}>{c.text}</span>
          </span>
        ))}
      </p>
    </header>
  );
}
