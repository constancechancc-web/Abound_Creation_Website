import type { Metadata } from "next";

import { InteriorPageIntro } from "@/components/shared/interior-page-intro";
import { ProjectGrid } from "@/components/work/project-grid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Abound Creation",
  description: "Selected branding, campaign, uniform and photography work by Abound Creation.",
};

export default function WorkPage() {
  return <>
    <InteriorPageIntro
      eyebrow="Selected projects / 2026"
      title="Portfolio"
      description="Identities, campaigns and visual systems for brands with something worth saying."
    />
    <section className="px-5 py-20 md:px-[5vw] md:py-28">
      <ProjectGrid items={projects} />
    </section>
  </>;
}