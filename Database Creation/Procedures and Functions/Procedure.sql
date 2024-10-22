use bank_database;

DELIMITER $$

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
END

DELIMITER $$


CREATE DEFINER=`root`@`localhost` PROCEDURE `add_fd_interest`(IN `fd_id` int)
BEGIN
	DECLARE `fd_amount` DECIMAL(15,2);
    DECLARE `plan_id` INT;
    DECLARE `interest` decimal(10,2);
    DECLARE `p_account_id` INT;

	SELECT `amount`, `fd_plan_id` INTO `fd_amount`, `plan_id` FROM `fixed_deposit` as fd WHERE fd.`fd_id` = `fd_id`;
	SELECT Calculate_interest (plan_id, fd_amount) INTO `interest`;
    SELECT account_id INTO p_account_id FROM account WHERE account_id IN (SELECT account_id FROM savings_account JOIN fixed_deposit fd USING(savings_account_id) WHERE fd.fd_id = `fd_id`);
    START TRANSACTION;
    UPDATE account SET balance = balance + interest WHERE account_id = p_account_id;
    COMMIT;
END $$

DELIMITER ;

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
END
