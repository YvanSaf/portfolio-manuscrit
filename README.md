# Portfolio Manuscrit

A hand-drawn, comic-book-styled personal portfolio. Static site, deployed on AWS behind a private S3 bucket and CloudFront, shipped through a CI/CD pipeline that never stores a long-lived AWS credential anywhere.

**Live site:** https://d2ut8jznu45tll.cloudfront.net

[![CI](https://github.com/YvanSaf/portfolio-manuscrit/actions/workflows/ci.yml/badge.svg)](https://github.com/YvanSaf/portfolio-manuscrit/actions/workflows/ci.yml)
[![CD](https://github.com/YvanSaf/portfolio-manuscrit/actions/workflows/cd.yml/badge.svg)](https://github.com/YvanSaf/portfolio-manuscrit/actions/workflows/cd.yml)

## What this is

This repository holds both the site itself and the infrastructure that serves it. The site is built as a single scrolling page, styled like a manga volume, with six sections (cover, character sheet, projects, tools, certifications, contact), a scroll-driven page-turn animation, a handful of hidden easter eggs, and sound effects that stay off until the visitor turns them on.

The infrastructure and deployment side is the part built with a security-first mindset on purpose, this project doubles as a practical example of a small, secure, fully automated static site pipeline on AWS:

- The S3 bucket is entirely private. Nothing is reachable directly, only CloudFront can read it, through an Origin Access Control.
- GitHub Actions deploys through OIDC. No `AWS_ACCESS_KEY_ID`, no `AWS_SECRET_ACCESS_KEY`, ever, in any secret. The IAM role can only be assumed from this exact repository, on the `main` branch.
- The trust policy uses GitHub's immutable subject claim format (owner and repo IDs, not names), which matters if a repo is ever renamed, see [lessons-learned.md](./docs/lessons-learned.md) for why this isn't optional.

## Tech stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Web Audio API
- **Infrastructure:** Terraform, AWS S3, CloudFront, IAM (OIDC)
- **CI/CD:** GitHub Actions, two workflows (`ci.yml` for every pull request, `cd.yml` on every push to `main`)

## Repository structure

```
.
├── .github/workflows/   # CI (pull requests) and CD (push to main)
├── docs/                # Architecture, ADRs, costs, lessons learned
│   └── decisions/       # Architecture Decision Records
├── infra/               # Terraform (S3, CloudFront, IAM OIDC)
├── public/              # Static assets served as-is (fonts, images, icons)
└── src/
    ├── components/      # One component per site section, plus shared pieces (TomoeEgg, PageChrome)
    ├── content/         # Site copy, kept separate from components for future i18n
    ├── hooks/           # Scroll animations, sound, canvas frame playback
    ├── lib/             # Small framework-free utilities (sound synthesis, text helpers)
    └── context/         # Shared state (the easter egg quote bubble)
```

## Documentation

- [Architecture](./docs/architecture.md), both the AWS infrastructure and the frontend structure
- [Architecture Decision Records](./docs/decisions/)
- [Cost estimate](./docs/costs.md)
- [Lessons learned](./docs/lessons-learned.md), real pitfalls hit while building this, not a generic list

## Local development

Requires Node 20 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # production build to dist/
```

## Deploying the infrastructure

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # fill in your own values
terraform init
terraform plan -out=tfplan
terraform apply tfplan
```

After applying, grab the outputs (`github_actions_role_arn`, `bucket_name`, `cloudfront_distribution_id`) and set them as GitHub Actions secrets, see [.github/workflows/README.md](./.github/workflows/README.md) for the exact list.

Once the secrets are set, every push to `main` builds the site and deploys it automatically, no manual step involved.

## License

MIT, see [LICENSE](./LICENSE).