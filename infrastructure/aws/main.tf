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

module "module-s3" {
  source  = "./modules/s3"
  env     = var.env
  project = "swd"
}

module "module-cloudfront" {
  source                                = "./modules/cloudfront"
  env                                   = var.env
  project                               = "swd"
  exercises_bucket_id                   = module.module-s3.s3_bucket_id
  exercises_bucket_regional_domain_name = module.module-s3.s3_bucket_regional_domain_name
}