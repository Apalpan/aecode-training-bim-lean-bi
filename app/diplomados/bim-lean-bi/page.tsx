"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { CommandMenu } from "@/components/CommandMenu";
import { HeroCockpit } from "@/components/HeroCockpit";
import { Curriculum } from "@/components/Curriculum";
import { Analytics } from "@/components/Analytics";
import {
  CapstoneSection,
  CertificationSection,
  CtaBand,
  EvidenceSection,
  FaqSection,
  MatrixSection,
  ProblemSection,
  RouteSection,
  SiteFooter,
  SkillsSection
} from "@/components/Sections";

export default function BimLeanBiDiplomadoPage() {
  return (
    <div className="ac-shell">
      <SiteHeader />
      <CommandMenu />
      <main>
        <HeroCockpit />
        <ProblemSection />
        <RouteSection />
        <SkillsSection />
        <Curriculum />
        <Analytics />
        <MatrixSection />
        <CapstoneSection />
        <CertificationSection />
        <EvidenceSection />
        <FaqSection />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
