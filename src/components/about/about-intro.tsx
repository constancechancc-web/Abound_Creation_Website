import Image from "next/image";

export function AboutIntro() {
  return <section className="px-5 py-20 md:px-[5vw] md:py-28">
    <div className="grid gap-12 border-t border-black/20 pt-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <Image src="/brand/abound-horizontal-logo.jpeg" alt="Abound Creation official logo" width={1425} height={525} className="h-auto w-full max-w-sm" />
      </div>
      <div className="md:col-span-7 md:col-start-6">
        <p className="text-[clamp(2rem,4vw,4.25rem)] font-medium leading-[.98] tracking-[-.055em]">We believe good design should do more than attract attention. It should create recognition, build trust and make businesses easier to remember.</p>
        <p className="mt-8 max-w-2xl text-lg leading-7 text-brand-gray">Abound Creation combines strategy, creativity and execution to help businesses turn ideas into brands people can see, understand and remember.</p>
      </div>
    </div>
  </section>;
}