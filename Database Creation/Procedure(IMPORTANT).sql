
-- Modified branch_transaction_details view to show only transactions with withdrawal or deposit
DROP VIEW IF EXISTS `branch_transaction_details`;
CREATE VIEW `branch_transaction_details` AS
    SELECT 
        t.transaction_id,
        t.account_id,
        t.date,
        t.amount,
        t.transaction_type,
        a.account_number,
        COALESCE(w.branch_id, d.branch_id) AS branch_id
    FROM transaction t
    JOIN account a ON t.account_id = a.account_id
    LEFT JOIN withdrawal w ON t.transaction_id = w.transaction_id
    LEFT JOIN deposit d ON t.transaction_id = d.transaction_id
    WHERE w.transaction_id IS NOT NULL OR d.transaction_id IS NOT NULL
    ORDER BY t.date DESC;


--------------------------------------------------------User-------------------------------------------------------------------

-- update user information
DROP PROCEDURE IF EXISTS update_user_info;

DELIMITER $$

CREATE PROCEDURE `update_user_info`(
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
END $$

DELIMITER ;


--------------------------------------------------------Transaction------------------------------------------------------------

-- Withdraw funds from an account

DROP PROCEDURE IF EXISTS withdraw_funds;

DELIMITER $$

CREATE PROCEDURE WithdrawFunds(
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
END $$

DELIMITER ;



DROP PROCEDURE IF EXISTS deposit_funds;

DELIMITER $$

CREATE PROCEDURE DepositFunds(
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
END $$

DELIMITER ;

--------------------------------------------------------Add new customer------------------------------------------------------------

-- Function for generate a Account number
DROP FUNCTION IF EXISTS generate_account_number;

DELIMITER $$

CREATE FUNCTION generate_account_number(acc_type ENUM('savings', 'checking')) 
RETURNS CHAR(15)
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
END$$

DELIMITER ;


-- Create a new account for a customer
DROP PROCEDURE IF EXISTS create_account;

DELIMITER $$
CREATE PROCEDURE create_account(
    IN customer_id INT,
    IN branch_id INT,
    IN account_type ENUM('savings', 'checking'),
    IN savings_plan_id INT,
    OUT account_number CHAR(15)
)

BEGIN
    DECLARE new_account_number CHAR(15);
    DECLARE accountId INT;

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
        VALUES (account_type, new_account_number, customer_id, branch_id, 1000, 'active');

        -- Get the account ID of the inserted account
        SET accountId = LAST_INSERT_ID();

        IF account_type = 'savings' THEN
            INSERT INTO savings_account (account_id, savings_plan_id)
            VALUES (accountId, savings_plan_id);
        ELSEIF account_type = 'checking' THEN
            INSERT INTO checking_account (account_id)
            VALUES (accountId);
        END IF;

        COMMIT;
        SET account_number = new_account_number;

END $$
DELIMITER ;

-- Add new individual customer
DROP PROCEDURE IF EXISTS add_individual_customer;

DELIMITER $$
CREATE PROCEDURE add_individual_customer(
    IN branch_id INT,
    IN full_name VARCHAR(100),
    IN date_of_birth DATE,
    IN NIC VARCHAR(12),
    IN address VARCHAR(255),
    IN mobile_number VARCHAR(10),
    IN landline_number VARCHAR(10),
    IN account_type ENUM('savings', 'checking'),
    IN savings_plan_id INT,
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
        CALL create_account(customer_id, branch_id, account_type, savings_plan_id, @account_number);


        COMMIT;
        -- If the transaction is successful, return the account number
        SET account_number = @account_number; 

END $$

DELIMITER ;


-- Add new organization customer
DROP PROCEDURE IF EXISTS add_organization_customer;

DELIMITER $$
CREATE PROCEDURE add_organization_customer(
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
        CALL create_account(customer_id, branch_id, account_type, NULL, @account_number);

        COMMIT;
        -- If the transaction is successful, return the account number
        SET account_number = @account_number; 

END $$
DELIMITER ;