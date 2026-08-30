"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type HeroSlide = { src: string; alt: string; title: string; fit?: "cover" | "contain" };

const intervalMs = 5000;
const swipeThreshold = 40;

export function HeroSlideshow({ slides }: { slides: readonly HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const show = useCallback((index: number) => {
    if (slides.length === 0) return;
    setActive((index + slides.length) % slides.length);
  }, [slides.length]);
  const previous = useCallback(() => show(active - 1), [active, show]);
  const next = useCallback(() => show(active + 1), [active, show]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, slides.length]);

  if (slides.length === 0) return null;

  return <section
    role="region"
    aria-label="Featured projects"
    tabIndex={0}
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
    }}
    onKeyDown={(event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
      if (event.key === "ArrowRight") { event.preventDefault(); next(); }
    }}
    onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
    onTouchEnd={(event) => {
      if (touchStartX.current === null) return;
      const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(distance) < swipeThreshold) return;
      if (distance > 0) previous(); else next();
    }}
    className="group relative isolate h-[440px] overflow-hidden bg-brand-light outline-none md:h-[70vh] md:max-h-[820px]"
  >
    <div className="absolute inset-0">
      {slides.map((slide, index) => {
        const selected = index === active;
        return <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          aria-hidden={!selected}
          className={`hero-slide ${slide.fit === "cover" ? "object-cover" : "object-contain"} ${selected ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />;
      })}
    </div>

    {slides.length > 1 && <>
      <button type="button" aria-label="Previous slide" onClick={previous} className="absolute left-4 top-1/2 z-10 grid min-h-11 min-w-11 -translate-y-1/2 place-items-center rounded-full border border-black/25 bg-white/90 text-2xl transition-colors hover:bg-white md:left-8">←</button>
      <button type="button" aria-label="Next slide" onClick={next} className="absolute right-4 top-1/2 z-10 grid min-h-11 min-w-11 -translate-y-1/2 place-items-center rounded-full border border-black/25 bg-white/90 text-2xl transition-colors hover:bg-white md:right-8">→</button>
      <div role="group" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-white/90 px-3 py-2" aria-label="Choose a featured project">
        {slides.map((slide, index) => <button key={slide.title} type="button" aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={index === active ? "true" : undefined} onClick={() => show(index)} className={`min-h-11 min-w-11 rounded-full p-[17px] before:block before:h-2 before:w-2 before:rounded-full ${index === active ? "before:bg-brand-red" : "before:bg-black/35"}`} />)}
      </div>
    </>}

    <p className="sr-only" aria-live="polite">Slide {active + 1} of {slides.length}: {slides[active].title}</p>
  </section>;
}
