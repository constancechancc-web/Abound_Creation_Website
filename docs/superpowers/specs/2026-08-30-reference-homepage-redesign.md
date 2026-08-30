# Abound Creation Reference-Led Homepage Redesign

**Date:** 2026-08-30  
**Status:** Approved in conversation; awaiting written-spec review

## Objective

Redesign the Abound Creation homepage to closely follow the supplied `ABOUND -WEBSITE DESIGN-01` reference while retaining the existing Next.js application, portfolio data, secondary pages, accessibility standards, and responsive behavior. Replace the large blank hero area shown in the supplied screenshot with an accessible photo slideshow using the six existing project visuals.

## Scope

### In scope

- Rebuild the homepage composition and header around the supplied reference.
- Add a project-image slideshow in the large hero area.
- Restyle the footer to match the new homepage direction.
- Update site-wide contact information and CTA destinations.
- Preserve and reuse existing portfolio/service data where appropriate.
- Maintain mobile, tablet, desktop, keyboard, reduced-motion, and screen-reader support.

### Out of scope

- Redesigning `/work`, individual project pages, `/services`, `/about`, or `/contact` beyond shared header/footer and contact-detail updates.
- Replacing the supplied logo artwork.
- Adding a CMS or admin interface.
- Generating new portfolio photography for this iteration.

## Information Architecture

The homepage will contain these sections in order:

1. Reference-style header
2. Large project slideshow hero
3. Welcome split section
4. What We Do accordion
5. Red brand-statement strip
6. From Idea to Impact process grid
7. Closing project CTA
8. Restyled footer

The current homepage-only selected-work grid, long about panel, Why Abound section, and duplicate creative statement will be removed from the homepage. Their subjects remain accessible on the existing portfolio, services, and about pages.

## Header

The header will use the complete Abound Creation logo lockup on white. Desktop navigation will read `About`, `Portfolio`, `Services`, and `Contact Us`, followed by a red pill-shaped `Let's Talk` CTA. Portfolio links to `/work`; the remaining labels use their existing routes. `Let's Talk` opens WhatsApp to the primary contact.

Mobile retains the existing accessible menu pattern: labelled toggle, focus transfer, Escape-to-close, body scroll lock, and at least 44px touch targets. Its labels and CTA will match desktop.

## Hero Slideshow

The large open area directly below the header becomes a slideshow using the six existing project cover visuals in portfolio order.

### Behavior

- Automatically advances every five seconds.
- Uses a restrained crossfade transition.
- Includes previous and next arrow buttons.
- Includes six position dots with the current position exposed accessibly.
- Pauses while hovered or while focus is inside the slideshow.
- Supports left/right arrow keys when focused.
- Supports horizontal touch swiping.
- Uses a polite live region for meaningful slide announcements without repeatedly interrupting assistive technology.
- Stops autoplay and removes nonessential animation when `prefers-reduced-motion: reduce` is active.
- Resumes predictably after manual interaction unless reduced motion is enabled.
- Uses `next/image`, stable aspect ratios, responsive `sizes`, and eager loading only for the initial slide.

The hero contains no large overlay headline, matching the reference's open visual treatment. Controls will be understated but maintain sufficient contrast and touch size.

## Welcome Split

A two-column section follows the slideshow:

- Left: vivid Abound red panel with `Welcome to ABOUND CREATION`, concise studio introduction, and `Explore More` link to `/about`.
- Right: one strong existing portfolio visual, selected to resemble the apparel-led reference while remaining an authentic Abound portfolio asset.

Desktop uses an even or slightly text-weighted split. Mobile stacks text first, image second.

## What We Do

The section follows the reference's editorial grid: heading and service rows on the left, supporting copy and visual panel on the right.

Five consolidated display categories will be used:

1. Branding
2. Apparel Design
3. Marketing
4. Graphic Design
5. Video & Photography

The underlying detailed service information remains available on `/services`. Each row is an accessible button with `aria-expanded`; selecting or hovering a row updates its description and visual. On mobile, the image and description appear within the expanded row so no information depends on hover.

## Brand Statement

A full-width Abound-red strip displays a reference-led `Abound With Creative Idea` statement using typography rather than modifying the official logo. The strip is decorative/editorial and does not introduce another heading level conflict.

