"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";

const links = [["Work", "/work"], ["Services", "/services"], ["About", "/about"], ["Contact", "/contact"]] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <>
    <header className={`sticky top-0 z-50 h-[72px] bg-white transition-[border-color] md:h-20 ${scrolled ? "border-b border-brand-border" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-full w-[min(100%-40px,1800px)] items-center justify-between md:w-[min(100%-8vw,1800px)]">
        <Link href="/" aria-label="Abound Creation home" className="relative z-50 flex items-center gap-2.5 font-bold tracking-[-.04em]">
          <Image src="/icon.svg" alt="" width={28} height={28} priority /><span>ABOUND</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">{links.map(([label, href]) => <Link key={href} href={href} className="text-xs font-bold uppercase tracking-[.06em] transition-colors hover:text-brand-red">{label}</Link>)}</nav>
        <Link href="/contact" className="hidden text-xs font-bold uppercase tracking-[.06em] transition-colors hover:text-brand-red md:inline-flex">LET&apos;S TALK ↗</Link>
        <button ref={triggerRef} type="button" aria-controls="mobile-menu" aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)} className="relative z-50 flex min-h-11 min-w-11 items-center justify-end text-xs font-bold uppercase md:hidden">{open ? "CLOSE" : "MENU"}</button>
      </div>
    </header>
    <MobileMenu open={open} onClose={close} triggerRef={triggerRef} />
  </>;
}
