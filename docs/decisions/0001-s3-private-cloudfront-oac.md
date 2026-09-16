# 0001. Private S3 bucket behind CloudFront (OAC), instead of public S3 Static Website Hosting

## Context

We needed to decide how to serve the site's static files (HTML, JS, CSS, images). AWS offers a native "S3 Static Website Hosting" feature, which exposes a bucket directly over public HTTP, the simplest and most documented option for a first project.

## Decision

The bucket stays **fully private** (no public access, no ACL, no public policy). CloudFront alone accesses the bucket through an **Origin Access Control (OAC)**, the mechanism currently recommended by AWS (replacing the older Origin Access Identity, now deprecated).

## Why not the simplest option (public S3 website hosting)?

- **No native HTTPS**: the S3 "website hosting" endpoint only serves over HTTP. Adding HTTPS would require putting CloudFront in front anyway, so it makes sense to do it properly from the start.
- **Larger attack surface**: a public bucket stays reachable directly through its S3 URL, in addition to the CloudFront URL, meaning two entry points to secure instead of one.
- **More expensive to fix later**: migrating a public bucket to a private one afterward means revisiting existing policies and risking a service interruption. Starting private costs the same in Terraform configuration, but avoids that risk.

## Consequences / accepted trade-offs

- Slightly more initial configuration (OAC plus a conditional policy on the distribution's ARN, in `s3.tf`).
- Any new CloudFront distribution pointing to this bucket must be explicitly allowed in the policy. Not really a downside here (one site, one distribution), but worth keeping in mind if the bucket were ever shared across multiple distributions.