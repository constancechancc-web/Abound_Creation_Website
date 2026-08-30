import Image from "next/image";
import Link from "next/link";

export function WelcomeSplit() {
  return <section className="grid md:grid-cols-2">
    <div className="flex min-h-[520px] flex-col justify-center bg-brand-red px-6 py-16 text-white md:px-[8vw] md:py-24">
      <h1 aria-label="Welcome to Abound Creation" className="text-[clamp(2.8rem,5vw,5.8rem)] font-medium leading-[.95] tracking-[-.055em]">
        <span className="block text-[.62em] font-normal tracking-[-.035em]">Welcome to</span>
        ABOUND CREATION
      </h1>
      <p className="mt-9 max-w-md text-base leading-6 text-white/90">We are a creative design studio based in Johor Bahru, Malaysia, specializing in brand identity, custom uniforms, and merchandise. We help businesses build clear, consistent, and recognizable brands through logo design, visual identity systems, and a wide range of brand applications.</p>
      <Link href="/about" className="mt-9 inline-flex min-h-12 w-fit items-center bg-white px-6 text-sm font-bold uppercase text-brand-red transition-colors hover:bg-black hover:text-white">Explore More</Link>
    </div>
    <div className="relative min-h-[460px] bg-brand-light md:min-h-[620px]">
      <Image src="/images/projects/fieldwork-uniforms/details.svg" alt="Abound Creation apparel design on a black shirt" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
    </div>
  </section>;
}
