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

## What is intentionally not here

No database, the site is fully static, no dynamic data to store server side.

No server (EC2, Lambda...), nothing runs on the back end, all rendering (animations, cursor, canvas) happens in the visitor's browser.

No custom domain for now, the site runs on the default `*.cloudfront.net` URL. The infrastructure is ready to support one (see the `custom_domain` variable in `infra/variables.tf`), but it is not needed to get started.

## Useful links

[Architecture decisions (ADR)](./decisions/)

[Cost estimate](./costs.md)

[What I learned building this](./lessons-learned.md)