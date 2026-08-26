import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/* ----------------------------------------------------------- Card */
export function Card({
  children,
  className = "",
  accent,
  as: As = "div",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  accent?: "gold" | "red" | "teal" | "blue";
  as?: any;
  onClick?: () => void;
}) {
  const accentBorder = accent
    ? {
        gold: "border-l-4 border-l-gold",
        red: "border-l-4 border-l-[#dc4b4b]",
        teal: "border-l-4 border-l-teal",
        blue: "border-l-4 border-l-blue",
      }[accent]
    : "";
  return (
    <As
      onClick={onClick}
      className={`rounded-[16px] border border-cool-300/60 bg-white [box-shadow:var(--shadow-card)] ${accentBorder} ${
        onClick ? "cursor-pointer transition hover:-translate-y-0.5 hover:[box-shadow:var(--shadow-pop)]" : ""
      } ${className}`}
    >
      {children}
    </As>
  );
}

/* --------------------------------------------------------- Button */
type BtnVariant = "primary" | "gold" | "outline" | "ghost";
export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  full = false,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  full?: boolean;
}) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-navy text-white hover:bg-deepnavy",
    gold: "bg-gold text-deepnavy hover:brightness-105",
    outline: "border border-cool-300 bg-white text-navy hover:border-navy hover:bg-cool-50",
    ghost: "text-navy hover:bg-cool-100",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-[10px] px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/40 ${
        styles[variant]
      } ${full ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------- Badge */
type Tone = "teal" | "blue" | "gold" | "red" | "gray" | "navy" | "green";
const TONES: Record<Tone, string> = {
  teal: "bg-teal/12 text-teal",
  blue: "bg-blue/18 text-[#2e6ba0]",
  gold: "bg-gold/18 text-[#a9741a]",
  red: "bg-[#dc4b4b]/12 text-[#c23b3b]",
  green: "bg-[#18aaa5]/12 text-[#0f7d78]",
  gray: "bg-cool-100 text-cool-600",
  navy: "bg-navy text-white",
};
export function Badge({ children, tone = "gray", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------- Section header */
export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-[42px] font-semibold leading-[1.05] tracking-tight text-navy">{title}</h1>
      {subtitle && <p className="mt-2 text-[17px] text-cool-600">{subtitle}</p>}
    </div>
  );
}

export function SectionHeading({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-[22px] font-semibold tracking-tight text-navy">{children}</h2>
      {icon && <span className="text-cool-600">{icon}</span>}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-cool-600">{children}</p>;
}

/* ------------------------------------------------- Attention row */
export function ActionRow({
  title,
  meta,
  accent,
  cta,
  onCta,
  ctaVariant = "primary",
}: {
  title: string;
  meta: string;
  accent?: "gold" | "red" | "teal" | "blue";
  cta: string;
  onCta?: () => void;
  ctaVariant?: BtnVariant;
}) {
  return (
    <Card accent={accent} className="flex items-center justify-between gap-4 px-6 py-5">
      <div className="min-w-0">
        <p className="text-[19px] font-medium text-navy">{title}</p>
        <p className="mt-1 text-sm text-cool-600">{meta}</p>
      </div>
      <Button variant={ctaVariant} onClick={onCta} className="shrink-0">
        {cta} <ChevronRight size={16} />
      </Button>
    </Card>
  );
}

/* --------------------------------------------- Page header bar */
export function HeaderBar({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[34px] font-semibold tracking-tight text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-[15px] text-cool-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ------------------------------------------- Segmented control */
export function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-cool-300/70 bg-white p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
            value === o ? "bg-navy text-white" : "text-cool-600 hover:text-navy"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* --------------------------------------------------- Progress */
export function ProgressBar({ value, tone = "gold" }: { value: number; tone?: "gold" | "teal" | "navy" }) {
  const bar = { gold: "bg-gold", teal: "bg-teal", navy: "bg-navy" }[tone];
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-cool-100">
      <div className={`h-full rounded-full ${bar}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

/* -------------------------------------------------- Stat / KPI */
export function StatCard({ label, value, delta, tone }: { label: string; value: string; delta?: string; tone?: Tone }) {
  return (
    <Card className="px-5 py-4">
      <p className="text-[13px] font-medium text-cool-600">{label}</p>
      <p className="mt-1 text-[28px] font-semibold tracking-tight text-navy">{value}</p>
      {delta && (
        <p className="mt-1 text-xs font-medium">
          <Badge tone={tone ?? "green"}>{delta}</Badge>
        </p>
      )}
    </Card>
  );
}
