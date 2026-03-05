-- Create Database
CREATE DATABASE IF NOT EXISTS `Forex-TrackerDB`;
USE `Forex-TrackerDB`;

-- SuperAdmin Table
CREATE TABLE IF NOT EXISTS `superadmin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Table
CREATE TABLE IF NOT EXISTS `admin` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'admin',
  `created_by` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`created_by`) REFERENCES `superadmin`(`id`) ON DELETE SET NULL
);

-- Insert default superadmin
INSERT INTO `superadmin` (`full_name`, `username`, `password`, `role`) 
VALUES ('Super Admin', 'superadmin', 'admin123', 'superadmin');

-- Insert sample admins
INSERT INTO `admin` (`full_name`, `username`, `password`, `role`, `created_by`) 
VALUES 
('Admin One', 'admin1', 'admin123', 'admin', 1),
('Admin Two', 'admin2', 'admin123', 'admin', 1);
