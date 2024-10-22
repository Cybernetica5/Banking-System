USE bank_database;
DELIMITER $$ CREATE DEFINER = `root` @`localhost` FUNCTION `Calculate_interest`(`fd_plan_id` INT, `amount` DECIMAL(15, 2)) RETURNS decimal(10, 2) READS SQL DATA BEGIN
DECLARE `interest_rate` DECIMAL(5, 2);
DECLARE `interest` DECIMAL(10, 2);
-- Retrieve the interest rate based on the fd_plan_id
SELECT fd.interest_rate INTO `interest_rate`
FROM fd_plan AS fd
WHERE fd.fd_plan_id = `fd_plan_id`;
-- Calculate interest
SET `interest` = `amount` * (`interest_rate` / 1200);
-- Return the calculated interest
RETURN `interest`;
END $$ DELIMITER;

DELIMITER //

CREATE FUNCTION GetCreditLimit(userId INT) 
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE totalFixedDeposits DECIMAL(10, 2);

    -- Calculate the sum of all fixed deposits owned by the user
    SELECT SUM(fd.amount) INTO totalFixedDeposits
    FROM fixed_deposit fd
    JOIN account a ON fd.account_id = a.account_id
    JOIN customer c ON a.customer_id = c.customer_id
    JOIN user u ON c.user_id = u.user_id
    WHERE u.user_id = userId;

    -- Return the credit limit
    RETURN totalFixedDeposits / 2;
END //

DELIMITER ;