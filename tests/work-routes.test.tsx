import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectPage, { generateStaticParams } from "@/app/work/[slug]/page";
import WorkPage from "@/app/work/page";
import { projects } from "@/data/projects";

describe("work routes", () => {
  it("prebuilds every portfolio slug", () => {
    expect(generateStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it("renders the editorial portfolio index without changing project data", () => {
    const { container } = render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Portfolio" })).toBeInTheDocument();
    expect(container.querySelector(".project-grid")).toHaveClass("lg:grid-cols-2");
    expect(container.querySelectorAll(".project-grid article")).toHaveLength(projects.length);
    for (const project of projects) {
      expect(screen.getByRole("link", { name: new RegExp(project.title) })).toHaveAttribute("href", `/work/${project.slug}`);
    }
  });

  it("renders a complete case study", async () => {
    const project = projects[0];
    render(await ProjectPage({ params: Promise.resolve({ slug: project.slug }) }));
    expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
    for (const heading of ["Project Overview", "Challenge", "Approach", "Creative Direction", "Design System", "Applications", "Final Outcome", "Related Work"]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(4);
  });
});
