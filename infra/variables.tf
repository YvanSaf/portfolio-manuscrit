# -----------------------------------------------------------------------------
# variables.tf, toutes les valeurs à personnaliser sont ici.
# Remplis tes propres valeurs dans terraform.tfvars (copie depuis
# terraform.tfvars.example, jamais commité tel quel).
# -----------------------------------------------------------------------------

variable "aws_region" {
  description = "Région AWS où déployer les ressources. us-east-1 est aussi la seule région valable pour le certificat ACM utilisé par CloudFront, donc rester sur us-east-1 partout simplifie l'ensemble du projet."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nom court du projet, utilisé dans les tags et certains noms de ressources."
  type        = string
  default     = "portfolio-manuscrit"
}

variable "environment" {
  description = "Nom de l'environnement (prod, staging...). Pour un portfolio perso, 'prod' suffit."
  type        = string
  default     = "prod"
}

variable "bucket_name" {
  description = <<-EOT
    Nom du bucket S3. DOIT être globalement unique sur tout AWS (pas juste
    ton compte), "portfolio-manuscrit" seul sera très probablement déjà pris.
    Suggestion : préfixe avec ton nom, ex. "yvansaf-portfolio-manuscrit".
  EOT
  type = string
}

variable "github_repo" {
  description = <<-EOT
    Ton repo GitHub au format "owner/repo", ex. "yvansaf/portfolio-manuscrit".
    Utilisé pour restreindre le rôle IAM OIDC à CE repo uniquement, personne
    d'autre ne pourra assumer ce rôle depuis GitHub Actions.
  EOT
  type = string
}

variable "github_branch" {
  description = "Branche autorisée à déployer (celle qui déclenche la CD)."
  type        = string
  default     = "main"
}

variable "cloudfront_price_class" {
  description = <<-EOT
    Couverture géographique du CDN CloudFront, impacte le coût :
      PriceClass_100 = Amérique du Nord + Europe (le moins cher)
      PriceClass_200 = + Asie, Afrique, Océanie
      PriceClass_All = couverture mondiale complète (le plus cher)
    Pour un portfolio perso, PriceClass_100 est largement suffisant.
  EOT
  type    = string
  default = "PriceClass_100"
}

variable "custom_domain" {
  description = <<-EOT
    Optionnel. Ton nom de domaine (ex. "yvansaf.dev") si tu en as un.
    Laisse vide ("") pour utiliser uniquement le domaine CloudFront par
    défaut (*.cloudfront.net), fonctionne très bien pour démarrer.
  EOT
  type    = string
  default = ""
}
