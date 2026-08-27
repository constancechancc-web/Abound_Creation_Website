import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2): Project[] {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}
