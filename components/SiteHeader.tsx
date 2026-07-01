"use client";

import { ArrowUpRight, Command, Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { bimLeanBiProgram } from "@/data/bimLeanBiProgram";
import { headerNav, navSections } from "@/data/bimLeanBiDerived";
import { openCommandMenu, useScrollProgress, useScrollSpy, useTheme } from "@/lib/hooks";
import { asset } from "@/components/ui";

// Stable module-level array so useScrollSpy's effect never re-subscribes.
const SECTION_IDS = navSections.map((s) => s.id);

export function SiteHeader() {
  const [theme, toggleTheme] = useTheme();
  const barRef = useRef<HTMLDivElement>(null);
  useScrollProgress(barRef);
  const active = useScrollSpy(SECTION_IDS);

  return (
    <>
      <div ref={barRef} className="ac-scrollbar no-print" aria-hidden />
      <header className="ac-header sticky top-0 z-[var(--z-header)] no-print">
        <div className="ac-wrap flex min-h-16 items-center justify-between gap-4">
          <a className="flex items-center gap-3" href="#inicio" aria-label="AECODE Training — inicio">
            <span className="grid h-10 place-items-center rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] px-3 shadow-[var(--shadow-card)]">
              <img src={asset("/aecode-logo.svg")} alt="AECODE" className="h-6 w-28 object-contain object-left" />
            </span>
            <span className="hidden md:block">
              <span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-[color:var(--text)]">AECODE Training</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--text-3)]">Diplomado Internacional</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Secciones">
            {headerNav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="ac-navlink" data-active={active === item.id}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="ac-cmdk hidden sm:inline-flex" onClick={openCommandMenu} aria-label="Abrir buscador de comandos" type="button">
              <Command className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden md:inline">Buscar</span>
              <span className="ac-kbd">⌘K</span>
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--text-2)] transition-colors hover:text-[color:var(--primary)]"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
              type="button"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              className="ac-btn ac-btn-primary hidden md:inline-flex"
              href={bimLeanBiProgram.ctaUrl}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar información <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
