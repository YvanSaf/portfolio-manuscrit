# -----------------------------------------------------------------------------
# main.tf, configuration du provider et version requise
#
# Le state est en local ("terraform.tfstate") pour démarrer simplement.
# Pour un vrai usage pro, migre vers un backend distant (S3 + DynamoDB pour
# le lock) dès que tu bosses à plusieurs ou depuis plusieurs machines , 
# voir la note en bas de ce fichier.
# -----------------------------------------------------------------------------

terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  # --- Backend distant (à activer plus tard) ---
  # backend "s3" {
  #   bucket         = "ton-bucket-terraform-state"   # créé à part, hors de ce projet
  #   key            = "portfolio/terraform.tfstate"
  #   region         = "eu-west-3"
  #   dynamodb_table = "terraform-locks"
  #   encrypt        = true
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      ManagedBy   = "terraform"
      Environment = var.environment
    }
  }
}
