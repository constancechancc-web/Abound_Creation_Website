import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProjectPage, { generateStaticParams } from "@/app/work/[slug]/page";
import WorkPage from "@/app/work/page";
import { projects } from "@/data/projects";

describe("work routes", () => {
  it("prebuilds every portfolio slug", () => {
    expect(generateStaticParams()).toEqual(projects.map((project) => ({ slug: project.slug })));
  });

  it("renders all projects on the work index", () => {
    render(<WorkPage />);
    for (const project of projects) expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
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
