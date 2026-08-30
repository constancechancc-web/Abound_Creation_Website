# Reference-Led Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Abound Creation homepage to match the supplied reference, add an accessible six-project slideshow, and publish the approved WhatsApp and contact details site-wide.

**Architecture:** Keep `src/app/page.tsx` as a Server Component that composes static sections and passes serializable slide data into one focused `HeroSlideshow` Client Component. Centralize contact links and homepage service display data in typed modules so the navbar, footer, contact page, and CTA cannot drift. Preserve all secondary routes and project data.

**Tech Stack:** Next.js 16.3.3 App Router, React 19.2.8, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Playwright

**Spec:** `docs/superpowers/specs/2026-08-30-reference-homepage-redesign.md`

## Global Constraints

- Follow the supplied reference closely while interpreting it responsively.
- Use the six existing project cover visuals and a 5,000ms slideshow interval.
- Primary WhatsApp is `+60196609102` with `Hi Abound Creation, I'd like to discuss a project.`
- Secondary phone is `+60137766128`; email is `aboundcreation@gmail.com`.
- Address is `10, Jalan Seroja 39, Taman Johor Jaya, 81100 Johor Bahru, Johor.`
- Preserve the complete supplied logo and all secondary routes, Formspree behavior, SEO routes, and URL fallback behavior.
- Use `loading="eager"` only for the initial slide; Next.js 16 deprecates `priority`.
- Keep interactive JavaScript in focused Client Components with serializable props.
- Support keyboard, touch, screen readers, reduced motion, and widths from 360px upward without overflow.

## File Map

**Create:** `src/data/contact-details.ts`, `src/data/home-services.ts`, `src/components/home/hero-slideshow.tsx`, `src/components/home/welcome-split.tsx`, `src/components/home/home-cta.tsx`, plus focused tests.

**Modify:** `src/app/page.tsx`, `src/app/contact/page.tsx`, shared header/footer, `services-preview.tsx`, `brand-statement.tsx`, `process.tsx`, `globals.css`, unit tests, Playwright tests, and `README.md`.

---

### Task 1: Canonical Contact Details

**Files:**
- Create: `src/data/contact-details.ts`
- Create: `tests/contact-details.test.ts`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/layout/footer.tsx`
- Modify: `tests/content-pages.test.tsx`
- Modify: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `contactDetails` with `primaryPhone`, `secondaryPhone`, `email`, `address`, `whatsAppMessage`, `whatsAppUrl`, `mapUrl`, `facebook`, and `instagram`.
- Consumes: existing `ContactForm` and approved social URLs.

- [ ] **Step 1: Write failing tests**

```ts
import { contactDetails } from "@/data/contact-details";
expect(contactDetails.primaryPhone).toEqual({ display: "019-660 9102", href: "tel:+60196609102" });
expect(contactDetails.secondaryPhone).toEqual({ display: "013-776 6128", href: "tel:+60137766128" });
expect(contactDetails.email.href).toBe("mailto:aboundcreation@gmail.com");
expect(contactDetails.whatsAppUrl).toBe(`https://wa.me/60196609102?text=${encodeURIComponent("Hi Abound Creation, I'd like to discuss a project.")}`);
expect(contactDetails.mapUrl).toContain("google.com/maps/search");
```

In consumer tests, render `ContactPage` and `Footer` and assert both telephone `href` values, the mail link, and an external map link named from the address.

- [ ] **Step 2: Verify red state**

Run: `npm test -- tests/contact-details.test.ts tests/content-pages.test.tsx tests/navigation.test.tsx`

Expected: FAIL because the module does not exist and the contact page still says `To be provided`.

- [ ] **Step 3: Implement the data module and consumers**

```ts
const message = "Hi Abound Creation, I'd like to discuss a project.";
const address = "10, Jalan Seroja 39, Taman Johor Jaya, 81100 Johor Bahru, Johor.";
export const contactDetails = {
  primaryPhone: { display: "019-660 9102", href: "tel:+60196609102" },
  secondaryPhone: { display: "013-776 6128", href: "tel:+60137766128" },
  email: { display: "aboundcreation@gmail.com", href: "mailto:aboundcreation@gmail.com" },
  address: { display: address },
  whatsAppMessage: message,
  whatsAppUrl: `https://wa.me/60196609102?text=${encodeURIComponent(message)}`,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
  facebook: "https://www.facebook.com/profile.php?id=61576845867548",
  instagram: "https://www.instagram.com/aboundcreation/?utm_source=ig_web_button_share_sheet",
} as const;
```

Replace unfinished contact values with links from this object. Update the footer to show both phones, email, map-linked address, and both social links. Restyle it as a compact white editorial grid with fine black rules and the complete supplied logo, matching the reference without changing footer semantics.

- [ ] **Step 4: Verify green state**

Run the Step 2 command. Expected: all focused tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/data/contact-details.ts src/app/contact/page.tsx src/components/layout/footer.tsx tests/contact-details.test.ts tests/content-pages.test.tsx tests/navigation.test.tsx
git commit -m "feat: publish canonical contact details"
```

