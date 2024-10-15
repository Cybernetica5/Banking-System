-- Clear existing data (if any)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE user;
TRUNCATE TABLE Staff;
TRUNCATE TABLE customer;
TRUNCATE TABLE organization;
TRUNCATE TABLE individual;
TRUNCATE TABLE branch;
TRUNCATE TABLE manager;
TRUNCATE TABLE employee;
TRUNCATE TABLE account;
TRUNCATE TABLE savings_plan;
TRUNCATE TABLE savings_account;
TRUNCATE TABLE transaction;
TRUNCATE TABLE loan;
TRUNCATE TABLE fd_plan;
TRUNCATE TABLE fixed_deposit;
TRUNCATE TABLE penalty_types;
TRUNCATE TABLE customer_log;
TRUNCATE TABLE penalty;
TRUNCATE TABLE deposit;
TRUNCATE TABLE loan_installment;
TRUNCATE TABLE withdrawal;
TRUNCATE TABLE checking_account;
TRUNCATE TABLE transfer;
TRUNCATE TABLE loan_payment;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert data into user table
INSERT INTO user (user_name, password, email, role) VALUES
('john_doe', 'hashed_password1', 'john.doe@email.com', 'staff'),
('jane_smith', 'hashed_password2', 'jane.smith@email.com', 'staff'),
('bob_johnson', 'hashed_password3', 'bob.johnson@email.com', 'staff'),
('alice_williams', 'hashed_password4', 'alice.williams@email.com', 'staff'),
('charlie_brown', 'hashed_password5', 'charlie.brown@email.com', 'customer'),
('diana_ross', 'hashed_password6', 'diana.ross@email.com', 'customer'),
('edward_norton', 'hashed_password7', 'edward.norton@email.com', 'customer'),
('fiona_apple', 'hashed_password8', 'fiona.apple@email.com', 'customer'),
('george_clooney', 'hashed_password9', 'george.clooney@email.com', 'customer'),
('helen_mirren', 'hashed_password10', 'helen.mirren@email.com', 'customer'),
('tom_smith', 'hashed_password11', 'tom.smith@email.com', 'staff'),
('robert_downey', 'hashed_password12', 'robert.downey@email.com', 'staff'),
('scarlett_johansson', 'hashed_password13', 'scarlett.johansson@email.com', 'staff'),
('chris_evans', 'hashed_password14', 'chris.evans@email.com', 'staff'),
('mark_ruffalo', 'hashed_password15', 'mark.ruffalo@email.com', 'staff'),
('julia_roberts', 'hashed_password16', 'julia.roberts@email.com', 'customer'),
('brad_pitt', 'hashed_password17', 'brad.pitt@email.com', 'customer'),
('angelina_jolie', 'hashed_password18', 'angelina.jolie@email.com', 'customer'),
('morgan_freeman', 'hashed_password19', 'morgan.freeman@email.com', 'customer'),
('meryl_streep', 'hashed_password20', 'meryl.streep@email.com', 'customer'),
('leonardo_dicaprio', 'hashed_password21', 'leonardo.dicaprio@email.com', 'customer'),
('jennifer_lawrence', 'hashed_password22', 'jennifer.lawrence@email.com', 'staff'),
('matt_damon', 'hashed_password23', 'matt.damon@email.com', 'staff');



-- Insert data into Staff table
INSERT INTO Staff (user_id, full_name, date_of_birth, NIC, role) VALUES
(1, 'John Doe', '1980-05-15', '800515-1234', 'manager'),
(2, 'Jane Smith', '1985-09-20', '850920-5678', 'manager'),
(3, 'Bob Johnson', '1990-03-10', '900310-9012', 'employee'),
(4, 'Alice Williams', '1988-12-05', '881205-3456', 'employee'),

(11, 'Tom Smith', '1988-11-15', '881115-3456', 'manager'),
(12, 'Robert Downey', '1975-04-04', '750404-7890', 'employee'),
(13, 'Scarlett Johansson', '1984-11-22', '841122-4567', 'employee'),
(14, 'Chris Evans', '1981-06-13', '810613-1122', 'employee'),
(15, 'Mark Ruffalo', '1967-11-22', '671122-3344', 'employee'),
(22, 'Jennifer Lawrence', '1990-08-15', '900815-9988', 'employee'),
(23, 'Matt Damon', '1970-10-08', '701008-5566', 'employee');


-- Insert data into customer table
INSERT INTO customer (user_id, customer_type, mobile_number, landline_number, address) VALUES
(5, 'individual', '1234567890', '0123456789', '123 Main St, City'),
(6, 'individual', '2345678901', '0234567890', '456 Elm St, Town'),
(7, 'organization', '3456789012', '0345678901', '789 Oak St, Village'),
(8, 'individual', '4567890123', '0456789012', '321 Pine St, County'),
(9, 'organization', '5678901234', '0567890123', '654 Maple St, State'),

(10, 'individual', '6789012345', '0678901234', '987 Cedar St, Country'),
(16, 'individual', '7890123456', '0789012345', '101 Fir St, Region'),
(17, 'individual', '8901234567', '0890123456', '202 Birch St, City'),
(18, 'individual', '9012345678', '0901234567', '303 Spruce St, Town'),
(19, 'organization', '0123456789', '0012345678', '404 Redwood St, Village'),
(20, 'individual', '1234567891', '0123456790', '505 Willow St, County'),
(21, 'individual', '2345678910', '0234567891', '606 Cypress St, State');


-- Insert data into organization table
INSERT INTO organization (customer_id, name, license_number) VALUES
(3, 'ABC Corporation', 'ORG-12345'),
(5, 'XYZ Limited', 'ORG-67890');

