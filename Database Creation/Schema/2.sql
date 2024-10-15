DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_savings_interest`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE account_id INT;
    DECLARE balance DECIMAL(15,2);
    DECLARE interest_rate DECIMAL(5,2);
    DECLARE interest DECIMAL(10,2);

    DECLARE cur CURSOR FOR
        SELECT a.account_id, a.balance, sp.interest_rate
        FROM savings_account sa
        JOIN account a ON sa.account_id = a.account_id
        JOIN savings_plan sp ON sa.savings_plan_id = sp.savings_plan_id
        WHERE a.status = 'active';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO account_id, balance, interest_rate;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Calculate interest
        SET interest = balance * (interest_rate / 1200);

        -- Update account balance
        START TRANSACTION;
        UPDATE account
        SET balance = balance + interest
        WHERE account_id = account_id;
        COMMIT;
    END LOOP;

    CLOSE cur;
END$$

DELIMITER ;

-- Create an event to call the procedure every day
DROP EVENT IF EXISTS add_savings_interest_event;
CREATE EVENT add_savings_interest_event
ON SCHEDULE EVERY 30 DAY
DO
CALL add_savings_interest();

-- Enable the event scheduler
SET GLOBAL event_scheduler = ON;