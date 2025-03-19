CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    created_at DATETIME
);

CREATE TABLE IF NOT EXISTS accounts (
    id VARCHAR(255) PRIMARY KEY,
    client_id VARCHAR(255),
    balance DECIMAL(10,2),
    created_at DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR(255) PRIMARY KEY,
    account_id_from VARCHAR(255),
    account_id_to VARCHAR(255),
    amount DECIMAL(10,2),
    created_at DATETIME,
    FOREIGN KEY (account_id_from) REFERENCES accounts(id),
    FOREIGN KEY (account_id_to) REFERENCES accounts(id)
);

INSERT INTO clients (id, name, email, created_at) VALUES 
('1', 'Chris Redfield', 'chris@stars.com', NOW()),
('2', 'Jill Valentine', 'jill@stars.com', NOW());

INSERT INTO accounts (id, client_id, balance, created_at) VALUES 
('1', '1', 1000.00, NOW()),
('2', '2', 2000.00, NOW());