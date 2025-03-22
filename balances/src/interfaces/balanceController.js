const balanceRepository = require('../infrastructure/balanceRepository')

async function getBalance (req, res) {
  try {
    const accountId = req.params.account_id
    const balance = await balanceRepository.findBalance(accountId)

    if (!balance) {
      return res.status(404).json({ message: 'Balance not found for this account' })
    }

    return res.json({
      id: balance.id,
      account_id: balance.account_id,
      balance: balance.balance,
      created_at: balance.created_at,
      updated_at: balance.updated_at
    })
  } catch (err) {
    console.error('Error retrieving balance:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getBalance }
