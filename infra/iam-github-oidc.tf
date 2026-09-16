# -----------------------------------------------------------------------------
# iam-github-oidc.tf, permet à GitHub Actions de déployer SANS clé AWS
# stockée en secret.
#
# Principe : GitHub génère un jeton OIDC signé à chaque run de workflow.
# AWS vérifie ce jeton via le provider OIDC déclaré ici, et n'accorde des
# accès temporaires (via STS AssumeRole) que si le jeton correspond
# exactement au repo + à la branche autorisés. Aucune clé d'accès
# long-lived à faire fuiter, aucune rotation à gérer.
# -----------------------------------------------------------------------------

# Récupère dynamiquement l'empreinte (thumbprint) du certificat TLS de
# GitHub, évite de coder en dur une valeur qui peut changer.
data "tls_certificate" "github_oidc" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github_oidc.certificates[0].sha1_fingerprint]
}

# Rôle que GitHub Actions va assumer. La condition dans la trust policy
# restreint ceci à TON repo, sur LA branche définie (var.github_branch)
# uniquement, un fork ou une autre branche ne pourra jamais l'assumer.
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

# Permissions accordées une fois le rôle assumé : le strict nécessaire
# pour déployer, rien de plus. Pas d'accès à d'autres buckets, pas
# d'accès à d'autres distributions CloudFront, pas de droits IAM.
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
