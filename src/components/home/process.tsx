const steps = [
  ["01", "Consultation", "Understand your business, goals, audience, and current challenges."],
  ["02", "Strategize", "Develop a tailored strategy, content direction, and campaign roadmap."],
  ["03", "Schedule", "Organize a clear content calendar and execution timeline."],
  ["04", "Performance Review", "Review goals, audience response, progress, and learning."],
  ["05", "Campaign Launch", "Produce and release strategic creative work across agreed channels."],
  ["06", "Content Creation", "Create visuals, graphics, photography, and video that represent your brand."],
] as const;

export function Process() {
  return <section className="px-5 py-20 md:px-[5vw] md:py-32">
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <h2 className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[.9] tracking-[-.065em] text-brand-red md:col-span-8">From idea to impact</h2>
      <p className="max-w-sm text-sm md:col-span-4 md:justify-self-end">Our step-by-step approach ensures every campaign is planned with strategy and executed with consistency.</p>
    </div>
    <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
      {steps.map(([number, title, description]) => <article key={number} className="border-t border-black/45 pt-5">
        <div className="flex items-center gap-4"><span aria-hidden="true" className="text-brand-red">✦</span><span className="text-xs text-brand-gray">{number}</span></div>
        <h3 className="mt-6 text-xl font-bold">{title}</h3>
        <p className="mt-3 max-w-sm text-sm leading-5 text-brand-gray">{description}</p>
      </article>)}
    </div>
  </section>;
}
