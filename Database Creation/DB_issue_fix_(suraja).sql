-- Active: 1725907957738@@127.0.0.1@3306@bank_database

-- Fix spelling mistake in organization table
ALTER TABLE `organization` CHANGE COLUMN lisence_number license_number VARCHAR(100);


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
