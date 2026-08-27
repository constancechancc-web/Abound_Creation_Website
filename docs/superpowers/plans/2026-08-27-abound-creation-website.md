# Abound Creation Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a production-ready, multi-page Abound Creation agency website with an art-directed portfolio, original visual assets, accessible interactions, Formspree contact handling, and Railway deployment support.

**Architecture:** Use the Next.js App Router with statically generated marketing and case-study routes. Keep portfolio content in one typed data module, compose pages from focused server and client components, and use Tailwind CSS plus a small global stylesheet for brand tokens and motion. All imagery is local and optimized; the only external runtime integration is a configurable Formspree endpoint.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright, Sharp, Formspree, Railway

**Spec:** `docs/superpowers/specs/2026-08-27-abound-creation-website-design.md`

## Global Constraints

- Use `"Helvetica Neue", Helvetica, Arial, sans-serif` throughout; do not load Inter, Montserrat, Poppins, or another substitute.
- Use `#FFFFFF` for the main background, `#0A0A0A` for primary text, and exactly `#EC1D25` for the interface brand red.
- Preserve the exact tagline wording: `Abound with creative idea.`
- Use the supplied official logo source at `C:/Users/fenfe/Downloads/Abound Creation Logo.jpg`; retain the original and create optimized derivatives in `public/brand/`.
- Use the supplied Facebook and Instagram URLs exactly; do not invent email, phone, WhatsApp, or location details.
- All six portfolio projects and their visuals must be local, original, fictional, and easy to replace through `src/data/projects.ts`.
- Avoid a CMS, database, large animation framework, generic card grid, glassmorphism, excessive rounding, gradients as decoration, and autoplay audio.
- Respect `prefers-reduced-motion` and keep essential information available without hover.
- Support 1440, 1280, 1024, 768, 430, 390, 375, and 360px without horizontal scrolling.
- The production app must run as a stateless Node service on Railway.

---

## Planned File Map

```text
src/
  app/
    about/page.tsx
    contact/page.tsx
    services/page.tsx
    work/[slug]/page.tsx
    work/page.tsx
    error.tsx
    globals.css
    icon.svg
    layout.tsx
    not-found.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    about/about-intro.tsx
    contact/contact-form.tsx
    home/brand-statement.tsx
    home/creative-statement.tsx
    home/hero.tsx
    home/home-about.tsx
    home/process.tsx
    home/services-preview.tsx
    home/why-abound.tsx
    layout/footer.tsx
    layout/mobile-menu.tsx
    layout/navbar.tsx
    shared/arrow-link.tsx
    shared/reveal.tsx
    work/project-card.tsx
    work/project-gallery.tsx
    work/project-grid.tsx
    work/related-work.tsx
  data/projects.ts
  data/services.ts
  lib/contact.ts
  lib/projects.ts
  types/project.ts
tests/
  contact.test.ts
  navigation.test.tsx
  projects.test.ts
  seo.test.ts
  setup.ts
e2e/
  accessibility.spec.ts
  contact.spec.ts
  navigation.spec.ts
  responsive.spec.ts
public/
  brand/
  images/projects/<slug>/
  social-card.svg
```

Each component file owns one visible section or reusable interaction. `projects.ts` is the only portfolio-content source, `services.ts` is the only service-content source, and `contact.ts` owns validation and submission-state rules.

---

### Task 1: Scaffold the Application and Test Harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Create: `.env.example`
- Create: `.nvmrc`

**Interfaces:**
- Produces: Next.js application scripts `dev`, `build`, `start`, `lint`, `typecheck`, `test`, and `test:e2e`; test environment using `jsdom`; root layout metadata shell.

- [ ] **Step 1: Create the Next.js TypeScript project and install the test tools**

Run:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react vite-tsconfig-paths @playwright/test
```

Expected: the app scaffold exists and `npm install` completes without audit-level build errors.

- [ ] **Step 2: Add explicit quality scripts and supported Node version**

Update `package.json` scripts to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "engines": { "node": ">=22 <25" }
}
```

Write `22` to `.nvmrc` and `NEXT_PUBLIC_FORMSPREE_ENDPOINT=` to `.env.example`.

- [ ] **Step 3: Configure Vitest and write the initial render test**

