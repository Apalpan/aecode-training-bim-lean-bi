import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Diplomado BIM, Lean, BI e IA | AECODE",
  description:
    "Temario interactivo de 90 horas del Diplomado BIM, Lean, BI e IA aplicado al Seguimiento y Control de Obra de AECODE.",
  icons: {
    icon: `${basePath}/aecode-logo.svg`
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
