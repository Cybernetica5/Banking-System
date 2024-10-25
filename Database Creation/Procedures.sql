DELIMITER $$ CREATE DEFINER = `root` @`localhost` PROCEDURE `MoneyTransfer`(
    IN sender_account_id INT,
    IN receiver_account_id INT,
    IN transfer_amount DECIMAL(10, 2),
    IN description_0 VARCHAR(255)
) BEGIN
DECLARE sender_balance DECIMAL(15, 2);
DECLARE receiver_balance DECIMAL(15, 2);
DECLARE sender_status ENUM('active', 'inactive');
DECLARE receiver_status ENUM('active', 'inactive');
DECLARE transaction_time datetime;
-- DECLARE insufficient_funds EXCEPTION;
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
-- Roll back the transaction in case of error
SELECT 'An error occurred during the transfer. Transaction rolled back.' AS error_message;
END;
SELECT NOW() INTO transaction_time;
START TRANSACTION;
-- Check if both sender and receiver accounts are active and get their balances
SELECT balance,
    status INTO sender_balance,
    sender_status
FROM account
WHERE account_id = sender_account_id;
SELECT balance,
    status INTO receiver_balance,
    receiver_status
FROM account
WHERE account_id = receiver_account_id;
-- Check if sender's account is active and has sufficient balance
IF sender_status = 'inactive' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Sender account is not active.';
ELSEIF sender_balance < transfer_amount THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Insufficient funds in sender account.';
END IF;
-- Check if receiver's account is active
IF receiver_status = 'inactive' THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Receiver account is not active.';
END IF;
-- Perform the transaction: deduct from sender's account and add to receiver's account
UPDATE account
SET balance = balance - transfer_amount
WHERE account_id = sender_account_id;
UPDATE account
SET balance = balance + transfer_amount
WHERE account_id = receiver_account_id;
-- Insert transaction records for sender and receiver, including beneficiary account IDs
INSERT INTO transaction(
        account_id,
        transaction_type,
        amount,
        date,
        description
    )
VALUES (
        sender_account_id,
        'transfer',
        transfer_amount,
        transaction_time,
        description_0
    );
-- (receiver_account_id, 'deposit', transfer_amount, transaction_time, CONCAT('Transfer from account ', sender_account_id));
SET @trans_id = LAST_INSERT_ID();
INSERT INTO transfer(transaction_id, beneficiary_account_id)
VALUES (@trans_id, receiver_account_id);
COMMIT;
-- Confirm the transfer
SELECT CONCAT(
        'Transfer of ',
        transfer_amount,
        ' completed from account ',
        sender_account_id,
        ' to account ',
        receiver_account_id
    ) AS confirmation_message;
END $$ DELIMITER;
DELIMITER // CREATE PROCEDURE GetLoanDetails(IN userId INT) BEGIN
SELECT l.loan_id,
    l.loan_type,
    l.amount,
    l.interest_rate,
    COALESCE(ply.penalty_amount, 0) AS penalty_amount
FROM loan l
    JOIN account a ON l.account_id = a.account_id
    JOIN customer c ON a.customer_id = c.customer_id
    JOIN user u ON c.user_id = u.user_id
    LEFT JOIN (
        SELECT li.loan_id,
            lp.instalment_id,
            pt.penalty_amount
        FROM loan_installment li
            LEFT JOIN loan_payment lp ON li.installment_id = lp.instalment_id
            LEFT JOIN penalty p ON lp.penalty_id = p.penalty_id
            LEFT JOIN penalty_types pt ON p.penalty_type_id = pt.penalty_type_id
    ) AS ply ON l.loan_id = ply.loan_id
WHERE u.user_id = userId
GROUP BY l.loan_id,
    l.loan_type,
    l.amount,
    l.interest_rate,
    ply.penalty_amount;
END // DELIMITER;
CREATE DEFINER = `root` @`localhost` PROCEDURE `AddEmploye`(
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_NIC VARCHAR(12),
    IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback the transaction in case of error
    ROLLBACK;
-- Signal an error
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to add employee.';
END;
-- Start transaction
START TRANSACTION;
-- Step 1: Insert into the user table
INSERT INTO user(user_name, password, email, role)
VALUES(p_user_name, p_password, p_email, 'staff');
-- Step 2: Insert into the staff table using the new user_id
INSERT INTO staff(user_id, full_name, date_of_birth, NIC, role)
VALUES(
        LAST_INSERT_ID(),
        p_full_name,
        p_date_of_birth,
        p_NIC,
        'employee'
    );
-- Step 3: Insert into the employee table using the new staff_id
INSERT INTO employee(staff_id, branch_id)
VALUES(LAST_INSERT_ID(), p_branch_id);
-- Commit the transaction if all operations are successful
COMMIT;
END CREATE DEFINER = `root` @`localhost` PROCEDURE `removeEmployee`(p_staff_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback the transaction in case of error
    ROLLBACK;
-- Signal an error
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to remove employee.';
END;
-- Start transaction
START TRANSACTION;
-- Delete from employee table
DELETE FROM employee
WHERE staff_id = p_staff_id;
-- Delete from staff table
DELETE FROM staff
WHERE staff_id = p_staff_id;
-- If no error, commit the transaction
COMMIT;
END CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_staff_details`(
    IN p_staff_id INT,
    -- IN p_user_name VARCHAR(50),
    -- IN p_password VARCHAR(255),
    -- IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback the transaction in case of error
    ROLLBACK;
-- Signal an error
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update staff details.';
END;
-- Start transaction
START TRANSACTION;
-- Update staff details based on staff_id
UPDATE staff
SET full_name = p_full_name,
    date_of_birth = p_date_of_birth
WHERE staff_id = p_staff_id;
-- If no error, commit the transaction
COMMIT;
END -- -------------------------------update Employee user details ---------------------------------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_user_details`(
    IN p_staff_id INT,
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100) -- IN p_full_name VARCHAR(100), 
    -- IN p_date_of_birth DATE,
    -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback the transaction in case of error
    ROLLBACK;
-- Signal an error
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update user details.';
END;
-- Start transaction
START TRANSACTION;
-- Update user details based on staff_id
UPDATE user
SET user_name = p_user_name,
    password = p_password,
    email = p_email
WHERE user_id = (
        SELECT user_id
        FROM staff
        WHERE staff_id = p_staff_id
    );
-- If no error, commit the transaction
COMMIT;
END -- ---------------------------------- update emplotee branch -------------------------------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_branch`(p_staff_id INT, p_branch_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback the transaction in case of error
    ROLLBACK;
-- Signal an error
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update employee branch.';
END;
-- Start transaction
START TRANSACTION;
-- Update statement
UPDATE employee
SET branch_id = p_branch_id
WHERE staff_id = p_staff_id;
-- If no error, commit the transaction
COMMIT;
END