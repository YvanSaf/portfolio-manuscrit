# -----------------------------------------------------------------------------
# iam-github-oidc.tf, lets GitHub Actions deploy WITHOUT any AWS key
# stored as a secret.
#
# Principle: GitHub generates a signed OIDC token on every workflow run.
# AWS verifies this token through the OIDC provider declared here, and only
# grants temporary access (through STS AssumeRole) if the token exactly
# matches the allowed repo and branch. No long lived access key to leak,
# no rotation to manage.
# -----------------------------------------------------------------------------

# Dynamically fetches the thumbprint of GitHub's TLS certificate, avoids
# hardcoding a value that can change.
data "tls_certificate" "github_oidc" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github_oidc.certificates[0].sha1_fingerprint]
}

# Role that GitHub Actions will assume. The condition in the trust policy
# restricts this to YOUR repo, on the branch defined by var.github_branch
# only, a fork or another branch can never assume it.
resource "aws_iam_role" "github_actions_deploy" {
  name = "${var.project_name}-github-actions-deploy"

  assume_role_policy = data.aws_iam_policy_document.github_trust.json
}

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repo}:ref:refs/heads/${var.github_branch}"]
    }
  }
}

# Permissions granted once the role is assumed: strictly what is needed to
# deploy, nothing more. No access to other buckets, no access to other
# CloudFront distributions, no IAM permissions.
resource "aws_iam_role_policy" "github_actions_deploy" {
  name   = "deploy-permissions"
  role   = aws_iam_role.github_actions_deploy.id
  policy = data.aws_iam_policy_document.deploy_permissions.json
}

data "aws_iam_policy_document" "deploy_permissions" {
  statement {
    sid    = "S3SyncSite"
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.site.arn,
      "${aws_s3_bucket.site.arn}/*",
    ]
  }

  statement {
    sid       = "CloudFrontInvalidate"
    effect    = "Allow"
    actions   = ["cloudfront:CreateInvalidation"]
    resources = [aws_cloudfront_distribution.site.arn]
  }
}