"use client";

import {
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Download,
  Layers3,
  Search,
  Workflow,
  X
} from "lucide-react";
import { useMemo, useRef, useState, type ComponentType } from "react";
import { bimLeanBiProgram, bimLeanBiTotalHours, bimLeanBiWorkshopCount } from "@/data/bimLeanBiProgram";
import { moduleAccentVar, moduleUnitHours, type BimLeanBiModuleView } from "@/data/bimLeanBiDerived";
import { Reveal, SectionHeader } from "@/components/ui";

const moduleIcons: ComponentType<{ className?: string }>[] = [Layers3, Workflow, BarChart3, BrainCircuit];
type ViewMode = "temario" | "skills" | "evaluacion";

const viewModes: Array<{ id: ViewMode; label: string; hint: string }> = [
  { id: "temario", label: "Temario", hint: "Unidades, cápsulas y talleres" },
  { id: "skills", label: "Skills", hint: "Habilidades y competencias" },
  { id: "evaluacion", label: "Evaluación", hint: "Trabajo final y criterio" }
];

const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function Curriculum() {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("temario");
  const [activeModuleId, setActiveModuleId] = useState<string>(bimLeanBiProgram.modules[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const search = norm(query);

  const onTabKey = (e: React.KeyboardEvent) => {
    const idx = viewModes.findIndex((v) => v.id === viewMode);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % viewModes.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + viewModes.length) % viewModes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = viewModes.length - 1;
    else return;
    e.preventDefault();
    setViewMode(viewModes[next].id);
    tabRefs.current[next]?.focus();
  };

  const filteredModules = useMemo(() => {
    if (!search) return bimLeanBiProgram.modules;
    return bimLeanBiProgram.modules.filter((module) =>
      norm(
        [
          module.title, module.shortTitle, module.focus, module.question, module.objective,
          module.deliverable, module.finalWork, module.skills.join(" "), module.competencies.join(" "),
          module.certificationCriterion, module.tools.join(" "),
          module.units.map((u) => [u.title, u.capsules.join(" "), u.workshop.title, u.workshop.description, u.workshop.aiUse].join(" ")).join(" ")
        ].join(" ")
      ).includes(search)
    );
  }, [search]);

  return (
    <section id="temario" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Temario interactivo"
          title="90 horas · 4 módulos · cápsulas, talleres IA y entregables"
          description="Busca por herramienta, tema o resultado. Cada módulo explica qué aprende el participante, qué practica y qué evidencia produce."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[290px_1fr]">
          {/* ---------------- module console ---------------- */}
          <aside className="ac-panel h-max self-start p-4 lg:sticky lg:top-24 no-print">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[color:var(--text-3)]">Consola de módulos</p>
            <div className="mt-3 grid gap-1.5">
              {bimLeanBiProgram.modules.map((module) => {
                const dim = search !== "" && !filteredModules.some((f) => f.id === module.id);
                return (
                  <a
                    key={module.id}
                    href={`#${module.id}`}
                    onClick={() => setActiveModuleId(module.id)}
                    className="ac-module-btn"
                    data-active={activeModuleId === module.id}
                    style={{ ["--accent" as string]: moduleAccentVar[module.id], opacity: dim ? 0.4 : 1 }}
                  >
                    <span className="ac-module-dot">{module.id.toUpperCase()}</span>
                    <span className="min-w-0">
                      <strong className="block truncate text-[13px] font-bold text-[color:var(--text)]">{module.shortTitle}</strong>
                      <span className="block truncate text-[11px] text-[color:var(--text-3)]">{module.focus}</span>
                    </span>
                    <em className="tnum text-right text-xs font-bold not-italic" style={{ color: moduleAccentVar[module.id] }}>{module.hours}h</em>
                  </a>
                );
              })}
            </div>
            <div className="mt-4 rounded-[var(--r-sm)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-3">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[color:var(--aec-success)]">Validación</p>
              <p className="tnum mt-1 text-lg font-black text-[color:var(--text)]">{bimLeanBiTotalHours} horas totales</p>
              <p className="mt-1 text-[11px] leading-5 text-[color:var(--text-3)]">Suma oficial: 15 + 42 + 21 + 12.</p>
            </div>
          </aside>

          {/* ---------------- modules ---------------- */}
          <div>
            <div className="ac-panel mb-5 flex flex-col gap-3 p-3 md:flex-row md:items-center no-print">
              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-[var(--r-sm)] border border-[color:var(--border-strong)] bg-[color:var(--surface-2)] px-4 focus-within:border-[color:var(--primary)]">
                <Search className="h-4 w-4 text-[color:var(--text-3)]" aria-hidden />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar: BEP, ACC, Power BI, IA, RFIs, Navisworks, n8n, Speckle…"
                  type="search"
                  aria-label="Buscar en el temario"
                  className="h-full w-full bg-transparent text-base font-semibold text-[color:var(--text)] outline-none placeholder:text-[color:var(--text-3)]"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="text-[color:var(--text-3)] hover:text-[color:var(--text)]">
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </label>
              <div className="grid grid-cols-3 gap-1 rounded-[var(--r-sm)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-1" role="tablist" aria-label="Modo de vista" onKeyDown={onTabKey}>
                {viewModes.map((mode, i) => (
                  <button
                    key={mode.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    aria-selected={viewMode === mode.id}
                    tabIndex={viewMode === mode.id ? 0 : -1}
                    title={mode.hint}
                    onClick={() => setViewMode(mode.id)}
                    className="grid min-h-11 place-items-center rounded-[10px] px-3 text-xs font-bold transition-colors"
                    style={{
                      background: viewMode === mode.id ? "var(--primary)" : "transparent",
                      color: viewMode === mode.id ? "var(--text-on-primary)" : "var(--text-2)"
                    }}
                    type="button"
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
              <button className="ac-btn ac-btn-ghost min-h-12" onClick={() => window.print()} type="button">
                <Download className="h-4 w-4" /> PDF
              </button>
            </div>

            <div className="grid gap-5">
              {filteredModules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  icon={moduleIcons[bimLeanBiProgram.modules.indexOf(module)] ?? Layers3}
                  mode={viewMode}
                  onEnter={() => setActiveModuleId(module.id)}
                  revealDelay={index * 40}
                />
              ))}
              {filteredModules.length === 0 ? (
                <div className="ac-panel p-8 text-center">
                  <p className="text-lg font-black text-[color:var(--text)]">Sin resultados para “{query}”.</p>
                  <button className="ac-btn ac-btn-primary mt-4" onClick={() => setQuery("")} type="button">Limpiar búsqueda</button>
                </div>
              ) : null}
            </div>

            <div className="ac-panel mt-5 flex flex-wrap items-center justify-between gap-3 p-4">
              <strong className="text-[color:var(--text)]">Total validado: <span className="tnum">{bimLeanBiTotalHours}</span> horas</strong>
              <span className="ac-chip ac-chip-accent">{bimLeanBiWorkshopCount} talleres IA vinculados a unidades</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModuleCard({
  module,
  icon: Icon,
  mode,
  onEnter,
  revealDelay
}: {
  module: BimLeanBiModuleView;
  icon: ComponentType<{ className?: string }>;
  mode: ViewMode;
  onEnter: () => void;
  revealDelay: number;
}) {
  const accent = moduleAccentVar[module.id] ?? "var(--primary)";
  return (
    <Reveal delay={revealDelay}>
      <article
        id={module.id}
        className="ac-panel scroll-mt-24 overflow-hidden"
        style={{ ["--accent" as string]: accent }}
        onMouseEnter={onEnter}
      >
        <div className="grid items-center gap-4 border-b border-[color:var(--border)] p-5 md:grid-cols-[60px_1fr_104px]" style={{ background: "color-mix(in srgb, var(--accent) 6%, var(--surface))" }}>
          <div className="grid h-14 w-14 place-items-center rounded-[var(--r-md)] border" style={{ color: accent, borderColor: "color-mix(in srgb, var(--accent) 34%, transparent)", background: "color-mix(in srgb, var(--accent) 12%, var(--surface))" }}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="ac-chip">{module.level}</span>
              <span className="ac-chip ac-chip-accent">{module.focus}</span>
            </div>
            <h3 className="ac-display mt-2.5 text-2xl text-[color:var(--text)] md:text-[28px]">{module.title}</h3>
            <p className="mt-1.5 text-sm font-semibold leading-6 text-[color:var(--text-2)]">{module.question}</p>
          </div>
          <div className="rounded-[var(--r-md)] border p-3 text-center" style={{ borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", background: "color-mix(in srgb, var(--accent) 9%, var(--surface))" }}>
            <strong className="ac-display tnum block text-4xl" style={{ color: accent }}>{module.hours}</strong>
            <span className="text-[11px] font-black uppercase text-[color:var(--text-3)]">horas</span>
            <p className="tnum mt-1 text-[11px] font-semibold text-[color:var(--text-3)]">Unidades: {moduleUnitHours(module)}h</p>
          </div>
        </div>

        <div className="p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <InfoPanel label="Objetivo del módulo" value={module.objective} />
            <InfoPanel label="Entregable claro" value={module.deliverable} highlight />
          </div>
          <ModePanel module={module} mode={mode} />
          <div className="mt-4 flex flex-wrap gap-2">
            {module.tools.map((tool) => (
              <span key={tool} className="ac-chip">{tool}</span>
            ))}
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {module.units.map((unit, i) => (
              <UnitCard key={unit.title} unit={unit} index={i} />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function UnitCard({ unit, index }: { unit: BimLeanBiModuleView["units"][number]; index: number }) {
  const [open, setOpen] = useState(true);
  return (
    <article className="ac-card ac-card-hover flex flex-col p-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <span>
          <span className="mono rounded-md border border-[color:var(--border)] bg-[color:var(--surface-2)] px-2 py-1 text-[11px] font-bold" style={{ color: "var(--accent)" }}>
            Unidad {index + 1}
          </span>
          <span className="ac-display mt-2.5 block text-lg leading-tight text-[color:var(--text)]">{unit.title}</span>
        </span>
        <span className="flex flex-none items-center gap-1.5">
          <span className="ac-chip ac-chip-green tnum">{unit.hours}h</span>
          <ChevronDown className="h-4 w-4 text-[color:var(--text-3)] transition-transform duration-300 no-print" style={{ transform: open ? "rotate(180deg)" : "none" }} aria-hidden />
        </span>
      </button>

      <div className={`grid transition-all duration-300 ${open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} print:mt-4 print:grid-rows-[1fr] print:opacity-100`}>
        <div className="overflow-hidden">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[color:var(--text-3)]">Cápsulas</p>
          <ol className="mt-2.5 grid gap-2">
            {unit.capsules.map((capsule, ci) => (
              <li key={capsule} className="grid grid-cols-[22px_1fr] gap-2 text-[13px] leading-5 text-[color:var(--text-2)]">
                <span className="tnum grid h-5 w-5 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--surface-2)] text-[10px] font-bold" style={{ color: "var(--accent)" }}>{ci + 1}</span>
                <span>{capsule}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 rounded-[var(--r-sm)] border p-3.5" style={{ borderColor: "color-mix(in srgb, var(--aec-success) 30%, transparent)", background: "var(--aec-success-tint)" }}>
            <div className="flex items-center gap-2 text-sm font-black text-[color:var(--text)]">
              <Bot className="h-4 w-4" style={{ color: "var(--aec-success)" }} aria-hidden /> {unit.workshop.title}
            </div>
            <p className="mt-1.5 text-[13px] font-semibold leading-5 text-[color:var(--text)]">{unit.workshop.description}</p>
            <p className="mt-1.5 text-[12px] leading-5 text-[color:var(--text-2)]">{unit.workshop.aiUse}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ModePanel({ module, mode }: { module: BimLeanBiModuleView; mode: ViewMode }) {
  if (mode === "skills") {
    return (
      <div className="mt-4 grid gap-3 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rounded-[var(--r-md)] border p-4" style={{ borderColor: "color-mix(in srgb, var(--accent) 28%, transparent)", background: "color-mix(in srgb, var(--accent) 8%, var(--surface))" }}>
          <p className="text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>Skills que obtendrás</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {module.skills.map((s) => <span key={s} className="ac-chip">{s}</span>)}
          </div>
        </div>
        <div className="rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[color:var(--text-3)]">Competencias verificables</p>
          <ul className="mt-3 grid gap-2">
            {module.competencies.map((c) => (
              <li key={c} className="grid grid-cols-[20px_1fr] gap-2 text-[13px] leading-5 text-[color:var(--text-2)]">
                <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: "var(--aec-success)" }} aria-hidden /> <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (mode === "evaluacion") {
    return (
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <InfoPanel label="Trabajo final del módulo" value={module.finalWork} highlight />
        <InfoPanel label="Criterio de aprobación" value={module.certificationCriterion} />
      </div>
    );
  }
  return (
    <div className="mt-4 rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[color:var(--text-3)]">Enfoque del módulo</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[color:var(--text-2)]">{module.question}</p>
    </div>
  );
}

function InfoPanel({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className="rounded-[var(--r-md)] border p-4"
      style={
        highlight
          ? { borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", background: "color-mix(in srgb, var(--accent) 9%, var(--surface))" }
          : { borderColor: "var(--border)", background: "var(--surface-2)" }
      }
    >
      <p className="text-[11px] font-black uppercase tracking-[0.1em]" style={{ color: highlight ? "var(--accent)" : "var(--text-3)" }}>{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[color:var(--text-2)]">{value}</p>
    </div>
  );
}
