const mysql = require('mysql2/promise')

const dbConfig = {
  host: 'balances-mysql',
  user: 'root',
  password: 'root',
  database: 'balances'
}

let connection

async function initDatabase () {
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log('Connected to database successfully')
  } catch (err) {
    console.error('Failed to connect to database:', err)
    setTimeout(initDatabase, 5000)
  }
}

async function getConnection () {
  if (!connection) {
    await initDatabase()
  }
  return connection
}

module.exports = { initDatabase, getConnection }
