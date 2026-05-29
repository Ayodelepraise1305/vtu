const mongoose = require('mongoose');

// WalletHistory schema: tracks all wallet fund additions (top-ups via Paystack).
const walletHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['paystack', 'bank_transfer'],
    default: 'paystack',
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  reference: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WalletHistory', walletHistorySchema);
