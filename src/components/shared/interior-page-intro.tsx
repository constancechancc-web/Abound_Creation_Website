type InteriorPageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  titleAccent?: string;
};

export function InteriorPageIntro({ eyebrow, title, description, titleAccent }: InteriorPageIntroProps) {
  return <header className="border-b border-black/20 px-5 py-20 md:px-[5vw] md:py-28">
    <div className="grid gap-10 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-red">{eyebrow}</p>
        <h1 className="mt-6 text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[.88] tracking-[-.065em]">
          {title}{titleAccent ? <>{" "}<br /><span className="text-brand-red">{titleAccent}</span></> : null}
        </h1>
      </div>
      <p className="max-w-md text-lg leading-7 md:col-span-4 md:justify-self-end">{description}</p>
    </div>
  </header>;
}
