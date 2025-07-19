-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2025 at 05:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `enrollmentthesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_year`
--

CREATE TABLE `academic_year` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_year`
--

INSERT INTO `academic_year` (`id`, `start`, `end`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '2024-08-19', '2025-05-17', 'open', NULL, '2025-05-02 04:13:26', '2025-05-02 06:23:33'),
(2, '2025-09-08', '2026-03-23', 'closed', NULL, '2025-05-02 17:52:11', '2025-05-02 17:52:11');

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail_billing`
--

CREATE TABLE `audit_trail_billing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail_curriculum`
--

CREATE TABLE `audit_trail_curriculum` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audit_trail_curriculum`
--

INSERT INTO `audit_trail_curriculum` (`id`, `description`, `user`, `created_at`, `updated_at`) VALUES
(1, 'CS01 has been created', '1', '2025-05-02 04:22:21', '2025-05-02 04:22:21'),
(2, 'IS has been created', '1', '2025-05-02 04:22:41', '2025-05-02 04:22:41'),
(3, 'STEM has been created', '1', '2025-05-02 04:23:02', '2025-05-02 04:23:02'),
(4, 'ICT has been created', '1', '2025-05-02 04:23:25', '2025-05-02 04:23:25'),
(5, 'ABM has been created', '1', '2025-05-02 04:23:50', '2025-05-02 04:23:50'),
(6, 'IS has been updated', '1', '2025-05-02 04:24:15', '2025-05-02 04:24:15'),
(7, 'CS has been updated', '1', '2025-05-02 04:40:12', '2025-05-02 04:40:12');

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail_enrollment`
--

CREATE TABLE `audit_trail_enrollment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audit_trail_student`
--

CREATE TABLE `audit_trail_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `billing_type`
--

CREATE TABLE `billing_type` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `program_name` text DEFAULT NULL,
  `no_unit` text DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `discount_title` varchar(255) DEFAULT NULL,
  `discount_amount` double DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'i:1;', 1746258118),
('da4b9237bacccdf19c0760cab7aec4a8359010b0:timer', 'i:1746258118;', 1746258118);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campus`
--

CREATE TABLE `campus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` longtext NOT NULL,
  `url` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campus`
--

INSERT INTO `campus` (`id`, `name`, `location`, `url`, `created_at`, `updated_at`) VALUES
(1, 'Banlic - Main', 'Banlic City of Cabuyao Laguna', '...', '2025-05-03 04:42:06', '2025-05-03 04:42:06'),
(2, 'Uno', 'Sala City of Cabuyao Laguna', ',.,', '2025-05-03 04:42:28', '2025-05-03 04:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `college_billing`
--

CREATE TABLE `college_billing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_code` varchar(255) NOT NULL,
  `year_level` varchar(255) DEFAULT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `down_payment` double DEFAULT NULL,
  `prelim` double DEFAULT NULL,
  `midterm` double DEFAULT NULL,
  `finals` double DEFAULT NULL,
  `no_unit` int(11) DEFAULT NULL,
  `per_unit` double DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `college_billing`
--

INSERT INTO `college_billing` (`id`, `program_code`, `year_level`, `payment_type`, `down_payment`, `prelim`, `midterm`, `finals`, `no_unit`, `per_unit`, `total_amount`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'general', '1st Year', 'installment', 2000, 2000, 2000, 2000, NULL, NULL, 8000, NULL, '2025-05-02 06:30:05', '2025-05-02 06:30:05');

-- --------------------------------------------------------

--
-- Table structure for table `display_settings`
--

CREATE TABLE `display_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade_sidebar` tinyint(1) NOT NULL DEFAULT 0,
  `enrollment_sidebar` tinyint(1) NOT NULL DEFAULT 0,
  `evaluation_sidebar` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `display_settings`
--

INSERT INTO `display_settings` (`id`, `grade_sidebar`, `enrollment_sidebar`, `evaluation_sidebar`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 0, '2025-05-02 14:42:35', '2025-05-02 19:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `form_138A` tinyint(1) NOT NULL DEFAULT 0,
  `form_137` tinyint(1) NOT NULL DEFAULT 0,
  `good_moral` tinyint(1) NOT NULL DEFAULT 0,
  `psa` tinyint(1) NOT NULL DEFAULT 0,
  `pic_2x2` tinyint(1) NOT NULL DEFAULT 0,
  `ctc_transferee` tinyint(1) NOT NULL DEFAULT 0,
  `grade_transferee` tinyint(1) NOT NULL DEFAULT 0,
  `f137_transferee` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `student_info_id`, `form_138A`, `form_137`, `good_moral`, `psa`, `pic_2x2`, `ctc_transferee`, `grade_transferee`, `f137_transferee`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Stud-001', 1, 1, 1, 1, 1, 0, 0, 0, 'approved', '2025-05-02 06:28:06', '2025-05-02 06:29:11', NULL),
(2, '3', 0, 0, 0, 0, 0, 0, 0, 0, 'pending', '2025-05-03 00:50:07', '2025-05-03 00:50:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `email_logs`
--

CREATE TABLE `email_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `application` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `email_logs`
--

INSERT INTO `email_logs` (`id`, `users_id`, `application`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'sent', NULL, '2025-05-02 06:28:07', '2025-05-02 06:28:07'),
(2, 2, 'sent', NULL, '2025-05-02 07:14:57', '2025-05-02 07:14:57'),
(3, 3, 'sent', NULL, '2025-05-03 00:50:08', '2025-05-03 00:50:08');

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

CREATE TABLE `evaluation` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(50) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `clearance` varchar(255) NOT NULL,
  `grades_eval` varchar(255) NOT NULL,
  `documents` varchar(255) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `evaluation`
--

