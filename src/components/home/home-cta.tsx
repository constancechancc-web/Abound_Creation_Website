import { contactDetails } from "@/data/contact-details";

export function HomeCta() {
  return <section className="relative isolate overflow-hidden border-t border-black/20 px-5 py-24 md:px-[5vw] md:py-36">
    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-3/5 bg-[radial-gradient(circle_at_80%_70%,rgba(237,28,36,.95),rgba(237,28,36,.16)_38%,transparent_68%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute -right-16 top-20 -z-10 h-72 w-72 rotate-12 border border-brand-red/40 md:h-[34rem] md:w-[34rem]" />
    <h2 className="max-w-5xl text-[clamp(3.2rem,8vw,8rem)] font-medium leading-[.87] tracking-[-.07em]">Let&apos;s Build <span className="block text-brand-red">Something Great Together</span></h2>
    <p className="mt-9 max-w-md text-lg leading-6">Have a brand, campaign or idea in mind? Let&apos;s turn it into something people remember.</p>
    <a href={contactDetails.whatsAppUrl} target="_blank" rel="noreferrer" aria-label="Start a Project on WhatsApp" className="mt-10 inline-flex min-h-12 items-center bg-brand-red px-6 text-sm font-bold uppercase text-white! transition-colors hover:bg-black">Start a Project</a>
  </section>;
}

