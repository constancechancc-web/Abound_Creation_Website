"use client";

import Image from "next/image";
import { useState } from "react";

import { homeServices } from "@/data/home-services";

export function ServicesPreview() {
  const [active, setActive] = useState(0);
  const activeService = homeServices[active];

  return <section className="px-5 py-20 md:px-[5vw] md:py-28 lg:py-36">
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <h2 className="text-[clamp(2.8rem,6vw,6rem)] font-medium leading-none tracking-[-.06em] text-brand-red md:col-span-7">What We Do</h2>
      <p className="max-w-md text-base leading-6 md:col-span-5 md:justify-self-end">We bring strategy, design and visual storytelling together to help brands look sharper, communicate clearer and move forward with confidence.</p>
    </div>

    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        {homeServices.map((service, index) => {
          const expanded = active === index;
          return <article key={service.title} className="border-t border-black/45 last:border-b">
            <button type="button" aria-expanded={expanded} aria-controls={`home-service-${index}`} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} className="grid min-h-16 w-full grid-cols-[44px_1fr_44px] items-center gap-2 py-4 text-left transition-colors hover:text-brand-red md:grid-cols-[60px_1fr_44px]">
              <span className="text-sm text-brand-red">{service.number}</span>
              <h3 className="text-[clamp(1.65rem,3.6vw,3.8rem)] font-semibold leading-none tracking-[-.05em]">{service.title}</h3>
              <span aria-hidden="true" className="text-center text-xl">{expanded ? "−" : "+"}</span>
            </button>
            <div id={`home-service-${index}`} hidden={!expanded} className="pb-6 pl-11 md:pl-[60px] lg:pb-8">
              <p className="max-w-xl text-brand-gray">{service.description}</p>
              <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-brand-light lg:hidden">
                <Image src={service.image} alt="" fill sizes="100vw" className="object-cover" />
              </div>
            </div>
          </article>;
        })}
      </div>

      <div className="relative hidden min-h-[540px] overflow-hidden border border-black/30 bg-brand-light lg:col-span-5 lg:block">
        <Image key={activeService.image} src={activeService.image} alt="" fill sizes="32vw" className="object-cover" />
      </div>
    </div>
  </section>;
}
