import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/components/work/project-gallery";
import { RelatedWork } from "@/components/work/related-work";
import { ArrowLink } from "@/components/shared/arrow-link";
import { projects } from "@/data/projects";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found — Abound Creation" };
  return { title: `${project.title} — Abound Creation`, description: project.description, openGraph: { title: `${project.title} — Abound Creation`, description: project.description, images: [project.coverImage] } };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = getProjectBySlug(slug); if (!project) notFound();
  const facts = [["Client", project.client], ["Year", project.year], ["Services", project.services.join(" / ")]];
  const sections = [["Challenge", project.challenge], ["Approach", project.approach], ["Creative Direction", project.creativeDirection], ["Design System", project.designSystem], ["Applications", project.applications], ["Final Outcome", project.outcome]];
  return <article><header className="px-5 pb-16 pt-16 md:px-[5vw] md:pb-24 md:pt-24"><p className="text-xs font-bold uppercase tracking-[.14em]" style={{ color: project.accent }}>{project.category}</p><h1 className="mt-5 max-w-[1500px] text-[clamp(4.2rem,12vw,13rem)] font-bold leading-[.78] tracking-[-.08em]">{project.title}</h1><p className="mt-10 max-w-2xl text-xl leading-8">{project.description}</p></header><div className="relative aspect-[16/9] bg-brand-light"><Image src={project.coverImage} alt={project.gallery[0].alt} fill priority sizes="100vw" className="object-cover" /></div><section className="grid gap-14 px-5 py-24 md:grid-cols-12 md:px-[5vw] md:py-36"><div className="md:col-span-4"><h2 className="text-xs font-bold uppercase tracking-[.14em] text-brand-red">Project Overview</h2>{facts.map(([label, value]) => <div key={label} className="mt-7 border-t border-black pt-3 text-sm"><span className="block text-xs uppercase text-brand-gray">{label}</span><span className="mt-1 block">{value}</span></div>)}</div><p className="text-[clamp(2rem,4vw,4.8rem)] font-bold leading-[.96] tracking-[-.055em] md:col-span-8">{project.overview}</p></section><section className="px-5 pb-24 md:px-[5vw] md:pb-40"><ProjectGallery items={project.gallery} /></section><section className="bg-brand-light px-5 py-24 md:px-[5vw] md:py-40">{sections.map(([title, copy], index) => <div key={title} className="grid gap-5 border-t border-black py-8 md:grid-cols-12"><span className="text-brand-red md:col-span-1">{String(index + 1).padStart(2, "0")}</span><h2 className="text-2xl font-bold uppercase md:col-span-4">{title}</h2><p className="max-w-2xl text-lg leading-7 text-brand-gray md:col-span-7">{copy}</p></div>)}</section><RelatedWork items={getRelatedProjects(slug, 2)} /><section className="px-5 pb-32 md:px-[5vw] md:pb-48"><h2 className="max-w-5xl text-[clamp(3rem,8vw,9rem)] font-bold leading-[.86] tracking-[-.075em]">HAVE SOMETHING IN MIND?</h2><ArrowLink href="/contact" variant="primary" className="mt-10">Start a project</ArrowLink></section></article>;
}
