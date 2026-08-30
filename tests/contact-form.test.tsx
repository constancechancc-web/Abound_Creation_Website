import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactForm } from "@/components/contact/contact-form";

describe("ContactForm", () => {
  it("shows configuration state instead of pretending to submit", async () => {
    const user = userEvent.setup(); render(<ContactForm endpoint="" />);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Contact form is not configured.");
  });
  it("keeps form behavior inside the editorial presentation", () => {
    const { container } = render(<ContactForm endpoint="" variant="editorial" />);
    expect(container.querySelector("[data-contact-form-panel]")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send inquiry/i })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Contact form is not configured.");
    expect(screen.getAllByRole("option")).toHaveLength(8);
  });  it("provides every approved service option", () => {
    render(<ContactForm endpoint="" />);
    const options = screen.getAllByRole("option").map((option) => option.textContent);
    expect(options).toEqual(["Select a service", "Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography", "Other"]);
  });
});
