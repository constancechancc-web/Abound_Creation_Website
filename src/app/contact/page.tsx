import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { InteriorPageIntro } from "@/components/shared/interior-page-intro";
import { contactDetails } from "@/data/contact-details";

export const metadata: Metadata = {
  title: "Contact — Abound Creation",
  description: "Tell Abound Creation about your brand, campaign or creative project.",
};

export default function ContactPage() {
  return <>
    <InteriorPageIntro
      eyebrow="Start a conversation"
      title="Let's talk."
      description="Tell us what you're working on, what you're trying to solve, or simply what you're thinking about."
    />
    <section data-contact-layout className="grid gap-16 px-5 py-20 md:px-[5vw] md:py-28 xl:grid-cols-12 xl:gap-8">
      <div className="xl:col-span-5">
        <h2 className="text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-.05em]">Contact details</h2>
        <dl className="mt-10 border-b border-black/25 text-sm">
          <div className="grid gap-2 border-t border-black/25 py-6 sm:grid-cols-[9rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[.1em] text-brand-gray">Email</dt><dd><a href={contactDetails.email.href} className="hover:text-brand-red">{contactDetails.email.display}</a></dd></div>
          <div className="grid gap-2 border-t border-black/25 py-6 sm:grid-cols-[9rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[.1em] text-brand-gray">Phone</dt><dd className="flex flex-col items-start"><a href={contactDetails.primaryPhone.href} className="hover:text-brand-red">{contactDetails.primaryPhone.display}</a><a href={contactDetails.secondaryPhone.href} className="hover:text-brand-red">{contactDetails.secondaryPhone.display}</a></dd></div>
          <div className="grid gap-2 border-t border-black/25 py-6 sm:grid-cols-[9rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[.1em] text-brand-gray">WhatsApp</dt><dd><a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" className="font-bold text-brand-red hover:text-black">Message us on WhatsApp ↗</a></dd></div>
          <div className="grid gap-2 border-t border-black/25 py-6 sm:grid-cols-[9rem_1fr]"><dt className="text-xs font-bold uppercase tracking-[.1em] text-brand-gray">Location</dt><dd><a href={contactDetails.mapUrl} target="_blank" rel="noreferrer" className="hover:text-brand-red">{contactDetails.address.display}</a></dd></div>
        </dl>
        <div className="mt-8 flex gap-6 text-sm font-bold uppercase"><a href={contactDetails.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-red">Instagram ↗</a><a href={contactDetails.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-red">Facebook ↗</a></div>
      </div>
      <div className="xl:col-span-6 xl:col-start-7">
        <ContactForm endpoint={process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ""} variant="editorial" />
      </div>
    </section>
  </>;
}