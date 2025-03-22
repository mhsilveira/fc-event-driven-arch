const { getConnection } = require('../config/database')

async function findBalance (accountId) {
  const connection = await getConnection()
  const [rows] = await connection.execute(
    'SELECT * FROM balances WHERE account_id = ?',
    [accountId]
  )
  return rows.length > 0 ? rows[0] : null
}

async function createBalance (accountId, amount) {
  const connection = await getConnection()
  await connection.execute(
    'INSERT INTO balances (account_id, balance) VALUES (?, ?)',
    [accountId, amount]
  )
}

async function updateBalance (accountId, newBalance) {
  const connection = await getConnection()
  await connection.execute(
    'UPDATE balances SET balance = ? WHERE account_id = ?',
    [newBalance, accountId]
  )
}

module.exports = { findBalance, createBalance, updateBalance }
