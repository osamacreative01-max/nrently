# Nrently.pk — Next.js Redesign

Frontend-only redesign of nrently.pk (car rental services) built per the project
specification in `nrently-nextjs-redesign-spec.md`.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS** (v4, token-based design system)
- **Framer Motion** + **GSAP (ScrollTrigger)** — scroll animations
- **Lenis** — smooth cinematic scrolling
- **Lucide** icons · **Google Fonts** (Poppins / Inter)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npm run build      # production build
npm run start      # serve production build
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about-us` | About Us |
| `/vehicles` · `/budget` · `/standard` · `/luxury` · `/suv` · `/vans-and-coasters` | Fleet |
| `/location` · `/karachi` · `/lahore` · `/islamabad` | Locations |
| `/contact-us` | Contact |
| `/blogs` | Blog |

All **Book Now** CTAs route to WhatsApp (`https://wa.link/0ilzkn`) exactly as the
current site. There is no backend — the booking form is UI only.

## Deployment (recommended: Vercel)

1. Push this folder to a Git repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — zero config.
3. Point the `nrently.pk` domain's DNS at the new host (free SSL, global CDN).

Alt: `npm run build` then serve `out`/`.next` on the client's existing hosting.

## Customising

- Brand colors/typography: `app/globals.css` (`@theme` tokens).
- Fleet, cities, FAQs, blog posts: `lib/site.ts`.
- Imagery: component `Image` `src`s (aimed at `images.unsplash.com`).

## Open items (from spec §9 — awaiting client)

- [ ] High-res logo (PNG/SVG) → extract exact brand hex codes
- [ ] Confirmation on vehicle/city photos (reuse vs replace)
- [ ] Final sign-off on placeholder palette