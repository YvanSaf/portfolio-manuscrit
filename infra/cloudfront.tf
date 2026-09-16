# -----------------------------------------------------------------------------
# cloudfront.tf, CDN devant le bucket S3 privé
#
# Rôle de CloudFront ici : HTTPS gratuit, cache global, et point d'accès
# unique autorisé au bucket S3 (via OAC). Sans CloudFront, un bucket S3
# privé ne serait tout simplement pas accessible depuis un navigateur.
# -----------------------------------------------------------------------------

# Origin Access Control : le mécanisme moderne (remplace l'ancien OAI) qui
# permet à CloudFront de signer ses requêtes vers S3, prouvant que la
# requête vient bien de CETTE distribution.
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = var.cloudfront_price_class
  comment             = "${var.project_name}, ${var.environment}"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # Politique de cache managée par AWS ("CachingOptimized") : bonnes
    # valeurs par défaut pour du contenu statique, pas besoin de la
    # réinventer. https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Pas de domaine custom : on utilise le certificat CloudFront par défaut
  # (fonctionne immédiatement sur le domaine *.cloudfront.net).
  # Si custom_domain est renseigné, voir la ressource ACM commentée
  # plus bas et décommente aliases + viewer_certificate custom.
  viewer_certificate {
    cloudfront_default_certificate = var.custom_domain == "" ? true : null
    acm_certificate_arn            = var.custom_domain != "" ? aws_acm_certificate.site[0].arn : null
    ssl_support_method             = var.custom_domain != "" ? "sni-only" : null
    minimum_protocol_version       = "TLSv1.2_2021"
  }

  aliases = var.custom_domain != "" ? [var.custom_domain] : []
}

# -----------------------------------------------------------------------------
# Domaine custom (optionnel), ne se déploie que si var.custom_domain est
# renseigné. Le certificat ACM pour CloudFront DOIT être créé dans
# us-east-1, quelle que soit la région du reste de l'infra, c'est une
# contrainte AWS, pas un choix arbitraire de ce projet.
# -----------------------------------------------------------------------------

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = {
      Project     = var.project_name
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}

resource "aws_acm_certificate" "site" {
  count             = var.custom_domain != "" ? 1 : 0
  provider          = aws.us_east_1
  domain_name       = var.custom_domain
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Validation DNS du certificat : nécessite que ton domaine soit sur
# Route53 (ou que tu ajoutes les enregistrements CNAME manuellement chez
# ton registrar si tu utilises un autre DNS). Décommente et adapte si tu
# gères ta zone via Route53 dans ce même projet Terraform.
#
# resource "aws_route53_record" "cert_validation" {
#   for_each = var.custom_domain != "" ? {
#     for dvo in aws_acm_certificate.site[0].domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   } : {}
#   zone_id = var.route53_zone_id
#   name    = each.value.name
#   type    = each.value.type
#   ttl     = 60
#   records = [each.value.record]
# }
