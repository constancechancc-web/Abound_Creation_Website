import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";

describe("portfolio data", () => {
  it("defines six unique projects with complete galleries", () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(6);

    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.gallery.length).toBeGreaterThanOrEqual(4);
      expect(project.coverImage.startsWith("/images/projects/")).toBe(true);
      expect(project.gallery.every((item) => item.alt.length > 10)).toBe(true);
    }
  });

  it("defines the six approved services in order", () => {
    expect(services.map((service) => service.title)).toEqual([
      "Branding",
      "Uniform Design",
      "Marketing",
      "Graphic Design",
      "Photography",
      "Videography",
    ]);
  });

  it("looks up projects and excludes the current project from related work", () => {
    const first = projects[0];

    expect(getProjectBySlug(first.slug)).toEqual(first);
    expect(getRelatedProjects(first.slug, 2)).toHaveLength(2);
    expect(
      getRelatedProjects(first.slug, 2).some(
        (project) => project.slug === first.slug,
      ),
    ).toBe(false);
  });
});
