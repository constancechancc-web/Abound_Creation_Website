# Interior Pages Editorial Redesign

## Objective

Redesign the About, Portfolio, Services, and Contact Us pages so they feel like direct extensions of the existing homepage: minimalist, clean, editorial, and brand-led. The homepage, global navbar, global footer, approved copy, imagery, links, and functional behavior remain unchanged.

## Design Direction

Use a shared editorial grid across all four pages. The system inherits the homepage's white canvas, Abound red accent, black typography, generous whitespace, thin rules, compact uppercase labels, responsive twelve-column layout, and restrained image treatments. Large headings remain expressive but are reduced from the current extreme scale so content hierarchy feels calm and consistent with the homepage.

The redesign avoids decorative UI, cards with rounded corners, gradients outside the existing global footer, and unnecessary animation. Hover behavior is limited to color changes and subtle image scaling already used by the site.

## Shared Interior-Page System

- A reusable page-intro pattern provides an eyebrow label, one concise headline, and supporting copy in a balanced grid.
- Section widths and horizontal padding match the homepage: `px-5` on small screens and approximately `5vw` on medium and larger screens.
- Section spacing uses a consistent vertical rhythm between 80 and 144 pixels depending on viewport size.
- Content groups use one-pixel black or translucent-black dividers instead of boxes.
- Red is reserved for labels, selected words, numbering, calls to action, and active interaction states.
- All page headings preserve one semantic `h1`; section titles maintain a logical heading hierarchy.
- Mobile layouts collapse to a single column without horizontal overflow, while tablet and desktop layouts use the existing twelve-column grid.

## About Page

Preserve the existing About copy, logo, two editorial images, process content, Why Abound content, and Start a Project link.

- Replace the oversized opening statement with a calmer two-column intro: label and headline on the left, a short supporting statement aligned on the right.
- Present the horizontal Abound logo and studio philosophy as a clean identity block with a thin top rule.
- Keep both editorial images, arranged as a restrained two-column image band with consistent aspect ratios and no new copy.
- Restyle the existing process and Why Abound sections to use the shared grid, lighter typography, and homepage-style dividers.
- End with the existing Start a Project message and CTA on a spacious white section with one red emphasis line.

## Portfolio Page

Preserve all six projects, their order, titles, categories, years, cover images, and project routes.

- Use a compact page intro with `Portfolio` as the primary heading and the existing supporting description.
- Convert the current irregular masonry-like card sizing into a disciplined two-column editorial grid on desktop and one column on mobile.
- Give every cover a consistent 4:3 frame so the artwork, not layout variation, carries the visual interest.
- Keep project metadata beneath each image with thin rules, restrained numbering, and a subtle image scale on hover.
- Do not change individual project detail pages in this scope.

## Services Page

Preserve all six services, their order, descriptions, details, and images, plus the existing final CTA and link.

- Use a compact page intro matching the About and Portfolio pages.
- Present services as numbered editorial rows with text and imagery in a stable split grid.
- Alternate image placement only at desktop widths to create rhythm without sacrificing consistency; mobile remains text followed by image.
- Remove vertical translation offsets and reduce oversized service titles.
- Restyle the final red CTA block to use the homepage's restrained typography and spacing while retaining its existing content.

## Contact Us Page

Preserve every approved email, phone number, WhatsApp link, address, social link, form field, service option, validation rule, submission state, and Formspree configuration behavior.

- Use a compact intro above the content rather than an oversized `LET'S TALK` lockup.
- Build a balanced two-column layout: contact information on the left and the existing form on the right.
- Separate email, phone, WhatsApp, location, and social groups with thin dividers and consistent uppercase labels.
- Place the form in a bordered editorial panel with square corners, generous internal spacing, and the same underline inputs.
- Preserve all accessibility states, status messaging, disabled behavior, and keyboard interaction.

## Component Boundaries

- Create a focused shared `InteriorPageIntro` component for the repeated page heading structure.
- Update `AboutIntro`, `Process`, and `WhyAbound` only where needed to support the About layout without changing homepage-rendered components. Because `Process` is also used by the homepage, introduce style variants rather than changing its default homepage appearance.
- Update `ProjectGrid` and `ProjectCard` for the Portfolio index while ensuring project detail routes remain untouched.
- Update `ContactForm` through an optional presentation variant so its existing behavior and tests remain intact.
- Keep the four route files responsible only for page composition and metadata.

## Functional and Accessibility Requirements

- The homepage output must remain unchanged.
- Global navbar and footer output must remain unchanged.
- Each redesigned page must contain exactly one visible `h1`.
- Existing destinations, telephone links, email links, external-link attributes, project routes, form state, and validation behavior must be preserved.
- Focus indicators, semantic regions, form labels, status announcements, and minimum interactive target sizes must remain accessible.
- The layout must not overflow at 360, 390, 430, 768, 1024, 1280, or 1440 pixel widths.
- Respect existing reduced-motion behavior and avoid adding autoplay or nonessential motion.

## Verification

- Add regression tests for the shared intro structure, preserved content, all six portfolio cards, all six service sections, contact methods, and form behavior.
- Add a homepage regression assertion confirming its composition and key headings remain unchanged.
- Run the full Vitest suite, TypeScript check, ESLint, asset verification, production build, and Playwright suite.
- Extend responsive browser tests to cover all four redesigned routes at representative desktop and mobile widths.
- Perform a visual browser review of each page and confirm there are no console errors, broken images, error overlays, or horizontal overflow.

## Out of Scope

- Homepage changes of any kind.
- Navbar or footer redesign.
- New copy, new imagery, new services, new projects, or altered project order.
- Project detail-page redesign.
- Form backend or environment-variable changes.
- New dependencies or animation libraries.
