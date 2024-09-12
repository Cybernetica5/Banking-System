-- Create database and use it
DROP DATABASE IF EXISTS bank_database;
CREATE DATABASE bank_database;
USE bank_database;

-- User table
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(100),
  role ENUM('staff', 'customer'),
  PRIMARY KEY (user_id)
);

-- Staff table
DROP TABLE IF EXISTS Staff;
CREATE TABLE Staff (
  staff_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  full_name VARCHAR(100),
  date_of_birth DATE,
  NIC VARCHAR(12),
  role ENUM('manager', 'employee'),
  PRIMARY KEY (staff_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Customer table
DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
  customer_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  customer_type ENUM('individual', 'organization'),
  mobile_number VARCHAR(10),
  landline_number VARCHAR(10),
  address VARCHAR(255),
  PRIMARY KEY (customer_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- Organization table
DROP TABLE IF EXISTS organization;
CREATE TABLE organization (
  customer_id INT,
  name VARCHAR(100),
  lisence_number VARCHAR(100),
  PRIMARY KEY (customer_id),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Individual table
DROP TABLE IF EXISTS individual;
CREATE TABLE individual (
  customer_id INT,
  full_name VARCHAR(100),
  date_of_birth DATE,
  NIC VARCHAR(12),
  PRIMARY KEY (customer_id),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Branch table
DROP TABLE IF EXISTS branch;
CREATE TABLE branch (
  branch_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  location VARCHAR(255),
  manager_id INT,
  PRIMARY KEY (branch_id)
);

-- Manager table
DROP TABLE IF EXISTS manager;
CREATE TABLE manager (
  manager_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT,
  PRIMARY KEY (manager_id),
  FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);

-- Employee table
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT,
  branch_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (staff_id) REFERENCES Staff(staff_id),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

-- Add foreign key to branch table after manager table is created
ALTER TABLE branch
ADD FOREIGN KEY (manager_id) REFERENCES manager(manager_id);

-- Account table
DROP TABLE IF EXISTS account;
CREATE TABLE account (
  account_id INT NOT NULL AUTO_INCREMENT,
  account_type ENUM('savings', 'checking'),
  account_number CHAR(15),
  customer_id INT,
  branch_id INT,
  balance DECIMAL(15,2),
  status ENUM('active', 'inactive'),
  PRIMARY KEY (account_id),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

-- Savings plan table
DROP TABLE IF EXISTS savings_plan;
CREATE TABLE savings_plan (
  savings_plan_id INT NOT NULL AUTO_INCREMENT,
  type ENUM('child', 'teen', 'adult', 'senior'),
  Interest_rate DECIMAL(4,2),
  minimum_balance DECIMAL(15,2),
  age_limit INT,
  PRIMARY KEY (savings_plan_id)
);

-- FD plan table
DROP TABLE IF EXISTS fd_plan;
CREATE TABLE fd_plan (
  fd_plan_id INT NOT NULL AUTO_INCREMENT,
  duration INT,
  Interest_rate DECIMAL(4,2),
  PRIMARY KEY (fd_plan_id)
);

-- Savings account table
DROP TABLE IF EXISTS savings_account;
CREATE TABLE savings_account (
  savings_account_id INT NOT NULL AUTO_INCREMENT,
  account_id INT,
  savings_plan_id INT,
  PRIMARY KEY (savings_account_id),
  FOREIGN KEY (account_id) REFERENCES account(account_id),
  FOREIGN KEY (savings_plan_id) REFERENCES savings_plan(savings_plan_id)
);

-- Fixed deposit table
DROP TABLE IF EXISTS fixed_deposit;
CREATE TABLE fixed_deposit (
  fd_id INT NOT NULL AUTO_INCREMENT,
  savings_account_id INT,
  amount DECIMAL(15,2),
  fd_plan_id INT,
  start_date DATE,
  end_date DATE,
  PRIMARY KEY (fd_id),
  FOREIGN KEY (savings_account_id) REFERENCES savings_account(savings_account_id),
  FOREIGN KEY (fd_plan_id) REFERENCES fd_plan(fd_plan_id)
);

-- Transaction table
DROP TABLE IF EXISTS transaction;
CREATE TABLE transaction (
  transaction_id INT NOT NULL AUTO_INCREMENT,
  account_id INT,
  transaction_type ENUM('deposit', 'withdrawal', 'transfer'),
  amount DECIMAL(15,2),
  date DATETIME,
  description VARCHAR(255),
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- Penalty types table
DROP TABLE IF EXISTS penalty_types;
CREATE TABLE penalty_types (
  penalty_type_id INT NOT NULL AUTO_INCREMENT,
  penalty_amount DECIMAL(10,2),
  penalty_type VARCHAR(50),
  PRIMARY KEY (penalty_type_id)
);

-- Customer log table
DROP TABLE IF EXISTS customer_log;
CREATE TABLE customer_log (
  log_id INT NOT NULL AUTO_INCREMENT,
  customer_id INT,
  mobile_number VARCHAR(10),
  landline_number VARCHAR(10),
  address VARCHAR(255),
  updated_date DATE,
  PRIMARY KEY (log_id),
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

-- Loan table
DROP TABLE IF EXISTS loan;
CREATE TABLE loan (
  loan_id INT NOT NULL AUTO_INCREMENT,
  account_id INT,
  loan_type ENUM('personal', 'business'),
  amount DECIMAL(15,2),
  interest_rate DECIMAL(4,2),
  start_date DATE,
  end_date DATE,
  status ENUM('approved', 'pending', 'rejected'),
  PRIMARY KEY (loan_id),
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- Penalty table
DROP TABLE IF EXISTS penalty;
CREATE TABLE penalty (
  penalty_id INT NOT NULL AUTO_INCREMENT,
  penalty_type_id INT,
  PRIMARY KEY (penalty_id),
  FOREIGN KEY (penalty_type_id) REFERENCES penalty_types(penalty_type_id)
);

-- Deposit table
DROP TABLE IF EXISTS deposit;
CREATE TABLE deposit (
  transaction_id INT,
  branch_id INT,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

-- Loan installment table
DROP TABLE IF EXISTS loan_installment;
CREATE TABLE loan_installment (
  installment_id INT NOT NULL AUTO_INCREMENT,
  loan_id INT,
  amount DECIMAL(15,2),
  duration INT DEFAULT 30,
  PRIMARY KEY (installment_id),
  FOREIGN KEY (loan_id) REFERENCES loan(loan_id)
);

-- Withdrawal table
DROP TABLE IF EXISTS withdrawal;
CREATE TABLE withdrawal (
  transaction_id INT,
  branch_id INT,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id),
  FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);

-- Checking account table
DROP TABLE IF EXISTS checking_account;
CREATE TABLE checking_account (
  checking_account_id INT NOT NULL AUTO_INCREMENT,
  account_id INT,
  PRIMARY KEY (checking_account_id),
  FOREIGN KEY (account_id) REFERENCES account(account_id)
);

-- Transfer table
DROP TABLE IF EXISTS transfer;
CREATE TABLE transfer (
  transaction_id INT,
  beneficiary_account_id INT,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (transaction_id) REFERENCES transaction(transaction_id),
  FOREIGN KEY (beneficiary_account_id) REFERENCES account(account_id)
);

-- Loan payment table
DROP TABLE IF EXISTS loan_payment;
CREATE TABLE loan_payment (
  payment_id INT NOT NULL AUTO_INCREMENT,
  instalment_id INT,
  amount DECIMAL(15,2),
  due_date DATE,
  payed_date DATE,
  status ENUM('paid', 'unpaid'),
  penalty_id INT,
  PRIMARY KEY (payment_id),
  FOREIGN KEY (instalment_id) REFERENCES loan_installment(installment_id),
  FOREIGN KEY (penalty_id) REFERENCES penalty(penalty_id)
);