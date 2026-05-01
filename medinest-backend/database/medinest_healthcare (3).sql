-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2026 at 08:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12
-- latest (23/04/2026)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medinest_healthcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `specialization_id` int(11) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `patient_name` varchar(150) NOT NULL,
  `patient_email` varchar(150) NOT NULL,
  `patient_phone` varchar(20) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `appointment_date` date NOT NULL,
  `description` text NOT NULL,
  `slot_id` int(11) NOT NULL,
  `status` enum('pending','done','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `doctor_id`, `specialization_id`, `patient_id`, `patient_name`, `patient_email`, `patient_phone`, `age`, `gender`, `appointment_date`, `description`, `slot_id`, `status`, `created_at`, `image_url`) VALUES
(70, 1, 1, 1, 'Rohit Kumar', 'rohit@example.com', '9991112221', 28, 'Male', '2026-04-24', 'Fever', 25, 'pending', '2026-04-23 06:40:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `specialization_id` int(11) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `experience_years` int(11) DEFAULT 0,
  `clinic_hospital_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `consultation_type` enum('Online','Clinic','Both') DEFAULT 'Both',
  `consultation_fee` decimal(10,2) DEFAULT NULL,
  `dp_url` varchar(500) DEFAULT NULL,
  `dp_public_id` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `full_name`, `email`, `password`, `phone`, `gender`, `specialization_id`, `qualification`, `experience_years`, `clinic_hospital_name`, `location`, `consultation_type`, `consultation_fee`, `dp_url`, `dp_public_id`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'Dr. Ankit Sharma', 'ankit.sharma@example.com', '$2b$10$lpPWPAEzSRiFLTc91/slZOjsi26vaLh9jSGGShnrke8ZNRS5vyu.2', '9876543210', 'Male', 1, 'MBBS, MD', 10, 'City Hospital', 'Delhi', 'Both', 500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1770144682/medinest/doctors/awq0ud5lw2jou0mhxgxl.jpg', NULL, NULL, '2026-04-06 18:43:20', '2026-04-22 18:20:07'),
(2, 'Dr. Neha Verma', 'neha.verma@example.com', '$2b$10$VyxB//J7xc55dlqzSod3geyBCYVoZn669VQ97jkhTHA5Yzk0wTf8S', '9876543211', 'Female', 2, 'MBBS, DDVL', 8, 'Skin Care Clinic', 'Noida', 'Clinic', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330888/doctor1_iz743c.webp', NULL, NULL, '2026-04-06 18:43:20', '2026-04-22 18:20:58'),
(3, 'Dr. Raj Mehta', 'raj.mehta@example.com', '$2b$10$tKYKRgHzrIx2rEpgGx74QuaOjTn489opCOVScplgq5n9a/mJP5RMC', '9876543212', 'Male', 7, 'MBBS, DM Cardiology', 12, 'Heart Center', 'Gurgaon', 'Both', 1000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768331930/doctor2_k3ngyu.jpg', NULL, NULL, '2026-04-06 18:43:20', '2026-04-22 18:21:11'),
(4, 'Dr. Anjali', 'spec1a@medinest.com', '$2b$10$EWV08MZFr4VGH/9wJrHMEuCdlUcVrwuk4ktcS0x5TgrmRjW3KRO06', '9000000001', 'Male', 1, 'MBBS, MD', 5, 'MediCare Clinic', 'Delhi', 'Both', 500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330888/doctor1_iz743c.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-22 18:21:49'),
(5, 'Dr. Suman', 'spec1b@medinest.com', '$2b$10$CFnv9cgd1jBvl3K0..DDZuDF/j0aYU5HiAVv94ggvWOIweGwISewO', '9000000002', 'Female', 1, 'MBBS, MD', 7, 'HealthPlus Center', 'Delhi', 'Clinic', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330887/doctor3_l3ovud.jpg', NULL, NULL, '2026-04-06 18:59:55', '2026-04-22 18:22:10'),
(6, 'Dr. Akshay', 'spec2a@medinest.com', '$2b$10$Mjr08qCuBaG9gplAVIAcD.qgmPayFc3Yc9tE3s.ZWkGqXF4nOS7ZK', '9000000003', 'Male', 2, 'MBBS, Specialist', 6, 'SkinCare Hub', 'Noida', 'Clinic', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330887/doctor4_hvnlme.avif', NULL, NULL, '2026-04-06 18:59:55', '2026-04-22 18:23:12'),
(7, 'Dr. Sumit', 'spec2b@medinest.com', '$2b$10$q66qMsf5AeoVINyHk8dYI.LiwzkrRq8I/tSGbEoaUpY4fImvP4qte', '9000000004', 'Female', 2, 'MBBS, Specialist', 8, 'DermaLife', 'Noida', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330888/doctor6_znjdol.jpg', NULL, NULL, '2026-04-06 18:59:55', '2026-04-22 18:22:49'),
(8, 'Dr. Dheeraj', 'spec3a@medinest.com', '$2b$10$TTa6.IO1297JsOtRLfaUv.LcsKZuEwBv8JPGrtlhJ70xdVmCEpOAq', '9000000005', 'Male', 3, 'MBBS, MD', 10, 'City Hospital', 'Gurgaon', 'Both', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:37:44'),
(9, 'Dr. Sujata', 'spec3b@medinest.com', '$2b$10$JlO/YSABJahdOQu4uhJotOFN2RkihpOzLS0m6GiZAs7siDnt3J6rW', '9000000006', 'Female', 3, 'MBBS, MD', 9, 'Women Care Clinic', 'Gurgaon', 'Clinic', 850.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:37:50'),
(10, 'Dr. Prabhu', 'spec4a@medinest.com', '$2b$10$AXyRqhjyxc6ExpROUUZ.l.UAfW6Y3Hp/xvEPMCHsIHLyrKOMoSECi', '9000000007', 'Male', 4, 'MBBS, Ortho', 11, 'BoneCare', 'Delhi', 'Both', 1000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:37:56'),
(11, 'Dr. Rajesh', 'spec4b@medinest.com', '$2b$10$5eGKOdR.AJG1eSQvb9cqk.VxOVseNrPmf0I9HYJATh5Tyo.Mpgw.C', '9000000008', 'Female', 4, 'MBBS, Ortho', 6, 'Joint Clinic', 'Delhi', 'Clinic', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:01'),
(12, 'Dr. Ajay', 'spec5a@medinest.com', '$2b$10$PvOdVGWSsX9ieOxv1EzhoOWNtU64NWRF1VcnSRyttux9MUDU.F2Tq', '9000000009', 'Male', 5, 'MBBS, ENT', 7, 'ENT Care', 'Noida', 'Both', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:04'),
(13, 'Dr. Yalan', 'spec5b@medinest.com', '$2b$10$4LVvgvhDHIYnyBbmlhlIe.d21HZ8B7qg1d0mBz8997ep4AMSmSY0.', '9000000010', 'Female', 5, 'MBBS, ENT', 5, 'Hearing Clinic', 'Noida', 'Clinic', 550.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:07'),
(14, 'Dr. Jay Pal', 'spec6a@medinest.com', '$2b$10$uEEB6B0Xi8Q2Dzl3D1nKBu9gqJIBjMRAVSTgQWVl0tC4iaHQBgbO.', '9000000011', 'Male', 6, 'MBBS, Neuro', 12, 'Brain Center', 'Delhi', 'Both', 1200.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:10'),
(15, 'Dr. Kalera', 'spec6b@medinest.com', '$2b$10$RYXVe6FJYTDECwjhlDKb7O48yV33F0A7dEI8umuVyMjgqXlWXJdjm', '9000000012', 'Female', 6, 'MBBS, Neuro', 10, 'NeuroCare', 'Delhi', 'Clinic', 1100.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:14'),
(16, 'Dr. Manpreet', 'spec7a@medinest.com', '$2b$10$KxHruReNsP32aqccPdJCE.imxdYtxGlhpFw63PWEqQjhzE3sgV/Je', '9000000013', 'Male', 7, 'MBBS, Cardio', 15, 'Heart Hospital', 'Gurgaon', 'Both', 1500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:18'),
(17, 'Dr. Jatin', 'spec7b@medinest.com', '$2b$10$EKQGdCOJqHLKwddpUd9V2.eK468b3PfsEuEh1IB02xAnx3yW5pfom', '9000000014', 'Female', 7, 'MBBS, Cardio', 13, 'CardioLife', 'Gurgaon', 'Clinic', 1400.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:22'),
(18, 'Dr. Kuldeep', 'spec8a@medinest.com', '$2b$10$kR3rf.w027wd.n9CnDnaH.NDsEc1T1bhqsi6eNOUUCQm9Wl/dIxL.', '9000000015', 'Male', 8, 'MBBS, Urology', 9, 'UroCare', 'Delhi', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:27'),
(19, 'Dr. Virat', 'spec8b@medinest.com', '$2b$10$JCmu365kntyfjsfeDrDztuOz8L.5qsfsuXgzf/9rgmrP0a3/9W2AG', '9000000016', 'Female', 8, 'MBBS, Urology', 7, 'Kidney Clinic', 'Delhi', 'Clinic', 750.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:30'),
(20, 'Dr. Rohit', 'spec9a@medinest.com', '$2b$10$OM2N5GY/eQZvOxRC7uo6O.6zJloBNSYkYvgvlFnnZMThMYZ7fBvBi', '9000000017', 'Male', 9, 'MBBS, Gastro', 11, 'Digestive Care', 'Noida', 'Both', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:32'),
(21, 'Dr. Shubhman', 'spec9b@medinest.com', '$2b$10$KYdoFzKTLTJLDjZW50QFrOB06rCRSydnzPowt/rpcZvVHIWlnXote', '9000000018', 'Female', 9, 'MBBS, Gastro', 8, 'GI Clinic', 'Noida', 'Clinic', 850.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:36'),
(22, 'Dr. Mahendra', 'spec10a@medinest.com', '$2b$10$9oMO7TXw9oBGQ/jqFJ2kCuJviRm1Sfzo/50SNoy/CX4IN7nBjswf6', '9000000019', 'Male', 10, 'MBBS, Psychiatry', 10, 'MindCare', 'Delhi', 'Both', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:40'),
(23, 'Dr. Piyush', 'spec10b@medinest.com', '$2b$10$XY8OZ9SLfz8lZxMC/HStUuc8GJTC9wpAyiR/G3LiKEUXxAd4rOybi', '9000000020', 'Female', 10, 'MBBS, Psychiatry', 6, 'Mental Health Center', 'Delhi', 'Clinic', 650.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:43'),
(24, 'Dr. Harsh', 'spec11a@medinest.com', '$2b$10$lfYRMaeC8fyBdkZrof1yDOKKsPk8bIiBNnwunVynQ9K1p1qFOnFqm', '9000000021', 'Male', 11, 'MBBS, Pediatrics', 8, 'ChildCare', 'Gurgaon', 'Both', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:38:47'),
(25, 'Dr. Vivek', 'spec11b@medinest.com', '$2b$10$DR9q5REN1ZcMQ.PUGoQzeOGc6xqnMtsinaGJOnSAtCbDz/wpVD4y6', '9000000022', 'Female', 11, 'MBBS, Pediatrics', 7, 'Kids Clinic', 'Gurgaon', 'Clinic', 550.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:36:10'),
(26, 'Dr. Akshit', 'spec12a@medinest.com', '$2b$10$rj0G6loSjmp4DlHjAmlShe.Et6svJslJOrMismaVqyqWYcRWwPQJ2', '9000000023', 'Male', 12, 'MBBS, Pulmonology', 9, 'LungCare', 'Delhi', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:27'),
(27, 'Dr. Rachit', 'spec12b@medinest.com', '$2b$10$TUuBm6i7gu6PGImrgQr3p.98i6/Bl.PYPNg7Sv2VvUGJDkaA75SVu', '9000000024', 'Female', 12, 'MBBS, Pulmonology', 6, 'Respiratory Center', 'Delhi', 'Clinic', 750.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:31'),
(28, 'Dr. Arnav', 'spec13a@medinest.com', '$2b$10$FBJ0CYXaEBssNIh65J91FeJ2wYM0DhkQSDXQ161QXwqasotqf3vc6', '9000000025', 'Male', 13, 'MBBS, Endocrinology', 11, 'Hormone Clinic', 'Noida', 'Both', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:34'),
(29, 'Dr. Abhinav', 'spec13b@medinest.com', '$2b$10$SjcOyr4uTGbmyicsBJ.nVOe1dfpOLxrnvdPNDSCWgXdODWlWouiw6', '9000000026', 'Female', 13, 'MBBS, Endocrinology', 8, 'Diabetes Care', 'Noida', 'Clinic', 850.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:37'),
(30, 'Dr. Anubhav', 'spec14a@medinest.com', '$2b$10$lkgw40Anzp2c4AxvWnPAE.Ka33DH12vM6sT5UZq3X31TzlGRrUYR.', '9000000027', 'Male', 14, 'MBBS, Nephrology', 12, 'Kidney Hospital', 'Delhi', 'Both', 1000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:40'),
(31, 'Dr. Kamal', 'spec14b@medinest.com', '$2b$10$pmPMTzP7koM0gagmDPwUteOfAuynznsnpQLynMSaW/4/SCqqPsVLK', '9000000028', 'Female', 14, 'MBBS, Nephrology', 9, 'Renal Care', 'Delhi', 'Clinic', 950.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:43'),
(32, 'Dr. Sujal', 'spec15a@medinest.com', '$2b$10$kvX2IkGnPC3eRpTshC4WduDIQzgZvifflttUYDMM1CCfsTxQbPefi', '9000000029', 'Male', 15, 'MBBS, Neurosurgery', 15, 'Neuro Hospital', 'Delhi', 'Both', 2000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:47'),
(33, 'Dr. Prem', 'spec15b@medinest.com', '$2b$10$c2NQb/zj22/5UHlh9SJST.VJfPyuN.8d85OoPpgkZ1bWHdLL5Fq1C', '9000000030', 'Female', 15, 'MBBS, Neurosurgery', 13, 'Brain Surgery Center', 'Delhi', 'Clinic', 1800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:50'),
(34, 'Dr. Hiritik', 'spec16a@medinest.com', '$2b$10$DNvsmXBI2lScfyv0jSwDWOjtIqVVGjocodeblqnxpdiF9IzIu1kVe', '9000000031', 'Male', 16, 'MBBS, Rheumatology', 10, 'Joint Care', 'Noida', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:53'),
(35, 'Dr. Suresh', 'spec16b@medinest.com', '$2b$10$fqwRrFCnc7ma/YaFAKipHOMw0dXZuMJida7ZbhtRBmKBOaN3oP33K', '9000000032', 'Female', 16, 'MBBS, Rheumatology', 7, 'Arthritis Clinic', 'Noida', 'Clinic', 750.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:39:57'),
(36, 'Dr. Yash', 'spec17a@medinest.com', '$2b$10$hdP3JQIlSSAKoCGfl49wQucY6sS7Xft5Gv4ypv/XiEPKSw3KKQsWS', '9000000033', 'Male', 17, 'MBBS, Ophthalmology', 8, 'Eye Care', 'Delhi', 'Both', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:00'),
(37, 'Dr. Pavan', 'spec17b@medinest.com', '$2b$10$x/vw8hhkhaUPIRuwgF3bD.QOxNtXpQ/i/AoYI25HeEVhqeIYC.yBO', '9000000034', 'Female', 17, 'MBBS, Ophthalmology', 6, 'Vision Center', 'Delhi', 'Clinic', 550.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:02'),
(38, 'Dr. Achal', 'spec18a@medinest.com', '$2b$10$g3gPAGj8AGrz/Lf5r20lfuTLT9mzqtyVHfF4jzomFQi8maXBQo55q', '9000000035', 'Male', 18, 'MBBS, Surgical Gastro', 12, 'Surgery Center', 'Gurgaon', 'Both', 1500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:06'),
(39, 'Dr. Aayu', 'spec18b@medinest.com', '$2b$10$nPEMiLOKBN/2uIAnr4uSlex04Snk4YY/4LgEHCS/P8qgEcFJIGj2i', '9000000036', 'Female', 18, 'MBBS, Surgical Gastro', 10, 'GI Surgery Clinic', 'Gurgaon', 'Clinic', 1400.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:09'),
(40, 'Dr. Alank', 'spec19a@medinest.com', '$2b$10$Fq6bs4lZt1.sHKpWU7KjV.vuhvCv5lEsGYFcErElEEbfXNjX/aEgu', '9000000037', 'Male', 19, 'MBBS, Infectious Disease', 9, 'Infection Care', 'Delhi', 'Both', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:14'),
(41, 'Dr. Udit', 'spec19b@medinest.com', '$2b$10$/QaGssiEqU1wZK9NkDR9EuTuKzBlBxxghoP2Xl96gVaWav5ojJxhO', '9000000038', 'Female', 19, 'MBBS, Infectious Disease', 7, 'Viral Clinic', 'Delhi', 'Clinic', 650.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:19'),
(42, 'Dr. Mudit', 'spec20a@medinest.com', '$2b$10$8psN1NhkyDypYaZJexlyde85IrvMEmQX.3Q3UI9KOY1IQL1rhQCja', '9000000039', 'Male', 20, 'MBBS, Surgeon', 14, 'Surgical Center', 'Noida', 'Both', 1200.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:27'),
(43, 'Dr. Aryan', 'spec20b@medinest.com', '$2b$10$ycuR2iTWeP60W0rQ4Wk4f.Jak7.PVw0C02JWKofjprAjyxjN59S.q', '9000000040', 'Female', 20, 'MBBS, Surgeon', 11, 'Lap Surgery Clinic', 'Noida', 'Clinic', 1100.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:30'),
(44, 'Dr. Sachin', 'spec21a@medinest.com', '$2b$10$q8cSVPzv8P.UMjBT5oC0/OGX..DZz51Z320CHfAAAtThptoXOFx2y', '9000000041', 'Male', 21, 'MA Psychology', 6, 'Mind Wellness', 'Delhi', 'Both', 500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:33'),
(45, 'Dr. Harinder', 'spec21b@medinest.com', '$2b$10$lG06pCvpxiUYk/ondb/E3utJI.hEFkIkSd4ibtZ.HX7RojYJax1Qy', '9000000042', 'Female', 21, 'MA Psychology', 5, 'Therapy Center', 'Delhi', 'Clinic', 450.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:35'),
(46, 'Dr. Brijesh', 'spec22a@medinest.com', '$2b$10$P5Om9aozeysOcl5DkI747eSsKVVXT.gtCFndnb7yjK0SsehKVtjHu', '9000000043', 'Male', 22, 'MBBS, Oncology', 13, 'Cancer Hospital', 'Gurgaon', 'Both', 2000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:38'),
(47, 'Dr. Aditiya', 'spec22b@medinest.com', '$2b$10$wPryB/ETXZIJQyb4ZGfNa.e1SYloGpYTeKeUe9rZD6N.8YwSCUCce', '9000000044', 'Female', 22, 'MBBS, Oncology', 11, 'OncoCare', 'Gurgaon', 'Clinic', 1800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:41'),
(48, 'Dr. Jeet', 'spec23a@medinest.com', '$2b$10$ADzetKjCUGo8z/ueezHhIuZ/YAxLtfQvYxL8VY0uT62.ycIGLkzQ6', '9000000045', 'Male', 23, 'MBBS, Diabetology', 8, 'Diabetes Clinic', 'Delhi', 'Both', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:44'),
(49, 'Dr. Navdheesh', 'spec23b@medinest.com', '$2b$10$zR7u3fHvzLhsQMd.KcLvwec60BxGH5LGZyPdvZ.iQLTW8iRPYt0NG', '9000000046', 'Female', 23, 'MBBS, Diabetology', 6, 'Sugar Care', 'Delhi', 'Clinic', 650.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:47'),
(50, 'Dr. Anuday', 'spec24a@medinest.com', '$2b$10$XBU0U5EYpyF9jIjxvCZHTOl/c4IuHHeReBVb2YbK6mBRUqKzj9Qji', '9000000047', 'Male', 24, 'BDS', 7, 'Dental Care', 'Noida', 'Both', 500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:49'),
(51, 'Dr. Dev', 'spec24b@medinest.com', '$2b$10$D7FoV3Axg23mOZiBTQDHDO7DMxNtBUCQSZF8oRblxWKPlrNdp.Z.2', '9000000048', 'Female', 24, 'BDS', 5, 'Smile Clinic', 'Noida', 'Clinic', 450.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 18:59:55', '2026-04-20 11:40:53'),
(52, 'Dr. Rohan Gupta', 'rohan.gupta1@medinest.com', '$2b$10$QoCoTBvBqv/6iLsMuLg6w.qVoe3jMS6hQzJHAUZS0z1uh1RMyR89S', '9100000001', 'Male', 1, 'MBBS, MD', 6, 'Apollo Clinic', 'Delhi', 'Both', 500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768330887/doctor4_hvnlme.avif', NULL, NULL, '2026-04-06 19:03:28', '2026-04-22 18:24:09'),
(53, 'Dr. Sneha Kapoor', 'sneha.kapoor1@medinest.com', '$2b$10$QWS3il8eXE13eK5s/CJGT.QaOCYGemUAVkuSrIS1/ERrxNBCxRkTe', '9100000002', 'Female', 1, 'MBBS, MD', 8, 'Fortis Clinic', 'Delhi', 'Clinic', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:40:58'),
(54, 'Dr. Arjun Mehra', 'arjun.mehra2@medinest.com', '$2b$10$c4lPAHJIwWNxDKYh3dHYUOreyEtGXTWa4xosBiaux23z155LwSrEG', '9100000003', 'Male', 2, 'MBBS, DDVL', 7, 'Skin Aura', 'Noida', 'Clinic', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:01'),
(55, 'Dr. Pooja Bansal', 'pooja.bansal2@medinest.com', '$2b$10$OJPsP5L9Z2T8c3WjTHllme10nbMbf9HUQoWFWWUQ0PgqNUxWFVN/.', '9100000004', 'Female', 2, 'MBBS, DDVL', 9, 'Derma Glow', 'Noida', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:04'),
(56, 'Dr. Karan Malhotra', 'karan.malhotra3@medinest.com', '$2b$10$wAgXIrcR8VKof.m5JbjtieLNQodlorERKx7aKRY9Z5ea75oLjKGRW', '9100000005', 'Male', 3, 'MBBS, MS', 10, 'Mother Care Hospital', 'Gurgaon', 'Both', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:07'),
(57, 'Dr. Neha Arora', 'neha.arora3@medinest.com', '$2b$10$1HgZAw20GnleyJM3jHHUReU6wbBEVvc28IuY/L.JVvrwj7/YDxBga', '9100000006', 'Female', 3, 'MBBS, MS', 9, 'Women Wellness Clinic', 'Gurgaon', 'Clinic', 850.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:11'),
(58, 'Dr. Vikram Singh', 'vikram.singh4@medinest.com', '$2b$10$tiZJAiaBGmmy8HpQJkrQ2.Nlch5phmkooJxveY2kllQDhbA2MHOTO', '9100000007', 'Male', 4, 'MBBS, Ortho', 11, 'Bone & Joint Care', 'Delhi', 'Both', 1000.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:14'),
(59, 'Dr. Ritu Sharma', 'ritu.sharma4@medinest.com', '$2b$10$jKtBXo8kMexwEMBYv84i6u4/QiWKHFsZpaGKEgF50hlLUF7plr6de', '9100000008', 'Female', 4, 'MBBS, Ortho', 7, 'Ortho Heal', 'Delhi', 'Clinic', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:16'),
(60, 'Dr. Deepak Yadav', 'deepak.yadav5@medinest.com', '$2b$10$tjIbOfkHefPt8/ZklSvIm.i6UFmVsruFjrz8/KdnKuGwp9JBtABSC', '9100000009', 'Male', 5, 'MBBS, ENT', 6, 'ENT Plus', 'Noida', 'Both', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:19'),
(61, 'Dr. Shalini Verma', 'shalini.verma5@medinest.com', '$2b$10$J5p77eyQm9VCdjBMee8j0.k6Mtu/y81XMJKFKchV6xhap/X7LIyBK', '9100000010', 'Female', 5, 'MBBS, ENT', 5, 'Hearing Care', 'Noida', 'Clinic', 550.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:24'),
(62, 'Dr. Ankit Saxena', 'ankit.saxena6@medinest.com', '$2b$10$FI9MhJiz.uei53wG0tHfie/9sBd0QE9OmXHXaZ7IgnT0a9HOvxNjy', '9100000011', 'Male', 6, 'MBBS, DM Neuro', 12, 'Neuro Care Center', 'Delhi', 'Both', 1200.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:27'),
(63, 'Dr. Priyanka Jain', 'priyanka.jain6@medinest.com', '$2b$10$RKXHKcz6T4cf8.LWNizWcuVOmeYi.bkDIZXe5ANDEBeng879/ZoMO', '9100000012', 'Female', 6, 'MBBS, DM Neuro', 10, 'Brain Clinic', 'Delhi', 'Clinic', 1100.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:33'),
(64, 'Dr. Mohit Agarwal', 'mohit.agarwal7@medinest.com', '$2b$10$XeXO3Dr.8t/nQs0H439yP.w5lOas7Q7ikpcaRpgrC2vd6tUraEdo.', '9100000013', 'Male', 7, 'MBBS, Cardio', 14, 'Heart Care', 'Gurgaon', 'Both', 1500.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:37'),
(65, 'Dr. Kavita Sharma', 'kavita.sharma7@medinest.com', '$2b$10$3BnkRVU57B8aszz526Ob5.NF7Rn0VXsdTdQTf6boooWt7.iLLN2s.', '9100000014', 'Female', 7, 'MBBS, Cardio', 12, 'Cardio Clinic', 'Gurgaon', 'Clinic', 1400.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:40'),
(66, 'Dr. Rahul Chaudhary', 'rahul.chaudhary8@medinest.com', '$2b$10$OCG5BAHkBiVJKtiK.QGZMeghH9AvoqPF13eNe.LzKYTVJKqKsVbOy', '9100000015', 'Male', 8, 'MBBS, Urology', 9, 'Uro Plus', 'Delhi', 'Both', 800.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:41:44'),
(67, 'Dr. Meena Gupta', 'meena.gupta8@medinest.com', '$2b$10$IrFU1lE2p8LwBZzJBkiNiOgnuBII6JFR7ulTtAKUKXFu1nJbPzb5O', '9100000016', 'Female', 8, 'MBBS, Urology', 7, 'Kidney Care', 'Delhi', 'Clinic', 750.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:54:28'),
(68, 'Dr. Sandeep Khanna', 'sandeep.khanna9@medinest.com', '$2b$10$84fCKRjyQAQ0pNp6JdY0LufcmAbWrwR0Zi89zkqVg3Vm26iIFEX.O', '9100000017', 'Male', 9, 'MBBS, Gastro', 11, 'Digestive Clinic', 'Noida', 'Both', 900.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:54:56'),
(69, 'Dr. Ruchi Aggarwal', 'ruchi.aggarwal9@medinest.com', '$2b$10$bSv6YUSwpROa7hWmeiJUKu/rEyTFAZeThXUdOrXma0hHz9EBjUpAa', '9100000018', 'Female', 9, 'MBBS, Gastro', 8, 'GI Care', 'Noida', 'Clinic', 850.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:55:00'),
(70, 'Dr. Nitin Arora', 'nitin.arora10@medinest.com', '$2b$10$x1iMjFo19rC76retuaBvK.1BN/z/vvscNe3a2GmNWfsknxGr6JAEK', '9100000019', 'Male', 10, 'MBBS, Psychiatry', 9, 'Mind Heal', 'Delhi', 'Both', 700.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:55:09'),
(71, 'Dr. Aditi Sinha', 'aditi.sinha10@medinest.com', '$2b$10$yUyJlB5ePa.BHtberZFBueI/WXNcyPCLZgGxyIejsxSIBtX8bWdBm', '9100000020', 'Female', 10, 'MBBS, Psychiatry', 7, 'Mental Wellness', 'Delhi', 'Clinic', 650.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:55:16'),
(72, 'Dr. Vivek Mishra', 'vivek.mishra11@medinest.com', '$2b$10$N9ATomEr4IC/jbMEJprZEOm9WE/vTW6njgV9R8mD1..Ubao.l7Ziu', '9100000021', 'Male', 11, 'MBBS, Pediatrics', 8, 'Child Health', 'Gurgaon', 'Both', 600.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:56:05'),
(73, 'Dr. Anjali Singh', 'anjali.singh11@medinest.com', '$2b$10$68GO.B3pdHQ.QBuC4D9sIOZ82JY.9/UUg.GOR9KUIStTaKrb9CDqW', '9100000022', 'Female', 11, 'MBBS, Pediatrics', 6, 'Kids Care', 'Gurgaon', 'Clinic', 550.00, 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776684944/no-dp_16_b0o7ft.webp', NULL, NULL, '2026-04-06 19:03:28', '2026-04-20 11:56:15'),
(74, 'Dr. Rajat Tiwari', 'rajat.tiwari12@medinest.com', '$2b$10$D.b/wV/cSB.cqgoEziuqCOPqTK//Wc5v/uhme56r4NmGA0rSvcskK', '9100000023', 'Male', 12, 'MBBS, Pulmonology', 10, 'Lung Clinic', 'Delhi', 'Both', 800.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:23'),
(75, 'Dr. Swati Verma', 'swati.verma12@medinest.com', '$2b$10$TgtXJkkoYD3cU4ja4jce7OEojjqo5tEnLq7zoyUAtaBBogafXMN2O', '9100000024', 'Female', 12, 'MBBS, Pulmonology', 7, 'Respiratory Care', 'Delhi', 'Clinic', 750.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:23'),
(76, 'Dr. Gaurav Bhatia', 'gaurav.bhatia13@medinest.com', '$2b$10$kCEtTj9huYC3YyMgeVKqjeFUf.ywyk6enrkc5AFL1KtVXtjUuFRMu', '9100000025', 'Male', 13, 'MBBS, Endocrine', 11, 'Hormone Care', 'Noida', 'Both', 900.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:23'),
(77, 'Dr. Nisha Kapoor', 'nisha.kapoor13@medinest.com', '$2b$10$o2nIW3JWv0nrxda1UQfCIO0TK4zhXdsYsRQ2inXdsth9PtXfsA0mW', '9100000026', 'Female', 13, 'MBBS, Endocrine', 8, 'Diabetes Clinic', 'Noida', 'Clinic', 850.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(78, 'Dr. Ashish Yadav', 'ashish.yadav14@medinest.com', '$2b$10$qmqIR1LeO9kd5nV/iHEhj.4UmoQcMoKAa6BEmX/1aQwn5dF9BjRDu', '9100000027', 'Male', 14, 'MBBS, Nephro', 12, 'Kidney Center', 'Delhi', 'Both', 1000.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(79, 'Dr. Poonam Sharma', 'poonam.sharma14@medinest.com', '$2b$10$K6KZr/nFhLqnFBWNGUwvmetaNsA5IZESlMqVqLRtp32J43Jty98s2', '9100000028', 'Female', 14, 'MBBS, Nephro', 9, 'Renal Care', 'Delhi', 'Clinic', 950.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(80, 'Dr. Sanjay Kumar', 'sanjay.kumar15@medinest.com', '$2b$10$L1pjgcxeLH1v.tNQOj8p3.QEjtRSk.j3Ne/M7VsZSyuZ6LELQSKIe', '9100000029', 'Male', 15, 'MBBS, Neurosurgery', 15, 'Neuro Hospital', 'Delhi', 'Both', 2000.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(81, 'Dr. Rekha Jain', 'rekha.jain15@medinest.com', '$2b$10$I9o54ETD.PD8o/kYPCEUU.yaJGR9bKEjdut.I2iYqllYOHTscmQhu', '9100000030', 'Female', 15, 'MBBS, Neurosurgery', 13, 'Brain Care', 'Delhi', 'Clinic', 1800.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(82, 'Dr. Manish Gupta', 'manish.gupta16@medinest.com', '$2b$10$HvKjxOTkZhd4IJsPJEmV4ejYFYwcjoTyn8uZtFQP3uU2rogx9r9LS', '9100000031', 'Male', 16, 'MBBS, Rheumatology', 9, 'Joint Clinic', 'Noida', 'Both', 800.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(83, 'Dr. Seema Arora', 'seema.arora16@medinest.com', '$2b$10$t5thT6zW4TWv5Cx6v3q2d.eUjRspxojp/hbMuKPu1IzzhMC9Wii8u', '9100000032', 'Female', 16, 'MBBS, Rheumatology', 7, 'Arthritis Care', 'Noida', 'Clinic', 750.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(84, 'Dr. Ajay Verma', 'ajay.verma17@medinest.com', '$2b$10$UxAYpWeIjnj1L0dLaA.jfe6GNgloKur5MnKdj1fxuf43IlkM7gkO6', '9100000033', 'Male', 17, 'MBBS, Eye', 8, 'Vision Care', 'Delhi', 'Both', 600.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(85, 'Dr. Pooja Sharma', 'pooja.sharma17@medinest.com', '$2b$10$sukeoRqIdVFJyS4GXtR09eFr1sQioCjXBWiuWIFrntrUZMLQ3AD36', '9100000034', 'Female', 17, 'MBBS, Eye', 6, 'Eye Clinic', 'Delhi', 'Clinic', 550.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(86, 'Dr. Rakesh Malhotra', 'rakesh.malhotra18@medinest.com', '$2b$10$pTe9sQu3AOKduBAQvoCAu.dbiY3IpuFkTOl.aJwUG5HHYAHhIOHDW', '9100000035', 'Male', 18, 'MBBS, Surgical Gastro', 12, 'Surgery Hub', 'Gurgaon', 'Both', 1500.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(87, 'Dr. Neelam Gupta', 'neelam.gupta18@medinest.com', '$2b$10$mv7Sz3FT6OQYNOobPoNcrumB4QUO57yh5d4n8jLSpCnpw39Q85KtG', '9100000036', 'Female', 18, 'MBBS, Surgical Gastro', 10, 'GI Surgery Care', 'Gurgaon', 'Clinic', 1400.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(88, 'Dr. Imran Khan', 'imran.khan19@medinest.com', '$2b$10$yqoiJ1fQvn/BuGD/3PR9L.Oj5wU4dl4r6p.MVNrgn/13TX85WBp2y', '9100000037', 'Male', 19, 'MBBS, Infectious Disease', 9, 'Infection Care', 'Delhi', 'Both', 700.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:24'),
(89, 'Dr. Farah Ali', 'farah.ali19@medinest.com', '$2b$10$b3BkynLFIZ.3lsFEu4hkO.QDA//DhyLwXh9eQdRuS8nQkFe/WFXRK', '9100000038', 'Female', 19, 'MBBS, Infectious Disease', 7, 'Viral Clinic', 'Delhi', 'Clinic', 650.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(90, 'Dr. Rajesh Singh', 'rajesh.singh20@medinest.com', '$2b$10$IododeAbE6TyVPMiq2yD5uB9uQZ8QZFxItWhMIy97Dl4Vzf//gRhO', '9100000039', 'Male', 20, 'MBBS, Surgeon', 14, 'Surgical Center', 'Noida', 'Both', 1200.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(91, 'Dr. Sunita Yadav', 'sunita.yadav20@medinest.com', '$2b$10$kF6oFmpMGE5IYACJ8xwKb.ClWQcBXpLH5cnYq3FqEwWWH0bEzyf0e', '9100000040', 'Female', 20, 'MBBS, Surgeon', 11, 'Lap Surgery Clinic', 'Noida', 'Clinic', 1100.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(92, 'Dr. Alok Mishra', 'alok.mishra21@medinest.com', '$2b$10$UL4pDuFGizunKuBVIt1ly.TZKr0BMfKeezo4E8T5xxdjGzSvvUkK6', '9100000041', 'Male', 21, 'MA Psychology', 6, 'Mind Wellness', 'Delhi', 'Both', 500.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(93, 'Dr. Riya Kapoor', 'riya.kapoor21@medinest.com', '$2b$10$IGyzOZ2VS41CpF0RLiQxPub5fcIFCqrHugdyry5nYeJytC7B1h21a', '9100000042', 'Female', 21, 'MA Psychology', 5, 'Therapy Center', 'Delhi', 'Clinic', 450.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(94, 'Dr. Anil Sharma', 'anil.sharma22@medinest.com', '$2b$10$0O8lURh3syL3BccfSh5ns.3Kijneq.5658z4bcRZvT48HnbMYYRIK', '9100000043', 'Male', 22, 'MBBS, Oncology', 13, 'Cancer Hospital', 'Gurgaon', 'Both', 2000.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(95, 'Dr. Meera Sinha', 'meera.sinha22@medinest.com', '$2b$10$MIF4qdzi4yPJZS.kx7H0hu2SkFmDQEnl46DPgtaZwjFQVyhHQqQf2', '9100000044', 'Female', 22, 'MBBS, Oncology', 11, 'Onco Care', 'Gurgaon', 'Clinic', 1800.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(96, 'Dr. Dinesh Agarwal', 'dinesh.agarwal23@medinest.com', '$2b$10$hzl9dwuLwREWdhcfa0ZVUOR9VPBntLfRUa.Jy/C47emIuU.UeUYHS', '9100000045', 'Male', 23, 'MBBS, Diabetology', 8, 'Diabetes Care', 'Delhi', 'Both', 700.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(97, 'Dr. Shweta Jain', 'shweta.jain23@medinest.com', '$2b$10$4pOUTXh8S3O/iZHHP0EO4uuxO.jqI0Gm6XBP2UvkAYNFNfgU85zvy', '9100000046', 'Female', 23, 'MBBS, Diabetology', 6, 'Sugar Clinic', 'Delhi', 'Clinic', 650.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(98, 'Dr. Harsh Vardhan', 'harsh.vardhan24@medinest.com', '$2b$10$l3PkR5.wbMnEl7eqFH4K7.XTtRjav5owG1TI5y.BgCOsEdFq73wha', '9100000047', 'Male', 24, 'BDS', 7, 'Dental Care', 'Noida', 'Both', 500.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25'),
(99, 'Dr. Komal Gupta', 'komal.gupta24@medinest.com', '$2b$10$NvqiGs4hpZ53cztSsTNj1eRHc3Xr/lpMZwOZKKxubnrlsgMJIKPdO', '9100000048', 'Female', 24, 'BDS', 5, 'Smile Dental', 'Noida', 'Clinic', 450.00, NULL, NULL, NULL, '2026-04-06 19:03:28', '2026-04-07 16:34:25');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE `doctor_availability` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `day_of_week` varchar(10) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_availability`
--

INSERT INTO `doctor_availability` (`id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `slot_duration`) VALUES
(1, 1, 'Mon', '10:00:00', '11:00:00', 60),
(2, 1, 'Mon', '11:00:00', '12:00:00', 60),
(3, 1, 'Mon', '12:00:00', '13:00:00', 60),
(4, 1, 'Mon', '13:00:00', '14:00:00', 60),
(5, 1, 'Mon', '14:00:00', '15:00:00', 60),
(6, 1, 'Tue', '10:00:00', '11:00:00', 60),
(7, 1, 'Tue', '11:00:00', '12:00:00', 60),
(8, 1, 'Tue', '12:00:00', '13:00:00', 60),
(9, 1, 'Tue', '13:00:00', '14:00:00', 60),
(10, 1, 'Tue', '14:00:00', '15:00:00', 60),
(11, 1, 'Wed', '10:00:00', '11:00:00', 60),
(12, 1, 'Wed', '11:00:00', '12:00:00', 60),
(13, 1, 'Wed', '12:00:00', '13:00:00', 60),
(14, 1, 'Wed', '13:00:00', '14:00:00', 60),
(15, 1, 'Wed', '14:00:00', '15:00:00', 60),
(16, 1, 'Thu', '10:00:00', '11:00:00', 60),
(17, 1, 'Thu', '11:00:00', '12:00:00', 60),
(18, 1, 'Thu', '12:00:00', '13:00:00', 60),
(19, 1, 'Thu', '13:00:00', '14:00:00', 60),
(20, 1, 'Thu', '14:00:00', '15:00:00', 60),
(21, 1, 'Fri', '10:00:00', '11:00:00', 60),
(22, 1, 'Fri', '11:00:00', '12:00:00', 60),
(23, 1, 'Fri', '12:00:00', '13:00:00', 60),
(24, 1, 'Fri', '13:00:00', '14:00:00', 60),
(25, 1, 'Fri', '14:00:00', '15:00:00', 60);

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` int(11) NOT NULL,
  `holiday_date` date NOT NULL,
  `reason` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`id`, `holiday_date`, `reason`) VALUES
(1, '2026-01-26', 'Republic Day'),
(2, '2026-08-15', 'Independence Day'),
(3, '2026-10-02', 'Gandhi Jayanti');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `age` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `patient_name`, `email`, `password`, `phone`, `gender`, `age`, `created_at`) VALUES
(1, 'Rohit Kumar', 'rohit@example.com', '$2b$10$lRhRPQDsPNUQzONx0lu.euMxq.rZ3d6LlTXM88GAx.NMoDrxN1nRS', '9991112221', 'Male', 28, '2026-04-06 18:43:39'),
(2, 'Priya Singh', 'priya@example.com', '$2b$10$Fxz0a64L1CAWopXx2.9W3uuCavIZct5Qf7SSuw.UycMnk5CoYuyG6', '9991112222', 'Female', 24, '2026-04-06 18:43:39'),
(3, 'Aman Gupta', 'aman@example.com', '$2b$10$XZyxKTmp1i1ydejg.rdOReT50puGMxG4eYqImbwlNzV1RHcyPjqXa', '9991112223', 'Male', 35, '2026-04-06 18:43:39'),
(4, 'Rohit Sharma', 'rohit.sharma1@medinest.com', '$2b$10$SiOR4OiqLWKacrLiKXISF.I/LC4hS0TOrVjlupib2b0AvILs05I.u', '9200000001', 'Male', 28, '2026-04-06 19:05:30'),
(5, 'Priya Singh', 'priya.singh1@medinest.com', '$2b$10$sEUlqD.cTvvulg06rDkQg.s3FYQgBXeLJNo3qG5qkPKNqBaXw5JVi', '9200000002', 'Female', 24, '2026-04-06 19:05:30'),
(6, 'Amit Kumar', 'amit.kumar1@medinest.com', '$2b$10$T9KdtQ.9ggQjXl5g6bQ8euvSi4cH80un2a6BJspfQHYqzM29p6kX2', '9200000003', 'Male', 32, '2026-04-06 19:05:30'),
(7, 'Neha Gupta', 'neha.gupta1@medinest.com', '$2b$10$w96pd84cLhJ1yLk/zZwAYOnf2XbGNzTJ.tleUO9aImUvoLdEMWqt6', '9200000004', 'Female', 26, '2026-04-06 19:05:30'),
(8, 'Rahul Verma', 'rahul.verma1@medinest.com', '$2b$10$DxefKS01B0DmQkNN.tErpOfaiNDqA.aIrcSTxD/ZYL4qA5GXphUxe', '9200000005', 'Male', 30, '2026-04-06 19:05:30'),
(9, 'Sneha Kapoor', 'sneha.kapoor1@medinest.com', '$2b$10$KqYBoKzC2mvXyuy1mAWxGuUWXfGIrBYqYUI.wSWGXdJKQvLwvnJW2', '9200000006', 'Female', 22, '2026-04-06 19:05:30'),
(10, 'Vikas Yadav', 'vikas.yadav1@medinest.com', '$2b$10$dSEw38eCUrfqKE.GTjFApuF65XSxXkktw.H8t4ikiIVsE1bKly4dK', '9200000007', 'Male', 35, '2026-04-06 19:05:30'),
(11, 'Pooja Bansal', 'pooja.bansal1@medinest.com', '$2b$10$cYPYUZW4D4qgNN4WBixGOu4kbcjejauHUdKWByJN.khg/2PWdZ0NG', '9200000008', 'Female', 27, '2026-04-06 19:05:30'),
(12, 'Arjun Mehra', 'arjun.mehra1@medinest.com', '$2b$10$kpZcdKJ4Eh47bhX23E8EvOs32BWYPOYB/dzh3NMeY/HS3tBcRMzkq', '9200000009', 'Male', 29, '2026-04-06 19:05:30'),
(13, 'Kavita Sharma', 'kavita.sharma1@medinest.com', '$2b$10$2Ndluy3t.qht9jED.foRBOyI8jXr7PcTTEtQi.gy1u3z6Vy1onRg6', '9200000010', 'Female', 34, '2026-04-06 19:05:30'),
(14, 'Deepak Singh', 'deepak.singh1@medinest.com', '$2b$10$NTiI8my70zJR18hpJM.AvOz/K2O0BB6PxtET4Uve7CU9wbaq223f6', '9200000011', 'Male', 40, '2026-04-06 19:05:30'),
(15, 'Ritu Arora', 'ritu.arora1@medinest.com', '$2b$10$j3HhxPK.Li7lp1gSFnjRkeOvfi2r//xvtDxDgpa1hugOt4pHYZEi.', '9200000012', 'Female', 31, '2026-04-06 19:05:30'),
(16, 'Manish Gupta', 'manish.gupta1@medinest.com', '$2b$10$oFrPfU3SqpoL62cIgognreDapf3q/vhJISTBVD0A7NZ2cJbSVKhBS', '9200000013', 'Male', 36, '2026-04-06 19:05:30'),
(17, 'Anjali Mishra', 'anjali.mishra1@medinest.com', '$2b$10$XX/BPOMLsYLbyM0z./.J9.q2J0cmSNbeOcq8b.YuyDIoEBslG1y2u', '9200000014', 'Female', 23, '2026-04-06 19:05:30'),
(18, 'Sandeep Khanna', 'sandeep.khanna1@medinest.com', '$2b$10$aD/BtQfvhjdzWcCwuH3t6uqmHhl4ciR9LPSboWVSJHyyHwWcPiP6S', '9200000015', 'Male', 38, '2026-04-06 19:05:30'),
(19, 'Swati Verma', 'swati.verma1@medinest.com', '$2b$10$8XjiVW7hDNak/a.MZAElNO3eUL.ArKoTpQ8SNJNB0pVjPRVkig8V2', '9200000016', 'Female', 28, '2026-04-06 19:05:30'),
(20, 'Rakesh Jain', 'rakesh.jain1@medinest.com', '$2b$10$pm0PEDv3T7rtnf1wPefq3ejYuR/nQ5650uZTq0m7/gQpWhJ8CalOu', '9200000017', 'Male', 45, '2026-04-06 19:05:30'),
(21, 'Nisha Kapoor', 'nisha.kapoor1@medinest.com', '$2b$10$tSYjcJ7ezzeeB.ASWVitVOSQ08cASqBBSlVRxY71JjjKZSjfGf7cm', '9200000018', 'Female', 33, '2026-04-06 19:05:30'),
(22, 'Ajay Tiwari', 'ajay.tiwari1@medinest.com', '$2b$10$hRQBCq1NCr6YhE3r5mshPOIMMz0FyFC.z6TZCt7HZ/f5YkR938o7q', '9200000019', 'Male', 37, '2026-04-06 19:05:30'),
(23, 'Poonam Yadav', 'poonam.yadav1@medinest.com', '$2b$10$M7.usgqJmLHVy3YsN0GAQekKevTKe4jVl0kZBFWUMNavl0SQ27R7u', '9200000020', 'Female', 29, '2026-04-06 19:05:30'),
(24, 'Imran Khan', 'imran.khan1@medinest.com', '$2b$10$dVNzkWBBCOrq1o.ZF.FARej2JrolDPbpd1RgjSEDvxlceK8.xdVmG', '9200000021', 'Male', 41, '2026-04-06 19:05:30'),
(25, 'Farah Ali', 'farah.ali1@medinest.com', '$2b$10$Z.kOAIA4yOAxI6HrBMPC4Ol0Mc.ltb.NAwz412Nx5XfhhL8SaYW8u', '9200000022', 'Female', 26, '2026-04-06 19:05:30'),
(26, 'Gaurav Bhatia', 'gaurav.bhatia1@medinest.com', '$2b$10$8PwfldNgo6XaoM2B1FllLuk6koBVkc1I8I8ipC623fnFXUoc8p3F.', '9200000023', 'Male', 34, '2026-04-06 19:05:30'),
(27, 'Meera Sinha', 'meera.sinha1@medinest.com', '$2b$10$kWLgMarHN/.4K.VToL6Gu.YivauaB4E5MI.ND6K2bYxWs5hhlKIXi', '9200000024', 'Female', 30, '2026-04-06 19:05:30'),
(28, 'Dinesh Agarwal', 'dinesh.agarwal1@medinest.com', '$2b$10$6cL1T2Xy13/5P6i2/bxIs.gmo267ESqa2sCdssbS73mtVyP32QIBC', '9200000025', 'Male', 42, '2026-04-06 19:05:30');

-- --------------------------------------------------------

--
-- Table structure for table `specializations`
--

CREATE TABLE `specializations` (
  `id` int(11) NOT NULL,
  `specialization_name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `specialization_img_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specializations`
--

INSERT INTO `specializations` (`id`, `specialization_name`, `description`, `created_at`, `specialization_img_url`) VALUES
(1, 'General Physician', 'Diagnosis and treatment of general health conditions and internal diseases', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151970/General_Physician_hco6wf.webp'),
(2, 'Dermatology', 'Skin, hair, and nail related treatments and disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151968/Dermatology_cjnmrt.webp'),
(3, 'Obstetrics & Gynaecology', 'Women’s reproductive health, pregnancy, and childbirth care', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151966/Obstetrics___Gynaecology_tzsctk.webp'),
(4, 'Orthopaedics', 'Bone, joint, and musculoskeletal system disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151965/Orthopaedics_xzldpu.webp'),
(5, 'ENT', 'Ear, Nose, and Throat related treatments', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151964/ENT_ebmk7c.webp'),
(6, 'Neurology', 'Disorders related to brain, spinal cord, and nervous system', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151962/Neurology_mgve6i.webp'),
(7, 'Cardiology', 'Heart and blood vessel related diseases', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151961/Cardiology_lfpxrx.webp'),
(8, 'Urology', 'Urinary tract and male reproductive system disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151959/Urology_mqeoyp.webp'),
(9, 'Gastroenterology', 'Digestive system and gastrointestinal disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151958/Gastroenterology_GI_medicine_gg9ter.webp'),
(10, 'Psychiatry', 'Mental health disorders and treatments using medication', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151957/Psychiatry_blnjxl.webp'),
(11, 'Paediatrics', 'Medical care for infants, children, and adolescents', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151956/Paediatrics_q4yvvo.webp'),
(12, 'Pulmonology', 'Lung and respiratory system diseases', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151954/Pulmonology_Respiratory_Medicine_ampruc.webp'),
(13, 'Endocrinology', 'Hormonal disorders including thyroid and metabolism issues', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151954/Endocrinology_fgqbtq.webp'),
(14, 'Nephrology', 'Kidney-related diseases and treatments', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151954/Nephrology_ipl90f.webp'),
(15, 'Neurosurgery', 'Surgical treatment of brain and nervous system disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768151953/Neurosurgery_ge5b3a.webp'),
(16, 'Rheumatology', 'Autoimmune and joint-related diseases like arthritis', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776685475/6e8e535f-2df3-46f8-967e-1a04306c35a4-1718394797424_mrvtsb.webp'),
(17, 'Ophthalmology', 'Eye-related disorders and vision care', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776685864/4da153f2-a7b3-46ac-8d61-7f5661ab9904-1718394497597_rbjfsp.webp'),
(18, 'Surgical Gastroenterology', 'Surgical treatment of digestive system disorders', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776685817/f3dcf81b-e39d-4844-a5f0-ed7192d94b1a-1718361900653_wzsigc.webp'),
(19, 'Infectious Disease', 'Diagnosis and treatment of infections and communicable diseases', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776685506/cbc11a69-397f-4478-b526-ba9820f3d652-1718394144943_toxjq6.webp'),
(20, 'General & Laparoscopic Surgeon', 'General surgeries including minimally invasive procedures', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1776685510/8845cfb0-7f3b-49fe-81ed-0f639c97ba23-1718393972666_w8utlq.webp'),
(21, 'Psychology', 'Behavioral and mental health therapy without medication', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768221479/Psychology_zl9xeq.webp'),
(22, 'Medical Oncology', 'Cancer diagnosis and treatment using chemotherapy and other methods', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768221479/Medical_Oncology_jmvikf.webp'),
(23, 'Diabetology', 'Management and treatment of diabetes', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768221479/Diabetology_bvqwj9.webp'),
(24, 'Dentist', 'Oral health, teeth, and gum care', '2026-04-06 18:14:25', 'https://res.cloudinary.com/dxxainoaz/image/upload/v1768221479/Dentist_u1hczc.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_slot_booking` (`slot_id`,`appointment_date`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `fk_patient` (`patient_id`),
  ADD KEY `fk_appointmests_specialization` (`specialization_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- Indexes for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `specializations`
--
ALTER TABLE `specializations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `specializationName` (`specialization_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `specializations`
--
ALTER TABLE `specializations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  ADD CONSTRAINT `fk_appointments_slot` FOREIGN KEY (`slot_id`) REFERENCES `doctor_availability` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_appointmests_specialization` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  ADD CONSTRAINT `fk_slot` FOREIGN KEY (`slot_id`) REFERENCES `doctor_availability` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`specialization_id`) REFERENCES `specializations` (`id`);

--
-- Constraints for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
