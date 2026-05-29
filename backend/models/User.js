const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// User schema: stores account info, email, password (hashed), wallet balance, and role.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  walletBalance: {
    type: Number,
    default: 0.0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving a new user to the database.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const rounds = 10;
    this.password = await bcryptjs.hash(this.password, rounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare a plaintext password with the hashed stored password.
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcryptjs.compare(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
