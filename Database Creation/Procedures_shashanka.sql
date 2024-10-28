-- ------------------- Add Employee ---------------------------------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `AddEmploye`(
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE,
    IN p_NIC VARCHAR(12),
    IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to add employee.';
END;
START TRANSACTION;
INSERT INTO user(user_name, password, email, role)
VALUES(p_user_name, p_password, p_email, 'staff');
INSERT INTO staff(user_id, full_name, date_of_birth, NIC, role)
VALUES(
        LAST_INSERT_ID(),
        p_full_name,
        p_date_of_birth,
        p_NIC,
        'employee'
    );
INSERT INTO employee(staff_id, branch_id)
VALUES(LAST_INSERT_ID(), p_branch_id);
COMMIT;
END -- --------------------- Remove Employee -------------------------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `removeEmployee`(p_staff_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to remove employee.';
END;
START TRANSACTION;
DELETE FROM employee
WHERE staff_id = p_staff_id;
DELETE FROM staff
WHERE staff_id = p_staff_id;
COMMIT;
END -- -------------------------- Update staff details of employee --------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_staff_details`(
    IN p_staff_id INT,
    -- IN p_user_name VARCHAR(50),
    -- IN p_password VARCHAR(255),
    -- IN p_email VARCHAR(100),
    IN p_full_name VARCHAR(100),
    IN p_date_of_birth DATE -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update staff details.';
END;
START TRANSACTION;
UPDATE staff
SET full_name = p_full_name,
    date_of_birth = p_date_of_birth
WHERE staff_id = p_staff_id;
COMMIT;
END -- ------------------------ Update User details of Employee ---------------
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_user_details`(
    IN p_staff_id INT,
    IN p_user_name VARCHAR(50),
    IN p_password VARCHAR(255),
    IN p_email VARCHAR(100) -- IN p_full_name VARCHAR(100), 
    -- IN p_date_of_birth DATE,
    -- IN p_branch_id INT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update user details.';
END;
START TRANSACTION;
UPDATE user
SET user_name = p_user_name,
    password = p_password,
    email = p_email
WHERE user_id = (
        SELECT user_id
        FROM staff
        WHERE staff_id = p_staff_id
    );
COMMIT;
END -- ------------------------ Update branch details of employee -------
CREATE DEFINER = `root` @`localhost` PROCEDURE `updateEmployee_branch`(p_staff_id INT, p_branch_id INT) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Transaction failed. Unable to update employee branch.';
END;
START TRANSACTION;
UPDATE employee
SET branch_id = p_branch_id
WHERE staff_id = p_staff_id;
COMMIT;
END