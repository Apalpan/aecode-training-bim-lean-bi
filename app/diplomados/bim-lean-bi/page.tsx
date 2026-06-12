"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  LineChart,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  bimLeanBiProgram,
  bimLeanBiTotalHours,
  bimLeanBiWorkshopCount
} from "@/data/bimLeanBiProgram";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const moduleIcons = [Layers3, Workflow, BarChart3, BrainCircuit];

type BimLeanBiModuleView = (typeof bimLeanBiProgram.modules)[number];
type ViewMode = "temario" | "skills" | "evaluacion";

const viewModes: Array<{ id: ViewMode; label: string; description: string }> = [
  { id: "temario", label: "Temario", description: "Unidades, capsulas y talleres" },
  { id: "skills", label: "Skills", description: "Habilidades y competencias" },
  { id: "evaluacion", label: "Evaluacion", description: "Trabajo final y certificacion" }
];

const signalNodes = [
  { x: 50, y: 50, size: 68, tone: "lime", label: "90h", delay: 0 },
  { x: 24, y: 28, size: 20, tone: "cyan", label: "BEP", delay: 0.2 },
  { x: 34, y: 68, size: 26, tone: "green", label: "CDE", delay: 0.4 },
  { x: 68, y: 32, size: 30, tone: "cyan", label: "BI", delay: 0.6 },
  { x: 76, y: 66, size: 24, tone: "green", label: "IA", delay: 0.8 },
  { x: 18, y: 55, size: 16, tone: "green", label: "", delay: 1.1 },
  { x: 42, y: 22, size: 14, tone: "green", label: "", delay: 1.4 },
  { x: 61, y: 78, size: 18, tone: "cyan", label: "", delay: 1.7 },
  { x: 83, y: 43, size: 16, tone: "lime", label: "", delay: 2 },
  { x: 30, y: 44, size: 12, tone: "cyan", label: "", delay: 2.2 },
  { x: 58, y: 24, size: 12, tone: "green", label: "", delay: 2.4 },
  { x: 70, y: 54, size: 12, tone: "green", label: "", delay: 2.6 }
];

