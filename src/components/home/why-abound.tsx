const items = [
  ["01", "Strategy First", "Every strong visual starts with a clear idea."],
  ["02", "Design With Purpose", "We create work that looks good and communicates better."],
  ["03", "Consistency Matters", "Strong brands are built through consistent experiences."],
  ["04", "Built For Real Business", "Design should work beyond the screen."],
] as const;

export function WhyAbound({ variant = "default" }: { variant?: "default" | "interior" }) {
  const interior = variant === "interior";
  return <section className={interior ? "border-t border-black/20 bg-white px-5 py-20 text-black md:px-[5vw] md:py-28" : "bg-black px-5 py-24 text-white md:px-[5vw] md:py-40"}>
    <div className="grid gap-10 md:grid-cols-12">
      <h2 className={`${interior ? "text-[clamp(2.8rem,6vw,6rem)] font-medium md:col-span-4" : "text-[clamp(3.4rem,8vw,8rem)] font-bold md:col-span-12"} leading-none tracking-[-.07em]`}>Why Abound?</h2>
      <div className={interior ? "md:col-span-7 md:col-start-6" : "mt-10 md:col-span-12"}>
        {items.map(([number, title, copy]) => <article key={number} className={`grid gap-4 border-t py-7 md:grid-cols-12 ${interior ? "border-black/25" : "border-white/30"}`}>
          <span className={interior ? "text-brand-red md:col-span-2" : "text-[#ff5a60] md:col-span-2"}>{number}</span>
          <h3 className="text-xl font-bold uppercase md:col-span-5">{title}</h3>
          <p className={`max-w-md md:col-span-5 ${interior ? "text-brand-gray" : "text-white/65"}`}>{copy}</p>
        </article>)}
      </div>
    </div>
  </section>;
}