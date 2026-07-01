"use client";

import type { CSSProperties, ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { useCountUp, useReveal } from "@/lib/hooks";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;

/** Reveal-on-scroll wrapper. `delay` in ms staggers grid children. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  style
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLDivElement>();
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as never}
      className={`ac-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, icon = true }: { children: ReactNode; icon?: boolean }) {
  return (
    <span className="ac-eyebrow">
      {icon ? <Sparkles className="h-3.5 w-3.5" aria-hidden /> : null}
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="ac-display mt-3 text-[color:var(--text)]" style={{ fontSize: "var(--fs-section)" }}>
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[15px] leading-7 text-[color:var(--text-2)]">{description}</p>
      ) : null}
    </Reveal>
  );
}

/** Animated count-up figure. Splits number + suffix so "3/4", "90h", "3+1" render. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const { ref, value: n } = useCountUp(target);
  if (!match) {
    return <span className={className}>{value}</span>;
  }
  return (
    <span ref={ref as never} className={`tnum ${className}`}>
      {n}
      {suffix}
    </span>
  );
}

/** Sets the module accent variable for a subtree. */
export function AccentScope({
  accent,
  children,
  className = "",
  style,
  id,
  onMouseEnter
}: {
  accent: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  onMouseEnter?: () => void;
}) {
  return (
    <div id={id} className={className} style={{ ["--accent" as string]: accent, ...style }} onMouseEnter={onMouseEnter}>
      {children}
    </div>
  );
}

export function LiveBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-1 text-[11px] font-bold text-[color:var(--text-2)]">
      <span className="ac-live-dot inline-block h-2 w-2 rounded-full" style={{ background: "var(--aec-success)", color: "var(--aec-success)" }} />
      {children}
    </span>
  );
}
