# 0003. Vite + React, instead of Next.js

## Context

The site is a single page with continuous scrolling (no multiple routes, no authentication, no server side data fetching), meant to be hosted as static files on S3 + CloudFront.

## Decision

Use **Vite + React** as a static SPA, instead of Next.js.

## Why not Next.js (the most common default choice for a React project)?

- **No need for SSR or server side routing**: a single page, a single scroll, so Next.js's main selling points (server side rendering, file based routing) do not apply here.
- **The site is fundamentally client side heavy**: GSAP, ScrollTrigger, canvas, a custom cursor, Web Audio, all of this only makes sense in the browser. With Next.js's App Router, this kind of code would need to be marked `'use client'` everywhere, with the risk of hydration mismatches (server render and client render not matching exactly) that simply do not exist with a pure Vite SPA.
- **Simpler deployment**: Vite produces a `dist/` folder of static files ready to sync to S3. Next.js, used fully (SSR), would need a Node.js server running continuously, which is not compatible with static S3 hosting without extra adapters.

## Consequences / accepted trade-offs

- No SSR: if SEO ever became critical (unlikely for a personal portfolio), this choice would need to be revisited. The static meta/OG tags in `index.html` are more than enough for this use case.
- No file based routing: not needed here, there is only one page.