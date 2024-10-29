DELIMITER //

DROP PROCEDURE IF EXISTS `MoneyTransfer`;

CREATE DEFINER=`root`@`localhost` PROCEDURE `MoneyTransfer`(
    IN sender_account_number CHAR(15),
    IN receiver_account_number CHAR(15),
    IN transfer_amount DECIMAL(10,2),
    IN description_0 VARCHAR(255),
    OUT confirmation_message VARCHAR(255)
)
BEGIN
    DECLARE sender_balance DECIMAL(15,2);
    DECLARE receiver_balance DECIMAL(15,2);
    DECLARE sender_status ENUM('active','inactive');
    DECLARE receiver_status ENUM('active','inactive');
    DECLARE transaction_time  datetime;
    DECLARE sender_account_id INT;
    DECLARE receiver_account_id INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK; 
        SET confirmation_message = 'An error occurred during the transfer. Transaction rolled back.';
    END;

    SELECT NOW() INTO transaction_time;
    START TRANSACTION;
    
    SELECT account_id, balance, status INTO sender_account_id, sender_balance, sender_status 
    FROM account
    WHERE account_number = sender_account_number;
    
    SELECT account_id, balance, status INTO receiver_account_id, receiver_balance, receiver_status 
    FROM account
    WHERE account_number = receiver_account_number;
    
    IF sender_status = 'inactive' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sender account is not active.';
    ELSEIF sender_balance < transfer_amount THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds in sender account.';
    END IF;

    IF receiver_status = 'inactive' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Receiver account is not active.';
    END IF;
    
    UPDATE account
    SET balance = balance - transfer_amount
    WHERE account_id = sender_account_id;

    UPDATE account
    SET balance = balance + transfer_amount
    WHERE account_id = receiver_account_id;

    INSERT INTO transaction(account_id, transaction_type, amount, date, description)
    VALUES 
    (sender_account_id, 'transfer', transfer_amount, transaction_time, description_0);
    
    SET @trans_id = LAST_INSERT_ID();

    INSERT INTO transfer(transaction_id, beneficiary_account_id)
    VALUES
    (@trans_id, receiver_account_id);
    
    COMMIT;

    SET confirmation_message = CONCAT('Transfer of ', transfer_amount, ' completed from account ', sender_account_number, ' to account ', receiver_account_number);
END//
DELIMITER ;

DELIMITER //

DROP PROCEDURE IF EXISTS `GetLoanDetails`;

CREATE PROCEDURE GetLoanDetails(IN userId INT)
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
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS `AddLoan`;

DELIMITER ##
CREATE DEFINER = root @localhost PROCEDURE AddLoan(
    IN p_account_id INT,
    IN p_loan_type ENUM('personal', 'business'),
    IN p_amount DECIMAL(15, 2),
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_status ENUM('approved', 'pending', 'rejected')
) BEGIN
DECLARE v_loan_term INT;
DECLARE v_fixed_rate DECIMAL(4, 2);
DECLARE v_monthly_payment DECIMAL(15, 2);
DECLARE v_installment_amount DECIMAL(15, 2);
DECLARE v_duration INT;
DECLARE v_loan_id INT;
SET v_loan_term = TIMESTAMPDIFF(MONTH, p_start_date, p_end_date);
IF p_loan_type = 'personal' THEN IF v_loan_term <= 12 THEN
SET v_fixed_rate = 5.0;
ELSEIF v_loan_term > 12
AND v_loan_term <= 36 THEN
SET v_fixed_rate = 4.5;
ELSE
SET v_fixed_rate = 4.0;
END IF;
ELSEIF p_loan_type = 'business' THEN IF v_loan_term <= 12 THEN
SET v_fixed_rate = 6.0;
ELSEIF v_loan_term > 12
AND v_loan_term <= 36 THEN
SET v_fixed_rate = 5.5;
ELSE
SET v_fixed_rate = 5.0;
END IF;
END IF;
INSERT INTO loan (
        account_id,
        loan_type,
        amount,
        interest_rate,
        start_date,
        end_date,
        status
    )
VALUES (
        p_account_id,
        p_loan_type,
        p_amount,
        v_fixed_rate,
        p_start_date,
        p_end_date,
        p_status
    );
