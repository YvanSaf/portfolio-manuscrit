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

## Migrating a 700-line stylesheet in small pieces hides global rules

Porting a single large CSS file section by section (as planned, alongside
the matching JSX for each site section) works well for most rules, but
it has one systematic blind spot: **base styles that apply to the whole
page** (on `body`, `:root`, `*`) are easy to miss entirely, because they
are not tied to any single section's markup, so no obvious moment
"forces" you to go looking for them.

Two real examples from this project:

- The original `body` rule set a default background (a kraft color plus
  a very subtle grid texture) and a default `font-family` for all text.
  Both were skipped entirely during the first CSS migration pass, since
  neither is visible on an empty page and neither is tied to a specific
  component. The result: the cover section looked correct (it sets its
  own background and font explicitly), but the next section rendered
  with the browser's default white background and default font, a
  regression that stayed invisible until a second section actually
  existed to reveal it by contrast.
- `#grain-svg` had a dedicated CSS rule (`opacity: .05`,
  `mix-blend-mode: multiply`, a specific `z-index`) that lived far from
  the inline SVG markup itself, in a completely different part of the
  stylesheet. Without it, the grain effect renders at near full
  intensity instead of a barely-there paper texture, since only the
  noise filter's internal alpha value was ported, not the element's own
  opacity.

Takeaway: when migrating a stylesheet in pieces, do one extra pass
specifically for selectors that are not scoped to any section (`body`,
`:root`, `*`, and any `id` selector used by a page-wide element like
`#grain-svg` or `#sketch-canvas`), before starting the next section.
Waiting for a second section to exist as a point of comparison is a slow
and confusing way to catch this category of bug.

## A merged branch is not a paused branch

Several times during this project, a small follow-up change got pushed to a branch whose pull request had already been merged. Each time, the same thing happened: GitHub's "Automatically delete head branches" setting had already removed that branch on the remote, but the local branch was still sitting there, untouched. Committing to it and pushing silently *recreated* the branch on GitHub, with no pull request attached to it, since the old one was already closed.

The practical consequence: the new commit existed on GitHub, but nowhere near `main`. No CI ran either, since the `pull_request` trigger has nothing to attach to without an open pull request. It looked like everything had worked (the push succeeded, no error anywhere), which made it an easy mistake to repeat, since nothing signals failure at the time it happens. Confirming with `git fetch` followed by `git log --oneline origin/main` was the only reliable way to notice the change had not actually reached `main`.

The fix, each time, was the same: open a new pull request from the recreated branch (GitHub's "Compare & pull request" banner, or manually if it had already disappeared), let CI run on it, and merge it properly.

Takeaway: a merged pull request kills its branch, not pauses it. The rule that actually prevents this is not "remember to check", it's "never commit to a branch without creating it fresh from an up-to-date `main` first". Checking after the fact catches the mistake, it doesn't prevent it, only changing the habit does that.