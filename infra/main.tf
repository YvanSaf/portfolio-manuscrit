# -----------------------------------------------------------------------------
# main.tf, provider configuration and required version
#
# State is kept local ("terraform.tfstate") to keep things simple at first.
# For real production use, move to a remote backend (S3 + DynamoDB for
# locking) as soon as you work with more than one person or from more than
# one machine, see the note at the bottom of this file.
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

  # --- Remote backend (enable later) ---
  # backend "s3" {
  #   bucket         = "your-terraform-state-bucket"   # created separately, outside this project
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