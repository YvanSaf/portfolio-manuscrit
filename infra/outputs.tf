# -----------------------------------------------------------------------------
# outputs.tf, values to retrieve after "terraform apply".
# role_arn and distribution_id will go into the GitHub Actions secrets.
# -----------------------------------------------------------------------------

output "bucket_name" {
  description = "Name of the S3 bucket holding the site."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID, needed for cache invalidation in the CD."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Public URL of the site (default CloudFront domain)."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "github_actions_role_arn" {
  description = "ARN of the IAM role to set in the GitHub Actions workflow (permissions: id-token: write)."
  value       = aws_iam_role.github_actions_deploy.arn
}