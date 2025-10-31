-- ============================================================
-- Database: healthcare
-- Description: Stores healthcare-related data such as doctor 
--              information and their specializations.
-- ============================================================

-- ✅ Create database if not exists
CREATE DATABASE IF NOT EXISTS medinest_healthcare;

-- ✅ Switch to the newly created database
USE medinest_healthcare;

-- ============================================================
-- Table: specializations
-- Purpose: To store various medical specialization categories
--          (e.g., Skin, Lungs, Heart, etc.)
-- ============================================================
CREATE TABLE specializations (
  id INT AUTO_INCREMENT PRIMARY KEY,            
  specializationName VARCHAR(100) NOT NULL UNIQUE,            
  description TEXT,                             
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- ============================================================
-- Table: doctors
-- Purpose: To store doctor details including their 
--          specialization, experience, and phone info.
-- ============================================================
-- CREATE TABLE doctors (
--   id INT AUTO_INCREMENT PRIMARY KEY,            
--   name VARCHAR(100) NOT NULL,                  
--   specialization_id INT,                       
--   experience INT,                               
--   phone VARCHAR(20),                          
--   location VARCHAR(100),                        
--   rating DECIMAL(2,1),                          
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--   -- Define foreign key relationship
--   FOREIGN KEY (specialization_id) REFERENCES specializations(id)
-- );




CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  gender ENUM('Male','Female','Other'),
  specialization_id INT NOT NULL,
  qualification VARCHAR(255) NOT NULL,
  experience_years INT DEFAULT 0,
  clinic_hospital_name VARCHAR(255),
  location VARCHAR(255),
  consultation_type ENUM('Online','Clinic','Both') DEFAULT 'Both',
  consultation_fee DECIMAL(10,2),
  dp_url VARCHAR(500),
  bio TEXT,
  rating FLOAT DEFAULT 0,
  status ENUM('Active','Inactive','Pending') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (specialization_id) REFERENCES specializations(id)
);
