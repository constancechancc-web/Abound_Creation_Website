import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "@/lib/site-url";

describe("resolveSiteUrl", () => {
  it.each([undefined, "", "   "])("uses a valid fallback when the configured URL is %p", (configuredUrl) => {
    expect(resolveSiteUrl(configuredUrl)).toBe("http://localhost:3000");
  });

  it("uses Vercel's generated hostname when the public URL is blank", () => {
    expect(resolveSiteUrl("", "abound-creation.vercel.app")).toBe("https://abound-creation.vercel.app");
  });

  it("removes a trailing slash from a configured deployment URL", () => {
    expect(resolveSiteUrl("https://abound-creation.vercel.app/")).toBe("https://abound-creation.vercel.app");
  });
});
