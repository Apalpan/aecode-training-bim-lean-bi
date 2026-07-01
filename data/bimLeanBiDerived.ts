/**
 * Derived, read-only projections of the real program data.
 * Nothing here is invented — every value is computed from bimLeanBiProgram.
 */
import { bimLeanBiProgram, bimLeanBiTotalHours } from "./bimLeanBiProgram";

/** Module type derived from the `as const` data (keeps readonly arrays happy). */
export type BimLeanBiModuleView = (typeof bimLeanBiProgram.modules)[number];

/** One accent CSS var per module (defined in globals.css: --m01..--m04). */
export const moduleAccentVar: Record<string, string> = {
  m01: "var(--m01)",
  m02: "var(--m02)",
  m03: "var(--m03)",
  m04: "var(--m04)"
};

/** Cumulative hours series — feeds the interactive 90h S-curve + distribution. */
export type HoursPoint = {
  id: string;
  shortTitle: string;
  hours: number;
  cumulative: number;
  pct: number; // share of total
  accent: string;
};

export const hoursSeries: HoursPoint[] = (() => {
  let running = 0;
  return bimLeanBiProgram.modules.map((m) => {
    running += m.hours;
    return {
      id: m.id,
      shortTitle: m.shortTitle,
      hours: m.hours,
      cumulative: running,
      pct: Math.round((m.hours / bimLeanBiTotalHours) * 100),
      accent: moduleAccentVar[m.id] ?? "var(--primary)"
    };
  });
})();

export const totalSkills = bimLeanBiProgram.modules.reduce((n, m) => n + m.skills.length, 0);
export const totalCompetencies = bimLeanBiProgram.modules.reduce((n, m) => n + m.competencies.length, 0);
export const totalCapsules = bimLeanBiProgram.modules.reduce(
  (n, m) => n + m.units.reduce((k, u) => k + u.capsules.length, 0),
  0
);

/** Unique tool catalog, grouped by AEC discipline (derived from module.tools). */
export type ToolCategory = { key: string; label: string; accent: string; tools: string[] };

const CATEGORY_MAP: Array<{ key: string; label: string; accent: string; match: string[] }> = [
  {
    key: "metodo",
    label: "Metodología & Lean",
    accent: "var(--m01)",
    match: ["ISO 19650", "Guia BIM Peru", "Last Planner System", "VDC", "Matriz POP"]
  },
  {
    key: "bim",
    label: "BIM & Modelo",
    accent: "var(--m02)",
    match: ["Revit", "Navisworks", "Autodesk Forma", "Speckle", "RA/RV", "Nubes de puntos"]
  },
  {
    key: "cde",
    label: "CDE & Campo",
    accent: "var(--aec-progress)",
    match: ["Autodesk Construction Cloud", "ACC", "Trimble Connect", "Fieldwire", "Presto"]
  },
  {
    key: "bi",
    label: "BI & Datos",
    accent: "var(--m03)",
    match: ["Power BI", "Power Query", "DAX", "Looker Studio"]
  },
  {
    key: "ia",
    label: "IA & Automatización",
    accent: "var(--m04)",
    match: ["ChatGPT", "n8n", "Zapier", "APIs"]
  }
];

const allTools = Array.from(new Set(bimLeanBiProgram.modules.flatMap((m) => m.tools)));

export const toolCatalog: ToolCategory[] = CATEGORY_MAP.map((c) => ({
  key: c.key,
  label: c.label,
  accent: c.accent,
  tools: allTools.filter((t) => c.match.includes(t))
}));

export const uniqueToolCount = allTools.length;

/** Section registry — drives scroll-spy, header nav and the command palette. */
export const navSections = [
  { id: "inicio", label: "Inicio" },
  { id: "problema", label: "Problema" },
  { id: "ruta", label: "Ruta" },
  { id: "skills", label: "Skills" },
  { id: "temario", label: "Temario" },
  { id: "analitica", label: "Analítica" },
  { id: "proyecto", label: "Proyecto" },
  { id: "certificacion", label: "Certificación" },
  { id: "faq", label: "FAQ" }
] as const;

export const headerNav = [
  { id: "ruta", label: "Ruta" },
  { id: "skills", label: "Skills" },
  { id: "temario", label: "Temario" },
  { id: "analitica", label: "Analítica" },
  { id: "certificacion", label: "Certificación" }
] as const;

export function moduleUnitHours(m: BimLeanBiModuleView): number {
  return m.units.reduce((sum, u) => sum + u.hours, 0);
}
