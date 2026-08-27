import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { resolveSiteUrl } from "@/lib/site-url";
const base=resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL,process.env.VERCEL_PROJECT_PRODUCTION_URL);
export default function sitemap():MetadataRoute.Sitemap{const routes=["","/work","/services","/about","/contact",...projects.map((project)=>`/work/${project.slug}`)];return routes.map((route)=>({url:route === "" ? `${base}/` : `${base}${route}`,lastModified:new Date("2026-08-27"),changeFrequency:route.startsWith("/work/")?"monthly":"weekly",priority:route===""?1:route==="/work"?.9:.8}));}
