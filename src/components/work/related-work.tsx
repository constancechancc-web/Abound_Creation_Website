import { ProjectCard } from "@/components/work/project-card";
import type { Project } from "@/types/project";
export function RelatedWork({items}:{items:Project[]}){return <section className="px-5 py-24 md:px-[5vw] md:py-40"><h2 className="mb-14 text-[clamp(3rem,7vw,7rem)] font-bold leading-none tracking-[-.07em]">Related Work</h2><div className="grid gap-16 md:grid-cols-2">{items.map((project,index)=><ProjectCard key={project.slug} project={project} index={index}/>)}</div></section>}
