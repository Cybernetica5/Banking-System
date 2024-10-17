CREATE DEFINER = `root` @`localhost` PROCEDURE `MoneyTransfer`(
    IN sender_account_id INT,
    IN receiver_account_id INT,
    IN transfer_amount DECIMAL(10, 2)
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
        CONCAT('Transfer to account ', receiver_account_id)
    ),
    (
        receiver_account_id,
        'deposit',
        transfer_amount,
        transaction_time,
        CONCAT('Transfer from account ', sender_account_id)
    );
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
END -- used to add employees
CREATE DEFINER = `root` @`localhost` PROCEDURE `AddEmploye`(
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_NIC VARCHAR(12),
    IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to add employee.';
END;
START TRANSACTION;
INSERT INTO user(user_name, password, email, role)
VALUES(p_user_name, p_password, p_email, 'staff');
INSERT INTO staff(user_id, full_name, date_of_birth, NIC, role)
VALUES(
        LAST_INSERT_ID(),
        p_full_name,
        p_date_of_birth,
        p_NIC,
        'employee'
    );
INSERT INTO employee(staff_id, branch_id)
VALUES(LAST_INSERT_ID(), p_branch_id);
COMMIT;
END -- used to remove employee
CREATE DEFINER = `root` @`localhost` PROCEDURE `removeEmployee`(p_staff_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to remove employee.';
END;
START TRANSACTION;
DELETE FROM employee
WHERE staff_id = p_staff_id;
DELETE FROM staff
WHERE staff_id = p_staff_id;
COMMIT;
END -- update only staff details on staff table
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_staff_details`(
    IN p_staff_id INT,
    -- IN p_user_name VARCHAR(50),
    -- IN p_password VARCHAR(255),
    -- IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update staff details.';
END;
START TRANSACTION;
UPDATE staff
SET full_name = p_full_name,
    date_of_birth = p_date_of_birth
WHERE staff_id = p_staff_id;
COMMIT;
END -- update only user details on user table
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_user_details`(
    IN p_staff_id INT,
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100) -- IN p_full_name VARCHAR(100), 
    -- IN p_date_of_birth DATE,
    -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update user details.';
END;
START TRANSACTION;
UPDATE user
SET user_name = p_user_name,
    password = p_password,
    email = p_email
WHERE user_id = (
        SELECT user_id
        FROM staff
        WHERE staff_id = p_staff_id
    );
COMMIT;
END -- update only branch on emplyee table
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_branch`(p_staff_id INT, p_branch_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update employee branch.';
END;
START TRANSACTION;
UPDATE employee
SET branch_id = p_branch_id
WHERE staff_id = p_staff_id;
COMMIT;
END