const signalLinks = [
  { x: 50, y: 50, width: 29, angle: -143 },
  { x: 50, y: 50, width: 25, angle: 136 },
  { x: 50, y: 50, width: 24, angle: -42 },
  { x: 50, y: 50, width: 27, angle: 35 },
  { x: 24, y: 28, width: 28, angle: 39 },
  { x: 34, y: 68, width: 34, angle: -52 },
  { x: 68, y: 32, width: 33, angle: 126 },
  { x: 76, y: 66, width: 31, angle: -155 }
];

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function BimLeanBiDiplomadoPage() {
  const [query, setQuery] = useState("");
  const [activeModuleId, setActiveModuleId] = useState<string>(bimLeanBiProgram.modules[0].id);
  const [viewMode, setViewMode] = useState<ViewMode>("temario");
  const search = normalizeSearch(query);

  const filteredModules = useMemo(() => {
    if (!search) return bimLeanBiProgram.modules;

    return bimLeanBiProgram.modules.filter((module) => {
      const searchable = normalizeSearch(
        [
          module.title,
          module.shortTitle,
          module.focus,
          module.question,
          module.objective,
          module.deliverable,
          module.finalWork,
          module.skills.join(" "),
          module.competencies.join(" "),
          module.certificationCriterion,
          module.tools.join(" "),
          module.units
            .map((unit) =>
              [
                unit.title,
                unit.capsules.join(" "),
                unit.workshop.title,
                unit.workshop.description,
                unit.workshop.aiUse
              ].join(" ")
            )
            .join(" ")
        ].join(" ")
      );

      return searchable.includes(search);
    });
  }, [search]);

  const moduleMatrix = bimLeanBiProgram.modules.map((module) => ({
    id: module.id,
    title: module.shortTitle,
    hours: module.hours,
    focus: module.focus,
    deliverable: module.deliverable,
    finalWork: module.finalWork
  }));

  const tools = Array.from(new Set(bimLeanBiProgram.modules.flatMap((module) => module.tools)));
  const activeModule = bimLeanBiProgram.modules.find((module) => module.id === activeModuleId) ?? bimLeanBiProgram.modules[0];

  return (
    <main className="hud-shell min-h-screen text-[var(--hud-text)]">
      <header className="sticky top-0 z-40 border-b border-[rgba(55,245,220,0.18)] bg-[#020706]/85 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex min-h-16 w-[min(1220px,calc(100%-28px))] items-center justify-between gap-4">
          <a className="flex items-center gap-3" href="#inicio" aria-label="AECODE Training">
            <span className="grid h-11 w-36 place-items-center rounded-md border border-[rgba(25,255,122,0.28)] bg-[rgba(3,28,22,0.74)] px-3">
              <img src={asset("/aecode-logo.svg")} alt="AECODE" className="hud-logo-mark h-7 w-full object-contain object-left" />
            </span>
            <span className="hidden md:block">
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-[var(--hud-mint)]">AECODE TRAINING</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--hud-soft)]">Diplomado Internacional</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 rounded-md border border-[rgba(55,245,220,0.18)] bg-[rgba(3,28,22,0.7)] p-1 lg:flex">
            {[
              ["Ruta", "#ruta"],
              ["Skills", "#skills"],
              ["Temario", "#temario"],
              ["Proyecto", "#proyecto"],
              ["Certificacion", "#certificacion"]
            ].map(([label, href]) => (
              <a
                key={href}
                className="rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-[var(--hud-muted)] hover:bg-[rgba(25,255,122,0.12)] hover:text-[var(--hud-neon)]"
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="hud-button-primary inline-flex min-h-10 items-center gap-2 rounded-md px-4 text-sm font-black"
            href={bimLeanBiProgram.ctaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Solicitar informacion <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div className="hud-scanline" />
        <img
          src={asset("/programs/bim-lean-bi/hero-dashboard.jpg")}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.14] mix-blend-screen"
        />
        <div className="relative mx-auto grid min-h-[720px] w-[min(1220px,calc(100%-32px))] items-center gap-10 py-20 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-lg border border-[rgba(25,255,122,0.26)] bg-[#020706]/70 px-4 py-3 backdrop-blur">
              <img src={asset("/aecode-logo.svg")} alt="AECODE" className="hud-logo-mark h-8 w-36 object-contain object-left" />
              <span className="hidden h-8 w-px bg-[rgba(55,245,220,0.22)] sm:block" />
              <span className="hidden text-xs font-black uppercase tracking-[0.18em] text-[var(--hud-neon)] sm:block">AECODE TRAINING</span>
            </div>
            <div className="hud-chip inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.12em]">
              <Sparkles className="h-4 w-4 text-[var(--hud-neon)]" />
              AECODE TRAINING / {bimLeanBiProgram.format} / {bimLeanBiProgram.hours} horas
            </div>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.24em] text-[var(--hud-cyan)]">Diplomado Internacional</p>
            <h1 className="hud-glow-text mt-6 max-w-4xl text-5xl font-black leading-none text-white md:text-7xl">
              BIM, Lean, BI e IA para control de obra verificable.
            </h1>
            <p className="mt-4 max-w-3xl text-2xl font-black leading-tight text-[var(--hud-mint)]">
              Seguimiento, datos, evidencias y certificacion por skills aplicadas.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--hud-muted)]">{bimLeanBiProgram.promise}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="hud-chip-accent rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.1em]">{bimLeanBiProgram.academicStructure.label}</span>
              <span className="hud-chip rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.1em]">{bimLeanBiProgram.practicalMix}</span>
              <span className="hud-chip rounded-md px-3 py-2 text-xs font-black uppercase tracking-[0.1em]">Autodesk Forma + ACC + Power BI</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="hud-button-primary inline-flex min-h-12 items-center gap-2 rounded-md px-5 font-black" href="#temario">
                Ver temario de 90h
              </a>
              <a
                className="hud-button-secondary inline-flex min-h-12 items-center gap-2 rounded-md px-5 font-black"
                href={bimLeanBiProgram.masterclassUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir clase magistral <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-[var(--hud-soft)]">
              {bimLeanBiProgram.academicStructure.globalCertificationRule}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {bimLeanBiProgram.metrics.map((metric) => (
                <article key={metric.value} className="hud-kpi rounded-lg p-4">
                  <strong className="block text-3xl font-black text-[var(--hud-neon)]">{metric.value}</strong>
                  <span className="mt-2 block text-sm leading-5 text-[var(--hud-muted)]">{metric.label}</span>
                </article>
              ))}
            </div>
          </div>

          <NeuralCommandPanel activeModule={activeModule} />
        </div>
      </section>

      <section className="py-16" id="problema">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Problema real"
            title="La obra moderna necesita trazabilidad, no reportes aislados."
            description="El diplomado ordena metodologia, herramientas y datos para que el seguimiento deje de depender de reuniones, memoria y archivos sueltos."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {bimLeanBiProgram.problems.map((problem, index) => (
              <article key={problem.title} className="hud-card rounded-lg p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md border border-[rgba(25,255,122,0.35)] bg-[rgba(25,255,122,0.12)] text-sm font-black text-[var(--hud-lime)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-black text-white">{problem.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--hud-muted)]">{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ruta" className="py-16">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Ruta del participante"
            title="Entiende su punto de partida, practica y valida evidencia."
            description="AECODE no opera como academia de videos. La ruta convierte aprendizaje tecnico en skills verificables con entregables."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {bimLeanBiProgram.participantRoute.map((step, index) => (
              <article key={step} className="hud-step rounded-lg p-4">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-neon)]">Paso {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-black text-white">{step}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="py-16">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Skills que obtendras"
            title="No es solo aprender herramientas: es demostrar competencias de control de obra."
            description="Cada modulo deja habilidades aplicadas, evidencia y un trabajo final. La certificacion global exige aprobar por lo menos 3 de los 4 modulos evaluables."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {bimLeanBiProgram.modules.map((module, index) => {
              const Icon = moduleIcons[index] ?? Layers3;
              return (
                <article key={module.id} className="hud-card rounded-lg p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-md border border-[rgba(25,255,122,0.28)] bg-[#010604] text-[var(--hud-neon)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-md border border-[rgba(25,255,122,0.26)] bg-[rgba(25,255,122,0.08)] px-2 py-1 text-xs font-black text-[var(--hud-neon)]">
                      {module.hours}h
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-cyan)]">{module.shortTitle}</p>
                  <h3 className="mt-2 text-xl font-black leading-tight text-white">{module.focus}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {module.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="hud-chip rounded-md px-2 py-1 text-[11px] font-black">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-[rgba(55,245,220,0.18)] bg-[#020706]/70 p-3">
                    <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[var(--hud-mint)]">Trabajo final</p>
                    <p className="mt-2 text-sm leading-5 text-[var(--hud-muted)]">{module.finalWork}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="temario" className="py-16">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Temario interactivo"
            title="90 horas organizadas por modulos, capsulas, talleres IA y entregables."
            description="Busca por herramienta, tema o resultado. Cada modulo explica que aprende el participante, que practica y que evidencia produce."
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[300px_1fr]">
            <aside className="hud-sticky self-start rounded-lg border border-[rgba(55,245,220,0.18)] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.34)] lg:sticky lg:top-24 print:hidden">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--hud-neon)]">Consola de modulos</p>
              <div className="mt-3 grid gap-2">
                {bimLeanBiProgram.modules.map((module) => (
                  <a
                    key={module.id}
                    href={`#${module.id}`}
                    onClick={() => setActiveModuleId(module.id)}
                    className={`grid grid-cols-[44px_1fr_48px] items-center gap-2 rounded-lg border p-2 transition ${
                      activeModuleId === module.id
                        ? "border-[rgba(25,255,122,0.48)] bg-[rgba(25,255,122,0.11)]"
                        : "border-transparent hover:border-[rgba(55,245,220,0.28)] hover:bg-[rgba(55,245,220,0.06)]"
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-md bg-[#010604] text-xs font-black text-[var(--hud-neon)]">
                      {module.id.toUpperCase()}
                    </span>
                    <strong className="text-sm leading-5 text-white">{module.shortTitle}</strong>
                    <em className="text-right text-xs not-italic font-black text-[var(--hud-lime)]">{module.hours}h</em>
                  </a>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-[rgba(25,255,122,0.26)] bg-[rgba(25,255,122,0.1)] p-3">
                <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--hud-lime)]">Validacion</p>
                <p className="mt-1 text-sm font-black text-white">{bimLeanBiTotalHours} horas totales</p>
                <p className="mt-1 text-xs leading-5 text-[var(--hud-muted)]">Suma oficial: 15 + 42 + 21 + 12.</p>
              </div>
            </aside>

            <div>
              <div className="hud-panel mb-5 flex flex-col gap-3 rounded-lg p-3 md:flex-row md:items-center print:hidden">
                <label className="flex min-h-12 flex-1 items-center gap-3 rounded-lg border border-[rgba(55,245,220,0.22)] bg-[#020706]/70 px-4">
                  <Search className="h-4 w-4 text-[var(--hud-cyan)]" />
                  <input
                    className="h-full w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[var(--hud-soft)]"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar: BEP, ACC, Power BI, IA, RFIs, Navisworks, n8n, Speckle..."
                    type="search"
                  />
                </label>
                <button
                  className="hud-button-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-4 text-sm font-black"
                  onClick={() => window.print()}
                  type="button"
                >
                  <Download className="h-4 w-4" />
                  Exportar PDF
                </button>
              </div>
              <div className="mb-5 grid gap-2 rounded-lg border border-[rgba(55,245,220,0.16)] bg-[#020706]/45 p-2 md:grid-cols-3 print:hidden">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    className={`min-h-14 rounded-md border px-3 text-left transition ${
                      viewMode === mode.id
                        ? "border-[rgba(25,255,122,0.56)] bg-[rgba(25,255,122,0.12)] text-white shadow-[0_0_28px_rgba(25,255,122,0.09)]"
                        : "border-transparent text-[var(--hud-muted)] hover:border-[rgba(55,245,220,0.28)] hover:bg-[rgba(55,245,220,0.06)]"
                    }`}
                    onClick={() => setViewMode(mode.id)}
                    type="button"
                  >
                    <span className="block text-sm font-black uppercase tracking-[0.12em]">{mode.label}</span>
                    <span className="mt-1 block text-xs leading-4">{mode.description}</span>
                  </button>
                ))}
              </div>

              <div className="grid gap-5">
                {filteredModules.map((module, index) => {
                  const Icon = moduleIcons[index] ?? Layers3;
                  const unitHours = module.units.reduce((sum, unit) => sum + unit.hours, 0);

                  return (
                    <section
                      key={module.id}
                      id={module.id}
                      className="hud-panel scroll-mt-24 rounded-lg"
                      onMouseEnter={() => setActiveModuleId(module.id)}
                    >
                      <div className="grid gap-4 border-b border-[rgba(55,245,220,0.16)] bg-[rgba(25,255,122,0.05)] p-5 md:grid-cols-[64px_1fr_110px] md:items-center">
                        <div className="grid h-14 w-14 place-items-center rounded-lg border border-[rgba(25,255,122,0.28)] bg-[#010604] text-[var(--hud-neon)]">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="hud-chip rounded-md px-2 py-1 text-xs font-black uppercase">{module.level}</span>
                            <span className="hud-chip-accent rounded-md px-2 py-1 text-xs font-black uppercase">{module.focus}</span>
                          </div>
                          <h3 className="mt-3 text-3xl font-black leading-tight text-white">{module.title}</h3>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[var(--hud-muted)]">{module.question}</p>
                        </div>
                        <div className="rounded-lg border border-[rgba(25,255,122,0.32)] bg-[rgba(25,255,122,0.1)] p-3 text-center">
                          <strong className="block text-4xl font-black text-[var(--hud-lime)]">{module.hours}</strong>
                          <span className="text-xs font-black uppercase text-[var(--hud-cream)]">horas</span>
                          <p className="mt-1 text-[11px] font-semibold text-[var(--hud-muted)]">Unidades: {unitHours}h</p>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                          <InfoPanel label="Objetivo del modulo" value={module.objective} />
                          <InfoPanel label="Entregable claro" value={module.deliverable} highlight />
                        </div>
                        <ModuleModePanel module={module} mode={viewMode} />
                        <div className="mt-4 flex flex-wrap gap-2">
                          {module.tools.map((tool) => (
                            <span key={tool} className="hud-chip rounded-md px-3 py-2 text-xs font-black">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-4 xl:grid-cols-3">
                          {module.units.map((unit, unitIndex) => (
                            <article key={unit.title} className="hud-card flex flex-col rounded-lg p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="rounded-md bg-[#010604] px-2 py-1 text-xs font-black uppercase text-[var(--hud-neon)]">
                                    Unidad {unitIndex + 1}
                                  </span>
                                  <h4 className="mt-3 text-xl font-black leading-tight text-white">{unit.title}</h4>
                                </div>
                                <span className="rounded-md border border-[rgba(25,255,122,0.35)] bg-[rgba(25,255,122,0.12)] px-2 py-1 text-xs font-black text-[var(--hud-lime)]">
                                  {unit.hours}h
                                </span>
                              </div>
                              <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-cyan)]">Capsulas</p>
                              <ol className="mt-3 grid gap-2">
                                {unit.capsules.map((capsule, capsuleIndex) => (
                                  <li key={capsule} className="grid grid-cols-[24px_1fr] gap-2 text-sm leading-5 text-[var(--hud-muted)]">
                                    <span className="grid h-6 w-6 place-items-center rounded-md border border-[rgba(55,245,220,0.2)] bg-[#020706] text-[11px] font-black text-[var(--hud-cyan)]">
                                      {capsuleIndex + 1}
                                    </span>
                                    <span>{capsule}</span>
                                  </li>
                                ))}
                              </ol>
                              <div className="mt-auto pt-4">
                                <div className="rounded-lg border border-[rgba(25,255,122,0.35)] bg-[rgba(25,255,122,0.12)] p-4">
                                  <div className="flex items-center gap-2 text-sm font-black text-[var(--hud-cream)]">
                                    <Bot className="h-4 w-4 text-[var(--hud-lime)]" />
                                    {unit.workshop.title}
                                  </div>
                                  <p className="mt-2 text-sm font-semibold leading-5 text-white/88">{unit.workshop.description}</p>
                                  <p className="mt-2 text-xs leading-5 text-[var(--hud-muted)]">{unit.workshop.aiUse}</p>
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    </section>
                  );
                })}
                {filteredModules.length === 0 ? (
                  <div className="hud-panel rounded-lg p-8 text-center">
                    <p className="text-lg font-black text-white">No hay resultados para esa busqueda.</p>
                    <button className="hud-button-primary mt-4 rounded-md px-4 py-2 text-sm font-black" onClick={() => setQuery("")} type="button">
                      Limpiar busqueda
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="matriz" className="py-16">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Matriz 90 horas"
            title="Cada hora conecta aprendizaje, practica y evidencia."
            description="La matriz deja visible el foco de cada modulo y evita que el temario parezca una lista de software."
          />
          <div className="hud-panel mt-8 overflow-hidden rounded-lg">
            <div className="grid grid-cols-[1.1fr_80px_0.9fr_1.1fr_1.3fr] border-b border-[rgba(55,245,220,0.18)] bg-[#010604] p-4 text-xs font-black uppercase text-[var(--hud-neon)] max-md:hidden">
              <span>Modulo</span>
              <span>Horas</span>
              <span>Foco</span>
              <span>Entregable</span>
              <span>Trabajo final</span>
            </div>
            {moduleMatrix.map((item) => (
              <article key={item.id} className="grid gap-3 border-b border-[rgba(55,245,220,0.12)] p-4 md:grid-cols-[1.1fr_80px_0.9fr_1.1fr_1.3fr]">
                <h3 className="font-black text-white">{item.title}</h3>
                <strong className="text-[var(--hud-lime)]">{item.hours}h</strong>
                <p className="text-sm font-semibold text-[var(--hud-muted)]">{item.focus}</p>
                <p className="text-sm leading-6 text-[var(--hud-muted)]">{item.deliverable}</p>
                <p className="text-sm leading-6 text-[var(--hud-muted)]">{item.finalWork}</p>
              </article>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[rgba(25,255,122,0.08)] p-4">
              <strong className="text-xl text-white">Total validado: {bimLeanBiTotalHours} horas</strong>
              <span className="rounded-md border border-[rgba(25,255,122,0.28)] bg-[#010604] px-3 py-2 text-sm font-black text-[var(--hud-neon)]">
                {bimLeanBiWorkshopCount} talleres IA vinculados a unidades
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="proyecto" className="py-16">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--hud-neon)]">Proyecto integrador</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">{bimLeanBiProgram.capstone.title}</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--hud-muted)]">{bimLeanBiProgram.capstone.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="hud-chip rounded-md px-3 py-2 text-xs font-black">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {bimLeanBiProgram.capstone.outputs.map((output, index) => (
              <article key={output} className="hud-card rounded-lg p-4">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--hud-neon)] text-xs font-black text-[#010604]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-black text-white">{output}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certificacion" className="py-16">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="hud-panel overflow-hidden rounded-lg p-2">
            <img src={asset("/programs/bim-lean-bi/certificates.jpg")} alt="Certificados del diplomado BIM Lean BI" className="h-full w-full rounded-md object-cover" />
          </div>
          <div>
            <SectionHeader
              eyebrow="Certificacion y evidencia"
              title="El valor no es solo asistir: es demostrar lo que puedes producir."
              description="La certificacion se presenta con respaldo AECODE, Autodesk Training Center y Colegio de Ingenieros del Peru. Los nombres finales de los 04 certificados deben confirmarse antes de publicacion comercial."
            />
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <InfoPanel label="Modelo academico" value={bimLeanBiProgram.academicStructure.description} />
              <InfoPanel label="Aprobacion global" value={bimLeanBiProgram.academicStructure.globalCertificationRule} highlight />
            </div>
            <div className="mt-6 grid gap-3">
              {bimLeanBiProgram.certifications.map((certification) => (
                <article key={certification.title} className="hud-card rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 h-5 w-5 flex-none text-[var(--hud-lime)]" />
                    <div>
                      <h3 className="text-lg font-black text-white">{certification.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--hud-muted)]">{certification.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="evidencia" className="py-16">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Portafolio del participante"
              title="Los talleres se convierten en activos reutilizables."
              description="Cada clase debe dejar una pieza que el alumno pueda revisar, mejorar y conectar con su portafolio profesional."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["BEP", "CDE", "Modelo BIM", "Dashboard BI", "Reporte IA", "Skill Passport futuro"].map((item) => (
                <article key={item} className="hud-card rounded-lg p-4">
                  <CheckCircle2 className="h-5 w-5 text-[var(--hud-neon)]" />
                  <h3 className="mt-3 font-black text-white">{item}</h3>
                </article>
              ))}
            </div>
          </div>
          <div className="hud-panel overflow-hidden rounded-lg p-2">
            <img src={asset("/programs/bim-lean-bi/student-evidence.jpg")} alt="Evidencias y trabajos de alumnos AECODE" className="h-full w-full rounded-md object-cover" />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16">
        <div className="mx-auto w-[min(980px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Preguntas frecuentes"
            title="Lo esencial antes de iniciar."
            description="Informacion clara para que el participante entienda alcance, requisitos, herramientas y evidencia final."
          />
          <div className="mt-8 grid gap-3">
            {bimLeanBiProgram.faqs.map((faq) => (
              <details key={faq.question} className="hud-card rounded-lg p-4 open:border-[rgba(25,255,122,0.45)]">
                <summary className="cursor-pointer text-lg font-black text-white">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-[var(--hud-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="hud-panel mx-auto flex w-[min(1220px,calc(100%-32px))] flex-col gap-6 rounded-lg p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--hud-neon)]">AECODE TRAINING</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black text-white">Una ruta para controlar obra con BIM, Lean, BI e IA sin perder trazabilidad.</h2>
          </div>
          <a
            className="hud-button-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 font-black"
            href={bimLeanBiProgram.ctaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Ir a AECODE.ai <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function NeuralCommandPanel({ activeModule }: { activeModule: BimLeanBiModuleView }) {
  return (
    <div className="hud-panel rounded-lg p-4">
      <div className="hud-node-field rounded-lg">
        <div className="hud-ring left-[12%] top-[8%] h-[76%] w-[76%]" />
        <div className="hud-ring left-[24%] top-[22%] h-[52%] w-[52%]" />
        {signalLinks.map((link, index) => (
          <span
            key={`${link.x}-${link.y}-${index}`}
            className="hud-link"
            style={{
              left: `${link.x}%`,
              top: `${link.y}%`,
              width: `${link.width}%`,
              transform: `rotate(${link.angle}deg)`
            }}
          />
        ))}
        {signalNodes.map((node) => (
          <span
            key={`${node.x}-${node.y}-${node.label}`}
            className="hud-node text-[10px] font-black text-[#010604]"
            data-tone={node.tone}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              animationDelay: `${node.delay}s`
            }}
          >
            {node.label}
          </span>
        ))}
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[var(--hud-neon)]">AI cockpit</p>
            <h2 className="mt-1 text-2xl font-black text-white">Mapa de control BIM Lean BI</h2>
          </div>
          <ShieldCheck className="h-8 w-8 text-[var(--hud-neon)]" />
        </div>
        <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-2">
          {[
            { label: "Modulo activo", value: activeModule.shortTitle, icon: Target },
            { label: "Horas", value: `${activeModule.hours}h`, icon: LineChart },
            { label: "Skills", value: activeModule.skills.slice(0, 2).join(" + "), icon: Database },
            { label: "Trabajo final", value: activeModule.finalWork, icon: ClipboardCheck }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="rounded-lg border border-[rgba(55,245,220,0.18)] bg-[#020706]/75 p-3 backdrop-blur">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-[var(--hud-cyan)]">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
                <p className="mt-2 text-sm font-black leading-5 text-white">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[var(--hud-neon)]">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--hud-muted)]">{description}</p>
    </div>
  );
}

function ModuleModePanel({ module, mode }: { module: BimLeanBiModuleView; mode: ViewMode }) {
  if (mode === "skills") {
    return (
      <div className="mt-4 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <article className="rounded-lg border border-[rgba(25,255,122,0.24)] bg-[rgba(25,255,122,0.08)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-neon)]">Skills que obtendras</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {module.skills.map((skill) => (
              <span key={skill} className="hud-chip rounded-md px-3 py-2 text-xs font-black">
                {skill}
              </span>
            ))}
          </div>
        </article>
        <article className="rounded-lg border border-[rgba(55,245,220,0.2)] bg-[rgba(3,28,22,0.68)] p-4">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-cyan)]">Competencias verificables</p>
          <ul className="mt-3 grid gap-2">
            {module.competencies.map((competency) => (
              <li key={competency} className="grid grid-cols-[22px_1fr] gap-2 text-sm leading-5 text-[var(--hud-muted)]">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--hud-neon)]" />
                <span>{competency}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    );
  }

  if (mode === "evaluacion") {
    return (
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <InfoPanel label="Trabajo final del modulo" value={module.finalWork} highlight />
        <InfoPanel label="Criterio de aprobacion" value={module.certificationCriterion} />
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-[rgba(55,245,220,0.18)] bg-[#020706]/55 p-4">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--hud-cyan)]">Enfoque del modulo</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--hud-muted)]">{module.question}</p>
    </div>
  );
}

function InfoPanel({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <article
      className={`rounded-lg border p-4 ${
        highlight
          ? "border-[rgba(25,255,122,0.35)] bg-[rgba(25,255,122,0.12)]"
          : "border-[rgba(55,245,220,0.2)] bg-[rgba(3,28,22,0.68)]"
      }`}
    >
      <p className={`text-xs font-black uppercase tracking-[0.1em] ${highlight ? "text-[var(--hud-lime)]" : "text-[var(--hud-cyan)]"}`}>{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[var(--hud-muted)]">{value}</p>
    </article>
  );
}
