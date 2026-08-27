import { describe, expect, it, vi } from "vitest";
import { emptyContactValues, submitContact, validateContact } from "@/lib/contact";

describe("contact flow", () => {
  it("requires name, valid email, service and project details", () => {
    expect(validateContact(emptyContactValues)).toEqual({ name: "Please enter your name.", email: "Please enter a valid email address.", service: "Please choose a service.", details: "Please tell us about your project." });
  });
  it("accepts a complete inquiry with optional fields blank", () => {
    expect(validateContact({ ...emptyContactValues, name: "Constance", email: "hello@example.com", service: "Branding", details: "We need a clearer identity." })).toEqual({});
  });
  it("rejects an unconfigured endpoint without requesting the network", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await expect(submitContact("", { ...emptyContactValues, name: "Constance", email: "hello@example.com", service: "Branding", details: "New identity" })).rejects.toThrow("Contact form is not configured.");
    expect(fetchSpy).not.toHaveBeenCalled(); fetchSpy.mockRestore();
  });
});
