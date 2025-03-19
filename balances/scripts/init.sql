CREATE TABLE IF NOT EXISTS balances (
    id VARCHAR(255) PRIMARY KEY,
    account_id VARCHAR(255),
    amount DECIMAL(10,2),
    updated_at DATETIME
);

INSERT INTO balances (id, account_id, amount, updated_at) VALUES 
('b1', 'a1', 1000.00, NOW()),
('b2', 'a2', 2000.00, NOW());