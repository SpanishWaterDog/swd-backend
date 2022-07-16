locals {
  name_prefix = format("%s-%s", var.project, var.env)

  common_tags = {
    Environment = var.env
    ManagedBy   = "terraform"
    Project     = var.project
  }
}

resource "aws_cognito_user_pool" "pool" {
  name = "${local.name_prefix}-pool"

  password_policy {
    minimum_length    = 8
    require_numbers   = true
    require_lowercase = true
  }

  username_attributes = [
    "email"
  ]
}