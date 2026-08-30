import Image from "next/image";

export function AboutIntro() {
  return <section className="grid gap-16 px-5 py-24 md:grid-cols-12 md:px-[5vw] md:py-36">
    <div className="md:col-span-5"><Image src="/brand/abound-horizontal-logo.jpeg" alt="Abound Creation official logo" width={1425} height={525} className="h-auto w-full max-w-md" /></div>
    <div className="md:col-span-7"><p className="text-[clamp(2.4rem,5vw,6rem)] font-bold leading-[.94] tracking-[-.065em]">We believe good design should do more than attract attention. It should create recognition, build trust and make businesses easier to remember.</p><p className="mt-10 max-w-2xl text-xl leading-8 text-brand-gray">Abound Creation combines strategy, creativity and execution to help businesses turn ideas into brands people can see, understand and remember.</p></div>
  </section>;
}
