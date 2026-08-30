import Image from "next/image";
import Link from "next/link";
import { contactDetails } from "@/data/contact-details";

export function Footer() {
  return <footer className="bg-white px-5 pb-8 pt-20 md:px-[5vw] md:pt-28">
    <div className="grid gap-12 border-y border-black py-12 lg:grid-cols-12">
      <div className="lg:col-span-4"><Image src="/brand/abound-logo.webp" alt="Abound Creation" width={720} height={720} className="h-auto w-40" /><p className="mt-8 max-w-sm text-3xl font-bold leading-none tracking-[-.05em]">Abound with <span className="text-brand-red">creative idea.</span></p></div>
      <nav aria-label="Footer navigation" className="grid content-start gap-3 text-sm font-bold uppercase lg:col-span-2">{[["Portfolio","/work"],["Services","/services"],["About","/about"],["Contact Us","/contact"]].map(([label,href])=><Link key={href} href={href} className="hover:text-brand-red">{label}</Link>)}</nav>
      <div className="grid content-start gap-3 text-sm lg:col-span-3"><p className="text-xs font-bold uppercase text-brand-gray">Contact</p><a href={contactDetails.primaryPhone.href} className="hover:text-brand-red">{contactDetails.primaryPhone.display}</a><a href={contactDetails.secondaryPhone.href} className="hover:text-brand-red">{contactDetails.secondaryPhone.display}</a><a href={contactDetails.email.href} className="break-all hover:text-brand-red">{contactDetails.email.display}</a><a href={contactDetails.mapUrl} target="_blank" rel="noreferrer" className="max-w-xs hover:text-brand-red">{contactDetails.address.display}</a></div>
      <div className="flex content-start flex-col gap-3 text-sm font-bold uppercase lg:col-span-3"><a href={contactDetails.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-red">Instagram</a><a href={contactDetails.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-red">Facebook</a></div>
    </div>
    <div className="flex flex-col gap-4 pt-6 text-[11px] font-medium uppercase tracking-[.08em] sm:flex-row sm:justify-between"><span>© 2026 Abound Creation. All rights reserved.</span><a href="#top" className="hover:text-brand-red">Back to top ↑</a></div>
  </footer>;
}
