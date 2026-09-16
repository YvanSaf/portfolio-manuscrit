# -----------------------------------------------------------------------------
# s3.tf, bucket de stockage du site statique
#
# Choix important : ce bucket reste ENTIÈREMENT PRIVÉ. On n'active PAS
# "S3 static website hosting" (l'ancien endpoint HTTP-only). À la place,
# CloudFront accède au bucket via son endpoint REST standard, protégé par
# un Origin Access Control (OAC), voir cloudfront.tf. C'est la méthode
# recommandée par AWS depuis 2022 (l'ancien OAI est déprécié).
#
# Avantage concret : même si quelqu'un devine l'URL S3 directe, il ne peut
# rien récupérer. Seul CloudFront (donc HTTPS + cache) peut lire le bucket.
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name
}

# Versioning : garde l'historique de chaque fichier déployé.
# En cas de déploiement cassé, on peut restaurer une version précédente
# d'un objet sans avoir à tout rebuilder, rollback quasi instantané.
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Bloque absolument tout accès public au niveau du bucket, même par erreur
# de policy future, CloudFront (via OAC) reste le seul chemin d'accès.
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Désactive les ACL (pratique recommandée AWS actuelle) : la propriété de
# chaque objet reste toujours celle du bucket, plus simple à raisonner.
resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# Policy du bucket : autorise UNIQUEMENT le service CloudFront à lire les
# objets, ET seulement depuis CETTE distribution CloudFront précise
# (condition sur son ARN), pas n'importe quelle distribution CloudFront
# du monde entier.
resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.s3_cloudfront_access.json
}

data "aws_iam_policy_document" "s3_cloudfront_access" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalReadOnly"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}
