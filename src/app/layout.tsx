import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abound Creation — Creative Design Agency",
  description: "Abound Creation is a creative design agency specialising in branding, uniform design, marketing, graphic design, photography and videography.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body id="top"><a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-black px-4 py-3 text-sm font-bold text-white focus:translate-y-0">Skip to content</a><Navbar /><main id="main-content">{children}</main><Footer /></body></html>;
}
