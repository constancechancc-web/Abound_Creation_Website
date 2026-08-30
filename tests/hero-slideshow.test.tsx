import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeroSlideshow } from "@/components/home/hero-slideshow";

const slides = [
  { src: "/northline.svg", alt: "Northline identity composition", title: "Northline Objects" },
  { src: "/sela.svg", alt: "Sela restaurant identity", title: "Sela Dining" },
] as const;

describe("HeroSlideshow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => vi.useRealTimers());

  it("moves between slides with controls, keyboard, and touch", () => {
    render(<HeroSlideshow slides={slides} />);
    const region = screen.getByRole("region", { name: "Featured projects" });

    expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(screen.getByRole("img", { name: "Sela restaurant identity" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Show slide 1: Northline Objects" }));
    expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();

    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(screen.getByRole("img", { name: "Sela restaurant identity" })).toBeVisible();
    fireEvent.touchStart(region, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(region, { changedTouches: [{ clientX: 280 }] });
    expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();
  });

  it("advances after five seconds and pauses during interaction", () => {
    render(<HeroSlideshow slides={slides} />);
    const region = screen.getByRole("region", { name: "Featured projects" });
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("img", { name: "Sela restaurant identity" })).toBeVisible();

    fireEvent.mouseEnter(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole("img", { name: "Sela restaurant identity" })).toBeVisible();
  });

  it("does not autoplay when reduced motion is requested", () => {
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<HeroSlideshow slides={slides} />);
    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();
  });
});
