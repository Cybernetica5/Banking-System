use bank_database;
DELIMITER //

CREATE PROCEDURE `create_fixed_deposit` (
    IN p_accountId INT,
    IN p_amount DECIMAL(15,2),
    IN p_fdPlanId INT,
    IN p_startDate date,
    IN p_endDate date
)
BEGIN
    START TRANSACTION;
    INSERT INTO fixed_deposit(savings_account_id, amount, fd_plan_id, start_date, end_date)
        VALUE (p_accountId, p_amount, p_fdPlanId, p_startDate, p_endDate);
    COMMIT;
END //

DELIMITER ;