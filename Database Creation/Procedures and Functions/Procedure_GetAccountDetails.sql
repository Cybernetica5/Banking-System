use bank_database;
DROP PROCEDURE IF EXISTS GetAccountDetails;

DELIMITER $$

CREATE PROCEDURE GetAccountDetails(IN customerID INT)
BEGIN
    SELECT 
        a.account_number AS accountNumber,
        a.balance,
        a.account_type AS accountType,
        b.name AS branchName,
        b.branch_id AS branchId,
        sa.savings_plan_id AS savingsPlanId,
        fd.amount AS fdAmount,
        fd.start_date AS startDate,
        fd.end_date AS endDate,
        sp.interest_rate AS interestRate,
        sp.minimum_balance AS minBalance
    FROM account a
    LEFT JOIN branch b ON a.branch_id = b.branch_id
    LEFT JOIN savings_account sa ON a.account_id = sa.account_id
    LEFT JOIN fixed_deposit fd ON sa.savings_account_id = fd.savings_account_id
    LEFT JOIN savings_plan sp ON sa.savings_plan_id = sp.savings_plan_id
    WHERE a.customer_id = customerId;
END $$

DELIMITER ;
