provider "aws" {
  region = "eu-west-3"
}

module "module-cognito" {
  source  = "./modules/cognito"
  env     = var.env
  project = "swd"
}

module "module-rds" {
  source      = "./modules/rds"
  env         = var.env
  project     = "swd"
  db_username = var.db_username
  db_password = var.db_password
}