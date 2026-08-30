import type { Metadata } from "next";
import Image from "next/image";

import { AboutIntro } from "@/components/about/about-intro";
import { Process } from "@/components/home/process";
import { WhyAbound } from "@/components/home/why-abound";
import { ArrowLink } from "@/components/shared/arrow-link";
import { InteriorPageIntro } from "@/components/shared/interior-page-intro";

export const metadata: Metadata = {
  title: "About — Abound Creation",
  description: "A creative design agency combining strategy, creativity and execution to build memorable brands.",
};

export default function AboutPage() {
  return <>
    <InteriorPageIntro
      eyebrow="About Abound"
      title="Design is more"
      titleAccent="than looking good."
      description="A creative design agency combining strategy, creativity and execution to build memorable brands."
    />
    <AboutIntro />
    <section aria-label="Selected studio work" className="grid gap-px bg-black/15 md:grid-cols-2">
      <div className="relative aspect-[4/3] bg-brand-light">
        <Image src="/images/projects/northline-objects/catalogue.svg" alt="Editorial identity and catalogue composition" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="relative aspect-[4/3] bg-black">
        <Image src="/images/projects/after-hours-campaign/posters.svg" alt="Typographic campaign poster composition" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
    </section>
    <Process variant="interior" />
    <WhyAbound variant="interior" />
    <section className="border-t border-black/20 px-5 py-24 md:px-[5vw] md:py-36">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-red">Start a conversation</p>
      <h2 className="mt-6 max-w-5xl text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.065em]">Good ideas deserve <span className="text-brand-red">better design.</span></h2>
      <ArrowLink href="/contact" variant="primary" className="mt-10">Start a project</ArrowLink>
    </section>
  </>;
}