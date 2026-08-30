# Interior Pages Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the About, Portfolio, Services, and Contact Us pages into a shared minimalist editorial system without changing the homepage, global navigation, global footer, content, links, imagery, or behavior.

**Architecture:** Add one reusable server-rendered page-intro component, then compose each route from focused existing components using optional visual variants where homepage-shared components are involved. Keep route files declarative, preserve all data sources and interactive logic, and validate presentation through semantic component tests plus responsive Playwright coverage.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-30-interior-pages-editorial-redesign.md`

## Global Constraints

- Do not modify `src/app/page.tsx` or alter rendered homepage output.
- Do not change the navbar, footer, approved copy, imagery, links, project order, form behavior, or project detail pages.
- Do not add dependencies or animation libraries.
- Preserve exactly one visible `h1` on each interior page.
- Preserve accessibility semantics, focus behavior, form status announcements, and reduced-motion behavior.
- Support 360, 390, 430, 768, 1024, 1280, and 1440 pixel widths without horizontal overflow.

---

### Task 1: Shared Interior Page Introduction

**Files:**
- Create: `src/components/shared/interior-page-intro.tsx`
- Modify: `tests/content-pages.test.tsx`

**Interfaces:**
- Consumes: React nodes and route-level copy.
- Produces: `InteriorPageIntro({ eyebrow, title, description, titleAccent? }: { eyebrow: string; title: string; description: string; titleAccent?: string })`.

- [ ] **Step 1: Write the failing semantic intro tests**

Add a test fixture to `tests/content-pages.test.tsx`:

```tsx
import { InteriorPageIntro } from "@/components/shared/interior-page-intro";

