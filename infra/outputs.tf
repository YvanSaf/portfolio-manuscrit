# -----------------------------------------------------------------------------
# outputs.tf, valeurs à récupérer après "terraform apply".
# Le role_arn et le distribution_id iront dans les secrets GitHub Actions.
# -----------------------------------------------------------------------------

output "bucket_name" {
  description = "Nom du bucket S3 contenant le site."
  value       = aws_s3_bucket.site.id
}

output "cloudfront_distribution_id" {
  description = "ID de la distribution CloudFront, nécessaire pour l'invalidation de cache dans la CD."
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "URL publique du site (domaine CloudFront par défaut)."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "github_actions_role_arn" {
  description = "ARN du rôle IAM à renseigner dans le workflow GitHub Actions (permissions: id-token: write)."
  value       = aws_iam_role.github_actions_deploy.arn
}