SET v_loan_id = LAST_INSERT_ID();
SET v_monthly_payment = p_amount / v_loan_term;
SET v_duration = 30;
WHILE v_loan_term > 0 DO
INSERT INTO loan_installment (loan_id, amount, duration)
VALUES (v_loan_id, v_monthly_payment, v_duration);
INSERT INTO loan_payment (instalment_id, amount, due_date, status)
VALUES (
        LAST_INSERT_ID(),
        v_monthly_payment,
        DATE_ADD(p_start_date, INTERVAL 1 MONTH),
        'unpaid'
    );
SET v_loan_term = v_loan_term - 1;
SET p_start_date = DATE_ADD(p_start_date, INTERVAL 1 MONTH);
END WHILE;
END ##
DELIMITER;
DELIMITER ##
CREATE DEFINER = root @localhost PROCEDURE AddLoanPayment(
    IN p_installment_id INT,
    IN p_payment_amount DECIMAL(15, 2),
    IN p_payment_date DATE
) BEGIN
DECLARE v_due_date DATE;
DECLARE v_status ENUM('paid', 'unpaid');
DECLARE v_penalty_id INT DEFAULT NULL;
DECLARE v_penalty_amount DECIMAL(15, 2);
DECLARE v_final_payment_amount DECIMAL(15, 2);
DECLARE v_is_late BOOLEAN;
DECLARE v_penalty_type_id INT;
SELECT penalty_type_id,
    penalty_amount INTO v_penalty_type_id,
    v_penalty_amount
FROM penalty_types
WHERE penalty_type = 'Late Payment';
SELECT due_date INTO v_due_date
FROM loan_payment
WHERE instalment_id = p_installment_id
ORDER BY payment_id DESC
LIMIT 1;
IF p_payment_date <= v_due_date THEN
SET v_status = 'paid';
SET v_is_late = FALSE;
SET v_final_payment_amount = p_payment_amount;
ELSE
SET v_status = 'unpaid';
SET v_is_late = TRUE;
SET v_final_payment_amount = p_payment_amount + v_penalty_amount;
INSERT INTO penalty (penalty_type_id)
VALUES (v_penalty_type_id);
SET v_penalty_id = LAST_INSERT_ID();
END IF;
INSERT INTO loan_payment (
        instalment_id,
        amount,
        due_date,
        payed_date,
        status,
        penalty_id
    )
VALUES (
        p_installment_id,
        v_final_payment_amount,
        v_due_date,
        p_payment_date,
        v_status,
        v_penalty_id
    );
CALL UpdateLoanInstallment(p_installment_id, p_payment_amount);
END ##
DELIMITER;
DELIMITER ##
CREATE DEFINER = root @localhost PROCEDURE UpdateLoanInstallment(
    IN p_installment_id INT,
    IN p_payment_amount DECIMAL(15, 2)
) BEGIN
DECLARE v_remaining_amount DECIMAL(15, 2);
DECLARE v_remaining_duration INT;
DECLARE v_loan_id INT;
SELECT amount,
    loan_id INTO v_remaining_amount,
    v_loan_id
FROM loan_installment
WHERE installment_id = p_installment_id;
SET v_remaining_amount = v_remaining_amount - p_payment_amount;
SET v_remaining_duration = FLOOR(v_remaining_amount / (p_payment_amount / 30));
IF v_remaining_amount <= 0 THEN
UPDATE loan_installment
SET amount = 0,
    duration = 0
WHERE installment_id = p_installment_id;
ELSE
UPDATE loan_installment
SET amount = v_remaining_amount,
    duration = v_remaining_duration
WHERE installment_id = p_installment_id;
END IF;
END ##
DELIMITER ;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPendingLoans`()
BEGIN
    SELECT loan_id, account_id, amount, start_date, status
    FROM loan
    WHERE status = 'pending';
END$$

DELIMITER;


DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ManagerApproveLoan`(
    IN p_loan_id INT,
    IN p_approved_date DATE
)
BEGIN
    DECLARE v_duration INT;
    DECLARE v_end_date DATE;
    DECLARE v_start_date DATE;

    SELECT start_date, end_date INTO v_start_date, v_end_date
    FROM loan
    WHERE loan_id = p_loan_id;


    SET v_duration = TIMESTAMPDIFF(MONTH, v_start_date, v_end_date);

    
    SET v_end_date = DATE_ADD(p_approved_date, INTERVAL v_duration MONTH);

    
    UPDATE loan
    SET start_date = p_approved_date,
        end_date = v_end_date,
        status = 'approved'
    WHERE loan_id = p_loan_id;

    
    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Loan not found or already approved';
    END IF;
END$$
DELIMITER;