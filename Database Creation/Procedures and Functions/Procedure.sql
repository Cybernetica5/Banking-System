use bank_database;

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

SHOW VARIABLES LIKE 'event_scheduler';

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

