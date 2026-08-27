import Image from "next/image";
import { ArrowLink } from "@/components/shared/arrow-link";

export function Hero() {
  return <section className="px-5 pb-20 pt-12 md:px-[5vw] md:pb-36 md:pt-20">
    <div className="grid items-end gap-10 xl:grid-cols-12">
      <div className="xl:col-span-8"><p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-brand-red">Independent creative design agency</p><h1 className="text-[clamp(3.5rem,9vw,10rem)] font-bold leading-[.82] tracking-[-.075em]">ABOUND WITH<br/><span className="text-brand-red">CREATIVE IDEA.</span></h1></div>
      <div className="xl:col-span-4 xl:pb-2"><p className="max-w-md text-lg leading-7">Branding, design, marketing and visual storytelling for businesses ready to stand out.</p><div className="mt-7 flex flex-wrap gap-3"><ArrowLink href="/work" variant="primary">View our work</ArrowLink><ArrowLink href="/contact" variant="secondary">Let&apos;s talk</ArrowLink></div></div>
    </div>
    <div className="relative mt-12 aspect-[16/9] overflow-hidden bg-black md:mt-16"><Image src="/images/projects/northline-objects/cover.svg" alt="Northline Objects featured identity composition" fill priority loading="eager" sizes="(max-width: 768px) 100vw, 90vw" className="object-cover transition-transform duration-700 hover:scale-[1.02]" /></div>
  </section>;
}
