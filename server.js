const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./backend/routes/auth');
const transactionRoutes = require('./backend/routes/transactions');
const adminRoutes = require('./backend/routes/admin');
const paymentRoutes = require('./backend/routes/payment');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON body parsing and CORS for frontend API calls.
app.use(cors());
app.use(express.json());

// Connect to MongoDB before accepting requests.
const connectDB = require('./backend/config/db');
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);

// Serve frontend static files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));

// If a route is not found on the API side, serve the public index page.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`VTU website server is running on http://localhost:${PORT}`);
});
