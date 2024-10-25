USE bank_database;
-- trigger for remove user account after staff member removed
DELIMITER $$ CREATE TRIGGER staff_after_delete
AFTER DELETE ON staff FOR EACH ROW BEGIN
DELETE FROM user
WHERE user_id = OLD.user_id;
END $$ DELIMITER;