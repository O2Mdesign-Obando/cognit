import horizontal from "../imports/logo_-_horizontal.jpg";
import iconOnly from "../imports/Icon_only.jpg";
import wordMark from "../imports/Word_Mark.jpg";

export function LogoHorizontal({ className = "h-8" }: { className?: string }) {
  return <img src={horizontal} alt="Cognit" className={className} />;
}

export function LogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return <img src={iconOnly} alt="Cognit" className={`${className} object-contain`} />;
}

export function LogoWordmark({ className = "h-7" }: { className?: string }) {
  return <img src={wordMark} alt="Cognit" className={className} />;
}

/** Deterministic initials avatar with brand-tinted background. */
const AVATAR_TINTS = [
  "bg-navy text-white",
  "bg-teal text-white",
  "bg-blue text-deepnavy",
  "bg-deepnavy text-white",
];

export function Avatar({
  name,
  src,
  size = 32,
  ring = false,
  className = "",
}: {
  name: string;
  src?: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tint = AVATAR_TINTS[name.charCodeAt(0) % AVATAR_TINTS.length];
  const ringCls = ring ? "ring-2 ring-gold ring-offset-2 ring-offset-white" : "";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold ${tint} ${ringCls} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {src ? <img src={src} alt={name} className="h-full w-full object-cover" /> : initials}
    </span>
  );
}