---

### Task 2: Reference-Style Shared Header

**Files:**
- Modify: `src/components/layout/navbar.tsx`
- Modify: `src/components/layout/mobile-menu.tsx`
- Modify: `tests/navigation.test.tsx`

**Interfaces:**
- Consumes: `contactDetails.whatsAppUrl`.
- Produces: ordered labels `About`, `Portfolio`, `Services`, `Contact Us` and a WhatsApp `Let's Talk` CTA.

- [ ] **Step 1: Write failing assertions**

```tsx
render(<Navbar />);
for (const [name, href] of [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]]) {
  expect(screen.getAllByRole("link", { name }).some((link) => link.getAttribute("href") === href)).toBe(true);
}
expect(screen.getByRole("link", { name: /let's talk on whatsapp/i })).toHaveAttribute("href", expect.stringContaining("wa.me/60196609102"));
expect(screen.getByRole("img", { name: "Abound Creation" })).toBeInTheDocument();
```

Retain the current Escape/focus test.

- [ ] **Step 2: Verify red state**

Run: `npm test -- tests/navigation.test.tsx`

Expected: FAIL on labels, logo accessible name, and CTA destination.

- [ ] **Step 3: Implement the header**

```ts
const links = [["About", "/about"], ["Portfolio", "/work"], ["Services", "/services"], ["Contact Us", "/contact"]] as const;
```

Use `/brand/abound-logo-transparent.png` with `alt="Abound Creation"`, explicit `width={1600}`, `height={1600}`, `loading="eager"`, and a contained responsive size. Render a red rounded external CTA using `contactDetails.whatsAppUrl`, `target="_blank"`, `rel="noreferrer"`, and `aria-label="Let's Talk on WhatsApp"`. Apply the same labels/CTA to the mobile menu while preserving focus transfer, Escape handling, body scroll lock, and 44px targets.

- [ ] **Step 4: Verify green state**

Run the Step 2 command. Expected: navigation tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/layout/navbar.tsx src/components/layout/mobile-menu.tsx tests/navigation.test.tsx
git commit -m "feat: align shared header with reference"
```

---

### Task 3: Accessible Project Slideshow

**Files:**
- Create: `src/components/home/hero-slideshow.tsx`
- Create: `tests/hero-slideshow.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `HeroSlide = { src: string; alt: string; title: string }` and `HeroSlideshow({ slides }: { slides: readonly HeroSlide[] })`.
- Consumes: serializable slide objects from `src/app/page.tsx`.

- [ ] **Step 1: Write failing behavior tests**

Use two literal slides and fake timers. Required assertions:

```tsx
render(<HeroSlideshow slides={slides} />);
expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();
await user.click(screen.getByRole("button", { name: "Next slide" }));
expect(screen.getByRole("img", { name: "Sela restaurant identity" })).toBeVisible();
await user.click(screen.getByRole("button", { name: "Show slide 1: Northline Objects" }));
expect(screen.getByRole("img", { name: "Northline identity composition" })).toBeVisible();
```