INSERT INTO `evaluation` (`id`, `student_info_id`, `semester`, `year_level`, `clearance`, `grades_eval`, `documents`, `payment`, `created_at`, `updated_at`) VALUES
(1, 'Stud-001', '1st Semester', '1st Year', 'Cleared', 'Passed (College)', 'approved', 'fully paid', '2025-05-02 14:40:16', '2025-05-02 16:53:17');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'What is the enrollment process?', 'The enrollment process involves submitting required information and confirming course selections for the next term.', '2025-05-03 04:20:27', '2025-05-03 04:20:27'),
(2, 'Is enrollment automatic?', 'No, enrollment requires the submission of necessary information and confirmation before registration.', '2025-05-03 04:20:52', '2025-05-03 04:20:52'),
(3, 'How do I know if my enrollment was successful?', 'You will receive a confirmation message or notification once your enrollment is processed successfully.', '2025-05-03 04:21:15', '2025-05-03 04:21:15');

-- --------------------------------------------------------

--
-- Table structure for table `file_format`
--

CREATE TABLE `file_format` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `file_format`
--

INSERT INTO `file_format` (`id`, `title`, `file`, `created_at`, `updated_at`) VALUES
(1, 'Subject', 'storage/format/Subject.xlsx', '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 'Program', 'storage/format/Program.xlsx', '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 'Grades', 'storage/format/Grades.xlsx', '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `student_info_id` varchar(50) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `grade` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `sender_id`, `student_info_id`, `semester`, `year_level`, `subject`, `grade`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(22, '4', 'Stud-001', '1st Semester', '1st Year', 'Understanding The Self', 2, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:42:50'),
(23, '4', 'Stud-001', '1st Semester', '1st Year', 'Reading in Philippines History', 2, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50'),
(24, '4', 'Stud-001', '1st Semester', '1st Year', 'Komunikasyon sa Akademikong Filipino', 1.5, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50'),
(25, '4', 'Stud-001', '1st Semester', '1st Year', 'Introduction of Computing', 2.25, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50'),
(26, '4', 'Stud-001', '1st Semester', '1st Year', 'Fundamentals of Programming', 2, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50'),
(27, '4', 'Stud-001', '1st Semester', '1st Year', 'National Service Training Program 1 – CWTS', 1.5, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50'),
(28, '4', 'Stud-001', '1st Semester', '1st Year', 'Intro. To Physical Fitness', 1.2, 'Passed', NULL, '2025-05-03 02:25:50', '2025-05-03 02:25:50');

-- --------------------------------------------------------

--
-- Table structure for table `grade_edit_requests`
--

CREATE TABLE `grade_edit_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade_id` bigint(20) UNSIGNED NOT NULL,
  `requested_by` varchar(255) NOT NULL,
  `new_grade` int(11) NOT NULL,
  `reason` text NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grade_edit_requests`
--

INSERT INTO `grade_edit_requests` (`id`, `grade_id`, `requested_by`, `new_grade`, `reason`, `status`, `created_at`, `updated_at`) VALUES
(1, 22, '4', 2, 'Wrong computation of grade', 'Approved', '2025-05-03 02:41:06', '2025-05-03 02:42:49');

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `father_occupation` varchar(255) DEFAULT NULL,
  `father_phone` varchar(50) DEFAULT NULL,
  `mother_name` varchar(255) DEFAULT NULL,
  `mother_occupation` varchar(255) DEFAULT NULL,
  `mother_phone` varchar(50) DEFAULT NULL,
  `guardian_name` varchar(255) DEFAULT NULL,
  `guardian_relationship` varchar(255) DEFAULT NULL,
  `guardian_phone` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guardian`
--

INSERT INTO `guardian` (`id`, `student_info_id`, `father_name`, `father_occupation`, `father_phone`, `mother_name`, `mother_occupation`, `mother_phone`, `guardian_name`, `guardian_relationship`, `guardian_phone`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Stud-001', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02 06:24:45', '2025-05-02 06:28:06', NULL),
(2, '3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02 23:59:47', '2025-05-03 00:50:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_02_23_053109_create_curriculum_table', 1),
(5, '2025_02_25_203438_create_student_info_table', 1),
(6, '2025_02_27_132225_create_documents_table', 1),
(7, '2025_02_27_231016_create_email_logs_table', 1),
(8, '2025_03_04_044833_create_billing_table', 1),
(9, '2025_03_11_013422_create_section_table', 1),
(10, '2025_03_15_190742_create_audit_trail_table', 1),
(11, '2025_03_17_020839_create_student_subjects_table', 1),
(12, '2025_03_17_034536_create_student_fee_table', 1),
(13, '2025_03_18_013932_create_general_table', 1),
(14, '2025_04_11_002223_create_section_student_table', 1),
(15, '2025_04_11_054429_create_grades_table', 1),
(16, '2025_04_22_132644_create_setting_table', 1),
(17, '2025_04_22_191315_create_file_format_table', 1),
(18, '2025_04_24_014211_create_evaluation_table', 1),
(19, '2025_04_25_123415_create_display_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `other_billing`
--

CREATE TABLE `other_billing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `other_billing`
--

INSERT INTO `other_billing` (`id`, `payment_type`, `name`, `amount`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'discount', 'Alumni', 2000, NULL, NULL, '2025-05-02 06:30:44', '2025-05-02 06:30:44'),
(2, 'fee', 'Uniform', 1500, 'School Uniform', NULL, '2025-05-02 06:30:44', '2025-05-02 06:30:44');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_details`
--

CREATE TABLE `payment_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `fee_type` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `fee_id` bigint(20) UNSIGNED NOT NULL,
  `amount` double NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_details`
--

INSERT INTO `payment_details` (`id`, `student_info_id`, `fee_type`, `year_level`, `semester`, `fee_id`, `amount`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Stud-001', 'college_billing', '1st Year', '1st Semester', 1, 8000, NULL, '2025-05-02 07:08:13', '2025-05-02 07:08:13'),
(2, 'Stud-001', 'other_billing', '1st Year', '1st Semester', 1, -2000, NULL, '2025-05-02 07:08:13', '2025-05-02 07:08:13'),
(3, 'Stud-001', 'other_billing', '1st Year', '1st Semester', 2, 1500, NULL, '2025-05-02 07:08:13', '2025-05-02 07:08:13');

-- --------------------------------------------------------

--
-- Table structure for table `payment_verification`
--

CREATE TABLE `payment_verification` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `purpose` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `amount` double NOT NULL,
  `payment_receipt` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `program` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_verification`
--

INSERT INTO `payment_verification` (`id`, `student_info_id`, `name`, `email`, `purpose`, `semester`, `reference`, `amount`, `payment_receipt`, `year_level`, `program`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Stud-001', 'John Lester Bose Castillo', 'ljohn0148@gmail.com', 'Tuition Fee', '1st Semester', 'axsd', 2000, 'images/4ejwSOZz1sVygIItuVgyYUIt6dijG5zGCmwyNsXq.jpg', '1st Year', 'CS', 'approved', NULL, '2025-05-02 07:06:02', '2025-05-02 07:06:31'),
(2, 'Stud-001', 'John Lester Bose Castillo', 'ljohn0148@gmail.com', 'Tuition Fee', '1st Semester', 'asxs', 5500, 'images/EzKhKgyKTY6PhLLoXalTj6xKVaJ8OSH3I7mIFcEa.png', '1st Year', 'Computer Science', 'reject', NULL, '2025-05-02 16:52:12', '2025-05-03 02:04:41'),
(3, 'Stud-001', 'John Lester Bose Castillo', 'ljohn0148@gmail.com', 'Tuition Fee', '1st Semester', 'asx', 2000, 'images/ti27cPTvimWQFyJTZJ3o1InAlZC3MtaNCvWfhXxB.png', '1st Year', 'Computer Science', 'pending', NULL, '2025-05-03 04:05:09', '2025-05-03 04:05:09');

-- --------------------------------------------------------

--
-- Table structure for table `personal_info`
--

CREATE TABLE `personal_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `birth_date` varchar(50) NOT NULL,
  `birth_place` varchar(255) NOT NULL,
  `civil_status` varchar(50) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_info`
--

INSERT INTO `personal_info` (`id`, `student_info_id`, `first_name`, `last_name`, `middle_name`, `address`, `birth_date`, `birth_place`, `civil_status`, `gender`, `religion`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Stud-001', 'John Lester', 'Castillo', 'Bose', 'Banlic Cabuyao', '2004-10-29', 'Banlic City of Cabuyao Laguna', 'Single', 'Male', NULL, '2025-05-02 06:24:45', '2025-05-02 06:28:06', NULL),
(2, '3', 'Lovely', 'Clearon', NULL, 'Banay Banay Cabuyao', '2002-06-17', 'Banay Banay Cabuyao Laguna', 'Single', 'Female', NULL, '2025-05-02 23:59:47', '2025-05-03 00:50:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `campus` text NOT NULL,
  `duration` varchar(50) NOT NULL,
  `department` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `code`, `name`, `status`, `campus`, `duration`, `department`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'General', 'General Subjects', 'Active', 'N/A', 'N/A', 'General Education', NULL, '2025-05-02 04:11:20', '2025-05-02 04:11:20'),
(2, 'CS', 'Computer Science', 'Active', 'Banlic', '4 Years', 'College', NULL, '2025-05-02 04:22:21', '2025-05-02 04:40:12'),
(3, 'IS', 'Information System', 'Closed', 'Banlic', '4 Years', 'College', NULL, '2025-05-02 04:22:41', '2025-05-02 04:24:15'),
(4, 'STEM', 'Science, Technology, Engineering, and Mathematics', 'Pending', 'Uno', '2 Years', 'SHS', NULL, '2025-05-02 04:23:02', '2025-05-02 04:23:02'),
(5, 'ICT', 'Information and Communication Technology', 'Inactive', 'Banlic', '2 Years', 'SHS', NULL, '2025-05-02 04:23:25', '2025-05-02 04:23:25'),
(6, 'ABM', 'Administration Business Management', 'Active', 'Uno', '2 Years', 'SHS', NULL, '2025-05-02 04:23:50', '2025-05-02 04:23:50');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `section_name` varchar(255) NOT NULL,
  `subject_code` varchar(50) NOT NULL,
  `prof_name` varchar(255) DEFAULT NULL,
  `monday` varchar(255) DEFAULT NULL,
  `tuesday` varchar(255) DEFAULT NULL,
  `wednesday` varchar(255) DEFAULT NULL,
  `thursday` varchar(255) DEFAULT NULL,
  `friday` varchar(255) DEFAULT NULL,
  `saturday` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `section_name`, `subject_code`, `prof_name`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'CS-1', 'GE2', 'Mika', '07:00 - 10:00', NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-02 07:10:20', '2025-05-02 07:10:20'),
(2, 'CS-1', 'NSTP1', 'Ann', NULL, NULL, '13:00 - 16:00', NULL, NULL, NULL, NULL, '2025-05-02 07:10:45', '2025-05-02 07:10:45'),
(3, 'CS-1', 'GE4', 'Gelo', NULL, NULL, NULL, NULL, '13:00 - 16:00', NULL, NULL, '2025-05-02 07:11:10', '2025-05-02 07:11:10'),
(4, 'CS-1', 'CC101', 'Miko', NULL, NULL, NULL, NULL, '14:00 - 19:00', NULL, NULL, '2025-05-02 07:11:46', '2025-05-02 07:11:46'),
(5, 'CS-1', 'CC102', 'Miko', NULL, NULL, NULL, NULL, NULL, '09:00 - 12:00', NULL, '2025-05-02 07:13:26', '2025-05-02 07:13:26');

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `program_code` varchar(255) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `name`, `program_code`, `semester`, `year_level`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'CS-1', 'CS', '1st Semester', '1st Year', NULL, '2025-05-02 07:09:29', '2025-05-02 07:09:29'),
(2, 'CS-2', 'CS', '1st Semester', '2nd Year', NULL, '2025-05-02 07:09:45', '2025-05-02 07:09:45'),
(3, 'IS-1', 'IS', '1st Semester', '1st Year', NULL, '2025-05-02 07:14:00', '2025-05-02 07:14:00');

-- --------------------------------------------------------

--
-- Table structure for table `section_student`
--

CREATE TABLE `section_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `section_student`
--

INSERT INTO `section_student` (`id`, `section_id`, `student_info_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Stud-001', 'enrolled', '2025-05-02 07:14:56', '2025-05-02 07:14:56');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('h5KrVn6Dd6CJ74A90lEMUVeb4iQCxTs4cvQwvVHb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiU1diOHhLVFJWdkpNUWFnSXdmYUp3MkNUWmszUFBXaUtVN2d0WGJ3ayI7czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjgwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJpdmF0ZS1maWxlcy80ZWp3U09aejFzVnlnSUl0dVZneVlVSXQ2ZGlqRzV6R0Ntd3lOc1hxLmpwZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746266667),
('I9BVKSwqNGMGUczIMcQylCnuypd9NxxKKXkkd1IR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibXh6RnBDZ2tjTUxYRE40TXNWOTBmVm1mdjhDZUJGTTFQd2JmTk55UCI7czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjgwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJpdmF0ZS1maWxlcy80ZWp3U09aejFzVnlnSUl0dVZneVlVSXQ2ZGlqRzV6R0Ntd3lOc1hxLmpwZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746273922),
('kA7EvaIU8JKcTYxFMLM2HhF2RuFiY5QQqiw3UsaR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUGRrOGhRUmxrSWxnSHU3eHd6Nm1YR2V3ZmU5ekNsV3A3clU2VGQzNCI7czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjgwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJpdmF0ZS1maWxlcy90aTI3Y1BUdmltV1FGeUpUWkozbzFJbkFsWkMzTXRhTkN2V2ZoWHhCLnBuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746273923),
('NzxQavGaHnmsAspCdXJkqrUHO8mXzGnAhIx1kOYL', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibmpuVkJZZUdxQklqdXZYYW1NRlg1R0RBTmloUnp6T2V5WTZLa0hDMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZGFzaGJvYXJkIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1746277783),
('oH3BtRZpeFNKu1p5rZd9S2wMOvGPClbt8cuCGX5X', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiMGNEcEJiME5vSGJwYTRSUkNkZ2lTNVg1aUVxQmlYbEhpc1F1ZnpQOSI7czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjgwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJpdmF0ZS1maWxlcy9FektoS2d5S1RZNlBoTExvWGFsVGo2eEtWYUo4T1NIM0k3bUlGY0VhLnBuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746266672),
('VW0Fc85rCz39ntVZJhrkDcBP81EXcZChiqzEQCpU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZGxjYnRweVdxY2l3NTVTdllXY1dvS2lvbW5LeHJIRER4cnFFNVoxMCI7czoxMzoic2VsZWN0ZWRfeWVhciI7aToyO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjgwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvcHJpdmF0ZS1maWxlcy9FektoS2d5S1RZNlBoTExvWGFsVGo2eEtWYUo4T1NIM0k3bUlGY0VhLnBuZyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746273923);

-- --------------------------------------------------------

--
-- Table structure for table `shs_billing`
--

CREATE TABLE `shs_billing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_code` varchar(255) NOT NULL,
  `year_level` text NOT NULL,
  `payment_type` text NOT NULL,
  `down_payment` double DEFAULT NULL,
  `prelim` double DEFAULT NULL,
  `midterm` double DEFAULT NULL,
  `finals` double DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shs_billing`
--

INSERT INTO `shs_billing` (`id`, `program_code`, `year_level`, `payment_type`, `down_payment`, `prelim`, `midterm`, `finals`, `total_amount`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'general', 'grade 11', 'installment', 2000, 2000, 2000, 1000, 7000, NULL, '2025-05-02 06:31:45', '2025-05-02 06:31:45');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sections`
--

CREATE TABLE `sidebar_sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sections`
--

INSERT INTO `sidebar_sections` (`id`, `user_type`, `title`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 'super admin', 'Dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 'super admin', 'Enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 'super admin', 'Curriculum Management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(4, 'super admin', 'Billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(5, 'super admin', 'Grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(6, 'super admin', 'Settings', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(7, 'accounting', 'Dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(8, 'accounting', 'Enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(9, 'accounting', 'Curriculum Management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(10, 'accounting', 'Billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(11, 'accounting', 'Grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(12, 'accounting', 'Settings', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(13, 'registrar', 'Dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(14, 'registrar', 'Enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(15, 'registrar', 'Curriculum Management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(16, 'registrar', 'Billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(17, 'registrar', 'Grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(18, 'registrar', 'Settings', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sections_professor`
--

CREATE TABLE `sidebar_sections_professor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sections_professor`
--

INSERT INTO `sidebar_sections_professor` (`id`, `title`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 'General', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 'Grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sections_student`
--

CREATE TABLE `sidebar_sections_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sections_student`
--

INSERT INTO `sidebar_sections_student` (`id`, `title`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 'General', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 'Enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 'Payment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sub_items`
--

CREATE TABLE `sidebar_sub_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sidebar_section_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `route` varchar(255) DEFAULT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sub_items`
--

INSERT INTO `sidebar_sub_items` (`id`, `sidebar_section_id`, `title`, `route`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 1, 'Enrollment', 'admin.dashboard.enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 1, 'Billing', 'admin.dashboard.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(4, 1, 'Trend Analysis', '#', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(5, 1, 'Audit Trail', 'admin.dashboard.audit-trail', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(6, 2, 'Application', 'admin.application', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(7, 2, 'Documents', 'admin.documents', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(8, 2, 'Course Selection', 'admin.course.selection', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(9, 2, 'Evaluation', 'admin.evaluation', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(10, 2, 'Enrollment Confirmation', 'enrollment.final.step', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(11, 2, 'Enrolled Student', 'enrolled.student', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(12, 3, 'Program', 'admin.program', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(13, 3, 'Subject', 'admin.subject', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(14, 3, 'Curriculum', 'admin.curriculum', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(15, 3, 'Section', 'admin.section', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(16, 4, 'Setup', 'admin.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(17, 4, 'Fee Selection', 'admin.assign-fee.index', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(18, 4, 'Payment', 'admin.payment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(19, 4, 'Payment List', 'admin.payment.list', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(20, 5, 'Upload Grades', 'upload.grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(21, 5, 'Submitted Grades', 'index.submitted.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(22, 5, 'Grade Change Requests', 'index.change.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(23, 6, 'General', 'admin.setting.general', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(24, 6, 'Display', 'index.display', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(25, 6, 'User Management', 'admin.user.management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(26, 6, 'Account', 'profile.edit', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(27, 6, 'Help', 'admin.help', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(28, 7, 'Home', 'dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(29, 7, 'Enrollment', 'admin.dashboard.enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(30, 7, 'Billing', 'admin.dashboard.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(31, 7, 'Trend Analysis', '#', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(32, 7, 'Audit Trail', 'admin.dashboard.audit-trail', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(33, 8, 'Application', 'admin.application', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(34, 8, 'Documents', 'admin.documents', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(35, 8, 'Course Selection', 'admin.course.selection', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(36, 8, 'Evaluation', 'admin.evaluation', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(37, 8, 'Enrollment Confirmation', 'enrollment.final.step', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(38, 8, 'Enrolled Student', '', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(39, 9, 'Program', 'admin.program', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(40, 9, 'Subject', 'admin.subject', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(41, 9, 'Curriculum', 'admin.curriculum', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(42, 9, 'Section', 'admin.section', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(43, 10, 'Setup', 'admin.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(44, 10, 'Fee Selection', 'admin.assign-fee.index', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(45, 10, 'Payment', 'admin.payment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(46, 10, 'Payment List', 'admin.payment.list', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(47, 11, 'Upload Grades', 'upload.grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(48, 11, 'Submitted Grades', 'index.submitted.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(49, 11, 'Grade Change Requests', 'index.change.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(50, 12, 'General', 'admin.setting.general', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(51, 12, 'Display', 'index.display', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(52, 12, 'User Management', 'admin.user.management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(53, 12, 'Account', 'profile.edit', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(54, 12, 'Help', 'admin.help', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(55, 13, 'Home', 'dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(56, 13, 'Enrollment', 'admin.dashboard.enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(57, 13, 'Billing', 'admin.dashboard.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(58, 13, 'Trend Analysis', '#', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(59, 13, 'Audit Trail', 'admin.dashboard.audit-trail', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(60, 14, 'Application', 'admin.application', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(61, 14, 'Documents', 'admin.documents', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(62, 14, 'Course Selection', 'admin.course.selection', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(63, 14, 'Evaluation', 'admin.evaluation', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(64, 14, 'Enrollment Confirmation', 'enrollment.final.step', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(65, 14, 'Enrolled Student', '', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(66, 15, 'Program', 'admin.program', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(67, 15, 'Subject', 'admin.subject', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(68, 15, 'Curriculum', 'admin.curriculum', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(69, 15, 'Section', 'admin.section', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(70, 16, 'Setup', 'admin.billing', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(71, 16, 'Fee Selection', 'admin.assign-fee.index', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(72, 16, 'Payment', 'admin.payment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(73, 16, 'Payment List', 'admin.payment.list', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(74, 17, 'Upload Grades', 'upload.grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(75, 17, 'Submitted Grades', 'index.submitted.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(76, 17, 'Grade Change Requests', 'index.change.grade.admin', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(77, 18, 'General', 'admin.setting.general', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(78, 18, 'Display', 'index.display', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(79, 18, 'User Management', 'admin.user.management', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(80, 18, 'Account', 'profile.edit', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(81, 18, 'Help', 'admin.help', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sub_items_professor`
--

CREATE TABLE `sidebar_sub_items_professor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sidebar_section_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sub_items_professor`
--

INSERT INTO `sidebar_sub_items_professor` (`id`, `sidebar_section_id`, `title`, `route`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 1, 'Schedule', 'professor.schedule', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 1, 'Subjects', 'professor.subject', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(4, 2, 'Upload Grades', 'upload.grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(5, 2, 'Submitted Grades', 'index.submitted.grade.professor', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar_sub_items_student`
--

CREATE TABLE `sidebar_sub_items_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sidebar_section_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `is_displayed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sidebar_sub_items_student`
--

INSERT INTO `sidebar_sub_items_student` (`id`, `sidebar_section_id`, `title`, `route`, `is_displayed`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'dashboard', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(2, 1, 'Schedule', 'student.schedule', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(3, 1, 'Subjects', 'student.subject', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(4, 1, 'Personal Information', 'student.personal.info', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(5, 2, 'Enrollment', 'student.enrollment', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(6, 2, 'Documents', 'student.documents', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(7, 2, 'Grades', 'student.grades', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(8, 2, 'Evaluation', 'student.evaluation', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(9, 3, 'Payment Plan', 'student.payment.plan', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(10, 3, 'Payment History', 'student.payment.transaction', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22'),
(11, 3, 'Payment Form', 'student.payment.form', 1, '2025-05-02 04:11:22', '2025-05-02 04:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `student_fees`
--

CREATE TABLE `student_fees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `semester` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `total_amount` double NOT NULL,
  `amount_paid` double NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_fees`
--

INSERT INTO `student_fees` (`id`, `student_info_id`, `year_level`, `semester`, `status`, `total_amount`, `amount_paid`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Stud-001', '1st Year', '1st Semester', 'paid', 7500, 7500, NULL, '2025-05-02 07:08:13', '2025-05-02 16:52:55');

-- --------------------------------------------------------

--
-- Table structure for table `student_info`
--

CREATE TABLE `student_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `department` varchar(50) NOT NULL,
  `school_year` varchar(50) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `branch` varchar(50) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `program` varchar(255) NOT NULL,
  `classified_as` varchar(50) NOT NULL,
  `last_school_attended` text DEFAULT NULL,
  `last_school_address` text DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_info`
--

INSERT INTO `student_info` (`id`, `users_id`, `student_id`, `department`, `school_year`, `semester`, `branch`, `year_level`, `program`, `classified_as`, `last_school_attended`, `last_school_address`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 2, 'Stud-001', 'College', '2024-2025', '1st Semester', 'Banlic - Main', '1st Year', 'Computer Science', 'Old Student', NULL, NULL, 'approved', '2025-05-02 06:24:45', '2025-05-02 18:27:25', NULL),
(2, 3, '3', 'SHS', '2024-2025', '1st Semester', 'Uno', 'Grade 12', 'Administration Business Management', 'Old Student', NULL, NULL, 'approved', '2025-05-02 23:59:47', '2025-05-03 00:50:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_subjects`
--

CREATE TABLE `student_subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_info_id` varchar(255) NOT NULL,
  `subject_code` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `remarks` varchar(50) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_subjects`
--

INSERT INTO `student_subjects` (`id`, `student_info_id`, `subject_code`, `status`, `remarks`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Stud-001', 'GE1', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(2, 'Stud-001', 'GE2', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(3, 'Stud-001', 'GE4', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(4, 'Stud-001', 'NSTP1', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(5, 'Stud-001', 'PE1', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(6, 'Stud-001', 'CC101', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52'),
(7, 'Stud-001', 'CC102', 'enroll', 'Passed', NULL, '2025-05-02 07:07:24', '2025-05-02 19:28:52');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `program_code` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `prerequisites` varchar(255) DEFAULT NULL,
  `period` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `lec` int(11) DEFAULT NULL,
  `lab` int(11) DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `program_code`, `code`, `name`, `prerequisites`, `period`, `department`, `year_level`, `category`, `lec`, `lab`, `unit`, `total`, `deleted_at`, `created_at`, `updated_at`) VALUES
(8, 'CS', 'GE1', 'Understanding The Self', NULL, '1st Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(9, 'CS', 'GE2', 'Reading in Philippines History', NULL, '1st Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(10, 'CS', 'GE4', 'Komunikasyon sa Akademikong Filipino', NULL, '1st Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(11, 'CS', 'NSTP1', 'National Service Training Program 1 – CWTS', NULL, '1st Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(12, 'CS', 'PE1', 'Intro. To Physical Fitness', NULL, '1st Semester', 'College', '1st Year', 'Minor Subject', 2, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(13, 'CS', 'CC101', 'Introduction of Computing', NULL, '1st Semester', 'College', '1st Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(14, 'CS', 'CC102', 'Fundamentals of Programming', NULL, '1st Semester', 'College', '1st Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 04:43:39', '2025-05-02 04:43:39'),
(15, 'CS', 'GE3', 'The Contemporary World', NULL, '2nd Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:50:04', '2025-05-02 04:50:04'),
(16, 'CS', 'GE5', 'Mathematics in the Modern World', NULL, '2nd Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:50:04', '2025-05-02 04:50:04'),
(17, 'CS', 'GE7', 'Pagbasa at Pagsulat Tungo sa Pananaliksik', NULL, '2nd Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 04:50:04', '2025-05-02 04:50:04'),
(18, 'CS', 'CC103', 'Intermediate Programming', NULL, '2nd Semester', 'College', '1st Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 04:50:04', '2025-05-02 04:50:04'),
(19, 'CS', 'CC104', 'Data Structures and Algorithms', NULL, '2nd Semester', 'College', '1st Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 04:50:04', '2025-05-02 04:50:04'),
(20, 'CS', 'NSTP2', 'National Service Training Program 2', 'National Service Training Program 1 – CWTS', '2nd Semester', 'College', '1st Year', 'Minor Subject', 3, 0, 3, 3, NULL, '2025-05-02 04:52:30', '2025-05-02 04:52:30'),
(21, 'CS', 'PE2', 'Rhythmic Activities', 'Intro. To Physical Fitness', '2nd Semester', 'College', '1st Year', 'Minor Subject', 2, 0, 2, 2, NULL, '2025-05-02 04:52:30', '2025-05-02 04:52:30'),
(22, 'CS', 'GE6', 'Purposive Communication', NULL, '1st Semester', 'College', '2nd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(23, 'CS', 'GE8', 'Art Appreciation', NULL, '1st Semester', 'College', '2nd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(24, 'CS', 'GE10', 'Masining na Pagpapahayag', NULL, '1st Semester', 'College', '2nd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(25, 'CS', 'AL101', 'Algorithms and Complexity', NULL, '1st Semester', 'College', '2nd Year', 'Major Subject', 2, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(26, 'CS', 'CC105', 'Information Management', NULL, '1st Semester', 'College', '2nd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(27, 'CS', 'CC106', 'Application Dev’t. & Emerging Tech.', NULL, '2nd Semester', 'College', '2nd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(28, 'CS', 'PL101', 'Programming Languages (Design and Implementation)', NULL, '2nd Semester', 'College', '2nd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(29, 'CS', 'AL102', 'Automata Theory & Formal Language', NULL, '2nd Semester', 'College', '2nd Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(30, 'CS', 'GE9', 'Science, Technology and Society', NULL, '2nd Semester', 'College', '2nd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(31, 'CS', 'GE11', 'Ethics', NULL, '2nd Semester', 'College', '2nd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:01:56', '2025-05-02 05:01:56'),
(32, 'CS', 'PE3', 'Individual/Dual Sports', 'Rhythmic Activities', '1st Semester', 'College', '2nd Year', 'Minor Subject', 2, 0, 2, 2, NULL, '2025-05-02 05:05:27', '2025-05-02 05:05:27'),
(33, 'CS', 'PE4', 'Team Sports', 'Individual/Dual Sports', '2nd Semester', 'College', '2nd Year', 'Minor Subject', 2, 0, 2, 2, NULL, '2025-05-02 05:06:11', '2025-05-02 05:06:11'),
(34, 'CS', 'GE12', 'Rizal’s Life & Work (as mandated by law)', NULL, '1st Semester', 'College', '3rd Year', 'Minor Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(35, 'CS', 'SE101', 'Software Engineering 1', NULL, '1st Semester', 'College', '3rd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(36, 'CS', 'DS101', 'Discrete Structure 1', NULL, '1st Semester', 'College', '3rd Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(37, 'CS', 'OS101', 'Operating System', NULL, '1st Semester', 'College', '3rd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(38, 'CS', 'AR101', 'Architecture & Organization', NULL, '1st Semester', 'College', '3rd Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(39, 'CS', 'SP101', 'Social Issue & Professional Practices', NULL, '1st Semester', 'College', '3rd Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(40, 'CS', 'IAS101', 'Information Assurance & Security', NULL, '2nd Semester', 'College', '3rd Year', 'Major Subject', 2, 0, 2, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(41, 'CS', 'HCI101', 'Human Computer Interaction', NULL, '2nd Semester', 'College', '3rd Year', 'Major Subject', 1, 0, 1, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(42, 'CS', 'NC101', 'Network & Communication', NULL, '2nd Semester', 'College', '3rd Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:12:28', '2025-05-02 05:12:28'),
(43, 'CS', 'SE102', 'Software Engineering 2', 'Software Engineering 1', '2nd Semester', 'College', '3rd Year', 'Major Subject', 2, 3, 5, 5, NULL, '2025-05-02 05:14:20', '2025-05-02 05:14:20'),
(44, 'CS', 'DS102', 'Discrete Structure 2', 'Discrete Structure 1', '2nd Semester', 'College', '3rd Year', 'Major Subject', 3, 0, 3, 3, NULL, '2025-05-02 05:14:20', '2025-05-02 05:14:20'),
(45, 'CS', 'PRC101', 'Practicum – On-The-Job Training (160 hours)', 'None', 'Summer', 'College', '3rd Year', 'Major Subject', 0, 3, 3, 3, NULL, '2025-05-02 05:15:53', '2025-05-02 05:15:53'),
(46, 'CS', 'TH102', 'CS Thesis Writing 1', NULL, '1st Semester', 'College', '4th Year', 'Major Subject', 2, 3, 5, NULL, NULL, '2025-05-02 05:21:02', '2025-05-02 05:21:02'),
(47, 'CS', 'GV101', 'Graphics & Visual Computing', NULL, '1st Semester', 'College', '4th Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:21:02', '2025-05-02 05:21:02'),
(48, 'CS', 'PD101', 'Parallel & Distributed Computing', NULL, '1st Semester', 'College', '4th Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:21:02', '2025-05-02 05:21:02'),
(49, 'CS', 'IS101', 'Intelligent System', NULL, '2nd Semester', 'College', '4th Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:21:02', '2025-05-02 05:21:02'),
(50, 'CS', 'SF101', 'System Fundamentals', NULL, '2nd Semester', 'College', '4th Year', 'Major Subject', 3, 0, 3, NULL, NULL, '2025-05-02 05:21:02', '2025-05-02 05:21:02'),
(51, 'CS', 'TH103', 'CS Thesis Writing 2', 'CS Thesis Writing 1', '2nd Semester', 'College', '4th Year', 'Major Subject', 2, 3, 5, 5, NULL, '2025-05-02 05:23:07', '2025-05-02 05:23:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `custom_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `custom_id`, `name`, `email`, `role`, `email_verified_at`, `password`, `deleted_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'John Lester Castillo', 'castillojlb0922@gmail.com', 'super admin', '2025-05-02 04:11:19', '$2y$12$7m8tgTJksaDFKD2EAK76Le2vwU700f7MlHjCvPmnPMrj9cY1Qtzva', NULL, NULL, '2025-05-02 04:11:19', '2025-05-02 04:11:19'),
(2, NULL, 'John Lester Castillo', 'ljohn0148@gmail.com', 'student', '2025-05-03 09:20:04', '$2y$12$wVCWLmbniApHsQpaMlOMyuKHZHa3eKYi7GYAjZLESdbBbveCaxPZW', NULL, NULL, '2025-05-02 06:24:45', '2025-05-02 06:28:06'),
(3, NULL, 'Lovely Clearon', 'clrvy@gmail.com', 'student', NULL, '$2y$12$1yzj2UOwrPCaNoRjwTMY7usttB0FU/dDYRo0k1smOODdYe28ykhnS', NULL, NULL, '2025-05-02 23:59:47', '2025-05-03 00:50:07'),
(4, 'E-001', 'Cristina', 'cascristina08@gmail.com', 'professor', '2025-05-03 10:24:13', '$2y$12$Fq2KzHGio1nScplljsRX4ObdcDZ7gLfQ5fxZclryLaf7y.5cc8Vo.', NULL, NULL, '2025-05-03 02:23:44', '2025-05-03 02:23:44');

-- --------------------------------------------------------

--
-- Table structure for table `users_id_format`
--

CREATE TABLE `users_id_format` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `id_format` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_id_format`
--

INSERT INTO `users_id_format` (`id`, `user_type`, `id_format`, `created_at`, `updated_at`) VALUES
(1, 'student', 'Stud-001', '2025-05-02 04:21:14', '2025-05-02 04:21:14'),
(2, 'admin', 'E-002', '2025-05-02 04:21:32', '2025-05-03 02:23:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_year`
--
ALTER TABLE `academic_year`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `academic_year_start_unique` (`start`),
  ADD UNIQUE KEY `academic_year_end_unique` (`end`);

--
-- Indexes for table `audit_trail_billing`
--
ALTER TABLE `audit_trail_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail_curriculum`
--
ALTER TABLE `audit_trail_curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail_enrollment`
--
ALTER TABLE `audit_trail_enrollment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `audit_trail_student`
--
ALTER TABLE `audit_trail_student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `billing_type`
--
ALTER TABLE `billing_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `college_billing`
--
ALTER TABLE `college_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `display_settings`
--
ALTER TABLE `display_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `documents_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `email_logs`
--
ALTER TABLE `email_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email_logs_users_id_foreign` (`users_id`);

--
-- Indexes for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `evaluation_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file_format`
--
ALTER TABLE `file_format`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grades_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `grade_edit_requests`
--
ALTER TABLE `grade_edit_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grade_edit_requests_grade_id_foreign` (`grade_id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardian_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `other_billing`
--
ALTER TABLE `other_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_details_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `payment_verification`
--
ALTER TABLE `payment_verification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_verification_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `personal_info_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `programs_code_unique` (`code`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_section_name_foreign` (`section_name`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_program_code_foreign` (`program_code`),
  ADD KEY `section_name_index` (`name`);

--
-- Indexes for table `section_student`
--
ALTER TABLE `section_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `section_student_section_id_foreign` (`section_id`),
  ADD KEY `section_student_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `shs_billing`
--
ALTER TABLE `shs_billing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sidebar_sections`
--
ALTER TABLE `sidebar_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sidebar_sections_professor`
--
ALTER TABLE `sidebar_sections_professor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sidebar_sections_student`
--
ALTER TABLE `sidebar_sections_student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sidebar_sub_items`
--
ALTER TABLE `sidebar_sub_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sidebar_sub_items_sidebar_section_id_foreign` (`sidebar_section_id`);

--
-- Indexes for table `sidebar_sub_items_professor`
--
ALTER TABLE `sidebar_sub_items_professor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sidebar_sub_items_professor_sidebar_section_id_foreign` (`sidebar_section_id`);

--
-- Indexes for table `sidebar_sub_items_student`
--
ALTER TABLE `sidebar_sub_items_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sidebar_sub_items_student_sidebar_section_id_foreign` (`sidebar_section_id`);

--
-- Indexes for table `student_fees`
--
ALTER TABLE `student_fees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_fees_student_info_id_foreign` (`student_info_id`);

--
-- Indexes for table `student_info`
--
ALTER TABLE `student_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_info_student_id_unique` (`student_id`),
  ADD KEY `student_info_users_id_foreign` (`users_id`);

--
-- Indexes for table `student_subjects`
--
ALTER TABLE `student_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_subjects_student_info_id_foreign` (`student_info_id`),
  ADD KEY `student_subjects_subject_code_foreign` (`subject_code`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subjects_code_unique` (`code`),
  ADD KEY `subjects_program_code_foreign` (`program_code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_custom_id_unique` (`custom_id`);

--
-- Indexes for table `users_id_format`
--
ALTER TABLE `users_id_format`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id_format_id_format_unique` (`id_format`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_year`
--
ALTER TABLE `academic_year`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `audit_trail_billing`
--
ALTER TABLE `audit_trail_billing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_trail_curriculum`
--
ALTER TABLE `audit_trail_curriculum`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `audit_trail_enrollment`
--
ALTER TABLE `audit_trail_enrollment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_trail_student`
--
ALTER TABLE `audit_trail_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `billing_type`
--
ALTER TABLE `billing_type`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `campus`
--
ALTER TABLE `campus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `college_billing`
--
ALTER TABLE `college_billing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `display_settings`
--
ALTER TABLE `display_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `email_logs`
--
ALTER TABLE `email_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `file_format`
--
ALTER TABLE `file_format`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `grades`
--
ALTER TABLE `grades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `grade_edit_requests`
--
ALTER TABLE `grade_edit_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `other_billing`
--
ALTER TABLE `other_billing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payment_details`
--
ALTER TABLE `payment_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment_verification`
--
ALTER TABLE `payment_verification`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `personal_info`
--
ALTER TABLE `personal_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `section_student`
--
ALTER TABLE `section_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shs_billing`
--
ALTER TABLE `shs_billing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sidebar_sections`
--
ALTER TABLE `sidebar_sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sidebar_sections_professor`
--
ALTER TABLE `sidebar_sections_professor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sidebar_sections_student`
--
ALTER TABLE `sidebar_sections_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sidebar_sub_items`
--
ALTER TABLE `sidebar_sub_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `sidebar_sub_items_professor`
--
ALTER TABLE `sidebar_sub_items_professor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sidebar_sub_items_student`
--
ALTER TABLE `sidebar_sub_items_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `student_fees`
--
ALTER TABLE `student_fees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_info`
--
ALTER TABLE `student_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_subjects`
--
ALTER TABLE `student_subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users_id_format`
--
ALTER TABLE `users_id_format`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `email_logs`
--
ALTER TABLE `email_logs`
  ADD CONSTRAINT `email_logs_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `grades_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grade_edit_requests`
--
ALTER TABLE `grade_edit_requests`
  ADD CONSTRAINT `grade_edit_requests_grade_id_foreign` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guardian`
--
ALTER TABLE `guardian`
  ADD CONSTRAINT `guardian_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_details`
--
ALTER TABLE `payment_details`
  ADD CONSTRAINT `payment_details_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_verification`
--
ALTER TABLE `payment_verification`
  ADD CONSTRAINT `payment_verification_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personal_info`
--
ALTER TABLE `personal_info`
  ADD CONSTRAINT `personal_info_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_section_name_foreign` FOREIGN KEY (`section_name`) REFERENCES `section` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_program_code_foreign` FOREIGN KEY (`program_code`) REFERENCES `programs` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `section_student`
--
ALTER TABLE `section_student`
  ADD CONSTRAINT `section_student_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `section_student_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sidebar_sub_items`
--
ALTER TABLE `sidebar_sub_items`
  ADD CONSTRAINT `sidebar_sub_items_sidebar_section_id_foreign` FOREIGN KEY (`sidebar_section_id`) REFERENCES `sidebar_sections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sidebar_sub_items_professor`
--
ALTER TABLE `sidebar_sub_items_professor`
  ADD CONSTRAINT `sidebar_sub_items_professor_sidebar_section_id_foreign` FOREIGN KEY (`sidebar_section_id`) REFERENCES `sidebar_sections_professor` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sidebar_sub_items_student`
--
ALTER TABLE `sidebar_sub_items_student`
  ADD CONSTRAINT `sidebar_sub_items_student_sidebar_section_id_foreign` FOREIGN KEY (`sidebar_section_id`) REFERENCES `sidebar_sections_student` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_fees`
--
ALTER TABLE `student_fees`
  ADD CONSTRAINT `student_fees_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_info`
--
ALTER TABLE `student_info`
  ADD CONSTRAINT `student_info_users_id_foreign` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_subjects`
--
ALTER TABLE `student_subjects`
  ADD CONSTRAINT `student_subjects_student_info_id_foreign` FOREIGN KEY (`student_info_id`) REFERENCES `student_info` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_subjects_subject_code_foreign` FOREIGN KEY (`subject_code`) REFERENCES `subjects` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_program_code_foreign` FOREIGN KEY (`program_code`) REFERENCES `programs` (`code`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
