import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { resolveSiteUrl } from "@/lib/site-url";
import "./globals.css";
const siteUrl=resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL,process.env.VERCEL_PROJECT_PRODUCTION_URL);
const description="Abound Creation is a creative design agency specialising in branding, uniform design, marketing, graphic design, photography and videography.";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:"Abound Creation — Creative Design Agency",description,openGraph:{title:"Abound Creation — Creative Design Agency",description,type:"website",images:["/social-card.svg"]},twitter:{card:"summary_large_image",title:"Abound Creation — Creative Design Agency",description,images:["/social-card.svg"]}};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body id="top"><a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-black px-4 py-3 text-sm font-bold text-white focus:translate-y-0">Skip to content</a><Navbar/><main id="main-content">{children}</main><Footer/></body></html>}
