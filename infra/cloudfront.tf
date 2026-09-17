# -----------------------------------------------------------------------------
# cloudfront.tf, CDN in front of the private S3 bucket
#
# CloudFront's role here: free HTTPS, global caching, and the single
# authorized access point to the private bucket (through OAC). Without
# CloudFront, a private S3 bucket simply would not be reachable from a browser.
# -----------------------------------------------------------------------------

# Origin Access Control: the modern mechanism (replacing the old OAI) that
# lets CloudFront sign its requests to S3, proving that the request really
# comes from THIS distribution.
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
    cached_methods          = ["GET", "HEAD"]
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # AWS managed cache policy ("CachingOptimized"): good default values
    # for static content, no need to reinvent it.
    # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # No custom domain: using the default CloudFront certificate
  # (works immediately on the *.cloudfront.net domain).
  # If custom_domain is set, see the commented ACM resource
  # further below and uncomment aliases + custom viewer_certificate.
  viewer_certificate {
    cloudfront_default_certificate = var.custom_domain == "" ? true : null
    acm_certificate_arn            = var.custom_domain != "" ? aws_acm_certificate.site[0].arn : null
    ssl_support_method             = var.custom_domain != "" ? "sni-only" : null
    # AWS forces TLSv1 as the minimum when using the default CloudFront
    # certificate (no custom domain), TLSv1.2_2021 only becomes available
    # once a custom domain with its own ACM certificate is configured.
    # See docs/lessons-learned.md.
    minimum_protocol_version = var.custom_domain != "" ? "TLSv1.2_2021" : "TLSv1"
  }

  aliases = var.custom_domain != "" ? [var.custom_domain] : []
}

# -----------------------------------------------------------------------------
# Custom domain (optional), only deploys if var.custom_domain is set.
# The ACM certificate for CloudFront MUST be created in us-east-1,
# regardless of the region used for the rest of the infrastructure, this is
# an AWS requirement, not an arbitrary choice made by this project.
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

# DNS validation of the certificate: requires your domain to be on
# Route53 (or you add the CNAME records manually with your registrar if
# you use a different DNS). Uncomment and adjust if you manage your zone
# through Route53 in this same Terraform project.
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