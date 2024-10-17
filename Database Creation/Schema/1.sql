use bank_database;
CREATE EVENT add_fd_interest_event ON SCHEDULE EVERY 1 DAY DO CALL add_fd_interest();
SET GLOBAL event_scheduler = ON;
SHOW VARIABLES LIKE 'event_scheduler';
SELECT * FROM information_schema.EVENTS;

DROP PROCEDURE IF EXISTS `add_savings_interest`;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_savings_interest`()
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