-- Insert data into individual table
INSERT INTO individual (customer_id, full_name, date_of_birth, NIC) VALUES
(1, 'Charlie Brown', '1995-07-25', '950725-1111'),
(2, 'Diana Ross', '1988-11-30', '881130-2222'),
(4, 'Fiona Apple', '1992-04-18', '920418-3333'),
(6, 'Helen Mirren', '1975-01-05', '750105-4444');

-- Insert data into branch table
INSERT INTO branch (name, location) VALUES
('Main Branch', 'Downtown'),
('North Branch', 'Uptown'),
('East Branch', 'Suburb');

-- Insert data into manager table
INSERT INTO manager (staff_id) VALUES
(1),
(2),
(5);

-- Update branch table with manager_id
UPDATE branch SET manager_id = 1 WHERE branch_id = 1;
UPDATE branch SET manager_id = 2 WHERE branch_id = 2;
UPDATE branch SET manager_id = 3 WHERE branch_id = 3;

-- Insert data into employee table
INSERT INTO employee (staff_id, branch_id) VALUES
(3, 1),
(4, 2);

-- Insert data into account table
INSERT INTO account (account_type, account_number, customer_id, branch_id, balance, status) VALUES
('savings', 'SAV-123456789', 1, 1, 5000.00, 'active'),
('checking', 'CHK-987654321', 2, 2, 3000.00, 'active'),
('savings', 'SAV-246813579', 3, 3, 10000.00, 'active'),
('checking', 'CHK-135792468', 4, 1, 2500.00, 'active'),
('savings', 'SAV-369258147', 5, 2, 15000.00, 'active'),
('savings', 'SAV-741852963', 6, 3, 7500.00, 'active');

-- Insert data into savings_plan table
INSERT INTO savings_plan (type, Interest_rate, minimum_balance, age_limit) VALUES
('child', 3.50, 100.00, 18),
('teen', 3.00, 500.00, 25),
('adult', 2.50, 1000.00, 60),
('senior', 4.00, 1000.00, NULL);

-- Insert data into savings_account table
INSERT INTO savings_account (account_id, savings_plan_id) VALUES
(1, 3),
(3, 3),
(5, 4),
(6, 2);

-- Insert data into transaction table
INSERT INTO transaction (account_id, transaction_type, amount, date, description) VALUES
(1, 'deposit', 1000.00, '2024-10-01 10:30:00', 'Initial deposit'),
(2, 'withdrawal', 500.00, '2024-10-01 14:45:00', 'ATM withdrawal'),
(3, 'deposit', 5000.00, '2024-10-02 09:15:00', 'Salary deposit'),
(4, 'transfer', 1000.00, '2024-10-02 16:30:00', 'Transfer to savings'),
(5, 'deposit', 2000.00, '2024-10-03 11:00:00', 'Check deposit'),
(6, 'withdrawal', 300.00, '2024-10-03 13:20:00', 'Cash withdrawal');

-- Insert data into loan table
INSERT INTO loan (account_id, loan_type, amount, interest_rate, start_date, end_date, status) VALUES
(1, 'personal', 10000.00, 5.5, '2024-10-01', '2025-10-01', 'approved'),
(3, 'business', 50000.00, 6.0, '2024-09-15', '2026-09-15', 'approved'),
(5, 'personal', 5000.00, 5.0, '2024-10-05', '2025-04-05', 'pending');

-- Insert data into fd_plan table
INSERT INTO fd_plan (duration, Interest_rate) VALUES
(6, 3.5),  -- 6 months
(12, 4.0), -- 1 year
(24, 4.5), -- 2 years
(36, 5.0); -- 3 years

-- Insert data into fixed_deposit table
INSERT INTO fixed_deposit (savings_account_id, amount, fd_plan_id, start_date, end_date) VALUES
(1, 10000.00, 2, '2024-10-01', '2025-10-01'),
(3, 25000.00, 3, '2024-09-15', '2026-09-15'),
(4, 5000.00, 1, '2024-10-05', '2025-04-05');

-- Insert data into penalty_types table
INSERT INTO penalty_types (penalty_amount, penalty_type) VALUES
(25.00, 'Late Payment'),
(50.00, 'Insufficient Funds'),
(100.00, 'Early Withdrawal');

-- Insert data into customer_log table
INSERT INTO customer_log (customer_id, mobile_number, landline_number, address, updated_date) VALUES
(1, '1234567890', '0123456789', '123 Main St, City', '2024-09-01'),
(2, '2345678901', '0234567890', '456 Elm St, Town', '2024-09-15'),
(3, '3456789012', '0345678901', '789 Oak St, Village', '2024-09-30');

-- Insert data into penalty table
INSERT INTO penalty (penalty_type_id) VALUES
(1),
(2),
(3);

-- Insert data into deposit table
INSERT INTO deposit (transaction_id, branch_id) VALUES
(1, 1),
(3, 3),
(5, 2);

-- Insert data into loan_installment table
INSERT INTO loan_installment (loan_id, amount, duration) VALUES
(1, 1000.00, 30),
(2, 2500.00, 30),
(3, 500.00, 30);

-- Insert data into withdrawal table
INSERT INTO withdrawal (transaction_id, branch_id) VALUES
(2, 2),
(6, 3);

-- Insert data into checking_account table
INSERT INTO checking_account (account_id) VALUES
(2),
(4);

-- Insert data into transfer table
INSERT INTO transfer (transaction_id, beneficiary_account_id) VALUES
(4, 1);

-- Insert data into loan_payment table
INSERT INTO loan_payment (instalment_id, amount, due_date, payed_date, status, penalty_id) VALUES
(1, 1000.00, '2024-11-01', '2024-10-28', 'paid', NULL),
(2, 2500.00, '2024-10-15', '2024-10-14', 'paid', NULL),
(3, 500.00, '2024-11-05', NULL, 'unpaid', 1);