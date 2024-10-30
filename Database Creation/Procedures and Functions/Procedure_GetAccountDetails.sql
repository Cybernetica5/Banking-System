USE bank_database;
DROP PROCEDURE IF EXISTS GetAccountDetails;

DELIMITER $$

CREATE PROCEDURE GetAccountDetails(IN customerID INT)
BEGIN
    -- Query to fetch savings and checking accounts as separate rows
    SELECT 
        a.account_number AS accountNumber,
        a.balance AS balance,
        a.account_type AS accountType, -- Keep the account type as it is (savings/checking)
        b.name AS branchName,
        b.branch_id AS branchId,
        
        -- Show interest rate and minimum balance only for savings accounts
        CASE 
            WHEN a.account_type = 'savings' THEN sp.interest_rate 
            ELSE NULL 
        END AS interestRate,
        
        CASE 
            WHEN a.account_type = 'savings' THEN sp.minimum_balance 
            ELSE NULL 
        END AS minBalance,
        
        -- No FD details for savings/checking accounts
        NULL AS startDate,
        NULL AS endDate
        
    FROM account a
    LEFT JOIN branch b ON a.branch_id = b.branch_id
    LEFT JOIN savings_account sa ON a.account_id = sa.account_id
    LEFT JOIN savings_plan sp ON sa.savings_plan_id = sp.savings_plan_id
    WHERE a.customer_id = customerID
    AND a.account_type IN ('savings', 'checking')
    
    UNION
    
    -- Fixed deposit details as a separate row linked to savings
    SELECT 
        a.account_number AS accountNumber,
        fd.amount AS balance,           -- Show FD amount as balance for FD accounts
        'fixed deposit' AS accountType, -- Explicitly mark this as a fixed deposit
        b.name AS branchName,
        b.branch_id AS branchId,
        fp.Interest_rate AS interestRate,
        NULL AS minBalance,
        fd.start_date AS startDate,     -- FD-specific fields
        fd.end_date AS endDate
        -- fp.duration AS duration          -- Duration from fd_plan
    
    FROM account a
    LEFT JOIN branch b ON a.branch_id = b.branch_id
    LEFT JOIN savings_account sa ON a.account_id = sa.account_id
    LEFT JOIN fixed_deposit fd ON sa.savings_account_id = fd.savings_account_id
    LEFT JOIN fd_plan fp ON fd.fd_plan_id = fp.fd_plan_id  -- Join with fd_plan
    WHERE a.customer_id = customerID
    AND fd.savings_account_id IS NOT NULL;
END $$

DELIMITER ;


--     SELECT 
--         a.account_number AS accountNumber,
--         a.balance,
--         a.account_type AS accountType,
--         b.name AS branchName,
--         b.branch_id AS branchId,
--         sa.savings_plan_id AS savingsPlanId,
--         fd.amount AS fdAmount,
--         fd.start_date AS startDate,
--         fd.end_date AS endDate,
--         sp.interest_rate AS interestRate,
--         sp.minimum_balance AS minBalance
--     FROM account a
--     LEFT JOIN branch b ON a.branch_id = b.branch_id
--     LEFT JOIN savings_account sa ON a.account_id = sa.account_id
--     LEFT JOIN fixed_deposit fd ON sa.savings_account_id = fd.savings_account_id
--     LEFT JOIN savings_plan sp ON sa.savings_plan_id = sp.savings_plan_id
--     WHERE a.customer_id = customerId;
