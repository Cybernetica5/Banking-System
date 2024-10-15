use bank_database;

--  Trigger for logging changes to the customer table
DELIMITER //

DROP TRIGGER IF EXISTS log_customer_changes //
CREATE TRIGGER log_customer_changes
AFTER INSERT ON customer
FOR EACH ROW
BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (NEW.customer_id, NEW.mobile_number, NEW.landline_number, NEW.address, CURRENT_TIMESTAMP);
END //

DROP TRIGGER IF EXISTS log_customer_update //
CREATE TRIGGER log_customer_update
AFTER UPDATE ON customer
FOR EACH ROW
BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (NEW.customer_id, NEW.mobile_number, NEW.landline_number, NEW.address, CURRENT_TIMESTAMP);
END //

DROP TRIGGER IF EXISTS log_customer_delete //
CREATE TRIGGER log_customer_delete
AFTER DELETE ON customer
FOR EACH ROW
BEGIN
    INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) 
    VALUES (OLD.customer_id, NULL, NULL, NULL, CURRENT_TIMESTAMP);
END //

DELIMITER ;

-- -------------------------------------------------------------------------------------------------------
-- View for the manager to view loan details relevant to their branch
-- DROP VIEW IF EXISTS branch_loan_details;
-- CREATE VIEW branch_loan_details AS
-- SELECT loan.*, customer.*, account.*, branch.*
-- FROM loan
-- JOIN account ON loan.account_id = account.account_id
-- JOIN customer ON account.customer_id = customer.customer_id
-- JOIN branch ON account.branch_id = branch.branch_id; 

DROP VIEW IF EXISTS branch_loan_details;
CREATE VIEW branch_loan_details AS
SELECT 
    l.loan_id,
    l.amount,
    l.loan_type,
    l.start_date,
    l.end_date,
    l.status,
    a.account_id AS loan_account_id,  
    a.customer_id,
    a.branch_id,
    b.name,
    b.location
FROM 
    loan l
JOIN 
    account a ON l.account_id = a.account_id
JOIN 
    branch b ON a.branch_id = b.branch_id;


-- View to get savings accounts relevant to a manager's branch
DROP VIEW IF EXISTS branch_savings_accounts;
CREATE VIEW branch_savings_accounts AS
SELECT savings_account.*, customer.*, branch.*
FROM savings_account
JOIN account ON savings_account.account_id = account.account_id
JOIN customer ON account.customer_id = customer.customer_id
JOIN branch ON account.branch_id = branch.branch_id;

--  View to get checking accounts relevant to a manager's branch
DROP VIEW IF EXISTS branch_checking_accounts;
CREATE VIEW branch_checking_accounts AS
SELECT checking_account.*, customer.*, branch.*
FROM checking_account
JOIN account ON checking_account.account_id = account.account_id
JOIN customer ON account.customer_id = customer.customer_id
JOIN branch ON account.branch_id = branch.branch_id;

-- View to get transaction details relevant to the accounts of a branch
-- DROP VIEW IF EXISTS branch_transaction_details;
-- CREATE VIEW branch_transaction_details AS
-- SELECT transaction.*, account.*, customer.*, branch.*
-- FROM transaction
-- JOIN account ON transaction.account_id = account.account_id
-- JOIN customer ON account.customer_id = customer.customer_id
-- JOIN branch ON account.branch_id = branch.branch_id;
DROP VIEW IF EXISTS branch_transaction_details;
CREATE VIEW branch_transaction_details AS
SELECT 
    t.transaction_id, 
    t.transaction_date, 
    t.amount, 
    t.transaction_type,
    a.account_id AS transaction_account_id,  -- Alias for account_id from transaction table
    a.account_number, 
    c.customer_id, 
    c.first_name, 
    c.last_name, 
    b.branch_id, 
    b.branch_name
FROM transaction t
JOIN account a ON t.account_id = a.account_id
JOIN customer c ON a.customer_id = c.customer_id
JOIN branch b ON a.branch_id = b.branch_id;


-- View to get employee details for a relevant branch
DROP VIEW IF EXISTS branch_employee_details;
CREATE VIEW branch_employee_details AS
SELECT employee.*, branch.*
FROM employee
JOIN branch ON employee.branch_id = branch.branch_id;

-- View to get customer details relevant to a branch
DROP VIEW IF EXISTS branch_customer_details;
CREATE VIEW branch_customer_details AS
SELECT customer.*, branch.*
FROM customer
JOIN account ON customer.customer_id = account.customer_id
JOIN branch ON account.branch_id = branch.branch_id;

SELECT * FROM branch_loan_details;
SELECT * FROM branch_savings_accounts;
SELECT * FROM branch_checking_accounts;
SELECT * FROM branch_transaction_details;
SELECT * FROM branch_employee_details;
SELECT * FROM branch_customer_details;
