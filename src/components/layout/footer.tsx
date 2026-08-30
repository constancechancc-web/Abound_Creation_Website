import Image from "next/image";
import Link from "next/link";

import { contactDetails } from "@/data/contact-details";

const footerLinks = [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]] as const;

export function Footer() {
  return <footer className="bg-[linear-gradient(120deg,#c90024_0%,#df171d_62%,#5a2137_100%)] px-5 pb-8 pt-14 text-white md:px-[7vw] md:pb-10 md:pt-16">
    <div className="flex items-center gap-3">
      <Image src="/icon.svg" alt="" width={40} height={40} className="h-9 w-9 brightness-0 invert md:h-10 md:w-10" />
      <span className="text-xl font-black uppercase tracking-[-.02em] md:text-2xl">Abound Creation</span>
    </div>

    <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.45fr_1fr_.7fr] lg:gap-16">
      <section>
        <h2 className="text-base font-bold uppercase">Abound Creation <span className="ml-2 text-xs font-normal normal-case">202503141470 (PG0571839-U)</span></h2>
        <a href={contactDetails.mapUrl} target="_blank" rel="noreferrer" className="mt-3 block max-w-sm text-sm leading-5 text-white! hover:underline">{contactDetails.address.display}</a>
      </section>
      <section>
        <h2 className="text-base font-bold uppercase">Contact</h2>
        <p className="mt-3 text-sm leading-5"><a href={contactDetails.primaryPhone.href} className="text-white! hover:underline">{contactDetails.primaryPhone.display}</a><span aria-hidden="true"> / </span><a href={contactDetails.secondaryPhone.href} className="text-white! hover:underline">{contactDetails.secondaryPhone.display}</a><br /><a href={contactDetails.email.href} className="text-white! hover:underline">{contactDetails.email.display}</a></p>
      </section>
      <section>
        <h2 className="text-base font-bold uppercase">Working Hour</h2>
        <p className="mt-3 text-sm leading-5">Monday - Friday<br />09.00 - 18.00</p>
      </section>
    </div>

    <div className="mt-16 flex flex-col gap-8 border-b border-white/60 pb-8 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-10 gap-y-4 text-sm font-bold uppercase">
        {footerLinks.map(([label, href]) => <Link key={href} href={href} className="text-white! hover:underline">{label}</Link>)}
      </nav>
      <div className="flex flex-wrap gap-7 text-sm font-bold uppercase">
        <a href={contactDetails.facebook} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white! hover:underline"><span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded bg-white text-xs font-black text-brand-red">f</span>Facebook</a>
        <a href={contactDetails.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white! hover:underline"><span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded border-2 border-white text-[10px]">◎</span>Instagram</a>
      </div>
    </div>

    <div className="flex flex-col gap-4 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
      <span>© 2026 Abound Creation. All rights reserved.</span>
      <a href="#top" className="text-white! hover:underline">Back to top</a>
    </div>
  </footer>;
}
