import { expect, test } from "@playwright/test";

const mainRoutes = ["/", "/work", "/services", "/about", "/contact"];
const projects = [
  ["northline-objects", "Northline Objects"],
  ["sela-dining", "Sela Dining"],
  ["meridian-holdings", "Meridian Holdings"],
  ["fieldwork-uniforms", "Fieldwork Uniforms"],
  ["after-hours-campaign", "After Hours"],
  ["forma-product-study", "Forma Study 01"],
] as const;

for (const route of mainRoutes) {
  test(`${route} loads with a single page heading`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

for (const [slug, title] of projects) {
  test(`project ${slug} renders`, async ({ page }) => {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    await expect(page.locator("main img").first()).toHaveAttribute("alt", /.+/);
  });
}

test("mobile menu is keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("unknown routes use the custom not-found page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
});

test("contact form clearly reports missing Formspree configuration", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("status")).toHaveText("Contact form is not configured.");
  await expect(page.getByRole("button", { name: /send inquiry/i })).toBeDisabled();
});

