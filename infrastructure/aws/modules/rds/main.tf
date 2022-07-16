locals {
  name_prefix = format("%s-%s", var.project, var.env)

  common_tags = {
    Environment = var.env
    ManagedBy   = "terraform"
    Project     = var.project
  }
}

resource "aws_db_instance" "database" {
  identifier           = "swd-database"
  storage_type         = "gp2"
  allocated_storage    = 20

  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t2.micro"
  port                 = "3306"

  db_name              = "swd"
  username             = var.db_username
  password             = var.db_password

  parameter_group_name = "default.mysql8.0"
  publicly_accessible  = true
  deletion_protection  = true
  skip_final_snapshot  = true
}