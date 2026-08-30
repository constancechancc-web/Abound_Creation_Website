import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ServicesPreview } from "@/components/home/services-preview";

describe("ServicesPreview", () => {
  it("offers the five reference categories and expands their details", async () => {
    const user = userEvent.setup();
    render(<ServicesPreview />);

    for (const name of ["Branding", "Apparel Design", "Marketing", "Graphic Design", "Video & Photography"]) {
      expect(screen.getByRole("button", { name: new RegExp(name, "i") })).toBeInTheDocument();
    }

    const apparel = screen.getByRole("button", { name: /Apparel Design/i });
    await user.click(apparel);
    expect(apparel).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/uniforms and merchandise/i)).toBeVisible();
  });
});
