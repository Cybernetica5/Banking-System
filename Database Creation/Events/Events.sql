CREATE EVENT add_fd_interest_event ON SCHEDULE EVERY 1 DAY DO CALL add_fd_interest();
SET GLOBAL event_scheduler = ON;
SHOW VARIABLES LIKE 'event_scheduler';
-- Create an event to call the procedure every day
CREATE EVENT add_savings_interest_event ON SCHEDULE EVERY 1 DAY DO CALL add_savings_interest();
-- Enable the event scheduler
SET GLOBAL event_scheduler = ON;