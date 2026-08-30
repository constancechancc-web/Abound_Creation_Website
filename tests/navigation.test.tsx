import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

describe("site navigation", () => {
  it("uses the reference navigation labels and WhatsApp CTA", () => {
    render(<Navbar />);
    for (const [name, href] of [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]]) {
      expect(screen.getAllByRole("link", { name }).some((link) => link.getAttribute("href") === href)).toBe(true);
    }
    expect(screen.getByRole("link", { name: /let's talk on whatsapp/i })).toHaveAttribute("href", expect.stringContaining("wa.me/60196609102"));
    expect(screen.getByRole("img", { name: "Abound Creation" })).toBeInTheDocument();
  });

  it("opens and closes the mobile menu accessibly", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("uses the exact social destinations and official tagline", () => {
    render(<Footer />);
    expect(screen.getByText((_, element) => element?.tagName === "P" && element.textContent === "Abound with creative idea.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Facebook" })).toHaveAttribute("href", "https://www.facebook.com/profile.php?id=61576845867548");
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/aboundcreation/?utm_source=ig_web_button_share_sheet");
  });
});
