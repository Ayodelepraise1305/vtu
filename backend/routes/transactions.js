const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

// POST /api/transactions/buy-airtime
// Allows a user to purchase airtime.
// Deducts amount from wallet and records transaction.
router.post('/buy-airtime', auth, async (req, res) => {
  try {
    const { networkProvider, amount, recipientPhone } = req.body;

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if wallet has sufficient balance
    if (user.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct amount from wallet
    user.walletBalance -= amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.userId,
      type: 'airtime',
      networkProvider,
      amount,
      recipientPhone,
      status: 'completed',
      reference: `AIR-${Date.now()}`,
    });

    await transaction.save();

    res.status(201).json({
      message: 'Airtime purchased successfully',
      transaction,
      newWalletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/transactions/buy-data
// Allows a user to purchase mobile data.
// Deducts amount from wallet and records transaction.
router.post('/buy-data', auth, async (req, res) => {
  try {
    const { networkProvider, amount, recipientPhone } = req.body;

    // Get user details
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if wallet has sufficient balance
    if (user.walletBalance < amount) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct amount from wallet
    user.walletBalance -= amount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      userId: req.user.userId,
      type: 'data',
      networkProvider,
      amount,
      recipientPhone,
      status: 'completed',
      reference: `DATA-${Date.now()}`,
    });

    await transaction.save();

    res.status(201).json({
      message: 'Data purchased successfully',
      transaction,
      newWalletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/transactions/history
// Returns all transactions for the logged-in user.
router.get('/history', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId })
      .sort({ transactionDate: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
