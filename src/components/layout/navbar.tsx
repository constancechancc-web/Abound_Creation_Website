"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { contactDetails } from "@/data/contact-details";

const links = [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <>
    <header className={`sticky top-0 z-50 h-[76px] bg-white transition-[border-color,box-shadow] md:h-[88px] ${scrolled ? "border-b border-brand-border shadow-sm" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-full w-[min(100%-40px,1800px)] items-center justify-between md:w-[min(100%-8vw,1800px)]">
        <Link href="/" aria-label="Abound Creation home" className="relative z-50 block h-12 w-36 shrink-0 md:h-14 md:w-40">
          <Image src="/brand/abound-horizontal-logo.jpeg" alt="Abound Creation" width={1425} height={525} loading="eager" sizes="(min-width: 768px) 160px, 144px" className="h-full w-full object-contain object-left" />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => <Link key={href} href={href} className="text-xs font-bold uppercase tracking-[.04em] transition-colors hover:text-brand-red focus-visible:text-brand-red">{label}</Link>)}
        </nav>
        <a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" aria-label="Let's Talk on WhatsApp" className="hidden min-h-11 items-center rounded-full bg-brand-red px-6 text-xs font-bold uppercase tracking-[.04em] text-white! transition-colors hover:bg-red-700 focus-visible:bg-red-700 md:inline-flex">LET&apos;S TALK</a>
        <button ref={triggerRef} type="button" aria-controls="mobile-menu" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="relative z-[70] flex min-h-11 min-w-11 items-center justify-end text-xs font-bold uppercase md:hidden">{open ? "CLOSE" : "MENU"}</button>
      </div>
    </header>
    <MobileMenu open={open} onClose={close} triggerRef={triggerRef} />
  </>;
}