With `vi.useFakeTimers()`, advance 5,000ms and assert slide 2; dispatch `mouseEnter`, advance another 5,000ms, and assert no change. Stub `matchMedia` with `matches: true`, advance 10,000ms, and assert slide 1 remains. Dispatch `ArrowRight`, touch start at 200, and touch end at 280 to prove keyboard and swipe navigation.

- [ ] **Step 2: Verify red state**

Run: `npm test -- tests/hero-slideshow.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the focused Client Component**

Core state and timer:

```tsx
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
export type HeroSlide = { src: string; alt: string; title: string };
const intervalMs = 5000;

export function HeroSlideshow({ slides }: { slides: readonly HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const show = useCallback((index: number) => setActive((index + slides.length) % slides.length), [slides.length]);

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
```

Complete the component with one image layer per slide, opacity classes, `loading="eager"` plus `fetchPriority="high"` only on index 0, lazy loading elsewhere, `sizes="100vw"`, a focusable `region` named `Featured projects`, focus/hover pause, left/right keys, 40px swipe threshold, 44px arrow controls, six labelled dots, and a polite status line `Slide N of 6: Title`. Add reduced-motion CSS that removes fades.

- [ ] **Step 4: Verify green state**

Run the Step 2 command. Expected: all slideshow tests PASS without timer warnings.

- [ ] **Step 5: Commit**

```powershell
git add src/components/home/hero-slideshow.tsx src/app/globals.css tests/hero-slideshow.test.tsx
git commit -m "feat: add accessible project slideshow"
```

---

### Task 4: Five-Category Home Services

**Files:**
- Create: `src/data/home-services.ts`
- Create: `tests/home-services.test.tsx`
- Modify: `src/components/home/services-preview.tsx`

**Interfaces:**
- Produces: `HomeService` and `homeServices: readonly HomeService[]`.
- Consumes: existing project image paths.

- [ ] **Step 1: Write failing tests**

```tsx
render(<ServicesPreview />);
for (const name of ["Branding", "Apparel Design", "Marketing", "Graphic Design", "Video & Photography"]) {
  expect(screen.getByRole("button", { name: new RegExp(name, "i") })).toBeInTheDocument();
}
const apparel = screen.getByRole("button", { name: /Apparel Design/i });
await user.click(apparel);
expect(apparel).toHaveAttribute("aria-expanded", "true");
expect(screen.getByText(/uniforms and merchandise/i)).toBeVisible();
```

- [ ] **Step 2: Verify red state**

Run: `npm test -- tests/home-services.test.tsx`

Expected: FAIL because the component exposes six different categories.

- [ ] **Step 3: Implement typed display data and accordion**

```ts
export type HomeService = { number: string; title: string; description: string; image: string };
export const homeServices: readonly HomeService[] = [
  { number: "01", title: "Branding", description: "Brand strategy, identity and systems that create a clear, consistent and recognisable presence.", image: "/images/projects/northline-objects/cover.svg" },
  { number: "02", title: "Apparel Design", description: "Custom uniforms and merchandise designed around your brand, people and environment.", image: "/images/projects/fieldwork-uniforms/cover.svg" },
  { number: "03", title: "Marketing", description: "Creative campaigns and marketing materials that turn ideas into meaningful communication.", image: "/images/projects/after-hours-campaign/cover.svg" },
  { number: "04", title: "Graphic Design", description: "Social, print, packaging and campaign design that communicates with clarity.", image: "/images/projects/meridian-holdings/cover.svg" },
  { number: "05", title: "Video & Photography", description: "Photography, brand films and social content shaped by a clear creative direction.", image: "/images/projects/forma-product-study/cover.svg" },
];
```

Consume this data, default to index 0, preserve `aria-expanded`, show description and image in the expanded mobile row, and render one shared active-image panel at `lg`. Fill images use `sizes="(max-width: 1024px) 100vw, 32vw"`.

- [ ] **Step 4: Verify green state**

Run the Step 2 command. Expected: tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/data/home-services.ts src/components/home/services-preview.tsx tests/home-services.test.tsx
git commit -m "feat: align home services with reference"
```

---

### Task 5: Reference-Led Static Sections

**Files:**
- Create: `src/components/home/welcome-split.tsx`
- Create: `src/components/home/home-cta.tsx`
- Modify: `src/components/home/brand-statement.tsx`
- Modify: `src/components/home/process.tsx`
- Modify: `tests/home.test.tsx`

**Interfaces:**
- Consumes: `contactDetails.whatsAppUrl`.
- Produces: `WelcomeSplit`, `BrandStatement`, six-step `Process`, and `HomeCta`.

- [ ] **Step 1: Write the failing semantic contract**

Assert one `<h1>` named `Welcome to Abound Creation`, `/about` `Explore More`, `What We Do`, text `Abound With Creative Idea`, heading `From idea to impact`, all six process headings, closing heading `Let's Build Something Great Together`, and an external `Start a Project on WhatsApp` link containing `wa.me/60196609102`. Assert `Selected Work` and `Why Abound?` headings are absent.

- [ ] **Step 2: Verify red state**

Run: `npm test -- tests/home.test.tsx`

Expected: FAIL because the old section composition remains.

- [ ] **Step 3: Implement the sections**

`WelcomeSplit` renders the only homepage `<h1>`, the approved Johor Bahru introduction, an `/about` link, and `/images/projects/fieldwork-uniforms/details.svg` in an equal desktop split. Text panel is red/white and stacks before the image on mobile.

Use exact process data:

```ts
const steps = [
  ["01", "Consultation", "Understand your business, goals, audience and current challenges."],
  ["02", "Strategize", "Develop a tailored strategy, content direction and campaign roadmap."],
  ["03", "Schedule", "Organize a clear content calendar and execution timeline."],
  ["04", "Performance Review", "Review goals, audience response, progress and learning."],
  ["05", "Campaign Launch", "Produce and release strategic creative work across agreed channels."],
  ["06", "Content Creation", "Create visuals, graphics, photography and video that represent your brand."],
] as const;
```

`BrandStatement` is a red typographic strip without a heading. `HomeCta` uses the approved heading, gradient decoration, `contactDetails.whatsAppUrl`, `target="_blank"`, `rel="noreferrer"`, and `aria-label="Start a Project on WhatsApp"`.

- [ ] **Step 4: Verify green state**

Run the Step 2 command. Expected: homepage tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/components/home/welcome-split.tsx src/components/home/home-cta.tsx src/components/home/brand-statement.tsx src/components/home/process.tsx tests/home.test.tsx
git commit -m "feat: build reference-led homepage sections"
```

---

### Task 6: Compose and Style the Complete Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/home.test.tsx`
- Modify: `e2e/site.spec.ts`
- Modify: `e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: `projects`, `HeroSlideshow`, `WelcomeSplit`, `ServicesPreview`, `BrandStatement`, `Process`, and `HomeCta`.
- Produces: final reference-led homepage route.

- [ ] **Step 1: Add failing composition/browser assertions**

In the unit test, assert buttons named `Show slide N: Project Title` for all six project titles. Add Playwright coverage:

```ts
test("homepage slideshow and WhatsApp CTA work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "Featured projects" })).toBeVisible();
  await expect(page.getByRole("img", { name: /Northline Objects/i })).toBeVisible();
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(page.getByRole("img", { name: /Sela Dining/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Start a Project on WhatsApp/i })).toHaveAttribute("href", /wa\.me\/60196609102/);
});
```

For reduced motion, create a reduced-motion context, load `/`, wait 5,500ms, and assert the first slide remains visible.

- [ ] **Step 2: Verify red state**

Run:

```powershell
npm test -- tests/home.test.tsx
npm run test:e2e -- --grep "homepage slideshow|reduced motion"
```

Expected: FAIL until page composition and browser behavior exist.

- [ ] **Step 3: Compose the Server Component**

```tsx
import { BrandStatement } from "@/components/home/brand-statement";
import { HomeCta } from "@/components/home/home-cta";
import { HeroSlideshow, type HeroSlide } from "@/components/home/hero-slideshow";
import { Process } from "@/components/home/process";
import { ServicesPreview } from "@/components/home/services-preview";
import { WelcomeSplit } from "@/components/home/welcome-split";
import { projects } from "@/data/projects";

const slides: HeroSlide[] = projects.map((project) => ({ src: project.coverImage, alt: project.gallery[0].alt, title: project.title }));

export default function Home() {
  return <>
    <HeroSlideshow slides={slides} />
    <WelcomeSplit />
    <ServicesPreview />
    <BrandStatement />
    <Process />
    <HomeCta />
  </>;
}
```

Style the slideshow area near 440px on mobile, 70vh on medium screens, and at most 820px. Use `object-contain` for graphic covers. Add soft CTA gradient and outlined geometric decoration with `aria-hidden="true"` and `pointer-events: none`. Keep all text and controls above decoration layers.

- [ ] **Step 4: Verify green state**

Run:

```powershell
npm test -- tests/home.test.tsx tests/hero-slideshow.test.tsx tests/home-services.test.tsx
npm run test:e2e -- --grep "homepage slideshow|reduced motion"
```

Expected: focused checks PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/app/page.tsx src/app/globals.css tests/home.test.tsx e2e/site.spec.ts e2e/responsive.spec.ts
git commit -m "feat: compose reference-led homepage"
```

---

### Task 7: Responsive, Accessibility, and Production Verification

**Files:**
- Modify: `e2e/site.spec.ts`
- Modify: `e2e/responsive.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: complete site from Tasks 1–6.
- Produces: verified desktop/mobile behavior and deployment documentation.

- [ ] **Step 1: Add final browser contracts**

```ts
test("contact page publishes approved contact methods", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "019-660 9102" })).toHaveAttribute("href", "tel:+60196609102");
  await expect(page.getByRole("link", { name: "013-776 6128" })).toHaveAttribute("href", "tel:+60137766128");
  await expect(page.getByRole("link", { name: "aboundcreation@gmail.com" })).toHaveAttribute("href", "mailto:aboundcreation@gmail.com");
});
```

Update the mobile-menu test to expect first focus on `About`. Retain all route/project checks and the eight-width overflow loop: 1440, 1280, 1024, 768, 430, 390, 375, 360.

- [ ] **Step 2: Run the complete browser suite**

Run: `npm run test:e2e`

Expected: all Playwright tests PASS. Diagnose any overflow by measuring exact rendered element bounds before changing CSS.

- [ ] **Step 3: Run visual and accessibility checks**

Start: `npm run dev -- --hostname 127.0.0.1`

Run:

```powershell
npx --yes agent-browser batch --bail "open http://127.0.0.1:3000" "wait --load networkidle" "screenshot test-results/reference-homepage.png --full" "snapshot -i" "console" "errors"
npx --yes agent-browser a11y http://127.0.0.1:3000 --tags wcag2a,wcag2aa --json
```

Expected: correct section order and visual balance, no console/page errors, and zero WCAG A/AA violations. Compare the screenshot to the supplied reference for whitespace, red/white balance, split layout, service rhythm, process grid, and CTA prominence.

- [ ] **Step 4: Update README**

```md
## Homepage slideshow

The homepage rotates through six project covers every five seconds. It supports keyboard, touch, arrow, and dot navigation, pauses during interaction, and disables autoplay for reduced-motion users.

## Contact details

Site-wide phone, WhatsApp, email, address, map, and social URLs are defined in `src/data/contact-details.ts`.
```

- [ ] **Step 5: Run all production gates**

```powershell
npm test
npm run typecheck
npm run lint
npm run verify:assets
npm run build
npm run test:e2e
```

Require exit code 0 from every command. Expected: all unit tests pass, TypeScript and ESLint are clean, 24 assets verify, Next.js generates all 17 static pages, and the full Playwright suite passes.

- [ ] **Step 6: Commit verification documentation**

```powershell
git add e2e/site.spec.ts e2e/responsive.spec.ts README.md
git commit -m "test: verify reference-led homepage"
```

- [ ] **Step 7: Review handoff state**

Run `git status --short` and `git log --oneline -10`. Expected: a clean tree with all redesign commits. Use `superpowers:verification-before-completion`, then `superpowers:finishing-a-development-branch`; push only after the user chooses the integration path.

