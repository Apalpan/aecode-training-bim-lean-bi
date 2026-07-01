"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";
const THEME_KEY = "aecode-theme";

/** Flash-free theme toggle (Paco Coursey transition-kill trick). */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const kill = document.createElement("style");
    kill.textContent = "*,*::before,*::after{transition:none !important}";
    root.appendChild(kill);
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => root.removeChild(kill)));
  }, []);

  return [theme, toggle];
}

/** Reveal-on-scroll — adds `is-visible` once, respects reduced motion. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px", ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return ref;
}

/** Count-up when scrolled into view. Parses numeric prefix, keeps suffix. */
export function useCountUp(target: number, durationMs = 1100) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}

/** Scroll-spy — returns the id of the section currently in view. */
export function useScrollSpy(ids: string[], offset = 120) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const y = window.scrollY + offset;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);
  return active;
}

/** Page scroll progress 0..1, written to a CSS var for a compositor-only bar. */
export function useScrollProgress(targetRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      targetRef.current?.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetRef]);
}

export const COMMAND_EVENT = "aecode:command-menu";

/** ⌘K / Ctrl-K palette open state, decoupled via a window event + hotkey. */
export function useCommandMenu(): [boolean, (open: boolean) => void] {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onEvt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_EVENT, onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_EVENT, onEvt);
    };
  }, []);
  return [open, setOpen];
}

export function openCommandMenu() {
  window.dispatchEvent(new Event(COMMAND_EVENT));
}
