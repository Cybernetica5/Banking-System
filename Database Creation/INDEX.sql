CREATE INDEX idx_user_email ON user(email);

CREATE INDEX idx_user_id ON user(user_id);

CREATE INDEX idx_account_number ON account(account_number);

CREATE INDEX idx_transaction_date ON transaction(date);

CREATE INDEX idx_customer_NIC ON individual(NIC);
CREATE INDEX idx_customer_License ON organization(license_number);


