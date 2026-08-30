import type { Metadata } from "next";
import Image from "next/image";

import { ArrowLink } from "@/components/shared/arrow-link";
import { InteriorPageIntro } from "@/components/shared/interior-page-intro";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services — Abound Creation",
  description: "Branding, uniform design, marketing, graphic design, photography and videography by Abound Creation.",
};

export default function ServicesPage() {
  return <>
    <InteriorPageIntro
      eyebrow="Capabilities / 01—06"
      title="Built around"
      titleAccent="your brand."
      description="We bring strategy, design and visual storytelling together to help brands look sharper, communicate clearer and move forward with confidence."
    />
    <section className="px-5 py-20 md:px-[5vw] md:py-28">
      {services.map((service, index) => {
        const reverse = index % 2 === 1;
        return <article key={service.slug} data-service-row className="grid gap-10 border-t border-black/30 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
          <div className={`lg:col-span-6 ${reverse ? "lg:order-2 lg:pl-[4vw]" : "lg:pr-[4vw]"}`}>
            <span className="text-sm text-brand-red">{service.number}</span>
            <h2 className="mt-8 text-[clamp(2.4rem,4.5vw,4.8rem)] font-medium leading-[.95] tracking-[-.055em]">{service.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-7">{service.description}</p>
            <p className="mt-4 max-w-lg leading-6 text-brand-gray">{service.detail}</p>
          </div>
          <div className={`relative aspect-[4/3] overflow-hidden bg-brand-light lg:col-span-6 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
            <Image src={service.image} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
          </div>
        </article>;
      })}
    </section>
    <section className="bg-brand-red px-5 py-20 text-white md:px-[5vw] md:py-28">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-white/75">Build the right scope</p>
      <h2 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.065em]">Need the right mix?</h2>
      <p className="mt-8 max-w-lg text-lg">We shape the scope around what your brand needs now—and what it needs to become.</p>
      <ArrowLink href="/contact" variant="secondary" className="mt-10">Start a project</ArrowLink>
    </section>
  </>;
}