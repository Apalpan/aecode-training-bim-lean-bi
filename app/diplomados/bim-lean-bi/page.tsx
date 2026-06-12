"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
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
import { bimLeanBiProgram, bimLeanBiTotalHours, bimLeanBiWorkshopCount } from "@/data/bimLeanBiProgram";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${basePath}${path}`;

const moduleIcons = [Layers3, Workflow, BarChart3, BrainCircuit];

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function BimLeanBiDiplomadoPage() {
  const [query, setQuery] = useState("");
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
    deliverable: module.deliverable
  }));

  const tools = Array.from(new Set(bimLeanBiProgram.modules.flatMap((module) => module.tools)));

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#211b13]">
      <header className="sticky top-0 z-40 border-b border-[#d8c7a9]/80 bg-[#fffaf1]/90 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex min-h-16 w-[min(1220px,calc(100%-28px))] items-center justify-between gap-4">
          <a className="flex items-center gap-3" href="#inicio" aria-label="AECODE Training">
            <img src={asset("/aecode-logo.svg")} alt="AECODE" className="h-7 w-auto" />
            <span className="hidden text-xs font-bold uppercase text-[#7d6b52] md:block">Training OS · Diplomado</span>
          </a>
          <nav className="hidden items-center gap-1 rounded-lg border border-[#e5d8bf] bg-white/70 p-1 lg:flex">
            <a className="rounded-md px-3 py-2 text-xs font-bold text-[#6a5f4f] hover:bg-[#211b13] hover:text-white" href="#ruta">
              Ruta
            </a>
            <a className="rounded-md px-3 py-2 text-xs font-bold text-[#6a5f4f] hover:bg-[#211b13] hover:text-white" href="#temario">
              Temario
            </a>
            <a className="rounded-md px-3 py-2 text-xs font-bold text-[#6a5f4f] hover:bg-[#211b13] hover:text-white" href="#proyecto">
              Proyecto
            </a>
            <a className="rounded-md px-3 py-2 text-xs font-bold text-[#6a5f4f] hover:bg-[#211b13] hover:text-white" href="#certificacion">
              Certificacion
            </a>
          </nav>
          <a
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#d98233] px-4 text-sm font-black text-[#211b13] shadow-[0_12px_30px_rgba(217,130,51,0.22)]"
            href={bimLeanBiProgram.ctaUrl}
            target="_blank"
            rel="noreferrer"
          >
            AECODE.ai <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section
        id="inicio"
        className="relative overflow-hidden bg-[#0a0b10] text-white"
      >
        <div className="absolute inset-0 opacity-70">
          <img
            src={asset("/programs/bim-lean-bi/hero-dashboard.jpg")}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,16,0.97),rgba(10,11,16,0.84)_44%,rgba(10,11,16,0.34)),linear-gradient(0deg,rgba(10,11,16,0.94),rgba(10,11,16,0)_40%)]" />
        <div className="relative mx-auto grid min-h-[720px] w-[min(1220px,calc(100%-32px))] items-center gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase text-[#c7f45a] backdrop-blur">
              <Sparkles className="h-4 w-4" />
              {bimLeanBiProgram.format} · {bimLeanBiProgram.hours} horas · AECODE
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-none text-white md:text-7xl">
              BIM, Lean, BI e IA para controlar obra con evidencia.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">{bimLeanBiProgram.promise}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex min-h-12 items-center gap-2 rounded-md bg-[#d98233] px-5 font-black text-[#11120f]" href="#temario">
                Ver temario de 90h
              </a>
              <a
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 font-black text-white"
                href={bimLeanBiProgram.masterclassUrl}
                target="_blank"
                rel="noreferrer"
              >
                Abrir clase magistral <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {bimLeanBiProgram.metrics.map((metric) => (
                <article key={metric.value} className="rounded-lg border border-white/14 bg-black/45 p-4 backdrop-blur">
                  <strong className="block text-3xl font-black text-[#c7f45a]">{metric.value}</strong>
                  <span className="mt-2 block text-sm leading-5 text-white/68">{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur">
            <div className="rounded-lg bg-[#fffaf1] p-4 text-[#211b13]">
              <div className="flex items-center justify-between gap-3 border-b border-[#e2d3ba] pb-3">
                <div>
                  <p className="text-xs font-black uppercase text-[#8a702c]">Mapa de valor</p>
                  <h2 className="mt-1 text-2xl font-black">Planificar · Automatizar · Integrar</h2>
                </div>
                <ShieldCheck className="h-8 w-8 text-[#d98233]" />
              </div>
              <div className="mt-4 grid gap-3">
                {["BEP + CDE", "Modelo coordinado", "Dashboard BI", "Asistente IA"].map((item, index) => (
                  <div key={item} className="grid grid-cols-[34px_1fr] items-center gap-3 rounded-lg border border-[#e7dcc9] bg-white/75 p-3">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-[#211b13] text-xs font-black text-[#c7f45a]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-black">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-lg border border-[#d98233]/30 bg-[#d98233]/10 p-3 text-sm font-semibold leading-6 text-[#6a4f25]">
                El participante sale con entregables que se pueden explicar, revisar y mostrar como evidencia profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="problema">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Problema real"
            title="La obra moderna necesita trazabilidad, no mas reportes aislados."
            description="El diplomado ordena metodologia, herramientas y datos para que el seguimiento deje de depender de reuniones, memoria y archivos sueltos."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {bimLeanBiProgram.problems.map((problem, index) => (
              <article key={problem.title} className="rounded-lg border border-[#e0d1b8] bg-white/80 p-5 shadow-[0_12px_34px_rgba(33,27,19,0.06)]">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-[#211b13] text-sm font-black text-[#d98233]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-black">{problem.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6d6256]">{problem.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ruta" className="bg-[#11120f] py-16 text-white">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            dark
            eyebrow="Ruta del participante"
            title="Entra, practica, produce evidencia y entiende su progreso."
            description="AECODE no opera como academia de videos. La ruta convierte aprendizaje tecnico en skills verificables con entregables."
          />
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {bimLeanBiProgram.participantRoute.map((step, index) => (
              <article key={step} className="rounded-lg border border-white/12 bg-white/7 p-4">
                <span className="text-xs font-black uppercase text-[#c7f45a]">Paso {String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-black">{step}</h3>
              </article>
            ))}
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

          <div className="mt-8 grid gap-5 lg:grid-cols-[280px_1fr]">
            <aside className="self-start rounded-lg border border-[#e0d1b8] bg-white/85 p-4 shadow-[0_16px_42px_rgba(33,27,19,0.07)] lg:sticky lg:top-24 print:hidden">
              <p className="text-sm font-black text-[#8a702c]">Navegacion</p>
              <div className="mt-3 grid gap-2">
                {bimLeanBiProgram.modules.map((module) => (
                  <a
                    key={module.id}
                    href={`#${module.id}`}
                    className="grid grid-cols-[42px_1fr_44px] items-center gap-2 rounded-lg border border-transparent p-2 hover:border-[#d98233]/40 hover:bg-[#fff3df]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-[#211b13] text-xs font-black text-[#d98233]">
                      {module.id.toUpperCase()}
                    </span>
                    <strong className="text-sm leading-5">{module.shortTitle}</strong>
                    <em className="text-right text-xs not-italic font-black text-[#8a702c]">{module.hours}h</em>
                  </a>
                ))}
              </div>
              <div className="mt-4 rounded-lg border border-[#e7dcc9] bg-[#fffaf1] p-3">
                <p className="text-xs font-black uppercase text-[#8a702c]">Validacion</p>
                <p className="mt-1 text-sm font-black">{bimLeanBiTotalHours} horas totales</p>
                <p className="mt-1 text-xs leading-5 text-[#6d6256]">Suma oficial: 15 + 42 + 21 + 12.</p>
              </div>
            </aside>

            <div>
              <div className="mb-5 flex flex-col gap-3 rounded-lg border border-[#e0d1b8] bg-white/85 p-3 shadow-[0_16px_42px_rgba(33,27,19,0.06)] md:flex-row md:items-center print:hidden">
                <label className="flex min-h-12 flex-1 items-center gap-3 rounded-lg border border-[#e0d1b8] bg-[#fffaf1] px-4">
                  <Search className="h-4 w-4 text-[#8a702c]" />
                  <input
                    className="h-full w-full bg-transparent text-sm font-semibold text-[#211b13] outline-none placeholder:text-[#8d8173]"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar: BEP, ACC, Power BI, IA, RFIs, Navisworks, n8n, Speckle..."
                    type="search"
                  />
                </label>
                <button
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#d98233]/35 bg-[#d98233]/12 px-4 text-sm font-black text-[#6a4f25]"
                  onClick={() => window.print()}
                  type="button"
                >
                  <Download className="h-4 w-4" />
                  Exportar PDF
                </button>
              </div>

              <div className="grid gap-5">
                {filteredModules.map((module, index) => {
                  const Icon = moduleIcons[index] ?? Layers3;
                  const unitHours = module.units.reduce((sum, unit) => sum + unit.hours, 0);

                  return (
                    <section key={module.id} id={module.id} className="scroll-mt-24 overflow-hidden rounded-lg border border-[#e0d1b8] bg-white shadow-[0_18px_48px_rgba(33,27,19,0.08)]">
                      <div className="grid gap-4 border-b border-[#eadcc5] bg-[linear-gradient(135deg,#fffaf1,#f0dfc4)] p-5 md:grid-cols-[64px_1fr_110px] md:items-center">
                        <div className="grid h-14 w-14 place-items-center rounded-lg bg-[#211b13] text-[#c7f45a]">
                          <Icon className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-md border border-[#d98233]/35 bg-white/70 px-2 py-1 text-xs font-black uppercase text-[#8a702c]">{module.level}</span>
                            <span className="rounded-md border border-[#d98233]/35 bg-white/70 px-2 py-1 text-xs font-black uppercase text-[#8a702c]">{module.focus}</span>
                          </div>
                          <h3 className="mt-3 text-3xl font-black leading-tight">{module.title}</h3>
                          <p className="mt-2 text-sm font-semibold leading-6 text-[#6d6256]">{module.question}</p>
                        </div>
                        <div className="rounded-lg border border-[#d98233]/35 bg-white/85 p-3 text-center">
                          <strong className="block text-4xl font-black text-[#d98233]">{module.hours}</strong>
                          <span className="text-xs font-black uppercase text-[#7d6b52]">horas</span>
                          <p className="mt-1 text-[11px] font-semibold text-[#7d6b52]">Unidades: {unitHours}h</p>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                          <InfoPanel label="Objetivo del modulo" value={module.objective} />
                          <InfoPanel label="Entregable claro" value={module.deliverable} highlight />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {module.tools.map((tool) => (
                            <span key={tool} className="rounded-md border border-[#e0d1b8] bg-[#fffaf1] px-3 py-2 text-xs font-black text-[#6a5f4f]">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="mt-5 grid gap-4 xl:grid-cols-3">
                          {module.units.map((unit, unitIndex) => (
                            <article key={unit.title} className="flex flex-col rounded-lg border border-[#e0d1b8] bg-[#fffdf8] p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <span className="rounded-md bg-[#211b13] px-2 py-1 text-xs font-black uppercase text-[#c7f45a]">
                                    Unidad {unitIndex + 1}
                                  </span>
                                  <h4 className="mt-3 text-xl font-black leading-tight">{unit.title}</h4>
                                </div>
                                <span className="rounded-md border border-[#d98233]/35 bg-[#d98233]/10 px-2 py-1 text-xs font-black text-[#8a702c]">
                                  {unit.hours}h
                                </span>
                              </div>
                              <p className="mt-4 text-xs font-black uppercase text-[#8a702c]">Capsulas</p>
                              <ol className="mt-3 grid gap-2">
                                {unit.capsules.map((capsule, capsuleIndex) => (
                                  <li key={capsule} className="grid grid-cols-[24px_1fr] gap-2 text-sm leading-5 text-[#62584e]">
                                    <span className="grid h-6 w-6 place-items-center rounded-md border border-[#e0d1b8] bg-white text-[11px] font-black text-[#8a702c]">
                                      {capsuleIndex + 1}
                                    </span>
                                    <span>{capsule}</span>
                                  </li>
                                ))}
                              </ol>
                              <div className="mt-auto pt-4">
                                <div className="rounded-lg border border-[#d98233]/35 bg-[#f9ead6] p-4">
                                  <div className="flex items-center gap-2 text-sm font-black text-[#6a4f25]">
                                    <Bot className="h-4 w-4" />
                                    {unit.workshop.title}
                                  </div>
                                  <p className="mt-2 text-sm font-semibold leading-5 text-[#4f453c]">{unit.workshop.description}</p>
                                  <p className="mt-2 text-xs leading-5 text-[#6d6256]">{unit.workshop.aiUse}</p>
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
                  <div className="rounded-lg border border-[#e0d1b8] bg-white p-8 text-center">
                    <p className="text-lg font-black">No hay resultados para esa busqueda.</p>
                    <button className="mt-4 rounded-md bg-[#211b13] px-4 py-2 text-sm font-black text-white" onClick={() => setQuery("")} type="button">
                      Limpiar busqueda
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="matriz" className="bg-[#fffaf1] py-16">
        <div className="mx-auto w-[min(1220px,calc(100%-32px))]">
          <SectionHeader
            eyebrow="Matriz 90 horas"
            title="Cada hora debe conectar aprendizaje, practica y evidencia."
            description="La matriz deja visible el foco de cada modulo y evita que el temario parezca una lista de software."
          />
          <div className="mt-8 overflow-hidden rounded-lg border border-[#e0d1b8] bg-white shadow-[0_18px_48px_rgba(33,27,19,0.07)]">
            <div className="grid grid-cols-[1.2fr_90px_1fr_1.4fr] border-b border-[#eadcc5] bg-[#211b13] p-4 text-xs font-black uppercase text-[#c7f45a] max-md:hidden">
              <span>Modulo</span>
              <span>Horas</span>
              <span>Foco</span>
              <span>Entregable</span>
            </div>
            {moduleMatrix.map((item) => (
              <article key={item.id} className="grid gap-3 border-b border-[#eadcc5] p-4 md:grid-cols-[1.2fr_90px_1fr_1.4fr]">
                <h3 className="font-black">{item.title}</h3>
                <strong className="text-[#d98233]">{item.hours}h</strong>
                <p className="text-sm font-semibold text-[#62584e]">{item.focus}</p>
                <p className="text-sm leading-6 text-[#62584e]">{item.deliverable}</p>
              </article>
            ))}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f4e5cd] p-4">
              <strong className="text-xl">Total validado: {bimLeanBiTotalHours} horas</strong>
              <span className="rounded-md bg-[#211b13] px-3 py-2 text-sm font-black text-[#c7f45a]">
                {bimLeanBiWorkshopCount} talleres IA vinculados a unidades
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="proyecto" className="bg-[#0d0f1f] py-16 text-white">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase text-[#c7f45a]">Proyecto integrador</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">{bimLeanBiProgram.capstone.title}</h2>
            <p className="mt-5 text-lg leading-8 text-white/72">{bimLeanBiProgram.capstone.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span key={tool} className="rounded-md border border-white/12 bg-white/7 px-3 py-2 text-xs font-black text-white/78">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {bimLeanBiProgram.capstone.outputs.map((output, index) => (
              <article key={output} className="rounded-lg border border-white/12 bg-white/7 p-4">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[#c7f45a] text-xs font-black text-[#11120f]">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-black">{output}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certificacion" className="py-16">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="overflow-hidden rounded-lg border border-[#e0d1b8] bg-white shadow-[0_18px_48px_rgba(33,27,19,0.08)]">
            <img src={asset("/programs/bim-lean-bi/certificates.jpg")} alt="Certificados del diplomado BIM Lean BI" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHeader
              eyebrow="Certificacion y evidencia"
              title="El valor no es solo asistir: es demostrar lo que puedes producir."
              description="La certificacion se presenta con respaldo AECODE, Autodesk Training Center y Colegio de Ingenieros del Peru. Los nombres finales de los 04 certificados deben confirmarse antes de publicacion comercial."
            />
            <div className="mt-6 grid gap-3">
              {bimLeanBiProgram.certifications.map((certification) => (
                <article key={certification.title} className="rounded-lg border border-[#e0d1b8] bg-white/85 p-4">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="mt-1 h-5 w-5 flex-none text-[#d98233]" />
                    <div>
                      <h3 className="text-lg font-black">{certification.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#62584e]">{certification.detail}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="evidencia" className="bg-[#fffaf1] py-16">
        <div className="mx-auto grid w-[min(1220px,calc(100%-32px))] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Portafolio del participante"
              title="Los talleres deben convertirse en activos reutilizables."
              description="Cada clase debe dejar una pieza que el alumno pueda revisar, mejorar y conectar con su portafolio profesional."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["BEP", "CDE", "Modelo BIM", "Dashboard BI", "Reporte IA", "Skill Passport futuro"].map((item) => (
                <article key={item} className="rounded-lg border border-[#e0d1b8] bg-white p-4">
                  <CheckCircle2 className="h-5 w-5 text-[#0f8a55]" />
                  <h3 className="mt-3 font-black">{item}</h3>
                </article>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#e0d1b8] bg-white shadow-[0_18px_48px_rgba(33,27,19,0.08)]">
            <img src={asset("/programs/bim-lean-bi/student-evidence.jpg")} alt="Evidencias y trabajos de alumnos AECODE" className="h-full w-full object-cover" />
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
              <details key={faq.question} className="rounded-lg border border-[#e0d1b8] bg-white/85 p-4 open:bg-white">
                <summary className="cursor-pointer text-lg font-black">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-[#62584e]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11120f] py-14 text-white">
        <div className="mx-auto flex w-[min(1220px,calc(100%-32px))] flex-col gap-6 rounded-lg border border-white/12 bg-white/7 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase text-[#c7f45a]">AECODE Training</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-black">Una ruta para controlar obra con BIM, Lean, BI e IA sin perder trazabilidad.</h2>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#d98233] px-5 font-black text-[#11120f]"
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

function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div>
      <p className={`text-xs font-black uppercase ${dark ? "text-[#c7f45a]" : "text-[#8a702c]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl ${dark ? "text-white" : "text-[#211b13]"}`}>
        {title}
      </h2>
      <p className={`mt-4 max-w-3xl text-base leading-7 ${dark ? "text-white/70" : "text-[#62584e]"}`}>{description}</p>
    </div>
  );
}

function InfoPanel({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <article className={`rounded-lg border p-4 ${highlight ? "border-[#d98233]/35 bg-[#f9ead6]" : "border-[#e0d1b8] bg-[#fffaf1]"}`}>
      <p className="text-xs font-black uppercase text-[#8a702c]">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#4f453c]">{value}</p>
    </article>
  );
}
