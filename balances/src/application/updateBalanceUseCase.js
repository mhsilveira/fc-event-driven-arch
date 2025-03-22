const balanceRepository = require('../infrastructure/balanceRepository')

async function updateBalance (accountId, amount) {
  try {
    const existingBalance = await balanceRepository.findBalance(accountId)

    if (!existingBalance) {
      await balanceRepository.createBalance(accountId, amount)
      console.log(`Created new balance for account ${accountId}: ${amount}`)
    } else {
      const newBalance = parseFloat(existingBalance.balance) + parseFloat(amount)
      await balanceRepository.updateBalance(accountId, newBalance)
      console.log(`Updated balance for account ${accountId}: ${newBalance}`)
    }
  } catch (err) {
    console.error('Error updating balance:', err)
  }
}

module.exports = { updateBalance }
