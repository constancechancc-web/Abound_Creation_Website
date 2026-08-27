# Abound Creation Website — Design Specification

**Date:** 2026-08-27  
**Status:** Approved design, pending implementation plan

## 1. Objective

Build a complete, production-ready website for Abound Creation that positions the company as a confident independent creative design agency. The experience must demonstrate the agency's design ability through strong typography, art-directed portfolio presentation, disciplined white space, and precise use of the official red.

The site must feel like a contemporary branding studio and editorial design publication—not a corporate template, SaaS landing page, or generic marketing agency site.

## 2. Approved Creative Direction

The selected direction is **Swiss Impact**:

- Helvetica-led typography with oversized, tightly tracked headlines
- A disciplined editorial grid with intentional asymmetry
- White as the dominant surface, black for authority, and `#EC1D25` as the brand signal
- Rectangles, lines, imagery, and typography rather than rounded cards or decorative effects
- Strong visual changes between sections to create rhythm
- Restrained motion that supports hierarchy without becoming theatrical

The site will use the official tagline exactly as written: **Abound with creative idea.** Display treatments may use uppercase, but the wording and singular “idea” must not change.

## 3. Brand Assets

The supplied `Abound Creation Logo.jpg` is the official logo source.

Logo usage:

- Use the compact red symbol in the sticky navigation and favicon where practical.
- Use the full symbol-and-stacked-wordmark lockup in the footer, About page, and selected brand moments.
- Preserve the supplied geometry and stacked wordmark.
- Prepare tightly cropped, optimized web renditions while retaining the original source asset.
- Maintain adequate clear space and do not place the full mark over visually busy imagery.
- The interface continues to use the specified official red `#EC1D25` consistently.

## 4. Color, Type, and Layout System

### Colors

- Background: `#FFFFFF`
- Text: `#0A0A0A`
- Brand red: `#EC1D25`
- Light gray: `#F4F4F4`
- Border gray: `#E5E5E5`
- Medium gray: `#777777`
- Dark gray: `#333333`

White should occupy approximately 70–80% of the experience. Red remains visually powerful because it is used for CTAs, key words, numbers, hover states, graphic details, and the full-width creative statement—not as a general surface color.

### Typography

Use `"Helvetica Neue", Helvetica, Arial, sans-serif` throughout. Headlines use bold or black weights, tight tracking, and compact line height. Metadata remains small, uppercase, and widely tracked. Body copy is direct, readable, and restrained.

### Grid and spacing

- Desktop: 12-column grid with 4–6vw outer margins
- Tablet: 8-column grid
- Mobile: 4-column grid with 20–24px outer padding
- Use the specified 8px-based spacing scale and generous section spacing
- Layouts must be recomposed for smaller screens rather than proportionally scaled

## 5. Information Architecture

Routes:

- `/`
- `/work`
- `/work/[slug]`
- `/services`
- `/about`
- `/contact`

Unknown project slugs must return the site’s custom 404 experience.

## 6. Homepage Experience

The homepage follows this sequence:

1. Sticky navigation
2. Swiss Impact hero
3. Editorial brand statement
4. Selected Work
5. Services
6. About
7. Creative process
8. Why Abound
9. Red creative statement
10. Closing project CTA
11. Footer

### Hero

Use the approved headline “ABOUND WITH / CREATIVE IDEA.” with “CREATIVE IDEA.” in red. Pair it with the supplied supporting copy and primary/secondary CTAs. The visual composition combines the Abound visual system with an art-directed featured-project image rather than generic stock photography.

### Selected Work

Show six projects in a varied editorial sequence: large landscape, smaller vertical, offset horizontal, full-width, paired composition, and final large image. All project information remains visible without hover. Hover adds subtle scale, arrow movement, and red category emphasis.

### Services

Desktop uses a large divided vertical list with number, title, description, arrow, and a related image reveal. Mobile uses an accessible accordion with smooth but optional height motion.

### About, process, and principles

The About section combines a large image spread with bold type and concise copy. Process uses large red numbers and dividers rather than circles. Why Abound uses four editorial principles with distinct hierarchy.

### Creative statement and CTA

The creative statement is a full-width `#EC1D25` section with white type. The closing CTA returns to white and uses a high-emphasis red project button.

## 7. Supporting Pages

### Work index

The Work page expands the six-project system into a paced editorial index. It avoids a uniform card grid and uses composition changes to reinforce the studio’s point of view.

### Case studies

One reusable template renders every project from structured data. Each study contains:

- Project title, category, year, client, and services
- Overview
- Challenge
- Approach
- Creative direction
- Design system
- Applications
- Outcome
- Art-directed gallery
- Optional muted, looping, inline video
- Related work
- Closing CTA

The page favors imagery, captions, typographic statements, close-up details, and varied image placement over long uninterrupted text.

### Services

The Services page expands the six approved services while retaining the editorial list concept. Copy stays concise and avoids corporate jargon.

### About

The About page develops the approved beliefs and positioning, supported by original studio-like graphic imagery rather than fabricated team photography or invented company facts.

### Contact

The Contact page includes all specified fields, accessible labels, validation, sending feedback, success feedback, and recoverable error handling. Email, WhatsApp, and location remain clearly marked placeholders until supplied.

