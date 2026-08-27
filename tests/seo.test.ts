import { describe, expect, it } from "vitest";
import { metadata } from "@/app/layout";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { projects } from "@/data/projects";

describe("SEO contracts", () => {
  it("uses the approved title, description and share image", () => {
    expect(metadata.title).toBe("Abound Creation — Creative Design Agency");
    expect(metadata.description).toContain("branding, uniform design, marketing, graphic design, photography and videography");
    expect(metadata.openGraph).toMatchObject({ images: ["/social-card.svg"] });
  });
  it("lists every page and project in the sitemap", () => {
    const urls=sitemap().map((entry)=>entry.url);
    for(const route of ["/","/work","/services","/about","/contact",...projects.map((project)=>`/work/${project.slug}`)]) expect(urls.some((url)=>url.endsWith(route))).toBe(true);
  });
  it("allows indexing and publishes the sitemap URL", () => {
    expect(robots()).toMatchObject({ rules:{userAgent:"*",allow:"/"} });
    expect(robots().sitemap).toContain("/sitemap.xml");
  });
});
