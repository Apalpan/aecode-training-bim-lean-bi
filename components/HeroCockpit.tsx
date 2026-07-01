"use client";

import { Activity, ClipboardCheck, Database, ExternalLink, Radar, ShieldCheck, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { bimLeanBiProgram, bimLeanBiTotalHours } from "@/data/bimLeanBiProgram";
import { hoursSeries, moduleAccentVar } from "@/data/bimLeanBiDerived";
import { asset, CountUp, Eyebrow, LiveBadge } from "@/components/ui";

const NODE_LABELS = ["LEAN", "BIM", "BI", "IA"]; // m01..m04 map to these nodes
const NODES = [
  { x: 50, y: 20 },
  { x: 82, y: 58 },
  { x: 50, y: 88 },
  { x: 18, y: 58 }
];

export function HeroCockpit() {
  const modules = bimLeanBiProgram.modules;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % modules.length), 3800);
    return () => clearInterval(t);
  }, [paused, modules.length]);

  const m = modules[active];
  const accent = moduleAccentVar[m.id] ?? "var(--primary)";
  const cumulative = hoursSeries[active]?.cumulative ?? 0;
  const cumulativePct = Math.round((cumulative / bimLeanBiTotalHours) * 100);

  return (
    <section id="inicio" className="relative overflow-hidden pt-14 pb-8 md:pt-20">
      {/* photography-forward backdrop with navy overlay (aecode.ai signature) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] overflow-hidden" aria-hidden>
        <img src={asset("/programs/bim-lean-bi/cover-top.jpg")} alt="" className="h-full w-full object-cover opacity-[0.18]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgb(14 17 33 / 0.5) 0%, rgb(14 17 33 / 0.8) 52%, var(--bg) 100%)" }} />
      </div>
      <div className="ac-wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        {/* ---------------- Left: narrative ---------------- */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="ac-chip ac-chip-accent">AECODE Training</span>
            <LiveBadge>{bimLeanBiProgram.format} · {bimLeanBiProgram.hours} horas</LiveBadge>
          </div>

          <p className="mt-6"><Eyebrow>Diplomado Internacional</Eyebrow></p>
          <h1 className="ac-display mt-4 text-[color:var(--text)]" style={{ fontSize: "var(--fs-hero)" }}>
            Controla obra con <span className="ac-gradient-text">BIM, Lean, BI e IA</span> —{" "}
            <span className="text-[color:var(--text)]">verificable, no aislada.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-7 text-[color:var(--text)]">
            Seguimiento, datos, evidencias y certificación por skills aplicadas.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[color:var(--text-2)]">{bimLeanBiProgram.promise}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="ac-chip">{bimLeanBiProgram.academicStructure.label}</span>
            <span className="ac-chip">{bimLeanBiProgram.practicalMix}</span>
            <span className="ac-chip ac-chip-green">Autodesk Forma · ACC · Power BI</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a className="ac-btn ac-btn-primary" href="#temario">Ver temario de 90h</a>
            <a className="ac-btn ac-btn-ghost" href={bimLeanBiProgram.masterclassUrl} target="_blank" rel="noreferrer">
              Abrir clase magistral <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-4 max-w-xl text-[13px] leading-6 text-[color:var(--text-3)]">
            {bimLeanBiProgram.academicStructure.globalCertificationRule}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {bimLeanBiProgram.metrics.map((metric, i) => (
              <div key={metric.value} className="ac-kpi" style={{ ["--accent" as string]: moduleAccentVar[`m0${i + 1}`] ?? "var(--primary)" }}>
                <strong className="ac-display block text-[color:var(--text)]" style={{ fontSize: "1.9rem" }}>
                  <CountUp value={metric.value} />
                </strong>
                <span className="mt-1.5 block text-[13px] leading-5 text-[color:var(--text-2)]">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Right: dark AI cockpit island ---------------- */}
        <div
          className="cmd-surface ac-inner p-5 md:p-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ ["--accent" as string]: accent }}
        >
          <div className="ac-scan" aria-hidden />
          <div className="relative flex items-center justify-between gap-3">
            <div>
              <p className="ac-eyebrow" style={{ color: "#a6a7ff" }}>
                <Radar className="h-3.5 w-3.5" aria-hidden /> AI Cockpit
              </p>
              <h2 className="ac-display mt-1 text-xl text-white">Mapa de control de obra</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(148_163_184/0.24)] px-2.5 py-1 text-[11px] font-bold text-[#9fb2cc]">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--aec-success)" }} aria-hidden /> Trazable
            </span>
          </div>

          {/* module selector */}
          <div className="relative mt-4 grid grid-cols-4 gap-1.5">
            {modules.map((mod, i) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => { setActive(i); setPaused(true); }}
                className="rounded-lg border px-2 py-2 text-center transition-colors"
                style={{
                  borderColor: i === active ? moduleAccentVar[mod.id] : "rgb(148 163 184 / 0.18)",
                  background: i === active ? "rgb(255 255 255 / 0.06)" : "transparent",
                  color: i === active ? "#fff" : "#9fb2cc"
                }}
                aria-pressed={i === active}
                aria-label={`Ver módulo ${mod.id.toUpperCase()} ${mod.shortTitle}`}
              >
                <span className="mono block text-[11px] font-bold">{mod.id.toUpperCase()}</span>
                <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-wide">{NODE_LABELS[i]}</span>
              </button>
            ))}
          </div>

          {/* radar viz */}
          <div className="relative mt-4 aspect-[16/10] w-full">
            <svg viewBox="0 0 100 62" className="h-full w-full" role="img" aria-label={`Nodo activo: ${NODE_LABELS[active]}`}>
              <defs>
                <radialGradient id="cockpitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              {[26, 19, 12].map((r) => (
                <circle key={r} cx="50" cy="40" r={r} fill="none" stroke="rgb(148 163 184 / 0.18)" strokeWidth="0.3" />
              ))}
              {NODES.map((n, i) => {
                const cx = n.x;
                const cy = 12 + n.y * 0.42;
                return (
                  <line key={`l${i}`} x1="50" y1="40" x2={cx} y2={cy} stroke="rgb(148 163 184 / 0.22)" strokeWidth="0.3" />
                );
              })}
              <circle cx="50" cy="40" r="24" fill="url(#cockpitGlow)" />
              {NODES.map((n, i) => {
                const cx = n.x;
                const cy = 12 + n.y * 0.42;
                const on = i === active;
                return (
                  <g key={`n${i}`}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={on ? 4.6 : 3}
                      fill={on ? moduleAccentVar[`m0${i + 1}`] : "#2a2f4d"}
                      stroke={on ? "#ffffff" : "rgb(148 163 184 / 0.4)"}
                      strokeWidth="0.4"
                      className={on ? "ac-node" : ""}
                      style={{ transformOrigin: `${cx}px ${cy}px` }}
                    />
                    <text x={cx} y={cy + 0.9} textAnchor="middle" fontSize="2.4" fontWeight="800" fill={on ? "#0e1121" : "#9fb2cc"}>
                      {NODE_LABELS[i]}
                    </text>
                  </g>
                );
              })}
              <circle cx="50" cy="40" r="6.5" fill="#0c0f29" stroke="var(--accent)" strokeWidth="0.5" />
              <text x="50" y="41" textAnchor="middle" fontSize="3.4" fontWeight="800" fill="#fff">90h</text>
            </svg>
          </div>

          {/* cumulative progress */}
          <div className="relative mt-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#9fb2cc]">
              <span>Avance de ruta · hasta {m.shortTitle}</span>
              <span className="tnum text-white">{cumulative}h / {bimLeanBiTotalHours}h</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[rgb(148_163_184/0.16)]">
              <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${cumulativePct}%`, background: "var(--accent)" }} />
            </div>
          </div>

          {/* telemetry */}
          <div className="relative mt-4 grid grid-cols-2 gap-2.5">
            {[
              { label: "Módulo activo", value: m.shortTitle, icon: Target },
              { label: "Horas", value: `${m.hours}h`, icon: Activity },
              { label: "Skills clave", value: m.skills.slice(0, 2).join(" · "), icon: Database },
              { label: "Trabajo final", value: m.finalWork, icon: ClipboardCheck }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-lg border border-[rgb(148_163_184/0.16)] bg-[rgb(255_255_255/0.04)] p-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em]" style={{ color: "#a6a7ff" }}>
                    <Icon className="h-3.5 w-3.5" aria-hidden /> {item.label}
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-[13px] font-bold leading-5 text-white">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
