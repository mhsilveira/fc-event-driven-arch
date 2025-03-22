const express = require('express')
const balanceController = require('./balanceController')

const router = express.Router()

router.get('/balances/:account_id', balanceController.getBalance)
router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }))

module.exports = router
