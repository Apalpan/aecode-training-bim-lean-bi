"use client";

import { Boxes, GaugeCircle, GraduationCap, Layers, LineChart, Wrench } from "lucide-react";
import { useState } from "react";
import { bimLeanBiProgram, bimLeanBiTotalHours, bimLeanBiWorkshopCount } from "@/data/bimLeanBiProgram";
import {
  hoursSeries,
  toolCatalog,
  totalCapsules,
  totalCompetencies,
  totalSkills,
  uniqueToolCount
} from "@/data/bimLeanBiDerived";
import { CountUp, Reveal, SectionHeader } from "@/components/ui";

// chart geometry (viewBox units)
const W = 100;
const H = 56;
const PAD_L = 8;
const PAD_R = 4;
const PAD_T = 6;
const PAD_B = 10;
const innerW = W - PAD_L - PAD_R;
const innerH = H - PAD_T - PAD_B;
const yOf = (hours: number) => PAD_T + innerH * (1 - hours / bimLeanBiTotalHours);
const colStep = innerW / hoursSeries.length;
const xOf = (i: number) => PAD_L + colStep * (i + 0.5);

const stats = [
  { icon: GaugeCircle, value: `${bimLeanBiTotalHours}h`, label: "en vivo" },
  { icon: Layers, value: `${bimLeanBiProgram.modules.length}`, label: "módulos evaluables" },
  { icon: LineChart, value: `${bimLeanBiWorkshopCount}`, label: "talleres IA" },
  { icon: GraduationCap, value: `${totalSkills}`, label: "skills aplicadas" },
  { icon: Boxes, value: `${totalCapsules}`, label: "cápsulas de contenido" },
  { icon: Wrench, value: `${uniqueToolCount}`, label: "herramientas del stack" }
];

