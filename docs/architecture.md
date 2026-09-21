# Architecture

## Runtime view (how a visitor loads the site)

![Runtime view](./1_Architecture_logical_view.png)

A visitor opens their browser and types the site's URL. The request travels over the internet to Amazon CloudFront, which fetches the requested file from the S3 bucket if it is not already cached, then returns it over HTTPS to the browser.

## Deployment view (how the code reaches AWS)

![Deployment view](./2_Architecture_deployment_view.png)

The developer pushes code to GitHub. This triggers GitHub Actions, which assumes an IAM role through OIDC (authentication with a signed token, no AWS key stored as a secret), syncs the built files to S3, then invalidates the CloudFront cache so visitors immediately see the new version.

> Correction note: the first draft of this diagram used the label "IAM Roles Anywhere" on the assumed role icon. That was a terminology mistake that needs to be fixed in the source file. IAM Roles Anywhere is a separate service, built to authenticate workloads outside AWS using X.509 certificates. What this project actually uses is an IAM Role assumed through an OIDC identity provider (`aws_iam_openid_connect_provider` + `AssumeRoleWithWebIdentity`). The correct label is simply "IAM Role".

All the infrastructure lives in the us-east-1 region, including the ACM certificate used by CloudFront (a strict AWS requirement for CloudFront, not an arbitrary choice), so staying on this region everywhere keeps the project simple.

## The services, and why they are here

### Amazon S3, site storage

Holds the built files (`dist/` after `npm run build`): HTML, JS, CSS, images, fonts. The bucket is fully private, no direct public access, even if someone knows the URL. Only CloudFront can read it, through an Origin Access Control (OAC). Details and reasoning in [ADR 0001](./decisions/0001-s3-private-cloudfront-oac.md).

Versioning is enabled, so every deployment keeps the previous files, which allows a rollback without having to rebuild anything if a deployment breaks.

### Amazon CloudFront, CDN and HTTPS

Does three things a plain S3 bucket cannot do properly: native HTTPS, geographic caching, and a single authorized access point to the private bucket.

### AWS IAM (role and OIDC provider)

Lets GitHub Actions deploy to AWS without any long lived access key stored in the repo secrets. The role can only be assumed from this specific repo, on the `main` branch. See [ADR 0002](./decisions/0002-oidc-vs-static-keys.md) for the mechanism in detail and why it is preferable to static keys.

### GitHub Actions, CI then CD

CI (on every pull request): lint, TypeScript check, test build. Blocks the merge if something breaks.

CD (on push to `main`): production build, sync to S3, CloudFront cache invalidation.

## Frontend architecture

The site is one long scrolling page, split into one React component per visual section (`CoverSpread`, `Transfo`, `Planches`, `Outils`, `Certifs`, `Footer`), all mounted together in `App.tsx`. A `PageChrome` component holds everything that spans the whole page rather than one section: the sound toggle, the side margins, the paper grain texture.

### Content kept separate from components

All visible text lives in `src/content/` (`fr.ts` for section copy, `eggs.ts` for the hidden quotes), not inlined in JSX. Components import from there instead of hardcoding strings. Nothing else about internationalization exists yet, there is only a French version today, but this separation means adding a second language later is a matter of adding a new content file and a way to switch between them, not rewriting every component.

### Animation stays close to the original, on purpose

Scroll-driven effects (the page turn on the cover, the character frame-by-frame animation, the reveal-on-scroll used across sections) are built with GSAP and ScrollTrigger, wired through small hooks (`useCoverTurn`, `useCharScrollAnimation`, `useScrollReveal`) rather than rewritten as React state. [ADR 0003](./decisions/0003-vite-react-vs-nextjs.md) already made the case for this: this kind of imperative, canvas- and timeline-driven code does not get simpler by forcing it through `useState`, it gets harder to reason about. The hooks exist to give this code a proper lifecycle (mount, clean up on unmount), not to make it declarative.

The Web Audio sound effects (`src/lib/sound.ts`) follow the same logic: a small framework-free module, not a hook, since an `AudioContext` is a single browser-wide resource, not something tied to one component's lifecycle.

### The easter egg system

Six hidden quotes, one per section, share a single `TomoeEgg` component and one `EggBubbleProvider` (React context) that owns the popup's position and content. Only the quote data (`src/content/eggs.ts`) differs between sections, adding a new one elsewhere on the site means dropping in `<TomoeEgg id="..." />` and adding one entry to that file, not writing a new popup.

### What is built and what is not, honestly

The `#sketch-canvas` element and the ink-trail cursor effect from the original design exist in the markup but are not wired up yet, this is tracked as known follow-up work, not an oversight to be discovered later.

## What is intentionally not here

No database, the site is fully static, no dynamic data to store server side.

No server (EC2, Lambda...), nothing runs on the back end, all rendering (animations, cursor, canvas) happens in the visitor's browser.

No custom domain for now, the site runs on the default `*.cloudfront.net` URL. The infrastructure is ready to support one (see the `custom_domain` variable in `infra/variables.tf`), but it is not needed to get started.

## Useful links

[Architecture decisions (ADR)](./decisions/)

[Cost estimate](./costs.md)

[What I learned building this](./lessons-learned.md)