Create `vitest.config.ts` with the React plugin, `vite-tsconfig-paths`, `jsdom`, and `tests/setup.ts`. In `tests/setup.ts`, import `@testing-library/jest-dom/vitest`.

Create `tests/navigation.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("renders the exact Abound tagline", () => {
  render(<Home />);
  expect(screen.getByText(/Abound with creative idea\./i)).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the test to confirm it fails before the branded homepage exists**

Run: `npm test -- tests/navigation.test.tsx`

Expected: FAIL because the scaffold page does not contain the exact tagline.

- [ ] **Step 5: Add the minimal root layout, global tokens, and placeholder homepage**

Define metadata in `src/app/layout.tsx`, import `globals.css`, and render children in a semantic body. In `globals.css`, declare the six approved color variables, Helvetica stack, `box-sizing`, responsive image defaults, visible focus treatment, and reduced-motion override. Replace `src/app/page.tsx` with a server component containing the exact tagline so the test passes.

- [ ] **Step 6: Verify scaffold quality**

Run:

```bash
npm test -- tests/navigation.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: all four commands succeed.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts playwright.config.ts tests/setup.ts tests/navigation.test.tsx src/app .env.example .nvmrc
git commit -m "chore: scaffold Abound Creation Next.js application"
```

---

### Task 2: Define Portfolio and Services Content Models

**Files:**
- Create: `src/types/project.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/services.ts`
- Create: `src/lib/projects.ts`
- Create: `tests/projects.test.ts`

**Interfaces:**
- Produces: `Project`, `GalleryItem`, `VideoAsset`, and `Service` types; `projects: Project[]`; `services: Service[]`; `getProjectBySlug(slug: string): Project | undefined`; `getRelatedProjects(slug: string, limit?: number): Project[]`.

- [ ] **Step 1: Write failing data-contract tests**

Create `tests/projects.test.ts`:

```ts
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";

it("defines six unique complete projects", () => {
  expect(projects).toHaveLength(6);
  expect(new Set(projects.map((project) => project.slug)).size).toBe(6);
  for (const project of projects) {
    expect(project.title).toBeTruthy();
    expect(project.gallery.length).toBeGreaterThanOrEqual(4);
    expect(project.coverImage.startsWith("/images/projects/")).toBe(true);
  }
});

it("defines the six approved services in order", () => {
  expect(services.map((service) => service.title)).toEqual([
    "Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography",
  ]);
});