## 8. Portfolio Content and Original Visuals

Create six fictional, easy-to-replace projects covering:

1. Brand Identity
2. Restaurant Branding
3. Corporate Branding
4. Uniform Design
5. Marketing Campaign
6. Product Photography

Each project gets a distinct identity, palette, typography treatment, and visual motif. The projects should feel like separate client engagements while meeting a consistent Abound presentation standard. Visuals will be produced as optimized local assets so the website has no dependency on random stock-image URLs.

Project content lives in one typed data module with:

```ts
type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  client: string;
  description: string;
  coverImage: string;
  gallery: GalleryItem[];
  services: string[];
  featured: boolean;
  video?: VideoAsset;
};
```

The data layer must make future replacement of content and assets straightforward without modifying layout components.

## 9. Technical Architecture

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- `next/image` for responsive raster assets
- A small global CSS layer for brand tokens, typography, reveal states, and interaction details that are clearer outside utility strings

Avoid a CMS, database, large animation framework, custom cursor dependency, or other unnecessary runtime packages.

Shared components cover navigation, mobile menu, footer, buttons, section headings, project cards, portfolio compositions, reveals, and form states. Homepage sections remain modular and route content is statically generated when possible.

## 10. Contact Submission

Use Formspree through:

```text
NEXT_PUBLIC_FORMSPREE_ENDPOINT
```

When configured, submit asynchronously and provide sending, success, and failure feedback. When absent, keep the form readable and valid but prevent a misleading submission; present a clear configuration message instead of failing silently.

Do not place private credentials in source control. Include `.env.example` and deployment guidance.

## 11. Social Links and Contact Placeholders

Use the supplied public links:

- Facebook: `https://www.facebook.com/profile.php?id=61576845867548`
- Instagram: `https://www.instagram.com/aboundcreation/?utm_source=ig_web_button_share_sheet`

Open external social links safely in a new tab. Do not invent email addresses, phone numbers, WhatsApp numbers, or a street location.

## 12. Responsive Behavior

Verify intentional layouts at 1440, 1280, 1024, 768, 430, 390, 375, and 360px.

- Desktop navigation: logo left, primary links centered, CTA right
- Mobile navigation: compact logo left, accessible menu button right, full-screen menu
- Desktop portfolio: asymmetric compositions
- Mobile portfolio: ordered single-column compositions with retained hierarchy
- Desktop services: image reveal interaction
- Mobile services: accessible accordion
- No horizontal overflow at any required width

## 13. Motion and Interaction

Use CSS transitions and Intersection Observer rather than a large animation library.

- Initial hero reveal: 0.6–1.0 seconds with `cubic-bezier(0.22, 1, 0.36, 1)`
- Scroll reveals: opacity plus modest upward translation
- Images: subtle scale from approximately 1.04 to 1
- Buttons: 4–8px arrow movement
- Work imagery: maximum hover scale around 1.04
- Navigation: subtle opacity and border transitions

Respect `prefers-reduced-motion` by disabling reveal transforms, image scale motion, cursor motion, and nonessential transitions while retaining complete functionality.

## 14. Accessibility

- Semantic landmarks and heading hierarchy
- Descriptive image alt text and decorative-image treatment where appropriate
- Fully keyboard-operable navigation, menu, accordion, links, and form
- Visible focus indicators
- Accessible form labels and status announcements
- Sufficient color contrast
- Essential content never available only on hover
- Touch targets sized for mobile use
- Escape-key and focus behavior for the full-screen mobile menu

## 15. SEO and Performance

SEO requirements:

- Title: `Abound Creation — Creative Design Agency`
- Approved meta description
- Per-route metadata and case-study metadata
- Open Graph and Twitter/X metadata
- Favicon derived from the official symbol
- Sitemap and robots configuration
- Semantic HTML

Performance requirements:

- Responsive image sizing and modern optimized formats where appropriate
- Lazy loading below the fold
- Lazy, muted, looping, `playsInline` videos with poster images
- Minimal client-side JavaScript
- No external font download required
- No unnecessary runtime dependencies

## 16. Railway Deployment

Deploy as an optimized Next.js Node application on Railway. The repository will include production scripts, an explicit supported Node version, environment documentation, and a Railway-compatible start command. The application remains stateless and requires no database.

Required deployment variable:

- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` — optional during preview, required for live contact submissions

## 17. Verification and Acceptance

Before completion:

- Run lint, TypeScript validation, and production build
- Verify every route and all six project slugs
- Verify navigation, mobile menu, CTA, footer, and social links
- Verify configured and unconfigured Formspree behavior
- Inspect keyboard navigation, focus states, labels, and heading order
- Inspect all required responsive widths
- Check for horizontal overflow, broken assets, missing alt text, and console errors
- Verify reduced-motion behavior
- Verify sitemap, robots, route metadata, Open Graph data, and favicon
- Verify Railway production startup

Acceptance also requires:

- White remains dominant
- Interface red is `#EC1D25`
- Helvetica family is used throughout
- The tagline wording is exact
- The supplied logo is integrated appropriately
- Portfolio remains the primary visual focus
- The experience feels authored and art-directed rather than template-driven
- Contact details are placeholders unless explicitly supplied
- Facebook and Instagram use the supplied URLs

