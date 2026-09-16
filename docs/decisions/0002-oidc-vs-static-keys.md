# 0002. GitHub Actions to AWS authentication through OIDC, instead of static keys

## Context

GitHub Actions needs permissions on AWS to deploy (write to S3, invalidate the CloudFront cache). The traditional method is to create an IAM user, generate a key pair (`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`), and paste them into the GitHub repo secrets.

## Decision

Use **OIDC** (OpenID Connect): GitHub Actions generates a signed, short lived token on every workflow run. AWS verifies it through an `aws_iam_openid_connect_provider`, and issues **temporary** credentials (valid only for the run) if the token matches the conditions defined in the role's trust policy (specific repo and branch).

## Why not static keys (the most common method in tutorials)?

- **A static key never expires until it is manually revoked.** If it leaks (a bad commit, a screenshot, a poorly filtered log), it stays valid until someone notices and revokes it by hand.
- **Manual rotation**: good security practice says keys should be rotated regularly. In practice, almost nobody does this on a personal project, which widens the risk window if a leak happens.
- **Hard to scope tightly**: a classic IAM key is valid from anywhere (your laptop, a malicious fork of the repo if it had the secrets, and so on). The OIDC trust policy restricts usage to *this exact repo*, *this exact branch*.

## Consequences / accepted trade-offs

- Slightly more setup at the start (OIDC provider plus a trust policy with conditions), documented in `iam-github-oidc.tf`.
- Only works from GitHub Actions (or another CI system that supports OIDC). If deployment ever needed to happen from a local machine, a classic access method (local AWS CLI profile) would still be needed, which is already the case for running Terraform manually.