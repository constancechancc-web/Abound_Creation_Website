import { ProjectCard } from "@/components/work/project-card";
import type { Project } from "@/types/project";
export function ProjectGrid({items}:{items:Project[]}){return <div className="project-grid grid gap-x-[4vw] gap-y-20 md:grid-cols-12 md:gap-y-32">{items.map((project,index)=><ProjectCard key={project.slug} project={project} index={index}/>)}</div>}
