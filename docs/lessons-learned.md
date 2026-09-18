# What I learned building this

## GitHub's immutable OIDC subject claims (July 2026 change)

Since July 15, 2026, GitHub issues OIDC tokens with an immutable subject
claim format by default for any repository created after that date, and
also for any repository renamed or transferred after that date. The
format changed from: repo:owner/repo:ref:refs/heads/main  to:  repo:owner@owner_id/repo@repo_id:ref:refs/heads/main


This project's repo was renamed after that date, which silently switched
it to the new format. The AWS IAM trust policy was still written for the
old name-only format, so every deploy failed with `Not authorized to
perform sts:AssumeRoleWithWebIdentity`, even though the role, the OIDC
provider, and the repo and branch names were all correct.

The fix was to fetch the immutable owner ID and repository ID from the
GitHub API and use them in the trust policy condition instead of the
plain names. See `infra/iam-github-oidc.tf` and `infra/variables.tf`
(`github_owner_id`, `github_repo_id`).

Takeaway: an OIDC trust policy that looks correct can still fail if it
was written before a platform-level security change like this one. When
debugging `AssumeRoleWithWebIdentity` failures, checking the exact
deployed trust policy against the real token content matters more than
re-reading the Terraform source for typos.

## CloudFront forces TLSv1 when using the default certificate

`aws_cloudfront_distribution` accepts `minimum_protocol_version =
"TLSv1.2_2021"` without error at `terraform apply` time, but AWS
silently ignores it and keeps `TLSv1` as long as
`cloudfront_default_certificate = true` (no custom domain, no ACM
certificate). Setting anything else than `TLSv1` in that case produces a
diff that reappears on every single `terraform plan`, forever, since
Terraform keeps asking for a value AWS will never actually apply.

The fix was to make `minimum_protocol_version` conditional on whether a
custom domain is configured, matching what was already done for
`acm_certificate_arn` and `ssl_support_method`.

Takeaway: this is also a real security limitation to know about, not
just a Terraform quirk. Without a custom domain, this site cannot
enforce anything above TLSv1 for HTTPS connections from visitors. Adding
a custom domain later would also raise the minimum protocol version as a
side effect, not just cosmetic branding.

## Generated build artifacts almost got committed

Running `tsc -b` (used in the `build` script) generates
`tsconfig.tsbuildinfo`, `tsconfig.node.tsbuildinfo`, and compiled copies
of `vite.config.ts` right next to their source files, since no output
directory was configured for the Node-targeted TypeScript project. These
nearly got committed as if they were source code.

The fix was to redirect that output into `node_modules/.tmp/`, already
covered by `.gitignore`, and to add a `*.tsbuildinfo` safety net rule on
top.

Takeaway: always run `git status` right after installing a new tool or
running a new script for the first time, before running `git add`.
Generated files have a way of landing exactly where source files live if
the output path isn't explicit.