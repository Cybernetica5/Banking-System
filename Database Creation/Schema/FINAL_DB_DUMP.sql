CREATE DATABASE  IF NOT EXISTS `bank_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bank_database`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bank_database
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `account_type` enum('savings','checking') DEFAULT NULL,
  `account_number` char(15) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  `balance` decimal(15,2) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `customer_id` (`customer_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'savings','SAV-123456789',1,1,10167.36,'active'),(2,'checking','CHK-987654321',2,2,10000.00,'active'),(3,'savings','SAV-246813579',3,3,10167.36,'active'),(4,'checking','CHK-135792468',4,1,10000.00,'active'),(5,'savings','SAV-369258147',5,2,10217.84,'active'),(6,'savings','SAV-741852963',6,3,10184.18,'active');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `accounts_summary`
--

DROP TABLE IF EXISTS `accounts_summary`;
/*!50001 DROP VIEW IF EXISTS `accounts_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `accounts_summary` AS SELECT 
 1 AS `customer_id`,
 1 AS `checking_account_balance`,
 1 AS `savings_account_balance`,
 1 AS `fd_balance`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `manager_id` int DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`manager_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Main Branch','Downtown',1),(2,'North Branch','Uptown',2),(3,'East Branch','Suburb',3);
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `branch_checking_accounts`
--

DROP TABLE IF EXISTS `branch_checking_accounts`;
/*!50001 DROP VIEW IF EXISTS `branch_checking_accounts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_checking_accounts` AS SELECT 
 1 AS `checking_account_id`,
 1 AS `account_id`,
 1 AS `customer_id`,
 1 AS `user_id`,
 1 AS `customer_type`,
 1 AS `mobile_number`,
 1 AS `landline_number`,
 1 AS `address`,
 1 AS `branch_id`,
 1 AS `name`,
 1 AS `location`,
 1 AS `manager_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `branch_customer_details`
--

DROP TABLE IF EXISTS `branch_customer_details`;
/*!50001 DROP VIEW IF EXISTS `branch_customer_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_customer_details` AS SELECT 
 1 AS `customer_id`,
 1 AS `user_id`,
 1 AS `customer_type`,
 1 AS `mobile_number`,
 1 AS `landline_number`,
 1 AS `address`,
 1 AS `branch_id`,
 1 AS `name`,
 1 AS `location`,
 1 AS `manager_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `branch_employee_details`
--

DROP TABLE IF EXISTS `branch_employee_details`;
/*!50001 DROP VIEW IF EXISTS `branch_employee_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_employee_details` AS SELECT 
 1 AS `employee_id`,
 1 AS `branch_id`,
 1 AS `branch_name`,
 1 AS `full_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `branch_loan_details`
--

DROP TABLE IF EXISTS `branch_loan_details`;
/*!50001 DROP VIEW IF EXISTS `branch_loan_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_loan_details` AS SELECT 
 1 AS `loan_id`,
 1 AS `amount`,
 1 AS `loan_type`,
 1 AS `start_date`,
 1 AS `end_date`,
 1 AS `status`,
 1 AS `loan_account_id`,
 1 AS `customer_id`,
 1 AS `branch_id`,
 1 AS `branch_name`,
 1 AS `location`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `branch_savings_accounts`
--

DROP TABLE IF EXISTS `branch_savings_accounts`;
/*!50001 DROP VIEW IF EXISTS `branch_savings_accounts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_savings_accounts` AS SELECT 
 1 AS `savings_account_id`,
 1 AS `account_id`,
 1 AS `savings_plan_id`,
 1 AS `customer_id`,
 1 AS `user_id`,
 1 AS `customer_type`,
 1 AS `mobile_number`,
 1 AS `landline_number`,
 1 AS `address`,
 1 AS `branch_id`,
 1 AS `name`,
 1 AS `location`,
 1 AS `manager_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `branch_transaction_details`
--

DROP TABLE IF EXISTS `branch_transaction_details`;
/*!50001 DROP VIEW IF EXISTS `branch_transaction_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `branch_transaction_details` AS SELECT 
 1 AS `transaction_id`,
 1 AS `date`,
 1 AS `amount`,
 1 AS `transaction_type`,
 1 AS `transaction_account_id`,
 1 AS `account_number`,
 1 AS `customer_id`,
 1 AS `branch_id`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `checking_account`
--

DROP TABLE IF EXISTS `checking_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checking_account` (
  `checking_account_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`checking_account_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `checking_account_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checking_account`
--

LOCK TABLES `checking_account` WRITE;
/*!40000 ALTER TABLE `checking_account` DISABLE KEYS */;
INSERT INTO `checking_account` VALUES (1,2),(2,4);
/*!40000 ALTER TABLE `checking_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `customer_type` enum('individual','organization') DEFAULT NULL,
  `mobile_number` varchar(10) DEFAULT NULL,
  `landline_number` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,5,'individual','1234567890','0123456789','123 Main St, City'),(2,6,'individual','2345678901','0234567890','456 Elm St, Town'),(3,7,'organization','3456789012','0345678901','789 Oak St, Village'),(4,8,'individual','4567890123','0456789012','321 Pine St, County'),(5,9,'organization','5678901234','0567890123','654 Maple St, State'),(6,10,'individual','6789012345','0678901234','987 Cedar St, Country'),(7,16,'individual','7890123456','0789012345','101 Fir St, Region'),(8,17,'individual','8901234567','0890123456','202 Birch St, City'),(9,18,'individual','9012345678','0901234567','303 Spruce St, Town'),(10,19,'organization','0123456789','0012345678','404 Redwood St, Village'),(11,20,'individual','1234567891','0123456790','505 Willow St, County'),(12,21,'individual','2345678910','0234567891','606 Cypress St, State');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `log_customer_changes` AFTER INSERT ON `customer` FOR EACH ROW BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (NEW.customer_id, NEW.mobile_number, NEW.landline_number, NEW.address, CURRENT_TIMESTAMP);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `log_customer_update` AFTER UPDATE ON `customer` FOR EACH ROW BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (NEW.customer_id, NEW.mobile_number, NEW.landline_number, NEW.address, CURRENT_TIMESTAMP);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `log_customer_delete` AFTER DELETE ON `customer` FOR EACH ROW BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (OLD.customer_id, NULL, NULL, NULL, CURRENT_TIMESTAMP);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `customer_log`
--

DROP TABLE IF EXISTS `customer_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `mobile_number` varchar(10) DEFAULT NULL,
  `landline_number` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `updated_date` date DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `customer_log_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_log`
--

LOCK TABLES `customer_log` WRITE;
/*!40000 ALTER TABLE `customer_log` DISABLE KEYS */;
INSERT INTO `customer_log` VALUES (1,1,'1234567890','0123456789','123 Main St, City','2024-09-01'),(2,2,'2345678901','0234567890','456 Elm St, Town','2024-09-15'),(3,3,'3456789012','0345678901','789 Oak St, Village','2024-09-30');
/*!40000 ALTER TABLE `customer_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposit`
--

DROP TABLE IF EXISTS `deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deposit` (
  `transaction_id` int NOT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `deposit_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deposit_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposit`
--

LOCK TABLES `deposit` WRITE;
/*!40000 ALTER TABLE `deposit` DISABLE KEYS */;
INSERT INTO `deposit` VALUES (1,1),(5,2),(3,3);
/*!40000 ALTER TABLE `deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `staff_id` int DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `staff_id` (`staff_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,3,1),(2,4,2);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fd_plan`
--

DROP TABLE IF EXISTS `fd_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fd_plan` (
  `fd_plan_id` int NOT NULL AUTO_INCREMENT,
  `duration` int DEFAULT NULL,
  `Interest_rate` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`fd_plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fd_plan`
--

LOCK TABLES `fd_plan` WRITE;
/*!40000 ALTER TABLE `fd_plan` DISABLE KEYS */;
INSERT INTO `fd_plan` VALUES (1,6,13.00),(2,12,14.00),(3,36,15.00);
/*!40000 ALTER TABLE `fd_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fixed_deposit`
--

DROP TABLE IF EXISTS `fixed_deposit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fixed_deposit` (
  `fd_id` int NOT NULL AUTO_INCREMENT,
  `savings_account_id` int DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `fd_plan_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`fd_id`),
  KEY `savings_account_id` (`savings_account_id`),
  KEY `fd_plan_id` (`fd_plan_id`),
  CONSTRAINT `fixed_deposit_ibfk_1` FOREIGN KEY (`savings_account_id`) REFERENCES `savings_account` (`savings_account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fixed_deposit_ibfk_2` FOREIGN KEY (`fd_plan_id`) REFERENCES `fd_plan` (`fd_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fixed_deposit`
--

LOCK TABLES `fixed_deposit` WRITE;
/*!40000 ALTER TABLE `fixed_deposit` DISABLE KEYS */;
INSERT INTO `fixed_deposit` VALUES (1,1,10000.00,2,'2024-10-01','2025-10-01'),(3,4,5000.00,1,'2024-10-05','2025-04-05');
/*!40000 ALTER TABLE `fixed_deposit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `individual`
--

DROP TABLE IF EXISTS `individual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individual` (
  `customer_id` int NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `NIC` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `individual_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individual`
--

LOCK TABLES `individual` WRITE;
/*!40000 ALTER TABLE `individual` DISABLE KEYS */;
INSERT INTO `individual` VALUES (1,'Charlie Brown','1995-07-25','950725-1111'),(2,'Diana Ross','1988-11-30','881130-2222'),(4,'Fiona Apple','1992-04-18','920418-3333'),(6,'Helen Mirren','1975-01-05','750105-4444');
/*!40000 ALTER TABLE `individual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `loan_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `loan_type` enum('personal','business') DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `interest_rate` decimal(4,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('approved','pending','rejected') DEFAULT NULL,
  PRIMARY KEY (`loan_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (1,1,'personal',10000.00,5.50,'2024-10-01','2025-10-01','approved'),(2,3,'business',50000.00,6.00,'2024-09-15','2026-09-15','approved'),(3,5,'personal',5000.00,5.00,'2024-10-05','2025-04-05','pending');
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_installment`
--

DROP TABLE IF EXISTS `loan_installment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_installment` (
  `installment_id` int NOT NULL AUTO_INCREMENT,
  `loan_id` int DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `duration` int DEFAULT '30',
  PRIMARY KEY (`installment_id`),
  KEY `loan_id` (`loan_id`),
  CONSTRAINT `loan_installment_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`loan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_installment`
--

LOCK TABLES `loan_installment` WRITE;
/*!40000 ALTER TABLE `loan_installment` DISABLE KEYS */;
INSERT INTO `loan_installment` VALUES (1,1,1000.00,30),(2,2,2500.00,30),(3,3,500.00,30);
/*!40000 ALTER TABLE `loan_installment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loan_payment`
--

DROP TABLE IF EXISTS `loan_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan_payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `instalment_id` int DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `payed_date` date DEFAULT NULL,
  `status` enum('paid','unpaid') DEFAULT NULL,
  `penalty_id` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `instalment_id` (`instalment_id`),
  KEY `penalty_id` (`penalty_id`),
  CONSTRAINT `loan_payment_ibfk_1` FOREIGN KEY (`instalment_id`) REFERENCES `loan_installment` (`installment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_payment_ibfk_2` FOREIGN KEY (`penalty_id`) REFERENCES `penalty` (`penalty_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan_payment`
--

LOCK TABLES `loan_payment` WRITE;
/*!40000 ALTER TABLE `loan_payment` DISABLE KEYS */;
INSERT INTO `loan_payment` VALUES (1,1,1000.00,'2024-11-01','2024-10-28','paid',NULL),(2,2,2500.00,'2024-10-15','2024-10-14','paid',NULL),(3,3,500.00,'2024-11-05',NULL,'unpaid',1);
/*!40000 ALTER TABLE `loan_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (1,1),(2,2),(3,5);
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organization` (
  `customer_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `lisence_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  CONSTRAINT `organization_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (3,'ABC Corporation','ORG-12345'),(5,'XYZ Limited','ORG-67890');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalty`
--

DROP TABLE IF EXISTS `penalty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalty` (
  `penalty_id` int NOT NULL AUTO_INCREMENT,
  `penalty_type_id` int DEFAULT NULL,
  PRIMARY KEY (`penalty_id`),
  KEY `penalty_type_id` (`penalty_type_id`),
  CONSTRAINT `penalty_ibfk_1` FOREIGN KEY (`penalty_type_id`) REFERENCES `penalty_types` (`penalty_type_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalty`
--

LOCK TABLES `penalty` WRITE;
/*!40000 ALTER TABLE `penalty` DISABLE KEYS */;
INSERT INTO `penalty` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `penalty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalty_types`
--

DROP TABLE IF EXISTS `penalty_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `penalty_types` (
  `penalty_type_id` int NOT NULL AUTO_INCREMENT,
  `penalty_amount` decimal(10,2) DEFAULT NULL,
  `penalty_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`penalty_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalty_types`
--

LOCK TABLES `penalty_types` WRITE;
/*!40000 ALTER TABLE `penalty_types` DISABLE KEYS */;
INSERT INTO `penalty_types` VALUES (1,25.00,'Late Payment'),(2,50.00,'Insufficient Funds'),(3,100.00,'Early Withdrawal');
/*!40000 ALTER TABLE `penalty_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings_account`
--

DROP TABLE IF EXISTS `savings_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savings_account` (
  `savings_account_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `savings_plan_id` int DEFAULT NULL,
  PRIMARY KEY (`savings_account_id`),
  KEY `account_id` (`account_id`),
  KEY `savings_plan_id` (`savings_plan_id`),
  CONSTRAINT `savings_account_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `savings_account_ibfk_2` FOREIGN KEY (`savings_plan_id`) REFERENCES `savings_plan` (`savings_plan_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings_account`
--

LOCK TABLES `savings_account` WRITE;
/*!40000 ALTER TABLE `savings_account` DISABLE KEYS */;
INSERT INTO `savings_account` VALUES (1,1,3),(2,3,3),(3,5,4),(4,6,2);
/*!40000 ALTER TABLE `savings_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savings_plan`
--

DROP TABLE IF EXISTS `savings_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savings_plan` (
  `savings_plan_id` int NOT NULL AUTO_INCREMENT,
  `type` enum('child','teen','adult','senior') DEFAULT NULL,
  `Interest_rate` decimal(4,2) DEFAULT NULL,
  `minimum_balance` decimal(15,2) DEFAULT NULL,
  `age_limit` int DEFAULT NULL,
  PRIMARY KEY (`savings_plan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savings_plan`
--

LOCK TABLES `savings_plan` WRITE;
/*!40000 ALTER TABLE `savings_plan` DISABLE KEYS */;
INSERT INTO `savings_plan` VALUES (1,'child',12.00,0.00,12),(2,'teen',11.00,500.00,19),(3,'adult',10.00,1000.00,60),(4,'senior',13.00,1000.00,120);
/*!40000 ALTER TABLE `savings_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `NIC` varchar(12) DEFAULT NULL,
  `role` enum('manager','employee') DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'John Doe','1980-05-15','800515-1234','manager'),(2,2,'Jane Smith','1985-09-20','850920-5678','manager'),(3,3,'Bob Johnson','1990-03-10','900310-9012','employee'),(4,4,'Alice Williams','1988-12-05','881205-3456','employee'),(5,11,'Tom Smith','1988-11-15','881115-3456','manager'),(6,12,'Robert Downey','1975-04-04','750404-7890','employee'),(7,13,'Scarlett Johansson','1984-11-22','841122-4567','employee'),(8,14,'Chris Evans','1981-06-13','810613-1122','employee'),(9,15,'Mark Ruffalo','1967-11-22','671122-3344','employee'),(10,22,'Jennifer Lawrence','1990-08-15','900815-9988','employee'),(11,23,'Matt Damon','1970-10-08','701008-5566','employee');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `transaction_type` enum('deposit','withdrawal','transfer') DEFAULT NULL,
  `amount` decimal(15,2) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,1,'deposit',1000.00,'2024-10-01 10:30:00','Initial deposit'),(2,2,'withdrawal',500.00,'2024-10-01 14:45:00','ATM withdrawal'),(3,3,'deposit',5000.00,'2024-10-02 09:15:00','Salary deposit'),(4,4,'transfer',1000.00,'2024-10-02 16:30:00','Transfer to savings'),(5,5,'deposit',2000.00,'2024-10-03 11:00:00','Check deposit'),(6,6,'withdrawal',300.00,'2024-10-03 13:20:00','Cash withdrawal');
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `transaction_history`
--

DROP TABLE IF EXISTS `transaction_history`;
/*!50001 DROP VIEW IF EXISTS `transaction_history`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `transaction_history` AS SELECT 
 1 AS `customer_id`,
 1 AS `transaction_id`,
 1 AS `transaction_type`,
 1 AS `amount`,
 1 AS `date`,
 1 AS `description`,
 1 AS `account_number`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfer` (
  `transaction_id` int NOT NULL,
  `beneficiary_account_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `beneficiary_account_id` (`beneficiary_account_id`),
  CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `transfer_ibfk_2` FOREIGN KEY (`beneficiary_account_id`) REFERENCES `account` (`account_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfer`
--

LOCK TABLES `transfer` WRITE;
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` VALUES (4,1);
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` enum('staff','customer') DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john_doe','hashed_password1','john.doe@email.com','staff'),(2,'jane_smith','hashed_password2','jane.smith@email.com','staff'),(3,'bob_johnson','hashed_password3','bob.johnson@email.com','staff'),(4,'alice_williams','hashed_password4','alice.williams@email.com','staff'),(5,'charlie_brown','hashed_password5','charlie.brown@email.com','customer'),(6,'diana_ross','hashed_password6','diana.ross@email.com','customer'),(7,'edward_norton','hashed_password7','edward.norton@email.com','customer'),(8,'fiona_apple','hashed_password8','fiona.apple@email.com','customer'),(9,'george_clooney','hashed_password9','george.clooney@email.com','customer'),(10,'helen_mirren','hashed_password10','helen.mirren@email.com','customer'),(11,'tom_smith','hashed_password11','tom.smith@email.com','staff'),(12,'robert_downey','hashed_password12','robert.downey@email.com','staff'),(13,'scarlett_johansson','hashed_password13','scarlett.johansson@email.com','staff'),(14,'chris_evans','hashed_password14','chris.evans@email.com','staff'),(15,'mark_ruffalo','hashed_password15','mark.ruffalo@email.com','staff'),(16,'julia_roberts','hashed_password16','julia.roberts@email.com','customer'),(17,'brad_pitt','hashed_password17','brad.pitt@email.com','customer'),(18,'angelina_jolie','hashed_password18','angelina.jolie@email.com','customer'),(19,'morgan_freeman','hashed_password19','morgan.freeman@email.com','customer'),(20,'meryl_streep','hashed_password20','meryl.streep@email.com','customer'),(21,'leonardo_dicaprio','hashed_password21','leonardo.dicaprio@email.com','customer'),(22,'jennifer_lawrence','hashed_password22','jennifer.lawrence@email.com','staff'),(23,'matt_damon','hashed_password23','matt.damon@email.com','staff');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawal`
--

DROP TABLE IF EXISTS `withdrawal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `withdrawal` (
  `transaction_id` int NOT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `withdrawal_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `withdrawal_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawal`
--

LOCK TABLES `withdrawal` WRITE;
/*!40000 ALTER TABLE `withdrawal` DISABLE KEYS */;
INSERT INTO `withdrawal` VALUES (2,2),(6,3);
/*!40000 ALTER TABLE `withdrawal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bank_database'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `add_fd_interest_event` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `add_fd_interest_event` ON SCHEDULE EVERY 1 DAY STARTS '2024-10-15 12:01:52' ON COMPLETION NOT PRESERVE ENABLE DO CALL add_fd_interest() */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `add_savings_interest_event` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `add_savings_interest_event` ON SCHEDULE EVERY 30 DAY STARTS '2024-10-15 13:43:30' ON COMPLETION NOT PRESERVE ENABLE DO CALL add_savings_interest() */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'bank_database'
--
/*!50003 DROP FUNCTION IF EXISTS `Calculate_interest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `Calculate_interest`(`fd_plan_id` INT, `amount` DECIMAL(15,2)) RETURNS decimal(10,2)
    READS SQL DATA
BEGIN
    DECLARE `interest_rate` DECIMAL(5,2);
    DECLARE `interest` DECIMAL(10,2);

    -- Retrieve the interest rate based on the fd_plan_id
    SELECT fd.interest_rate INTO `interest_rate`
    FROM fd_plan AS fd
    WHERE fd.fd_plan_id = `fd_plan_id`;

    -- Calculate interest
    SET `interest` = `amount` * (`interest_rate`/1200);

    -- Return the calculated interest
    RETURN `interest`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `generate_account_number` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `generate_account_number`(acc_type ENUM('savings', 'checking')) RETURNS char(15) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE prefix CHAR(3);
    DECLARE last_number INT;
    DECLARE account_number CHAR(15);
    DECLARE account_exists INT DEFAULT 1; -- Track if the account number exists

    -- Determine the prefix based on account type
    IF acc_type = 'savings' THEN
        SET prefix = 'SAV';
    ELSEIF acc_type = 'checking' THEN
        SET prefix = 'CHK';
    END IF;

    -- Loop to generate a new account number until it is unique
    WHILE account_exists = 1 DO
        -- Generate the last number (simulate as a random 9-digit number)
        SET last_number = FLOOR(100000000 + RAND() * 900000000); -- Generates a 9-digit number

        -- Form the full account number
        SET account_number = CONCAT(prefix, '-', last_number);

        -- Check if the generated account number already exists in the account table
        SELECT COUNT(*) INTO account_exists
        FROM account
        WHERE account_number = account_number;
    END WHILE;

    -- Return the unique account number
    RETURN account_number;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `GetCreditLimit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GetCreditLimit`(userId INT) RETURNS decimal(10,2)
    DETERMINISTIC
BEGIN
    DECLARE total DECIMAL(10, 2);

    -- Calculate the sum of all fixed deposits owned by the user
    SELECT SUM(fd.amount) INTO total
    FROM fixed_deposit fd
    JOIN savings_account s ON fd.savings_account_id = s.savings_account_id
    JOIN account a ON s.account_id = a.account_id
    JOIN customer c ON a.customer_id = c.customer_id
    JOIN user u ON c.user_id = u.user_id
    WHERE u.user_id = userId;

    -- Return the credit limit
    RETURN total / 2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `is_manager` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_manager`(input_user_id INT) RETURNS tinyint(1)
    READS SQL DATA
BEGIN
    DECLARE user_role VARCHAR(10);
    DECLARE staff_role VARCHAR(10);
    
    SELECT role INTO user_role FROM user WHERE user_id = input_user_id LIMIT 1;

    IF user_role = 'staff' THEN
        SELECT role INTO staff_role FROM Staff WHERE user_id = input_user_id LIMIT 1;
        IF staff_role = 'manager' THEN
            RETURN TRUE;
        END IF;
    END IF;
    
    RETURN FALSE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_fd_interest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_fd_interest`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE fd_id INT;
    DECLARE fd_amount DECIMAL(15,2);
    DECLARE plan_id INT;
    DECLARE interest DECIMAL(10,2);
    DECLARE p_account_id INT;
    DECLARE creation_date DATE;

    DECLARE cur CURSOR FOR
        SELECT fd_id, amount, fd_plan_id, creation_date
        FROM fixed_deposit
        WHERE DATEDIFF(CURDATE(), creation_date) >= 30
        AND MOD(DATEDIFF(CURDATE(), creation_date), 30) = 0;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO fd_id, fd_amount, plan_id, creation_date;
        IF done THEN
            LEAVE read_loop;
        END IF;

        SELECT Calculate_interest(plan_id, fd_amount) INTO interest;

        SELECT account_id INTO p_account_id
        FROM account
        WHERE account_id IN (
            SELECT account_id
            FROM savings_account
            JOIN fixed_deposit fd USING(savings_account_id)
            WHERE fd.fd_id = fd_id
        );

        START TRANSACTION;
        UPDATE account
        SET balance = balance + interest
        WHERE account_id = p_account_id;
        COMMIT;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_individual_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_individual_customer`(
    IN branch_id INT,
    IN full_name VARCHAR(100),
    IN date_of_birth DATE,
    IN NIC VARCHAR(12),
    IN address VARCHAR(255),
    IN mobile_number VARCHAR(10),
    IN landline_number VARCHAR(10),
    IN account_type ENUM('savings', 'checking'),
    OUT account_number CHAR(15)
)
BEGIN
    DECLARE customer_id INT;

    -- Declare a handler for any errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- In case of an error, rollback the transaction
        ROLLBACK;
        SELECT 'Error occurred during adding individual customer';
    END;

    START TRANSACTION;

        -- Insert the customer information into customer table
        INSERT INTO customer (customer_type, mobile_number, landline_number, address)
        VALUES ('individual', mobile_number, landline_number, address);

        -- Get the customer ID of the inserted customer
        SET customer_id = LAST_INSERT_ID();

        INSERT INTO individual (customer_id, full_name , date_of_birth, NIC)
        VALUES (customer_id, full_name, date_of_birth, NIC);

        -- create a account for the customer
        CALL create_account(customer_id, branch_id, account_type, @account_number);


        COMMIT;
        -- If the transaction is successful, return the account number
        SET account_number = @account_number; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_organization_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_organization_customer`(
    IN branch_id INT,
    IN name VARCHAR(100),
    IN license_number VARCHAR(100),
    IN address VARCHAR(255),
    IN mobile_number VARCHAR(10),
    IN landline_number VARCHAR(10),
    IN account_type ENUM('savings', 'checking'),
    OUT account_number CHAR(15)
)
BEGIN
    DECLARE customer_id INT;

    -- Declare a handler for any errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred during adding organization customer';
    END;

    START TRANSACTION;

        -- Insert the customer information into customer table
        INSERT INTO customer (customer_type, mobile_number, landline_number, address)
        VALUES ('organization', mobile_number, landline_number, address);

        -- Get the customer ID of the inserted customer
        SET customer_id = LAST_INSERT_ID();

        INSERT INTO organization (customer_id, name, license_number)
        VALUES (customer_id, name, license_number);

        -- create a account for the customer
        CALL create_account(customer_id, branch_id, account_type, @account_number);

        COMMIT;
        -- If the transaction is successful, return the account number
        SET account_number = @account_number; 

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_savings_interest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_savings_interest`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE p_account_id INT;
    DECLARE balance DECIMAL(15,2);
    DECLARE interest_rate DECIMAL(5,2);
    DECLARE interest DECIMAL(10,2);

    DECLARE cur CURSOR FOR
        SELECT a.account_id, a.balance, sp.interest_rate
        FROM savings_account sa
        JOIN account a ON sa.account_id = a.account_id
        JOIN savings_plan sp ON sa.savings_plan_id = sp.savings_plan_id
        WHERE a.status = 'active' AND a.account_type = 'savings';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO p_account_id, balance, interest_rate;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Calculate interest
        SET interest = balance * (interest_rate / 1200);

        -- Update account balance
        START TRANSACTION;
        UPDATE account
        SET balance = balance + interest
        WHERE account_id = p_account_id;
        COMMIT;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `approve_loan` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `approve_loan`(IN input_loan_id INT, IN manager_user_id INT)
BEGIN
    DECLARE loan_status VARCHAR(20);

    IF is_manager(manager_user_id) THEN
		START TRANSACTION;
        SELECT status INTO loan_status FROM loan WHERE loan_id = input_loan_id;

        IF loan_status = 'pending' THEN
            UPDATE loan
            SET status = 'approved'
            WHERE loan_id = input_loan_id;
            COMMIT;
        ELSE
			ROLLBACK;
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Loan is already approved';
        END IF;
    ELSE 
		ROLLBACK;
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User is not authorized to approve loans';
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_account` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_account`(
    IN customer_id INT,
    IN branch_id INT,
    IN account_type ENUM('savings', 'checking'),
    OUT account_number CHAR(15)
)
BEGIN
    DECLARE new_account_number CHAR(15);

    -- Declare a handler for any errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred during account creation';
    END;

    START TRANSACTION;

        -- Generate a new account number based on the account type
        SET new_account_number = generate_account_number(account_type);

        -- Insert the new account information into the account table
        INSERT INTO account (account_type, account_number, customer_id, branch_id, balance, status)
        VALUES (account_type, new_account_number, customer_id, branch_id, 0.00, 'active');

        COMMIT;
        SET account_number = new_account_number;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DepositFunds` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DepositFunds`(
    IN acc_number VARCHAR(255),
    IN deposit_amount DECIMAL(15,2),
    IN branch INT,
    IN description VARCHAR(255),
    OUT result VARCHAR(255)
)
BEGIN
    DECLARE current_balance DECIMAL(15,2);
    DECLARE acc_id INT;

    -- Declare a handler for any errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SET result = 'Error occurred during deposit';
    END;

    START TRANSACTION;

    -- Labeled block to handle procedure exit
    proc_exit: BEGIN

        -- Get the account ID based on the account number
        SELECT account_id INTO acc_id FROM account WHERE account_number = acc_number;

        -- Check if the account ID was found
        IF acc_id IS NULL THEN
            SET result = 'Account not found';
            LEAVE proc_exit; -- Exit the procedure if account is not found
        END IF;

        -- Check the current balance of the account
        SELECT balance INTO current_balance FROM account WHERE account_id = acc_id;

        -- Update the account balance
        UPDATE account 
        SET balance = balance + deposit_amount 
        WHERE account_id = acc_id;
        
        -- Insert the transaction into the transaction table
        INSERT INTO transaction (account_id, transaction_type, amount, date, description)
        VALUES (acc_id, 'deposit', deposit_amount, NOW(), description);
        
        -- Get the transaction ID of the inserted transaction
        SET @trans_id = LAST_INSERT_ID();
        
        -- Log the deposit into the deposit table (assuming a correct table name)
        INSERT INTO deposit (transaction_id, branch_id)
        VALUES (@trans_id, branch);

        COMMIT;

        SET result = 'Deposit successful';

    END proc_exit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetLoanDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetLoanDetails`(IN userId INT)
BEGIN
    SELECT 
        l.loan_id, 
        l.loan_type, 
        l.amount, 
        l.interest_rate,
        COALESCE(ply.penalty_amount, 0) AS penalty_amount
    FROM
        loan l
        JOIN account a ON l.account_id = a.account_id
        JOIN customer c ON a.customer_id = c.customer_id
        JOIN user u ON c.user_id = u.user_id
        LEFT JOIN (
            SELECT 
                li.loan_id, 
                lp.instalment_id, 
                pt.penalty_amount
            FROM
                loan_installment li
                LEFT JOIN loan_payment lp ON li.installment_id = lp.instalment_id
                LEFT JOIN penalty p ON lp.penalty_id = p.penalty_id
                LEFT JOIN penalty_types pt ON p.penalty_type_id = pt.penalty_type_id
        ) AS ply ON l.loan_id = ply.loan_id
    WHERE
        u.user_id = userId
    GROUP BY 
        l.loan_id, l.loan_type, l.amount, l.interest_rate, ply.penalty_amount;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MoneyTransfer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MoneyTransfer`(
    IN sender_account_id INT,
    IN receiver_account_id INT,
    IN transfer_amount DECIMAL(10,2)
)
BEGIN
    DECLARE sender_balance DECIMAL(15,2);
    DECLARE receiver_balance DECIMAL(15,2);
    DECLARE sender_status ENUM('active','inactive');
    DECLARE receiver_status ENUM('active','inactive');
    DECLARE transaction_time  datetime;
    -- DECLARE insufficient_funds EXCEPTION;
	
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
    ROLLBACK; -- Roll back the transaction in case of error
    SELECT 'An error occurred during the transfer. Transaction rolled back.' AS error_message;
    END;


	
    SELECT NOW() INTO transaction_time;
	START TRANSACTION;
    -- Check if both sender and receiver accounts are active and get their balances
    SELECT balance, status INTO sender_balance, sender_status 
    FROM account
    WHERE account_id = sender_account_id;
    

    SELECT balance, status INTO receiver_balance, receiver_status 
    FROM account
    WHERE account_id = receiver_account_id;
    

    -- Check if sender's account is active and has sufficient balance
    IF sender_status = 'inactive' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sender account is not active.';
    ELSEIF sender_balance < transfer_amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds in sender account.';
    END IF;

    -- Check if receiver's account is active
    IF receiver_status ='inactive' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Receiver account is not active.';
    END IF;
	
    
    -- Perform the transaction: deduct from sender's account and add to receiver's account
    UPDATE account
    SET balance = balance - transfer_amount
    WHERE account_id = sender_account_id;

    UPDATE account
    SET balance = balance + transfer_amount
    WHERE account_id = receiver_account_id;

    -- Insert transaction records for sender and receiver, including beneficiary account IDs
    INSERT INTO transaction(account_id, transaction_type, amount, date, description)
    VALUES 
    (sender_account_id, 'transfer', transfer_amount, transaction_time, CONCAT('Transfer to account ', receiver_account_id)),
    (receiver_account_id, 'deposit', transfer_amount, transaction_time, CONCAT('Transfer from account ', sender_account_id));

COMMIT;

    -- Confirm the transfer
    SELECT CONCAT('Transfer of ', transfer_amount, ' completed from account ', sender_account_id, ' to account ', receiver_account_id) AS confirmation_message;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_user_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_user_info`(
    IN userId INT,
    IN new_username VARCHAR(255),
    IN new_email VARCHAR(255),
    IN new_address TEXT,
    IN new_mobile_number VARCHAR(15),
    IN new_landline_number VARCHAR(15)
)
BEGIN
    -- Update the 'user' table
    UPDATE user
    SET user_name = new_username, email = new_email
    WHERE user_id = userId;

    -- Update the 'customer' table
    UPDATE customer
    SET address = new_address, mobile_number = new_mobile_number, landline_number = new_landline_number
    WHERE user_id = userId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `WithdrawFunds` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `WithdrawFunds`(
    IN acc_number VARCHAR(255),
    IN withdraw_amount DECIMAL(15,2),
    IN branch INT,
    IN description VARCHAR(255),
    OUT result VARCHAR(255)
)
BEGIN
    DECLARE current_balance DECIMAL(15,2);
    DECLARE acc_id INT;

    -- Declare a handler for any errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- In case of an error, rollback the transaction
        ROLLBACK;
        SET result = 'Error occurred during withdrawal';
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Labeled block to handle procedure exit
    proc_exit: BEGIN

        -- Get the account ID based on the account number
        SELECT account_id INTO acc_id FROM account WHERE account_number = acc_number;

        -- Check if the account ID was found
        IF acc_id IS NULL THEN
            SET result = 'Account not found';
            LEAVE proc_exit; -- Exit the procedure if account is not found
        END IF;

        -- Check the current balance of the account
        SELECT balance INTO current_balance FROM account WHERE account_id = acc_id;

        -- Check if sufficient balance is available
        IF current_balance >= withdraw_amount THEN
            -- Update the account balance
            UPDATE account 
            SET balance = balance - withdraw_amount 
            WHERE account_id = acc_id;
            
            -- Insert the transaction into the transaction table
            INSERT INTO transaction (account_id, transaction_type, amount, date, description)
            VALUES (acc_id, 'withdrawal', withdraw_amount, NOW(), description);
            
            -- Get the transaction ID of the inserted transaction
            SET @trans_id = LAST_INSERT_ID();
            
            -- Log the withdrawal into the withdrawal table
            INSERT INTO withdrawal (transaction_id, branch_id)
            VALUES (@trans_id, branch);
            
            -- Commit the transaction after all operations succeed
            COMMIT;

            -- Success message
            SET result = 'Withdrawal successful';
        ELSE
            -- Insufficient balance message, rollback the transaction
            ROLLBACK;
            SET result = 'Insufficient balance for withdrawal';
        END IF;

    END proc_exit;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `accounts_summary`
--

/*!50001 DROP VIEW IF EXISTS `accounts_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `accounts_summary` AS select `c`.`customer_id` AS `customer_id`,coalesce(sum((case when (`a`.`account_type` = 'checking') then `a`.`balance` else 0 end)),0) AS `checking_account_balance`,coalesce(sum((case when (`a`.`account_type` = 'savings') then `a`.`balance` else 0 end)),0) AS `savings_account_balance`,coalesce(sum(`fd`.`amount`),0) AS `fd_balance` from (((`customer` `c` left join `account` `a` on((`c`.`customer_id` = `a`.`customer_id`))) left join `savings_account` `sa` on((`a`.`account_id` = `sa`.`account_id`))) left join `fixed_deposit` `fd` on((`sa`.`savings_account_id` = `fd`.`savings_account_id`))) group by `c`.`customer_id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_checking_accounts`
--

/*!50001 DROP VIEW IF EXISTS `branch_checking_accounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_checking_accounts` AS select `checking_account`.`checking_account_id` AS `checking_account_id`,`checking_account`.`account_id` AS `account_id`,`customer`.`customer_id` AS `customer_id`,`customer`.`user_id` AS `user_id`,`customer`.`customer_type` AS `customer_type`,`customer`.`mobile_number` AS `mobile_number`,`customer`.`landline_number` AS `landline_number`,`customer`.`address` AS `address`,`branch`.`branch_id` AS `branch_id`,`branch`.`name` AS `name`,`branch`.`location` AS `location`,`branch`.`manager_id` AS `manager_id` from (((`checking_account` join `account` on((`checking_account`.`account_id` = `account`.`account_id`))) join `customer` on((`account`.`customer_id` = `customer`.`customer_id`))) join `branch` on((`account`.`branch_id` = `branch`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_customer_details`
--

/*!50001 DROP VIEW IF EXISTS `branch_customer_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_customer_details` AS select `customer`.`customer_id` AS `customer_id`,`customer`.`user_id` AS `user_id`,`customer`.`customer_type` AS `customer_type`,`customer`.`mobile_number` AS `mobile_number`,`customer`.`landline_number` AS `landline_number`,`customer`.`address` AS `address`,`branch`.`branch_id` AS `branch_id`,`branch`.`name` AS `name`,`branch`.`location` AS `location`,`branch`.`manager_id` AS `manager_id` from ((`customer` join `account` on((`customer`.`customer_id` = `account`.`customer_id`))) join `branch` on((`account`.`branch_id` = `branch`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_employee_details`
--

/*!50001 DROP VIEW IF EXISTS `branch_employee_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_employee_details` AS select `e`.`employee_id` AS `employee_id`,`e`.`branch_id` AS `branch_id`,`b`.`name` AS `branch_name`,`s`.`full_name` AS `full_name` from ((`employee` `e` join `branch` `b` on((`e`.`branch_id` = `b`.`branch_id`))) join `staff` `s` on((`s`.`staff_id` = `e`.`staff_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_loan_details`
--

/*!50001 DROP VIEW IF EXISTS `branch_loan_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_loan_details` AS select `l`.`loan_id` AS `loan_id`,`l`.`amount` AS `amount`,`l`.`loan_type` AS `loan_type`,`l`.`start_date` AS `start_date`,`l`.`end_date` AS `end_date`,`l`.`status` AS `status`,`a`.`account_id` AS `loan_account_id`,`a`.`customer_id` AS `customer_id`,`a`.`branch_id` AS `branch_id`,`b`.`name` AS `branch_name`,`b`.`location` AS `location` from ((`loan` `l` join `account` `a` on((`l`.`account_id` = `a`.`account_id`))) join `branch` `b` on((`a`.`branch_id` = `b`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_savings_accounts`
--

/*!50001 DROP VIEW IF EXISTS `branch_savings_accounts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_savings_accounts` AS select `savings_account`.`savings_account_id` AS `savings_account_id`,`savings_account`.`account_id` AS `account_id`,`savings_account`.`savings_plan_id` AS `savings_plan_id`,`customer`.`customer_id` AS `customer_id`,`customer`.`user_id` AS `user_id`,`customer`.`customer_type` AS `customer_type`,`customer`.`mobile_number` AS `mobile_number`,`customer`.`landline_number` AS `landline_number`,`customer`.`address` AS `address`,`branch`.`branch_id` AS `branch_id`,`branch`.`name` AS `name`,`branch`.`location` AS `location`,`branch`.`manager_id` AS `manager_id` from (((`savings_account` join `account` on((`savings_account`.`account_id` = `account`.`account_id`))) join `customer` on((`account`.`customer_id` = `customer`.`customer_id`))) join `branch` on((`account`.`branch_id` = `branch`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `branch_transaction_details`
--

/*!50001 DROP VIEW IF EXISTS `branch_transaction_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `branch_transaction_details` AS select `t`.`transaction_id` AS `transaction_id`,`t`.`date` AS `date`,`t`.`amount` AS `amount`,`t`.`transaction_type` AS `transaction_type`,`a`.`account_id` AS `transaction_account_id`,`a`.`account_number` AS `account_number`,`c`.`customer_id` AS `customer_id`,`b`.`branch_id` AS `branch_id`,`b`.`name` AS `name` from (((`transaction` `t` join `account` `a` on((`t`.`account_id` = `a`.`account_id`))) join `customer` `c` on((`a`.`customer_id` = `c`.`customer_id`))) join `branch` `b` on((`a`.`branch_id` = `b`.`branch_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `transaction_history`
--

/*!50001 DROP VIEW IF EXISTS `transaction_history`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `transaction_history` AS select `c`.`customer_id` AS `customer_id`,`t`.`transaction_id` AS `transaction_id`,`t`.`transaction_type` AS `transaction_type`,`t`.`amount` AS `amount`,`t`.`date` AS `date`,`t`.`description` AS `description`,`a`.`account_number` AS `account_number` from ((`customer` `c` join `account` `a` on((`c`.`customer_id` = `a`.`customer_id`))) join `transaction` `t` on((`a`.`account_id` = `t`.`account_id`))) order by `t`.`date` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-15 23:44:09
