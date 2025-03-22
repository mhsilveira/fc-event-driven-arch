const express = require('express')
const mysql = require('mysql2/promise')
const { Kafka } = require('kafkajs')

const app = express()
const port = 3003

const dbConfig = {
  host: 'balances-mysql',
  user: 'root',
  password: 'root',
  database: 'balances'
}

let connection

const kafka = new Kafka({
  clientId: 'balances-service',
  brokers: ['kafka:29092']
})

const consumer = kafka.consumer({ groupId: 'balances-group' })

async function initDatabase () {
  try {
    connection = await mysql.createConnection(dbConfig)
    console.log('Connected to database successfully')
  } catch (err) {
    console.error('Failed to connect to database:', err)
    setTimeout(initDatabase, 5000)
  }
}

async function updateBalance (accountId, amount) {
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM balances WHERE account_id = ?',
      [accountId]
    )

    if (rows.length === 0) {
      await connection.execute(
        'INSERT INTO balances (account_id, balance) VALUES (?, ?)',
        [accountId, amount]
      )
      console.log(`Created new balance for account ${accountId}: ${amount}`)
    } else {
      const newBalance = parseFloat(rows[0].balance) + parseFloat(amount)
      await connection.execute(
        'UPDATE balances SET balance = ? WHERE account_id = ?',
        [newBalance, accountId]
      )
      console.log(`Updated balance for account ${accountId}: ${newBalance}`)
    }
  } catch (err) {
    console.error('Error updating balance:', err)
  }
}

async function initKafka () {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'transactions', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const event = JSON.parse(message.value.toString())
          console.log(`Received event: ${JSON.stringify(event)}`)

          if (event.name === 'TransactionCreated') {
            const { account_id_from, account_id_to, amount } = event.payload

            if (account_id_from) {
              await updateBalance(account_id_from, -amount)
            }

            if (account_id_to) {
              await updateBalance(account_id_to, amount)
            }
          } else if (event.name === 'AccountCreated') {
            await updateBalance(event.payload.id, 0)
          }
        } catch (error) {
          console.error('Error processing message:', error)
        }
      }
    })

    console.log('Kafka consumer initialized successfully')
  } catch (err) {
    console.error('Failed to initialize Kafka consumer:', err)
    setTimeout(initKafka, 5000)
  }
}

app.get('/balances/:account_id', async (req, res) => {
  try {
    const accountId = req.params.account_id

    const [rows] = await connection.execute(
      'SELECT * FROM balances WHERE account_id = ?',
      [accountId]
    )

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'Balance not found for this account' })
    }

    return res.json({
      id: rows[0].id,
      account_id: rows[0].account_id,
      balance: rows[0].balance,
      created_at: rows[0].created_at,
      updated_at: rows[0].updated_at
    })
  } catch (err) {
    console.error('Error retrieving balance:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.listen(port, async () => {
  console.log(`Balances service running on port ${port}`)

  await initDatabase()
  await initKafka()
})

process.on('SIGINT', async () => {
  if (connection) {
    await connection.end()
  }
  await consumer.disconnect()
  process.exit(0)
})
