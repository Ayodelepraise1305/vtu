const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// GET /api/admin/users
// Admin endpoint to view all users.
// Protected: Requires admin role.
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/transactions
// Admin endpoint to view all transactions.
// Protected: Requires admin role.
router.get('/transactions', auth, adminOnly, async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('userId', 'name email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/stats
// Admin endpoint to get platform statistics.
// Returns total users, total transactions, and total volume.
// Protected: Requires admin role.
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments();
    const totalVolume = await Transaction.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    res.json({
      totalUsers,
      totalTransactions,
      totalVolume: totalVolume[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
