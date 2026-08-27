import { projects } from "@/data/projects";
import { BrandStatement } from "@/components/home/brand-statement";
import { CreativeStatement } from "@/components/home/creative-statement";
import { Hero } from "@/components/home/hero";
import { HomeAbout } from "@/components/home/home-about";
import { Process } from "@/components/home/process";
import { ServicesPreview } from "@/components/home/services-preview";
import { WhyAbound } from "@/components/home/why-abound";
import { ArrowLink } from "@/components/shared/arrow-link";
import { ProjectGrid } from "@/components/work/project-grid";

export default function Home(){return <><Hero/><BrandStatement/><section className="px-5 py-24 md:px-[5vw] md:py-40"><div className="mb-16 grid gap-6 md:grid-cols-12"><div className="md:col-span-8"><p className="text-xs font-bold uppercase tracking-[.14em] text-brand-red">01—06</p><h2 className="mt-4 text-[clamp(3.2rem,8vw,8rem)] font-bold leading-none tracking-[-.07em]">Selected Work</h2></div><p className="max-w-md self-end text-brand-gray md:col-span-4">A selection of identities, campaigns and visual experiences created for brands with something to say.</p></div><ProjectGrid items={projects}/><ArrowLink href="/work" className="mt-16 px-0">View all work</ArrowLink></section><ServicesPreview/><HomeAbout/><Process/><WhyAbound/><CreativeStatement/><section className="px-5 py-24 md:px-[5vw] md:py-40"><h2 className="max-w-6xl text-[clamp(2.85rem,8vw,9rem)] font-bold leading-[.84] tracking-[-.075em]">LET&apos;S MAKE<br/>SOMETHING<br/>WORTH REMEMBERING.</h2><div className="mt-12 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between"><p className="max-w-md text-lg">Have a brand, campaign or idea in mind? Let&apos;s turn it into something people remember.</p><ArrowLink href="/contact" variant="primary">Start a project</ArrowLink></div></section></>}
