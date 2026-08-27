import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Abound Creation — Creative Design Agency",
  description:
    "Abound Creation is a creative design agency specialising in branding, uniform design, marketing, graphic design, photography and videography.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
