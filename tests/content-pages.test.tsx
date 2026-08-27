import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import ServicesPage from "@/app/services/page";

describe("supporting content pages", () => {
  it("expands all six services", () => {
    render(<ServicesPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const service of ["Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography"]) expect(screen.getByRole("heading", { name: service })).toBeInTheDocument();
  });
  it("explains the studio without invented facts", () => {
    render(<AboutPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByAltText("Abound Creation official logo")).toBeInTheDocument();
    expect(screen.getByText(/good design should do more than attract attention/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
  });
});
