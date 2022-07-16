variable "project" {
  type        = string
  description = "Project code"
}

variable "env" {
  type        = string
  description = "Environment code"
}

variable "db_username" {
  type        = string
  description = "RDS admin username"
}

variable "db_password" {
  type        = string
  description = "RDS admin password"
}