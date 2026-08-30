# Abound Creation Website

Production website for Abound Creation, built with Next.js, TypeScript and Tailwind CSS.

## Local development

Requires Node.js 22.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

- `NEXT_PUBLIC_SITE_URL`: public production origin, for example `https://aboundcreation.com`.
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT`: complete Formspree endpoint, for example `https://formspree.io/f/your-form-id`.

The contact form displays a safe configuration message when its Formspree endpoint is absent. Do not commit `.env.local`.

## Quality commands

```bash
npm test
npm run typecheck
npm run lint
npm run verify:assets
npm run build
npm run test:e2e
```

## Portfolio updates

Project content lives in `src/data/projects.ts`. Each entry references local assets under `public/images/projects/<slug>/`. Run `npm run verify:assets` after changing an asset path. Service content lives in `src/data/services.ts`.

The untouched supplied logo is `public/brand/abound-logo-original.jpg`. Web derivatives are in the same directory.

## Railway deployment

1. Create a Railway service from the GitHub repository.
2. Add `NEXT_PUBLIC_SITE_URL` with the Railway public URL or custom domain.
3. Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` after creating the production Formspree form.
4. Deploy. `railway.json` runs `npm run build` and starts the optimized Next.js server with `npm run start`.
5. Confirm `/`, `/work`, `/contact`, `/sitemap.xml`, and one case-study route after deployment.

The app is stateless and requires no database or persistent volume.

## Homepage slideshow

The homepage rotates through six project covers every five seconds. It supports keyboard, touch, arrow, and dot navigation, pauses during interaction, and disables autoplay for reduced-motion users.

## Contact details

Site-wide phone, WhatsApp, email, address, map, and social URLs are defined in `src/data/contact-details.ts`.
