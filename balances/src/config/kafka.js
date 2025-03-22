const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'balances-service',
  brokers: ['kafka:29092']
})

const consumer = kafka.consumer({ groupId: 'balances-group' })

async function initKafka (updateBalance) {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: 'transactions', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ message }) => {
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
    setTimeout(() => initKafka(updateBalance), 5000)
  }
}

module.exports = { initKafka, consumer }
