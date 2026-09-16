# -----------------------------------------------------------------------------
# variables.tf, every value you should customize lives here.
# Fill in your own values in terraform.tfvars (copy it from
# terraform.tfvars.example, never commit it as is).
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region to deploy resources in. us-east-1 is also the only valid region for the ACM certificate used by CloudFront, so staying on us-east-1 everywhere keeps the project simple."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short project name, used in tags and some resource names."
  type        = string
  default     = "portfolio-manuscrit"
}

variable "environment" {
  description = "Environment name (prod, staging...). For a personal portfolio, 'prod' is enough."
  type        = string
  default     = "prod"
}

variable "bucket_name" {
  description = <<-EOT
    S3 bucket name. MUST be globally unique across all of AWS (not just
    your account), "portfolio-manuscrit" alone will most likely already be taken.
    Suggestion: prefix it with your name, e.g. "yvansaf-portfolio-manuscrit".
  EOT
  type = string
}

variable "github_repo" {
  description = <<-EOT
    Your GitHub repo in "owner/repo" format, e.g. "yvansaf/portfolio-manuscrit".
    Used to restrict the OIDC IAM role to THIS repo only, nobody
    else can assume this role from GitHub Actions.
  EOT
  type = string
}

variable "github_branch" {
  description = "Branch allowed to deploy (the one that triggers the CD)."
  type        = string
  default     = "main"
}

variable "cloudfront_price_class" {
  description = <<-EOT
    Geographic coverage of the CloudFront CDN, affects cost:
      PriceClass_100 = North America + Europe (cheapest)
      PriceClass_200 = + Asia, Africa, Oceania
      PriceClass_All = full worldwide coverage (most expensive)
    For a personal portfolio, PriceClass_100 is more than enough.
  EOT
  type    = string
  default = "PriceClass_100"
}

variable "custom_domain" {
  description = <<-EOT
    Optional. Your domain name (e.g. "yvansaf.dev") if you have one.
    Leave it empty ("") to use only the default CloudFront domain
    (*.cloudfront.net), which works fine to get started.
  EOT
  type    = string
  default = ""
}