locals {
  name_prefix = format("%s-%s", var.project, var.env)

  common_tags = {
    Environment = var.env
    ManagedBy   = "terraform"
    Project     = var.project
  }
}

resource "aws_s3_bucket" "exercises_bucket" {
  bucket = "${local.name_prefix}-exercises"
  acl = "public-read"

  tags = merge(
    local.common_tags,
    {
      Name = "${local.name_prefix}-exercises"
    }
  )
}

resource "aws_s3_bucket_policy" "prod_website" {
  bucket = aws_s3_bucket.exercises_bucket.id
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
      {
          "Sid": "PublicReadGetObject",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
             "s3:GetObject"
          ],
          "Resource": [
             "arn:aws:s3:::${aws_s3_bucket.exercises_bucket.id}/*"
          ]
      }
    ]
}
POLICY
}