it("renders the shared editorial page introduction", () => {
  render(
    <InteriorPageIntro
      eyebrow="About Abound"
      title="Design is more"
      titleAccent="than looking good."
      description="A concise supporting statement."
    />,
  );
  expect(screen.getByRole("heading", { level: 1, name: /design is more than looking good/i })).toBeInTheDocument();
  expect(screen.getByText("About Abound")).toHaveClass("text-brand-red");
  expect(screen.getByText("A concise supporting statement.")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- tests/content-pages.test.tsx`

Expected: FAIL because `@/components/shared/interior-page-intro` does not exist.

- [ ] **Step 3: Implement the reusable intro**

Create a server component with this structure:

```tsx
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
          {title}{titleAccent ? <><br /><span className="text-brand-red">{titleAccent}</span></> : null}
        </h1>
      </div>
      <p className="max-w-md text-lg leading-7 md:col-span-4 md:justify-self-end">{description}</p>
    </div>
  </header>;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- tests/content-pages.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the shared component**

```bash
git add src/components/shared/interior-page-intro.tsx tests/content-pages.test.tsx
git commit -m "feat: add editorial interior page intro"
```

---

### Task 2: About Page Editorial Composition

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/components/about/about-intro.tsx`
- Modify: `src/components/home/process.tsx`
- Modify: `src/components/home/why-abound.tsx`
- Modify: `tests/content-pages.test.tsx`
- Test: `tests/home.test.tsx`

**Interfaces:**
- Consumes: `InteriorPageIntro`, existing About copy/images, `ArrowLink`.
- Produces: `Process({ variant?: "default" | "interior" })` and `WhyAbound({ variant?: "default" | "interior" })`; omitted variants must preserve existing homepage markup and appearance.

- [ ] **Step 1: Write failing About structure and homepage-regression tests**

Add assertions that the About page uses the shared intro, preserves the logo/philosophy/images/process/Why Abound/CTA, and that the homepage still renders `From idea to impact`, `Why Abound?`, and `Abound With Creative Idea` once each where currently expected.

```tsx
it("composes the About page with the shared editorial system", () => {
  render(<AboutPage />);
  expect(screen.getByRole("heading", { level: 1, name: /design is more than looking good/i })).toBeInTheDocument();
  expect(screen.getByAltText("Editorial identity and catalogue composition")).toBeInTheDocument();
  expect(screen.getByAltText("Typographic campaign poster composition")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "From idea to impact" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Why Abound?" })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run About and homepage tests and verify RED**

Run: `npm test -- tests/content-pages.test.tsx tests/home.test.tsx`

Expected: FAIL because the About route does not yet use the shared intro and variants.

- [ ] **Step 3: Implement visual variants without changing defaults**

Add optional `variant` props. Use the current class names unchanged for `default`. For `interior`, use white backgrounds, lighter heading weights, twelve-column layouts, and `border-black/20` rules. Do not change arrays, text, or element semantics.

- [ ] **Step 4: Recompose the About route**

Replace the current route header with `InteriorPageIntro`, keep the existing copy verbatim, use `AboutIntro`, retain the two-image band, call `<Process variant="interior" />` and `<WhyAbound variant="interior" />`, and retain the existing final CTA copy/link.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `npm test -- tests/content-pages.test.tsx tests/home.test.tsx`

Expected: PASS with homepage regression assertions unchanged.

- [ ] **Step 6: Commit the About redesign**

```bash
git add src/app/about/page.tsx src/components/about/about-intro.tsx src/components/home/process.tsx src/components/home/why-abound.tsx tests/content-pages.test.tsx tests/home.test.tsx
git commit -m "feat: redesign about page editorial layout"
```

---

### Task 3: Portfolio Grid Redesign

**Files:**
- Modify: `src/app/work/page.tsx`
- Modify: `src/components/work/project-grid.tsx`
- Modify: `src/components/work/project-card.tsx`
- Modify: `tests/work-routes.test.tsx`

**Interfaces:**
- Consumes: existing `projects: Project[]`, project cover images, and project routes.
- Produces: a consistent single-column/mobile and two-column/desktop `ProjectGrid`; `ProjectCard` retains `{ project: Project; index: number }`.

- [ ] **Step 1: Write failing Portfolio layout-preservation tests**

```tsx
it("renders the editorial portfolio index without changing project data", () => {
  const { container } = render(<WorkPage />);
  expect(screen.getByRole("heading", { level: 1, name: "Portfolio" })).toBeInTheDocument();
  expect(container.querySelector(".project-grid")).toHaveClass("lg:grid-cols-2");
  expect(screen.getAllByRole("article")).toHaveLength(projects.length);
  for (const project of projects) {
    expect(screen.getByRole("link", { name: new RegExp(project.title) })).toHaveAttribute("href", `/work/${project.slug}`);
  }
});
```

- [ ] **Step 2: Run the Portfolio test and verify RED**

Run: `npm test -- tests/work-routes.test.tsx`

Expected: FAIL because the current heading is `WORK` and the grid is irregular.

- [ ] **Step 3: Implement the disciplined grid**

Use `InteriorPageIntro` in `src/app/work/page.tsx` with the existing eyebrow/description. Change `ProjectGrid` to `grid gap-x-[3vw] gap-y-16 lg:grid-cols-2 lg:gap-y-24`. Remove project-specific aspect ratios from `ProjectCard`; use a consistent `aspect-[4/3]`, preserve metadata, numbering, year, category, link, alt text, and subtle hover scale.

- [ ] **Step 4: Run the Portfolio test and verify GREEN**

Run: `npm test -- tests/work-routes.test.tsx`

Expected: PASS, including static params and case-study tests.

- [ ] **Step 5: Commit the Portfolio redesign**

```bash
git add src/app/work/page.tsx src/components/work/project-grid.tsx src/components/work/project-card.tsx tests/work-routes.test.tsx
git commit -m "feat: redesign portfolio index grid"
```

---

### Task 4: Services Editorial Rows

**Files:**
- Modify: `src/app/services/page.tsx`
- Modify: `tests/content-pages.test.tsx`

**Interfaces:**
- Consumes: unchanged `services` data and `ArrowLink`.
- Produces: six semantic service articles in data order, with alternating desktop layout and stable mobile order.

- [ ] **Step 1: Write failing Services composition tests**

```tsx
it("renders six clean editorial service rows in approved order", () => {
  const { container } = render(<ServicesPage />);
  expect(screen.getByRole("heading", { level: 1, name: /built around your brand/i })).toBeInTheDocument();
  expect(container.querySelectorAll("[data-service-row]")).toHaveLength(6);
  expect(screen.getAllByRole("heading", { level: 2 }).slice(0, 6).map((heading) => heading.textContent)).toEqual([
    "Branding", "Uniform Design", "Marketing", "Graphic Design", "Photography", "Videography",
  ]);
  expect(screen.getByRole("link", { name: /start a project/i })).toHaveAttribute("href", "/contact");
});
```

- [ ] **Step 2: Run the Services test and verify RED**

Run: `npm test -- tests/content-pages.test.tsx`

Expected: FAIL because service rows lack `data-service-row` and the route does not use the shared intro.

- [ ] **Step 3: Recompose Services page**

Use `InteriorPageIntro` with existing copy. Render each service as a `data-service-row` twelve-column article with thin divider, number, reduced-scale heading, unchanged description/detail, and image. At `lg` widths, use `order` classes derived from index parity to alternate columns; on mobile, keep text before image. Remove all translation offsets. Preserve the final red CTA content and link with calmer heading size.

- [ ] **Step 4: Run the Services test and verify GREEN**

Run: `npm test -- tests/content-pages.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the Services redesign**

```bash
git add src/app/services/page.tsx tests/content-pages.test.tsx
git commit -m "feat: redesign services editorial rows"
```

---

### Task 5: Contact Page and Form Presentation

**Files:**
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/contact/contact-form.tsx`
- Modify: `tests/content-pages.test.tsx`
- Modify: `tests/contact-form.test.tsx`

**Interfaces:**
- Consumes: unchanged `contactDetails`, `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, contact state helpers, and form field data.
- Produces: `ContactForm({ endpoint, variant?: "default" | "editorial" }: { endpoint: string; variant?: "default" | "editorial" })`; behavioral default remains unchanged.

- [ ] **Step 1: Write failing contact-layout tests**

```tsx
it("presents approved contact methods beside the editorial form", () => {
  const { container } = render(<ContactPage />);
  expect(screen.getByRole("heading", { level: 1, name: /let's talk/i })).toBeInTheDocument();
  expect(container.querySelector("[data-contact-layout]")).toHaveClass("xl:grid-cols-12");
  expect(container.querySelector("[data-contact-form-panel]")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "019-660 9102" })).toHaveAttribute("href", "tel:+60196609102");
  expect(screen.getByRole("link", { name: "013-776 6128" })).toHaveAttribute("href", "tel:+60137766128");
});
```

Extend `tests/contact-form.test.tsx` to render `variant="editorial"` and assert all seven fields/options, the disabled state with no endpoint, and the existing status message remain present.

- [ ] **Step 2: Run contact tests and verify RED**

Run: `npm test -- tests/content-pages.test.tsx tests/contact-form.test.tsx`

Expected: FAIL because editorial markers and variant do not exist.

- [ ] **Step 3: Add the presentation-only form variant**

Accept `variant`, add `data-contact-form-panel` and square bordered panel spacing only for `editorial`, and leave state, validation, service options, form field names, endpoint handling, status text, and submission logic unchanged.

- [ ] **Step 4: Recompose Contact page**

Use `InteriorPageIntro` above a `data-contact-layout` twelve-column section. Place unchanged contact methods in ruled groups on the left and `<ContactForm variant="editorial" ... />` on the right. Preserve every href, external target/rel attribute, and visible string.

- [ ] **Step 5: Run contact tests and verify GREEN**

Run: `npm test -- tests/content-pages.test.tsx tests/contact-form.test.tsx tests/contact.test.ts tests/contact-details.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit the Contact redesign**

```bash
git add src/app/contact/page.tsx src/components/contact/contact-form.tsx tests/content-pages.test.tsx tests/contact-form.test.tsx
git commit -m "feat: redesign contact page editorial layout"
```

---

### Task 6: Responsive and End-to-End Verification

**Files:**
- Modify: `e2e/responsive.spec.ts`
- Modify: `e2e/site.spec.ts` only if semantic selectors need coverage additions; do not weaken existing assertions.

**Interfaces:**
- Consumes: completed route implementations.
- Produces: browser coverage for all four redesigned pages at mobile and desktop widths.

- [ ] **Step 1: Write failing responsive coverage**

Add a route-and-width matrix:

```ts
const interiorRoutes = ["/about", "/work", "/services", "/contact"];
const interiorWidths = [1440, 768, 390];

for (const route of interiorRoutes) {
  for (const width of interiorWidths) {
    test(`${route} editorial layout fits ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    });
  }
}
```

- [ ] **Step 2: Run responsive tests and verify coverage executes**

Run: `npx playwright test e2e/responsive.spec.ts`

Expected before final visual cleanup: any overflow or semantic failure identifies the route requiring correction. If all assertions pass immediately, confirm the new matrix appears in output and proceed; the new coverage itself is the deliverable.

- [ ] **Step 3: Fix only failures exposed by browser coverage**

Adjust responsive classes in the relevant interior component. Do not edit homepage components' default variants, navbar, or footer.

- [ ] **Step 4: Run the full verification gate**

Run each command and require exit code 0:

```bash
npm test
npm run typecheck
npm run lint
npm run verify:assets
npm run build
npm run test:e2e
git diff --check
```

- [ ] **Step 5: Perform visual browser review**

Start `npm run dev`, then inspect `/about`, `/work`, `/services`, and `/contact` at 1440 and 390 pixels. Confirm one `h1`, no error overlay, no console errors, no broken images, no horizontal overflow, consistent intro alignment, readable type scale, and unchanged global header/footer. Also load `/` once and compare its key structure to the homepage regression assertions.

- [ ] **Step 6: Run React best-practices review**

Review all edited TSX files for inline component definitions, unstable state/effect patterns, unnecessary client boundaries, expensive imports, accessibility regressions, and avoidable re-renders. Correct issues and rerun the affected focused tests.

- [ ] **Step 7: Commit verification coverage and any final responsive corrections**

```bash
git add e2e/responsive.spec.ts e2e/site.spec.ts src tests
git commit -m "test: verify interior page redesign"
```

- [ ] **Step 8: Confirm repository state**

Run: `git status --short --branch`

Expected: clean working tree on `main`, ahead of `origin/main` by the redesign commits until the user authorizes pushing.
