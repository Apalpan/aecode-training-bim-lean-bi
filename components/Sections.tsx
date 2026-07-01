"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Layers3,
  Workflow
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { bimLeanBiProgram, bimLeanBiTotalHours, bimLeanBiWorkshopCount } from "@/data/bimLeanBiProgram";
import { moduleAccentVar, moduleUnitHours } from "@/data/bimLeanBiDerived";
import { asset, Eyebrow, Reveal, SectionHeader } from "@/components/ui";

const moduleIcons: ComponentType<{ className?: string }>[] = [Layers3, Workflow, BarChart3, BrainCircuit];

/* ------------------------------- PROBLEMA ------------------------------- */
export function ProblemSection() {
  return (
    <section id="problema" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Problema real"
          title="La obra moderna necesita trazabilidad, no reportes aislados"
          description="El diplomado ordena metodología, herramientas y datos para que el seguimiento deje de depender de reuniones, memoria y archivos sueltos."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {bimLeanBiProgram.problems.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 60} className="ac-card ac-card-hover p-5">
              <span className="mono grid h-10 w-10 place-items-center rounded-[var(--r-sm)] border border-[color:var(--border)] text-sm font-black" style={{ color: "var(--aec-risk)", background: "var(--aec-risk-tint)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="ac-display mt-4 text-lg text-[color:var(--text)]">{problem.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[color:var(--text-2)]">{problem.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- RUTA --------------------------------- */
export function RouteSection() {
  return (
    <section id="ruta" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Ruta del participante"
          title="De su punto de partida a skills verificables con evidencia"
          description="AECODE no opera como academia de videos. La ruta convierte aprendizaje técnico en competencias demostrables con entregables reales."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bimLeanBiProgram.participantRoute.map((step, i) => (
            <Reveal key={step} delay={i * 40}>
              <article className="ac-card ac-card-hover group relative h-full overflow-hidden p-4" style={{ ["--accent" as string]: `var(--m0${(i % 4) + 1})` }}>
                <span className="absolute left-0 top-0 h-full w-1" style={{ background: "var(--accent)" }} />
                <div className="flex items-center justify-between">
                  <span className="mono text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>Paso {String(i + 1).padStart(2, "0")}</span>
                  <ArrowRight className="h-4 w-4 text-[color:var(--text-3)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </div>
                <h3 className="ac-display mt-3 text-[15px] leading-tight text-[color:var(--text)]">{step}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SKILLS -------------------------------- */
export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Skills que obtendrás"
          title="No es solo aprender herramientas: es demostrar control de obra"
          description="Cada módulo deja habilidades aplicadas, evidencia y un trabajo final. La certificación global exige aprobar por lo menos 3 de los 4 módulos evaluables."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {bimLeanBiProgram.modules.map((module, i) => {
            const Icon = moduleIcons[i] ?? Layers3;
            const accent = moduleAccentVar[module.id];
            return (
              <Reveal key={module.id} delay={i * 60}>
                <article className="ac-card ac-card-hover flex h-full flex-col p-5" style={{ ["--accent" as string]: accent }}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border" style={{ color: accent, borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)", background: "color-mix(in srgb, var(--accent) 12%, var(--surface))" }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="ac-chip tnum" style={{ color: accent, borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}>{module.hours}h</span>
                  </div>
                  <p className="mono mt-4 text-[11px] font-black uppercase tracking-[0.12em]" style={{ color: accent }}>{module.shortTitle}</p>
                  <h3 className="ac-display mt-1.5 text-lg leading-tight text-[color:var(--text)]">{module.focus}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {module.skills.slice(0, 4).map((s) => <span key={s} className="ac-chip text-[11px]">{s}</span>)}
                  </div>
                  <div className="mt-auto pt-4">
                    <div className="rounded-[var(--r-sm)] border p-3" style={{ borderColor: "color-mix(in srgb, var(--aec-success) 28%, transparent)", background: "var(--aec-success-tint)" }}>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--aec-success)" }}>Trabajo final</p>
                      <p className="mt-1.5 text-[12px] leading-5 text-[color:var(--text-2)]">{module.finalWork}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- MATRIZ -------------------------------- */
export function MatrixSection() {
  return (
    <section id="matriz" className="scroll-mt-24 py-16">
      <div className="ac-wrap">
        <SectionHeader
          eyebrow="Matriz 90 horas"
          title="Foco, entregable y trabajo final de cada módulo"
          description="La matriz deja visible el foco de cada módulo y evita que el temario parezca una lista de software."
        />
        <Reveal className="ac-panel mt-8 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.1fr_70px_0.9fr_1.2fr_1.3fr] border-b border-[color:var(--border)] bg-[color:var(--surface-2)] px-4 py-3 text-[11px] font-black uppercase tracking-wide text-[color:var(--text-3)]">
                <span>Módulo</span><span>Horas</span><span>Foco</span><span>Entregable</span><span>Trabajo final</span>
              </div>
              {bimLeanBiProgram.modules.map((m) => (
                <a
                  key={m.id}
                  href={`#${m.id}`}
                  className="grid grid-cols-[1.1fr_70px_0.9fr_1.2fr_1.3fr] items-start gap-2 border-b border-[color:var(--border)] px-4 py-3.5 transition-colors hover:bg-[color:var(--surface-2)]"
                  style={{ ["--accent" as string]: moduleAccentVar[m.id] }}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: "var(--accent)" }} />
                    <strong className="text-[13px] font-bold text-[color:var(--text)]">{m.shortTitle}</strong>
                  </span>
                  <strong className="tnum text-[13px]" style={{ color: "var(--accent)" }}>{m.hours}h</strong>
                  <span className="text-[12px] font-semibold text-[color:var(--text-2)]">{m.focus}</span>
                  <span className="text-[12px] leading-5 text-[color:var(--text-2)]">{m.deliverable}</span>
                  <span className="text-[12px] leading-5 text-[color:var(--text-2)]">{m.finalWork}</span>
                </a>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5" style={{ background: "var(--primary-050)" }}>
                <strong className="text-[color:var(--primary-active)]">Total validado: <span className="tnum">{bimLeanBiTotalHours}</span> horas</strong>
                <span className="ac-chip ac-chip-accent tnum">{bimLeanBiWorkshopCount} talleres IA · {moduleUnitHours(bimLeanBiProgram.modules[1])}h solo en control</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- PROYECTO ------------------------------- */
export function CapstoneSection() {
  const tools = Array.from(new Set(bimLeanBiProgram.modules.flatMap((m) => m.tools)));
  return (
    <section id="proyecto" className="scroll-mt-24 py-16">
      <div className="ac-wrap grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <Eyebrow>Proyecto integrador</Eyebrow>
          <h2 className="ac-display mt-3 text-[color:var(--text)]" style={{ fontSize: "var(--fs-section)" }}>{bimLeanBiProgram.capstone.title}</h2>
          <p className="mt-4 text-[15px] leading-7 text-[color:var(--text-2)]">{bimLeanBiProgram.capstone.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 10).map((t) => <span key={t} className="ac-chip">{t}</span>)}
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {bimLeanBiProgram.capstone.outputs.map((output, i) => (
            <Reveal key={output} delay={i * 40} className="ac-card ac-card-hover p-4" style={{ ["--accent" as string]: `var(--m0${(i % 4) + 1})` }}>
              <span className="tnum grid h-8 w-8 place-items-center rounded-[var(--r-xs)] text-xs font-black text-white" style={{ background: "var(--accent)" }}>{i + 1}</span>
              <h3 className="ac-display mt-3.5 text-[15px] leading-tight text-[color:var(--text)]">{output}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CERTIFICACIÓN ---------------------------- */
export function CertificationSection() {
  return (
    <section id="certificacion" className="scroll-mt-24 py-16">
      <div className="ac-wrap grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="ac-panel overflow-hidden p-2">
          <img src={asset("/programs/bim-lean-bi/certificates.jpg")} alt="Certificados del diplomado BIM Lean BI" className="h-full w-full rounded-[var(--r-md)] object-cover" loading="lazy" />
        </Reveal>
        <div>
          <SectionHeader
            eyebrow="Certificación y evidencia"
            title="El valor no es asistir: es demostrar lo que puedes producir"
            description="La certificación se presenta con respaldo AECODE, Autodesk Training Center y Colegio de Ingenieros del Perú. Los nombres finales de los 04 certificados deben confirmarse antes de publicación comercial."
          />
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-[var(--r-md)] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[color:var(--text-3)]">Modelo académico</p>
              <p className="mt-2 text-[13px] font-semibold leading-6 text-[color:var(--text-2)]">{bimLeanBiProgram.academicStructure.description}</p>
            </div>
            <div className="rounded-[var(--r-md)] border p-4" style={{ borderColor: "color-mix(in srgb, var(--aec-success) 30%, transparent)", background: "var(--aec-success-tint)" }}>
              <p className="text-[11px] font-black uppercase tracking-[0.1em]" style={{ color: "var(--aec-success)" }}>Aprobación global</p>
              <p className="mt-2 text-[13px] font-semibold leading-6 text-[color:var(--text-2)]">{bimLeanBiProgram.academicStructure.globalCertificationRule}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {bimLeanBiProgram.certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 40} className="ac-card ac-card-hover p-4">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 flex-none" style={{ color: "var(--aec-success)" }} aria-hidden />
                  <div>
                    <h3 className="ac-display text-[15px] text-[color:var(--text)]">{c.title}</h3>
                    <p className="mt-1 text-[13px] leading-6 text-[color:var(--text-2)]">{c.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- EVIDENCIA ------------------------------ */
export function EvidenceSection() {
  const items = ["BEP", "Flujo CDE", "Modelo BIM coordinado", "Dashboard Power BI", "Reporte IA", "Portafolio de evidencias"];
  return (
    <section id="evidencia" className="scroll-mt-24 py-16">
      <div className="ac-wrap grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeader
            eyebrow="Portafolio del participante"
            title="Los talleres se convierten en activos reutilizables"
            description="Cada clase deja una pieza que el alumno puede revisar, mejorar y conectar con su portafolio profesional."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item} delay={i * 40} className="ac-card ac-card-hover flex items-center gap-3 p-4">
                <CheckCircle2 className="h-5 w-5 flex-none" style={{ color: "var(--primary)" }} aria-hidden />
                <h3 className="ac-display text-[14px] text-[color:var(--text)]">{item}</h3>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="ac-panel overflow-hidden p-2">
          <img src={asset("/programs/bim-lean-bi/student-evidence.jpg")} alt="Evidencias y trabajos de alumnos AECODE" className="h-full w-full rounded-[var(--r-md)] object-cover" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- FAQ --------------------------------- */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 py-16">
      <div className="ac-wrap max-w-[900px]">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Lo esencial antes de iniciar"
          description="Información clara sobre alcance, requisitos, herramientas y evidencia final."
          align="center"
        />
        <div className="mx-auto mt-8 grid max-w-[820px] gap-3">
          {bimLeanBiProgram.faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 30}>
                <div className="ac-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="ac-display text-[15px] text-[color:var(--text)]">{faq.question}</span>
                    <ChevronDown className="h-4 w-4 flex-none text-[color:var(--text-3)] transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} aria-hidden />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} print:grid-rows-[1fr] print:opacity-100`}>
                    <div className="overflow-hidden">
                      <p className="px-4 pb-4 text-[13px] leading-6 text-[color:var(--text-2)]">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA ---------------------------------- */
export function CtaBand() {
  return (
    <section className="py-14">
      <div className="ac-wrap">
        <Reveal className="cmd-surface ac-inner flex flex-col items-start gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div className="ac-scan" aria-hidden />
          <div className="relative">
            <p className="ac-eyebrow" style={{ color: "#a6a7ff" }}>AECODE Training</p>
            <h2 className="ac-display mt-2 max-w-2xl text-2xl text-white md:text-3xl">Controla obra con BIM, Lean, BI e IA — sin perder trazabilidad.</h2>
            <p className="mt-2 text-[14px] text-[#9fb2cc]">90 horas en vivo · 4 módulos · talleres IA · certificación por skills verificables.</p>
          </div>
          <a className="ac-btn ac-btn-primary relative flex-none" href={bimLeanBiProgram.ctaUrl} target="_blank" rel="noreferrer">
            Ir a AECODE.ai <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER -------------------------------- */
export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="ac-wrap grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <img src={asset("/aecode-logo.svg")} alt="AECODE" className="h-7 w-32 object-contain" />
            <span className="hidden h-6 w-px bg-[color:var(--border-strong)] sm:block" />
            <span className="hidden text-[11px] font-black uppercase tracking-[0.14em] text-[color:var(--text-3)] sm:block">Training</span>
          </div>
          <p className="ac-display mt-4 max-w-md text-lg leading-snug text-[color:var(--text)]">
            Ingeniería que entiende la tecnología y la aplica con criterio.
          </p>
          <p className="mt-1.5 text-[13px] text-[color:var(--text-2)]">Un ecosistema diseñado para la ingeniería moderna · Aprende, aplica y construye mejor.</p>
        </div>
        <div className="md:text-right">
          <a className="ac-btn ac-btn-ghost inline-flex" href="https://aecode.ai" target="_blank" rel="noreferrer">
            aecode.ai <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-[12px] leading-5 text-[color:var(--text-3)]">
            Contenido público del programa. No publica precios, cuentas ni datos sensibles.<br className="hidden md:block" /> Diplomado Internacional BIM · Lean · BI · IA · © AECODE Training.
          </p>
        </div>
      </div>
    </footer>
  );
}
