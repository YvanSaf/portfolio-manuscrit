# -----------------------------------------------------------------------------
# s3.tf, storage bucket for the static site
#
# Important choice: this bucket stays FULLY PRIVATE. We do NOT enable
# "S3 static website hosting" (the old HTTP only endpoint). Instead,
# CloudFront accesses the bucket through its standard REST endpoint, protected
# by an Origin Access Control (OAC), see cloudfront.tf. This is the method
# recommended by AWS since 2022 (the older OAI is deprecated).
#
# Concrete benefit: even if someone guesses the direct S3 URL, they cannot
# retrieve anything. Only CloudFront (so HTTPS + cache) can read the bucket.
# -----------------------------------------------------------------------------

resource "aws_s3_bucket" "site" {
  bucket = var.bucket_name
}

# Versioning: keeps the history of every deployed file.
# If a deployment breaks, a previous version of an object can be restored
# without having to rebuild anything, near instant rollback.
resource "aws_s3_bucket_versioning" "site" {
  bucket = aws_s3_bucket.site.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Blocks absolutely all public access at the bucket level, even from a future
# policy mistake, CloudFront (through OAC) stays the only access path.
resource "aws_s3_bucket_public_access_block" "site" {
  bucket = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Disables ACLs (current AWS recommended practice): ownership of every
# object always stays with the bucket, simpler to reason about.
resource "aws_s3_bucket_ownership_controls" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# Bucket policy: allows ONLY the CloudFront service to read objects, AND
# only from THIS specific CloudFront distribution (condition on its ARN),
# not any CloudFront distribution in the world.
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