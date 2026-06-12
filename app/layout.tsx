import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diplomado BIM, Lean, BI e IA | AECODE",
  description:
    "Temario interactivo de 90 horas del Diplomado BIM, Lean, BI e IA aplicado al Seguimiento y Control de Obra de AECODE."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
