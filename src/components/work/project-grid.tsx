import { ProjectCard } from "@/components/work/project-card";
import type { Project } from "@/types/project";

export function ProjectGrid({ items }: { items: Project[] }) {
  return <div className="project-grid grid gap-x-[3vw] gap-y-16 lg:grid-cols-2 lg:gap-y-24">
    {items.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
  </div>;
}