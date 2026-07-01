import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Diplomado BIM · Lean · BI · IA para Control de Obra | AECODE Training",
  description:
    "Command Center interactivo del Diplomado Internacional BIM, Lean, BI e IA aplicado al Seguimiento y Control de Obra — 90 horas en vivo, 4 módulos, talleres IA y certificación por skills. AECODE Training.",
  metadataBase: new URL("https://apalpan.github.io"),
  openGraph: {
    title: "Diplomado BIM · Lean · BI · IA | AECODE Training",
    description:
      "90 horas en vivo · 4 módulos · talleres IA · certificación por skills verificables. Controla obra con trazabilidad.",
    images: [`${basePath}/programs/bim-lean-bi/hero-dashboard.jpg`]
  },
  icons: { icon: `${basePath}/aecode-logo.svg` }
};

// Flash-free theme boot: set data-theme before first paint (default dark = aecode.ai).
const themeBoot = `(function(){try{var t=localStorage.getItem('aecode-theme');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme='dark';}}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
