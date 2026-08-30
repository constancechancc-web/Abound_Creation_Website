import { expect, test } from "@playwright/test";

const widths = [1440, 1280, 1024, 768, 430, 390, 375, 360];

for (const width of widths) {
  test(`homepage fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

const interiorRoutes = ["/about", "/work", "/services", "/contact"];
const interiorWidths = [1440, 768, 390];

for (const route of interiorRoutes) {
  for (const width of interiorWidths) {
    test(`${route} editorial layout fits ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    });
  }
}
test("reduced-motion users do not receive slideshow autoplay", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("img", { name: /Abound With Creative Idea/i })).toBeVisible();
  await page.waitForTimeout(5500);
  await expect(page.getByRole("img", { name: /Abound With Creative Idea/i })).toBeVisible();
  await context.close();
});
