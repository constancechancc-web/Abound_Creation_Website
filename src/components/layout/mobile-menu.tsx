"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { contactDetails } from "@/data/contact-details";

const links = [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]] as const;

type MobileMenuProps = { open: boolean; onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null> };

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return <div id="mobile-menu" className="fixed inset-0 top-[76px] z-60 flex flex-col justify-between bg-white px-6 py-10 md:hidden">
    <nav aria-label="Mobile navigation" className="flex flex-col border-t border-brand-border">
      {links.map(([label, href], index) => <Link key={href} ref={index === 0 ? firstLinkRef : undefined} href={href} onClick={onClose} className="min-h-11 border-b border-brand-border py-5 text-[clamp(2.8rem,14vw,5rem)] font-bold leading-none tracking-[-.06em] hover:text-brand-red">{label}</Link>)}
    </nav>
    <a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" aria-label="Let's Talk on WhatsApp" onClick={onClose} className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-red px-6 text-sm font-bold uppercase text-white">LET&apos;S TALK</a>
  </div>;
}