export function Analytics() {
  const [hover, setHover] = useState<number | null>(null);
  const [cat, setCat] = useState<string>("all");

  const cumulativePath = hoursSeries.map((p, i) => `${i === 0 ? "M" : "L"} ${xOf(i)} ${yOf(p.cumulative)}`).join(" ");
  const areaPath = `${cumulativePath} L ${xOf(hoursSeries.length - 1)} ${yOf(0)} L ${xOf(0)} ${yOf(0)} Z`;
  const focus = hover !== null ? hoursSeries[hover] : hoursSeries[hoursSeries.length - 1];
  const filteredCats = cat === "all" ? toolCatalog : toolCatalog.filter((c) => c.key === cat);

  return (
    <section id="analitica" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Analítica del programa"
          title="Cada hora conecta aprendizaje, práctica y evidencia"
          description="La curva S del diplomado: horas incrementales por módulo y avance acumulado hacia las 90 horas certificables. El mismo lenguaje BI que enseñamos, aplicado al propio programa."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          {/* ---------------- chart island ---------------- */}
          <Reveal className="cmd-surface ac-inner p-5 md:p-6">
            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="ac-eyebrow" style={{ color: "#a6a7ff" }}>
                  <LineChart className="h-3.5 w-3.5" aria-hidden /> Curva S · 90 horas
                </p>
                <h3 className="ac-display mt-1 text-xl text-white">Distribución y avance acumulado</h3>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-bold text-[#9fb2cc]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex gap-0.5">
                    {hoursSeries.map((p) => <span key={p.id} className="h-2.5 w-2.5 rounded-sm" style={{ background: p.accent }} />)}
                  </span>
                  Horas / módulo
                </span>
                <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 rounded-full bg-white" /> Acumulado</span>
              </div>
            </div>

            <div className="relative mt-4">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Curva S de horas del diplomado">
                <defs>
                  <linearGradient id="sArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7837dd" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#7837dd" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* gridlines */}
                {[0, 30, 60, 90].map((h) => (
                  <g key={h}>
                    <line x1={PAD_L} y1={yOf(h)} x2={W - PAD_R} y2={yOf(h)} stroke="rgb(148 163 184 / 0.14)" strokeWidth="0.2" />
                    <text x={PAD_L - 1.5} y={yOf(h) + 1} textAnchor="end" fontSize="2.4" fill="#6b7e99">{h}</text>
                  </g>
                ))}
                {/* incremental bars */}
                {hoursSeries.map((p, i) => {
                  const bw = colStep * 0.42;
                  const on = hover === i;
                  return (
                    <rect
                      key={p.id}
                      x={xOf(i) - bw / 2}
                      y={yOf(p.hours)}
                      width={bw}
                      height={yOf(0) - yOf(p.hours)}
                      rx="1"
                      fill={p.accent}
                      opacity={on || hover === null ? 1 : 0.5}
                      style={{ transition: "opacity 200ms" }}
                    />
                  );
                })}
                {/* cumulative area + line */}
                <path d={areaPath} fill="url(#sArea)" />
                <path d={cumulativePath} fill="none" stroke="#ffffff" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                {hoursSeries.map((p, i) => (
                  <circle key={`c${p.id}`} cx={xOf(i)} cy={yOf(p.cumulative)} r={hover === i ? 1.9 : 1.3} fill="#0e1121" stroke="#fff" strokeWidth="0.5" style={{ transition: "r 150ms" }} />
                ))}
                {/* hover columns + labels */}
                {hoursSeries.map((p, i) => (
                  <g key={`h${p.id}`}>
                    <a href={`#${p.id}`} aria-label={`Ir al módulo ${p.shortTitle}`}>
                      <rect
                        x={PAD_L + colStep * i}
                        y={PAD_T}
                        width={colStep}
                        height={innerH}
                        fill="transparent"
                        onMouseEnter={() => setHover(i)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </a>
                    <text x={xOf(i)} y={H - 3.5} textAnchor="middle" fontSize="2.5" fontWeight="700" fill={hover === i ? "#fff" : "#9fb2cc"}>{p.id.toUpperCase()}</text>
                  </g>
                ))}
              </svg>

              <div className="pointer-events-none absolute right-2 top-1 rounded-lg border border-[rgb(148_163_184/0.2)] bg-[rgb(12_15_41/0.9)] px-3 py-2 backdrop-blur">
                <p className="text-[10px] font-black uppercase tracking-wide" style={{ color: "#a6a7ff" }}>{focus.id.toUpperCase()} · {focus.shortTitle}</p>
                <p className="tnum mt-0.5 text-sm font-bold text-white">{focus.hours}h <span className="text-[#9fb2cc]">({focus.pct}%)</span> · acumulado {focus.cumulative}h</p>
              </div>
            </div>
          </Reveal>

          {/* ---------------- stat stack ---------------- */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 40} className="ac-kpi ac-card-hover" style={{ ["--accent" as string]: `var(--m0${(i % 4) + 1})` }}>
                  <Icon className="h-5 w-5" style={{ color: `var(--m0${(i % 4) + 1})` }} aria-hidden />
                  <strong className="ac-display mt-2 block text-3xl text-[color:var(--text)]"><CountUp value={s.value} /></strong>
                  <span className="mt-1 block text-[12px] font-semibold leading-4 text-[color:var(--text-2)]">{s.label}</span>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ---------------- tool ecosystem ---------------- */}
        <Reveal className="ac-panel mt-5 p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="ac-eyebrow"><Wrench className="h-3.5 w-3.5" aria-hidden /> Ecosistema de herramientas</p>
              <h3 className="ac-display mt-1 text-xl text-[color:var(--text)]">El stack real del control de obra</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button type="button" onClick={() => setCat("all")} className="ac-chip ac-chip-btn" data-active={cat === "all"}>Todas</button>
              {toolCatalog.map((c) => (
                <button key={c.key} type="button" onClick={() => setCat(c.key)} className="ac-chip ac-chip-btn" data-active={cat === c.key}>{c.label}</button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCats.map((c) => (
              <div key={c.key} className="rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4" style={{ ["--accent" as string]: c.accent }}>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  <p className="text-[12px] font-black uppercase tracking-[0.1em] text-[color:var(--text-2)]">{c.label}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.tools.map((t) => (
                    <span key={t} className="ac-chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
