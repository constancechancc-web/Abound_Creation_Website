import type { Metadata } from "next";
import { ProjectGrid } from "@/components/work/project-grid";
import { projects } from "@/data/projects";
export const metadata:Metadata={title:"Work — Abound Creation",description:"Selected branding, campaign, uniform and photography work by Abound Creation."};
export default function WorkPage(){return <><header className="px-5 pb-20 pt-16 md:px-[5vw] md:pb-32 md:pt-24"><p className="text-xs font-bold uppercase tracking-[.14em] text-brand-red">Selected projects / 2026</p><h1 className="mt-6 text-[clamp(5rem,16vw,17rem)] font-bold leading-[.72] tracking-[-.085em]">WORK</h1><p className="mt-12 max-w-xl text-lg">Identities, campaigns and visual systems for brands with something worth saying.</p></header><section className="px-5 pb-32 md:px-[5vw] md:pb-48"><ProjectGrid items={projects}/></section></>}
