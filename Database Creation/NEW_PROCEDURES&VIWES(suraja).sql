-- View for get user information
CREATE VIEW user_info AS
SELECT 
    u.user_id,
    u.user_name AS username,
    u.email,
    c.mobile_number,
    c.landline_number,
    c.address
FROM 
    user u
JOIN 
    customer c ON u.user_id = c.user_id;

-- View for branch wise late loan payment details
DROP VIEW IF EXISTS branch_late_loan_payment_details;
CREATE VIEW branch_late_loan_payment_details AS
SELECT 
   c.customer_id,
   c.mobile_number,
   a.account_number,
   l.loan_id,
   lp.amount,
   lp.due_date,
   a.branch_id
FROM 
    loan_payment lp
JOIN 
    penalty p ON lp.penalty_id = p.penalty_id
JOIN 
    penalty_types pt ON p.penalty_type_id = pt.penalty_type_id
JOIN 
    loan_installment li ON lp.instalment_id = li.installment_id
JOIN 
    loan l ON li.loan_id = l.loan_id
JOIN 
    account a ON l.account_id = a.account_id
JOIN
    customer c ON a.customer_id = c.customer_id
WHERE 
    pt.penalty_type = 'Late Payment';





-- View for branch wise customer details
DROP PROCEDURE IF EXISTS GetCustomerDetailsByNICOrLicense;
DELIMITER $$
CREATE PROCEDURE GetCustomerDetailsByNICOrLicense ( 
    IN searchIdentifier VARCHAR(100)
)
BEGIN
    -- Declare variables for customer information
    DECLARE customerId INT DEFAULT NULL;

    -- For individuals (search by NIC)
    SELECT i.customer_id INTO customerId
    FROM individual i
    JOIN customer c ON i.customer_id = c.customer_id
    WHERE i.NIC = searchIdentifier
    LIMIT 1;

    -- If no records found for individual, search for organization (by license number)
    IF customerId IS NULL THEN
        SELECT o.customer_id INTO customerId
        FROM organization o
        JOIN customer c ON o.customer_id = c.customer_id
        WHERE o.license_number = searchIdentifier
        LIMIT 1;
    END IF;

    -- If still no records found, raise an error
    IF customerId IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No records found for the given NIC or license number';
    END IF;

    -- Get customer details
    SELECT 
        c.customer_id,
        IFNULL(i.full_name, o.name) AS customer_name,  -- individual's full_name or organization's name
        c.mobile_number,
        c.landline_number,
        c.address,
        u.email
    FROM customer c
    LEFT JOIN individual i ON c.customer_id = i.customer_id  -- join individual table
    LEFT JOIN organization o ON c.customer_id = o.customer_id  -- join organization table
    JOIN user u ON c.user_id = u.user_id
    WHERE c.customer_id = customerId;

END$$

DELIMITER ;

