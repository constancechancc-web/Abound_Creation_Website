import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";

describe("homepage", () => {
  it("follows the approved reference-led semantic story", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Welcome to Abound Creation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore More/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("heading", { name: "What We Do" })).toBeInTheDocument();
    expect(screen.getByText(/Abound With/)).toHaveTextContent("Abound With Creative Idea");
    expect(screen.getByRole("heading", { name: "From idea to impact" })).toBeInTheDocument();

    for (const step of ["Consultation", "Strategize", "Schedule", "Performance Review", "Campaign Launch", "Content Creation"]) {
      expect(screen.getByRole("heading", { name: step })).toBeInTheDocument();
    }

    expect(screen.getByRole("heading", { name: "Let's Build Something Great Together" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a Project on WhatsApp" })).toHaveAttribute("href", expect.stringContaining("wa.me/60196609102"));
    expect(screen.queryByRole("heading", { name: "Selected Work" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Why Abound?" })).not.toBeInTheDocument();
  });
});