## Process Section

`From idea to impact` becomes a compact six-step process grid based on the reference:

1. Consultation
2. Strategize
3. Schedule
4. Performance Review
5. Campaign Launch
6. Content Creation

Each step includes a short English explanation. The reference's extra multilingual filler text will not be reproduced because it is not supplied business content. Desktop uses three columns by two rows with fine rules and red markers; tablet uses two columns; narrow mobile uses one column.

## Closing CTA

The closing section reads `Let's Build Something Great Together`, uses a soft white-to-red gradient and outlined Abound-inspired geometry, and includes a primary `Start a Project` button.

Primary CTA behavior:

- Destination: `https://wa.me/60196609102`
- Prefilled message: `Hi Abound Creation, I'd like to discuss a project.`
- Opens in a new tab with safe `rel` attributes.
- Has an accessible name that identifies WhatsApp where context requires it.

## Contact Information

The following details become the canonical site-wide contact content:

- Primary WhatsApp/phone: `019-660 9102` (`+60196609102` for links)
- Secondary phone: `013-776 6128` (`+60137766128` for links)
- Email: `aboundcreation@gmail.com`
- Address: `10, Jalan Seroja 39, Taman Johor Jaya, 81100 Johor Bahru, Johor.`

The footer and contact page will show both phone numbers, email, and address. Phone numbers use `tel:` links, email uses `mailto:`, and the address links to a maps search. The existing contact form remains available.

## Visual System

- White editorial base with fine black rules.
- Abound red as the principal accent.
- Compact bold navigation and buttons.
- Generous whitespace around the slideshow.
- Restrained black/red/white typography with readable tracking.
- Reference-style pill CTA and thin accordion lines.
- Soft red gradient and outlined geometric decoration in the closing CTA.
- The supplied Abound logo remains unchanged and appears as the complete lockup.

The implementation interprets the reference responsively rather than reproducing fixed pixels. It must avoid horizontal overflow from 360px upward.

## Component Boundaries

- `Navbar`: reference-style desktop header and existing accessible mobile behavior.
- `HeroSlideshow`: slide state, autoplay, pause state, keyboard/touch controls, and announcements.
- `WelcomeSplit`: static introduction and selected visual.
- `ServicesPreview`: consolidated service accordion and responsive visual placement.
- `BrandStatement`: reference-led red strip.
- `Process`: six-step responsive grid.
- `HomeCta`: WhatsApp-focused closing section.
- `Footer`: social and canonical contact details.
- `contact-details` data module: one source of truth for phone, email, address, WhatsApp URL, and message.

## Error and Edge Handling

- Slideshow images retain meaningful alt text and stable fallback backgrounds.
- Autoplay timers are cleaned up on unmount and never multiply after interaction.
- Empty or missing optional project imagery does not break rendering; the existing typed project dataset remains the source.
- External links use safe targets and rel attributes.
- Reduced-motion users receive a static initial slide with manual controls.
- Mobile services expose content without hover.

## Testing and Verification

### Unit/component tests

- Slideshow renders the first project and accessible controls.
- Next/previous/dot interactions select the expected slide.
- Autoplay advances at five seconds and pauses on hover/focus.
- Reduced-motion disables autoplay.
- Keyboard navigation works.
- WhatsApp URLs use `+60196609102` and the approved prefilled message.
- Footer/contact page display both phone numbers, email, and address.
- Service accordion exposes the five approved categories and correct expanded state.

### Browser verification

- Homepage and shared navigation at 1440, 1280, 1024, 768, 430, 390, 375, and 360px.
- No horizontal overflow.
- Slideshow arrows, dots, keyboard controls, and touch-oriented layout.
- Mobile menu focus behavior remains intact.
- Contact and WhatsApp links resolve correctly.
- Console and page-error scans are clean.
- Automated WCAG A/AA scan has no violations.

### Production gates

- Unit tests
- Type checking
- ESLint
- Portfolio asset verification
- Optimized Next.js production build
- Playwright end-to-end suite

## Deployment

The completed redesign will be committed to `main` and pushed to GitHub only after verification. The connected Vercel project will deploy automatically from `main`. Existing URL fallback handling and Formspree configuration remain intact.

