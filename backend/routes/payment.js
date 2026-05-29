const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const WalletHistory = require('../models/WalletHistory');

// POST /api/payments/initialize
// Initializes a wallet top-up payment request.
// In production, this would integrate with Paystack API.
router.post('/initialize', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Create a wallet history record (pending)
    const walletHistory = new WalletHistory({
      userId: req.user.userId,
      amount,
      status: 'pending',
      reference: `PAY-${Date.now()}`,
    });

    await walletHistory.save();

    // In production, integrate with Paystack API here:
    // const paymentUrl = await initializePaystackPayment(amount, req.user.email);
    // Return the Paystack authorization URL

    res.json({
      message: 'Payment initialized',
      reference: walletHistory.reference,
      paystackUrl: 'https://checkout.paystack.com/placeholder-link', // Placeholder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/payments/verify
// Verifies a payment and updates wallet balance if successful.
router.post('/verify', auth, async (req, res) => {
  try {
    const { reference } = req.body;

    // Find the wallet history entry
    const walletHistory = await WalletHistory.findOne({ reference });
    if (!walletHistory) {
      return res.status(404).json({ message: 'Payment reference not found' });
    }

    // In production, verify with Paystack API:
    // const response = await verifyPaystackPayment(reference);
    // if (!response.status) return res.status(400).json({ message: 'Payment failed' });

    // Mark as successful and update wallet
    walletHistory.status = 'success';
    await walletHistory.save();

    const user = await User.findById(req.user.userId);
    user.walletBalance += walletHistory.amount;
    await user.save();

    res.json({
      message: 'Payment verified and wallet updated',
      newWalletBalance: user.walletBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/payments/wallet-balance
// Returns the current user's wallet balance.
router.get('/wallet-balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ walletBalance: user.walletBalance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