it("looks up projects and excludes the current project from related work", () => {
  const first = projects[0];
  expect(getProjectBySlug(first.slug)).toEqual(first);
  expect(getRelatedProjects(first.slug, 2)).toHaveLength(2);
  expect(getRelatedProjects(first.slug, 2).some((project) => project.slug === first.slug)).toBe(false);
});
```

- [ ] **Step 2: Run the tests to verify the modules do not exist**

Run: `npm test -- tests/projects.test.ts`

Expected: FAIL with unresolved imports.

- [ ] **Step 3: Define exact content interfaces**

In `src/types/project.ts`, define `GalleryItem` with `src`, `alt`, `width`, `height`, and optional `caption`; `VideoAsset` with `mp4`, optional `webm`, and `poster`; and `Project` with every field from the design spec plus `overview`, `challenge`, `approach`, `creativeDirection`, `designSystem`, `applications`, and `outcome`.

- [ ] **Step 4: Add six complete fictional projects and six services**

Use these project slugs and disciplines:

```ts
export const projectSlugs = [
  "northline-objects",
  "sela-dining",
  "meridian-holdings",
  "fieldwork-uniforms",
  "after-hours-campaign",
  "forma-product-study",
] as const;
```

Write concise, distinct case-study copy for each project. Use local asset paths under its matching slug folder, mark four projects featured, and give every gallery item useful alt text.

- [ ] **Step 5: Implement lookup helpers and verify**

Implement exact signatures:

```ts
export function getProjectBySlug(slug: string): Project | undefined;
export function getRelatedProjects(slug: string, limit = 2): Project[];
```

Run: `npm test -- tests/projects.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/types/project.ts src/data/projects.ts src/data/services.ts src/lib/projects.ts tests/projects.test.ts
git commit -m "feat: add portfolio and services content models"
```

---

### Task 3: Prepare the Official Logo and Original Project Visuals

**Files:**
- Create: `public/brand/abound-logo-original.jpg`
- Create: `public/brand/abound-logo.webp`
- Create: `public/brand/abound-symbol.png`
- Create: `src/app/icon.svg`
- Create: `public/images/projects/<slug>/*`
- Create: `public/social-card.svg`
- Create: `scripts/verify-assets.mjs`

**Interfaces:**
- Consumes: image paths defined in `src/data/projects.ts`.
- Produces: every public asset referenced by portfolio data, a compact transparent brand symbol, a tightly cropped full logo, favicon, and default social card.

- [ ] **Step 1: Add an asset-integrity script before creating assets**

Create `scripts/verify-assets.mjs` that imports or parses the portfolio data’s static asset paths, checks each path beneath `public/`, verifies nonzero file size, and exits nonzero with a list of missing files. Add `"verify:assets": "node scripts/verify-assets.mjs"` to `package.json`.

- [ ] **Step 2: Run the asset check and confirm it fails**

Run: `npm run verify:assets`

Expected: FAIL and list all missing cover/gallery assets.

- [ ] **Step 3: Preserve and optimize the official logo**

Copy the supplied JPG unchanged to `public/brand/abound-logo-original.jpg`. Use the image-generation/editing workflow to create a tightly cropped full-logo WebP and a transparent-background red symbol PNG without redesigning its geometry. Create `src/app/icon.svg` as a clean vector approximation of the supplied red symbol for browser favicon use.

- [ ] **Step 4: Generate each project’s art-directed visual set**

Use the image-generation workflow to create at least one photographic or tactile hero asset per project, then complement it with lightweight original SVG compositions for identity systems, packaging, uniforms, campaigns, and typographic details. Each folder must contain the exact cover and gallery filenames declared in `projects.ts`. Avoid readable third-party trademarks, real company identities, random stock photography, and baked-in body copy.

- [ ] **Step 5: Create the Open Graph card and verify all assets**

Create `public/social-card.svg` with the official symbol, `ABOUND CREATION`, and `ABOUND WITH CREATIVE IDEA.` on a disciplined white/red/black composition.

Run:

```bash
npm run verify:assets
npm run build
```

Expected: both commands pass with no missing-image warnings.

- [ ] **Step 6: Visually inspect representative outputs**

Inspect the full logo, symbol, social card, and at least one cover from every project. Confirm tight crops, consistent rendering, no accidental text artifacts, and sufficiently distinct project identities.

- [ ] **Step 7: Commit**

```bash
git add public src/app/icon.svg scripts/verify-assets.mjs package.json package-lock.json
git commit -m "feat: add Abound brand and portfolio visual assets"
```

---

### Task 4: Build the Global Shell and Accessible Navigation

**Files:**
- Create: `src/components/layout/navbar.tsx`
- Create: `src/components/layout/mobile-menu.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/components/shared/arrow-link.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/navigation.test.tsx`

**Interfaces:**
- Produces: `Navbar`, `MobileMenu`, `Footer`, and `ArrowLink` components used by every route.

- [ ] **Step 1: Expand navigation tests before implementation**

Test that desktop links point to `/work`, `/services`, `/about`, and `/contact`; the mobile menu button exposes `aria-expanded`; Escape closes the menu; Facebook and Instagram links use supplied URLs plus `target="_blank"` and `rel="noreferrer"`; and the footer includes the exact tagline.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/navigation.test.tsx`

Expected: FAIL because shell components are absent.

- [ ] **Step 3: Implement the shell components**

Use `next/link` and `next/image`. Keep `Navbar` sticky with white background and a subtle scroll border. Make only `MobileMenu` a client component. On open, lock body scrolling, move focus to the first menu link, close on Escape, and restore focus to the trigger.

- [ ] **Step 4: Integrate the shell and global interaction rules**

Render `Navbar`, `<main id="main-content">`, and `Footer` from `layout.tsx`. Add a skip link, focus-visible rules, square editorial button styles, selection colors, responsive containers, and reduced-motion behavior to `globals.css`.

- [ ] **Step 5: Verify navigation**

Run:

```bash
npm test -- tests/navigation.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout src/components/shared/arrow-link.tsx src/app/layout.tsx src/app/globals.css tests/navigation.test.tsx
git commit -m "feat: add accessible site navigation and footer"
```

---

### Task 5: Build the Homepage Editorial Experience

**Files:**
- Create: `src/components/shared/reveal.tsx`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/brand-statement.tsx`
- Create: `src/components/home/creative-statement.tsx`
- Create: `src/components/home/home-about.tsx`
- Create: `src/components/home/process.tsx`
- Create: `src/components/home/services-preview.tsx`
- Create: `src/components/home/why-abound.tsx`
- Create: `src/components/work/project-card.tsx`
- Create: `src/components/work/project-grid.tsx`
- Modify: `src/app/page.tsx`
- Create: `tests/home.test.tsx`

**Interfaces:**
- Consumes: `projects`, `services`, `Project`, and shared links.
- Produces: complete homepage and reusable `ProjectCard`/`ProjectGrid` components.

- [ ] **Step 1: Write failing homepage-content and semantics tests**

Test for one `<h1>`, the exact hero supporting copy, both hero CTAs, `SELECTED WORK`, all six services, `ABOUT ABOUND`, all four process steps, all four Why Abound principles, the exact creative statement, and the closing CTA.

- [ ] **Step 2: Run the homepage tests to verify failure**

Run: `npm test -- tests/home.test.tsx`

Expected: FAIL with missing sections.

- [ ] **Step 3: Implement hero, brand statement, and reveal behavior**

Use the exact approved copy and explicit line-break spans for composition. `Reveal` uses Intersection Observer only when motion is allowed; content is visible by default when JavaScript is disabled. Apply the approved easing and keep initial motion under one second.

- [ ] **Step 4: Implement the asymmetric project grid**

Map project index to named layout variants (`hero`, `portrait`, `landscape`, `wide`, `pair`, `closing`) rather than a uniform three-column grid. Keep project number, title, category, year, and link accessible without hover.

- [ ] **Step 5: Implement services, About, process, principles, red statement, and CTA**

Desktop services use a restrained image reveal; mobile uses native buttons with `aria-expanded` and persistent descriptions when expanded. Use large red process numbers with dividers and avoid numbered circles or rounded cards.

- [ ] **Step 6: Verify homepage behavior and quality**

Run:

```bash
npm test -- tests/home.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/home src/components/work src/components/shared/reveal.tsx src/app/page.tsx tests/home.test.tsx
git commit -m "feat: build Swiss Impact homepage"
```

---

### Task 6: Build the Work Index and Dynamic Case Studies

**Files:**
- Create: `src/app/work/page.tsx`
- Create: `src/app/work/[slug]/page.tsx`
- Create: `src/components/work/project-gallery.tsx`
- Create: `src/components/work/related-work.tsx`
- Create: `src/app/not-found.tsx`
- Create: `tests/work-routes.test.tsx`

**Interfaces:**
- Consumes: `projects`, `getProjectBySlug`, `getRelatedProjects`, `ProjectGrid`.
- Produces: static route params from `generateStaticParams(): { slug: string }[]` and route metadata from `generateMetadata()`.

- [ ] **Step 1: Write failing route-contract tests**

Test that `generateStaticParams()` returns every project slug; each project page includes client, year, services, overview, challenge, approach, creative direction, design system, applications, outcome, gallery alt text, related work, and CTA; and unknown slugs call the not-found path.

- [ ] **Step 2: Run the route tests to verify failure**

Run: `npm test -- tests/work-routes.test.tsx`

Expected: FAIL because routes do not exist.

- [ ] **Step 3: Implement the Work index**

Use a large `WORK` introduction, compact explanatory copy, and the complete asymmetric project grid. Include metadata text and descriptive links for every project.

- [ ] **Step 4: Implement the dynamic case-study route**

Resolve the awaited App Router `params`, call `notFound()` for missing data, and statically generate all known slugs. Compose sections with large media, narrow text measures, captions, offset media, and a muted/looping/playsInline video only when a project includes video metadata.

- [ ] **Step 5: Implement related work and 404 experience**

Render two noncurrent projects and a large return-to-work CTA. The 404 page uses Abound typography and links to Home and Work.

- [ ] **Step 6: Verify routes**

Run:

```bash
npm test -- tests/work-routes.test.tsx
npm run typecheck
npm run build
```

Expected: PASS and the build output lists all six static project routes.

- [ ] **Step 7: Commit**

```bash
git add src/app/work src/app/not-found.tsx src/components/work tests/work-routes.test.tsx
git commit -m "feat: add work index and project case studies"
```

---

### Task 7: Build Services and About Pages

**Files:**
- Create: `src/app/services/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/components/about/about-intro.tsx`
- Create: `tests/content-pages.test.tsx`

**Interfaces:**
- Consumes: `services`, `Process`, `WhyAbound`, `ArrowLink`, and official brand assets.
- Produces: complete `/services` and `/about` routes with route-specific metadata.

- [ ] **Step 1: Write failing supporting-page tests**

Test that Services contains the six exact service titles and approved descriptions; About contains the two approved belief paragraphs, official logo alt text, process steps, and a Contact CTA; and each page has a single visible `<h1>`.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/content-pages.test.tsx`

Expected: FAIL because routes do not exist.

- [ ] **Step 3: Implement the Services page**

Expand the editorial list with alternating supporting media, capability details, and a closing project CTA. Reuse data and interaction patterns; do not copy homepage markup wholesale.

- [ ] **Step 4: Implement the About page**

Use the full official logo, approved belief copy, original studio-like visuals, the process/principle system, and a strong Contact CTA. Do not invent staff names, awards, client counts, or dates.

- [ ] **Step 5: Verify and commit**

Run:

```bash
npm test -- tests/content-pages.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

```bash
git add src/app/services src/app/about src/components/about tests/content-pages.test.tsx
git commit -m "feat: add services and about experiences"
```

---

### Task 8: Build the Validated Formspree Contact Flow

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/components/contact/contact-form.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `tests/contact.test.ts`
- Create: `tests/contact-form.test.tsx`

**Interfaces:**
- Produces: `ContactValues`, `ContactErrors`, `validateContact(values: ContactValues): ContactErrors`, `submitContact(endpoint: string, values: ContactValues): Promise<void>`, and `ContactForm`.

- [ ] **Step 1: Write failing validation and submission tests**

Cover required name, email, service, and project details; reject malformed email; allow optional company, phone, and budget; reject missing Formspree endpoint before calling `fetch`; send JSON with `Accept: application/json`; and surface non-2xx responses.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/contact.test.ts tests/contact-form.test.tsx`

Expected: FAIL with unresolved contact modules.

- [ ] **Step 3: Implement pure validation and submission helpers**

Use these exact fields:

```ts
export type ContactValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: "Branding" | "Uniform Design" | "Marketing" | "Graphic Design" | "Photography" | "Videography" | "Other" | "";
  budget: string;
  details: string;
};
```

Throw `new Error("Contact form is not configured.")` when the endpoint is blank and `new Error("Unable to send your inquiry. Please try again.")` for unsuccessful requests.

- [ ] **Step 4: Implement the accessible client form**

Use real labels, field-level error associations, `aria-invalid`, an `aria-live="polite"` status region, disabled sending state, success reset, and retryable error state. Render the full approved service option list.

- [ ] **Step 5: Implement the Contact page**

Pass `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? ""` into the client form. Show the supplied Facebook and Instagram links. Display labeled placeholders for email, WhatsApp, and location without fabricating values.

- [ ] **Step 6: Verify and commit**

Run:

```bash
npm test -- tests/contact.test.ts tests/contact-form.test.tsx
npm run typecheck
npm run lint
```

Expected: PASS.

```bash
git add src/lib/contact.ts src/components/contact src/app/contact tests/contact.test.ts tests/contact-form.test.tsx
git commit -m "feat: add accessible Formspree contact flow"
```

---

### Task 9: Add SEO, Error Handling, and Railway Configuration

**Files:**
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/error.tsx`
- Create: `tests/seo.test.ts`
- Create: `railway.json`
- Create: `README.md`
- Modify: `next.config.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/work/[slug]/page.tsx`

**Interfaces:**
- Produces: canonical metadata base from `NEXT_PUBLIC_SITE_URL`, sitemap entries for all static and project routes, robots rules, Railway build/start configuration, and recoverable route-level error UI.

- [ ] **Step 1: Write failing SEO-contract tests**

Test the exact default title and description, one sitemap entry per route/project, a permissive production robots rule with sitemap URL, project-specific metadata, and a social-card reference.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- tests/seo.test.ts`

Expected: FAIL because SEO modules are incomplete.

- [ ] **Step 3: Implement route metadata, sitemap, robots, and error UI**

Use `NEXT_PUBLIC_SITE_URL` with `http://localhost:3000` as the local fallback. Do not expose secret values. The client error page must provide a retry button and Home link.

- [ ] **Step 4: Add Railway deployment configuration**

Create `railway.json`:

```json
{
  "$schema": "https://railway.com/railway.schema.json",
  "build": { "builder": "NIXPACKS", "buildCommand": "npm run build" },
  "deploy": { "startCommand": "npm run start", "restartPolicyType": "ON_FAILURE", "restartPolicyMaxRetries": 3 }
}
```

Document local setup, scripts, asset replacement, required variables, Formspree setup, and Railway deployment in `README.md`.

- [ ] **Step 5: Verify production configuration**

Run:

```bash
npm test -- tests/seo.test.ts
npm run typecheck
npm run lint
npm run build
```

Expected: PASS with sitemap, robots, metadata, and all routes generated.

- [ ] **Step 6: Commit**

```bash
git add src/app tests/seo.test.ts railway.json README.md next.config.ts
git commit -m "feat: add SEO and Railway production configuration"
```

---

### Task 10: Complete End-to-End Responsive and Accessibility Verification

**Files:**
- Create: `e2e/navigation.spec.ts`
- Create: `e2e/contact.spec.ts`
- Create: `e2e/responsive.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Modify: `playwright.config.ts`
- Modify: affected source files found during verification

**Interfaces:**
- Consumes: complete production application.
- Produces: repeatable browser checks for critical flows, responsive overflow, keyboard behavior, and reduced motion.

- [ ] **Step 1: Configure Playwright and install Chromium**

Set `webServer.command` to `npm run dev`, `baseURL` to `http://127.0.0.1:3000`, and use desktop Chromium plus mobile profiles for 430, 390, 375, and 360px.

Run: `npx playwright install chromium`

Expected: Chromium installs successfully.

- [ ] **Step 2: Write critical navigation tests**

Test desktop navigation, mobile menu open/close/Escape/focus restoration, every main route, all six project links, footer social destinations, Back to Top, and custom 404 behavior.

- [ ] **Step 3: Write contact-state tests**

Test field validation, unconfigured endpoint messaging, a mocked successful Formspree submission, and a mocked server failure followed by retry.

- [ ] **Step 4: Write responsive and reduced-motion tests**

For every required width, assert `document.documentElement.scrollWidth <= window.innerWidth`, hero text remains visible, menu access exists, and project metadata is present. Emulate reduced motion and confirm reveal elements do not remain hidden or animated.

- [ ] **Step 5: Write keyboard and semantic checks**

Tab through skip link, navigation, service accordions, project links, and form. Assert one `<h1>` per page, named buttons/links, labeled form controls, and no missing image `alt` attributes.

- [ ] **Step 6: Run the full verification suite and fix root causes**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run verify:assets
npm run build
npm run test:e2e
```

Expected: every command exits 0 with no browser console errors or failed requests to local assets.

- [ ] **Step 7: Perform manual visual review**

Inspect Home, Work, one case study, Services, About, Contact, and 404 at 1440, 1024, 768, 430, and 360px. Confirm Swiss Impact art direction, white dominance, disciplined red usage, distinct section compositions, legible typography, tight logo crops, correct image focal points, and no generic card-grid appearance.

- [ ] **Step 8: Verify Railway-style production startup**

Run:

```bash
npm run build
npm run start
```

Expected: the production server starts on the provided `PORT`, serves `/`, `/work`, all project routes, and `/contact`, and returns no runtime error.

- [ ] **Step 9: Commit final verification fixes**

```bash
git add e2e playwright.config.ts src public tests README.md
git commit -m "test: verify responsive production experience"
```

---

## Completion Gate

Implementation is complete only after all Task 10 commands pass, the manual visual review covers the required viewports, the Railway-style production server starts successfully, and `git status --short` contains no unintended files. Push `main` only after reviewing the accumulated commits and confirming that `.env*` secrets remain ignored.
