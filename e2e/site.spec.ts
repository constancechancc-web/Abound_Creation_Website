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

test("homepage slideshow and WhatsApp CTA work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Featured projects" })).toBeVisible();
  await expect(page.getByRole("img", { name: /Abound With Creative Idea/i })).toBeVisible();
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(page.getByRole("img", { name: /Northline Objects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Start a Project on WhatsApp/i })).toHaveAttribute("href", /wa\.me\/60196609102/);
});

test("mobile menu is keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole("link", { name: "About" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
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

test("contact page publishes approved contact methods", async ({ page }) => {
  await page.goto("/contact");
  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: "019-660 9102" })).toHaveAttribute("href", "tel:+60196609102");
  await expect(main.getByRole("link", { name: "013-776 6128" })).toHaveAttribute("href", "tel:+60137766128");
  await expect(main.getByRole("link", { name: "aboundcreation@gmail.com" })).toHaveAttribute("href", "mailto:aboundcreation@gmail.com");
});
