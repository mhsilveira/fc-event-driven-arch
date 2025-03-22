const app = require('./app')
const { initDatabase } = require('./config/database')
const { initKafka } = require('./config/kafka')
const { updateBalance } = require('./application/updateBalanceUseCase')

const port = 3003

app.listen(port, async () => {
  console.log(`Balances service running on port ${port}`)

  await initDatabase()
  await initKafka(updateBalance)
})
