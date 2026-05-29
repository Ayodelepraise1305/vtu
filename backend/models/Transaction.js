const mongoose = require('mongoose');

// Transaction schema: stores airtime/data purchase details, amount, status, and date.
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['airtime', 'data'],
    required: true,
  },
  networkProvider: {
    type: String,
    enum: ['MTN', 'Airtel', 'Glo', '9Mobile'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  recipientPhone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  reference: {
    type: String,
    unique: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
