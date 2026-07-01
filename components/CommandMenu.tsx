"use client";

import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Compass,
  CornerDownLeft,
  Download,
  ExternalLink,
  FileText,
  Layers3,
  Play,
  Search,
  Workflow
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { bimLeanBiProgram } from "@/data/bimLeanBiProgram";
import { navSections } from "@/data/bimLeanBiDerived";
import { useCommandMenu } from "@/lib/hooks";

type Cmd = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  keywords?: string;
  run: () => void;
};

const norm = (v: string) =>
  v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const moduleIcons = [Layers3, Workflow, BarChart3, BrainCircuit];

function go(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }
}

export function CommandMenu() {
  const [open, setOpen] = useCommandMenu();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const nav: Cmd[] = navSections.map((s) => ({
      id: `nav-${s.id}`,
      group: "Navegación",
      label: `Ir a ${s.label}`,
      icon: Compass,
      keywords: s.id,
      run: () => go(s.id)
    }));
    const mods: Cmd[] = bimLeanBiProgram.modules.map((m, i) => ({
      id: `mod-${m.id}`,
      group: "Módulos",
      label: `${m.id.toUpperCase()} · ${m.shortTitle}`,
      hint: `${m.hours}h`,
      icon: moduleIcons[i] ?? Layers3,
      keywords: `${m.title} ${m.focus} ${m.tools.join(" ")}`,
      run: () => go(m.id)
    }));
    const actions: Cmd[] = [
      { id: "a-temario", group: "Acciones", label: "Ver temario de 90 horas", icon: FileText, run: () => go("temario") },
      {
        id: "a-master",
        group: "Acciones",
        label: "Abrir clase magistral",
        icon: Play,
        run: () => window.open(bimLeanBiProgram.masterclassUrl, "_blank", "noreferrer")
      },
      { id: "a-print", group: "Acciones", label: "Exportar temario a PDF", icon: Download, run: () => window.print() },
      {
        id: "a-cta",
        group: "Acciones",
        label: "Solicitar información en AECODE.ai",
        icon: ExternalLink,
        run: () => window.open(bimLeanBiProgram.ctaUrl, "_blank", "noreferrer")
      }
    ];
    return [...nav, ...mods, ...actions];
  }, []);

  const filtered = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return commands;
    return commands.filter((c) => norm(`${c.label} ${c.group} ${c.keywords ?? ""}`).includes(q));
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  // Keep the keyboard-highlighted row scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index, open]);

  if (!open) return null;

  const run = (c?: Cmd) => {
    if (!c) return;
    c.run();
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[index]);
    }
  };

  return (
    <div className="ac-overlay no-print" onClick={() => setOpen(false)} role="presentation">
      <div
        className="ac-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Buscador de comandos"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-[rgb(148_163_184/0.16)] px-4 py-3.5">
          <Search className="h-4 w-4 text-[#a6a7ff]" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulo, sección o acción…"
            className="w-full bg-transparent text-[16px] font-semibold text-white outline-none placeholder:text-[#6b7e99]"
            aria-label="Buscar"
          />
          <span className="ac-kbd border-[rgb(148_163_184/0.28)] bg-transparent text-[#9fb2cc]">ESC</span>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[#9fb2cc]">Sin resultados para “{query}”.</p>
          ) : (
            groups.map(([group, items]) => (
              <div key={group} className="mb-1">
                <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#6b7e99]">{group}</p>
                {items.map((c) => {
                  const flatIndex = filtered.indexOf(c);
                  const activeItem = flatIndex === index;
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className="ac-cmd-item w-full text-left"
                      data-active={activeItem}
                      onMouseMove={() => setIndex(flatIndex)}
                      onClick={() => run(c)}
                    >
                      <Icon className="h-4 w-4 flex-none text-[#a6a7ff]" aria-hidden />
                      <span className="flex-1 text-sm font-semibold">{c.label}</span>
                      {c.hint ? <span className="ac-kbd border-[rgb(148_163_184/0.24)] bg-transparent text-[#9fb2cc]">{c.hint}</span> : null}
                      {activeItem ? <CornerDownLeft className="h-3.5 w-3.5 text-[#a6a7ff]" aria-hidden /> : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[rgb(148_163_184/0.16)] px-4 py-2.5 text-[11px] text-[#6b7e99]">
          <span className="inline-flex items-center gap-1.5">
            <span className="ac-kbd border-[rgb(148_163_184/0.24)] bg-transparent text-[#9fb2cc]">↑</span>
            <span className="ac-kbd border-[rgb(148_163_184/0.24)] bg-transparent text-[#9fb2cc]">↓</span>
            navegar
          </span>
          <span className="inline-flex items-center gap-2 font-semibold text-[#9fb2cc]">
            AECODE Command <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </div>
  );
}
