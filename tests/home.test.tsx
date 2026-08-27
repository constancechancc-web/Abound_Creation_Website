import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("homepage", () => {
  it("presents the complete agency story in a semantic order", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("Branding, design, marketing and visual storytelling for businesses ready to stand out.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view our work/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What We Do" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "About Abound" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From idea to impact/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Why Abound?" })).toBeInTheDocument();
    expect(screen.getByText(/Great design gets remembered/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
  });

  it("shows all six services and all six projects", () => {
    render(<Home />);
    for (const service of ["Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography"]) {
      expect(screen.getByRole("heading", { name: service })).toBeInTheDocument();
    }
    for (const project of ["Northline Objects", "Sela Dining", "Meridian Holdings", "Fieldwork Uniforms", "After Hours", "Forma Study 01"]) {
      expect(screen.getByRole("heading", { name: project })).toBeInTheDocument();
    }
  });
});
