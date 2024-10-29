USE bank_database;

-- Populate user table
INSERT INTO user (user_name, password, email, role) VALUES
('john_doe', 'password123', 'john@example.com', 'customer'),
('jane_smith', 'password456', 'jane@example.com', 'customer'),
('admin_user', 'adminpass', 'admin@bank.com', 'staff'),
('staff_user', 'staffpass', 'staff@bank.com', 'staff');

-- Populate Staff table
INSERT INTO Staff (user_id, full_name, date_of_birth, NIC, role) VALUES
(3, 'Admin User', '1980-01-01', '800101-1234', 'manager'),
(4, 'Staff User', '1990-05-15', '900515-5678', 'employee');

-- Populate customer table
INSERT INTO customer (user_id, customer_type, mobile_number, landline_number, address) VALUES
(1, 'individual', '1234567890', '0123456789', '123 Main St, City'),
(2, 'organization', '9876543210', '9876543210', '456 Org Ave, Town');

-- Populate organization table
INSERT INTO organization (customer_id, name, lisence_number) VALUES
(2, 'ABC Corporation', 'ORG12345');

-- Populate individual table
INSERT INTO individual (customer_id, full_name, date_of_birth, NIC) VALUES
(1, 'John Doe', '1985-03-20', '850320-1234');

-- Populate branch table
INSERT INTO branch (name, location) VALUES
('Main Branch', 'Downtown'),
('North Branch', 'Uptown');

-- Populate manager table
INSERT INTO manager (staff_id) VALUES (1);

-- Update branch with manager
UPDATE branch SET manager_id = 1 WHERE branch_id = 1;

-- Populate employee table
INSERT INTO employee (staff_id, branch_id) VALUES (2, 1);

-- Populate account table
INSERT INTO account (account_type, account_number, customer_id, branch_id, balance, status) VALUES
('savings', 'SAV001', 1, 1, 5000.00, 'active'),
('checking', 'CHK001', 2, 1, 10000.00, 'active');

-- Populate savings_plan table
INSERT INTO savings_plan (type, Interest_rate, minimum_balance, age_limit) VALUES
('adult', 2.5, 1000.00, 18),
('child', 3.0, 500.00, 12);

-- Populate fd_plan table
INSERT INTO fd_plan (duration, Interest_rate) VALUES
(12, 5.5),
(24, 6.0);

-- Populate savings_account table
INSERT INTO savings_account (account_id, savings_plan_id) VALUES (1, 1);

-- Populate fixed_deposit table
INSERT INTO fixed_deposit (savings_account_id, amount, fd_plan_id, start_date, end_date) VALUES
(1, 10000.00, 1, '2023-01-01', '2024-01-01');

-- Populate transaction table
INSERT INTO transaction (account_id, transaction_type, amount, date, description) VALUES
(1, 'deposit', 1000.00, '2023-06-01 10:00:00', 'Initial deposit'),
(2, 'withdrawal', 500.00, '2023-06-02 14:30:00', 'ATM withdrawal');


-- Populate penalty_types table
INSERT INTO penalty_types (penalty_amount, penalty_type) VALUES
(50.00, 'Late payment'),
(25.00, 'Insufficient funds');

-- Populate customer_log table
INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) VALUES
(1, '1234567890', '0123456789', '123 Main St, City', '2023-01-01');

-- Populate loan table
INSERT INTO loan (account_id, loan_type, amount, interest_rate, start_date, end_date, status) VALUES
(1, 'personal', 5000.00, 8.5, '2023-01-01', '2024-01-01', 'approved');

-- Populate penalty table
INSERT INTO penalty (penalty_type_id) VALUES (1);

-- Populate deposit table
INSERT INTO deposit (transaction_id, branch_id) VALUES (1, 1);

-- Populate loan_installment table
INSERT INTO loan_installment (loan_id, amount, duration) VALUES (1, 500.00, 12);

-- Populate withdrawal table
INSERT INTO withdrawal (transaction_id, branch_id) VALUES (2, 1);

-- Populate checking_account table
INSERT INTO checking_account (account_id) VALUES (2);

-- Populate transfer table
INSERT INTO transfer (transaction_id, beneficiary_account_id) VALUES (1, 2);

-- Populate loan_payment table
INSERT INTO loan_payment (instalment_id, amount, due_date, payed_date, status, penalty_id) VALUES
(1, 500.00, '2023-02-01', '2023-02-01', 'paid', NULL);