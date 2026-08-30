import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
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
  it("publishes the approved contact methods", () => {
    render(<ContactPage />);
    expect(screen.getByRole("link", { name: "019-660 9102" })).toHaveAttribute("href", "tel:+60196609102");
    expect(screen.getByRole("link", { name: "013-776 6128" })).toHaveAttribute("href", "tel:+60137766128");
    expect(screen.getByRole("link", { name: "aboundcreation@gmail.com" })).toHaveAttribute("href", "mailto:aboundcreation@gmail.com");
    expect(screen.getByRole("link", { name: /10, Jalan Seroja 39/i })).toHaveAttribute("target", "_blank");
  });
});
