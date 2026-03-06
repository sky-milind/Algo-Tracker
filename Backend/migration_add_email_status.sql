-- Migration script to add email and status columns to admin table
USE `Forex-TrackerDB`;

-- Step 1: Add email column as nullable first
ALTER TABLE admin 
ADD COLUMN email VARCHAR(100) NULL AFTER username;

-- Step 2: Add status column with default value
ALTER TABLE admin 
ADD COLUMN status TINYINT(1) DEFAULT 1 COMMENT '0=inactive, 1=active' AFTER role;

-- Step 3: Update existing records with temporary email addresses
-- (You should update these with real email addresses if you have them)
UPDATE admin SET email = CONCAT(username, '@temp.com') WHERE email IS NULL;

-- Step 4: Now make email NOT NULL and UNIQUE
ALTER TABLE admin 
MODIFY COLUMN email VARCHAR(100) NOT NULL UNIQUE;

-- Verify the changes
SELECT * FROM admin;
