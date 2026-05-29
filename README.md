# VTU Hub - Virtual Top-Up Website

A modern, responsive web application for buying airtime and mobile data bundles. Built with Node.js/Express backend and vanilla HTML/CSS/JavaScript frontend. Integrated with Paystack for secure payments.

## Features

- ✅ User Registration & Login (JWT Authentication)
- ✅ Buy Airtime for all Nigerian networks (MTN, Airtel, Glo, 9Mobile)
- ✅ Buy Mobile Data bundles
- ✅ Secure Wallet System
- ✅ Transaction History
- ✅ Admin Dashboard (view users, transactions, and platform stats)
- ✅ Payment Integration with Paystack
- ✅ Responsive Design (Mobile & Desktop)
- ✅ MongoDB Database
- ✅ JWT-based Authentication

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Payment**: Paystack API (placeholder integration)

## Project Structure

```
vtu-website/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── auth.js               # JWT & role-based middleware
│   ├── models/
│   │   ├── User.js               # User model (name, email, password, wallet, role)
│   │   ├── Transaction.js         # Transaction model (airtime/data purchases)
│   │   └── WalletHistory.js      # Wallet top-up history
│   └── routes/
│       ├── auth.js               # /api/auth (register, login, profile)
│       ├── transactions.js       # /api/transactions (buy airtime, buy data, history)
│       ├── admin.js              # /api/admin (users, transactions, stats)
│       └── payment.js            # /api/payments (wallet, payment)
├── public/
│   ├── index.html                # Homepage
│   ├── register.html             # User registration page
│   ├── login.html                # User login page
│   ├── dashboard.html            # User dashboard (buy services, wallet, history)
│   ├── admin.html                # Admin dashboard
│   ├── css/
│   │   └── styles.css            # Responsive styling
│   └── js/
│       ├── main.js               # Authentication utilities & navigation
│       ├── auth.js               # Auth form handling
│       ├── dashboard.js          # Dashboard functionality
│       └── admin.js              # Admin dashboard functionality
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore file
├── package.json                  # Project dependencies
└── server.js                     # Main Express server entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation Steps

1. **Clone or Navigate to Project**
   ```bash
   cd vtu-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` File**
   Copy `.env.example` to `.env` and update with your values:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/vtu-website
   JWT_SECRET=your-super-secret-key-here
   PAYSTACK_SECRET=your-paystack-secret-key
   PORT=5000
   ```

4. **Ensure MongoDB is Running**
   - If using local MongoDB:
     ```bash
     mongod
     ```
   - Or update `MONGODB_URI` to your MongoDB cloud connection string (e.g., MongoDB Atlas)

5. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev  # Requires nodemon
   ```

6. **Access the Application**
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

### User Workflow

1. **Register**: Create a new account with name, email, password, and phone number
2. **Login**: Log in with email and password
3. **Fund Wallet**: Top up your wallet using Paystack payment
4. **Buy Airtime/Data**: Select network, enter recipient phone, and purchase
5. **View History**: Check all past transactions

### Admin Workflow

1. **Login as Admin**: Use an admin account (manually set role to 'admin' in MongoDB)
2. **Dashboard**: View platform statistics
3. **Users Management**: See all users and their wallet balances
4. **Transactions**: Monitor all platform transactions

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Transactions
- `POST /api/transactions/buy-airtime` - Purchase airtime
- `POST /api/transactions/buy-data` - Purchase data
- `GET /api/transactions/history` - Get user transaction history

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/wallet-balance` - Get wallet balance

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/transactions` - Get all transactions
- `GET /api/admin/stats` - Get platform statistics

## Notes

- **Paystack Integration**: Currently a placeholder. To integrate:
  1. Get your Paystack secret key from https://paystack.com
  2. Use Paystack's API to initialize and verify payments
  3. Update `/api/payments/initialize` and `/api/payments/verify` endpoints

- **Security**: 
  - Passwords are hashed using bcryptjs
  - JWT tokens expire in 7 days
  - Protected routes require valid JWT token

- **Environment Variables**: Never commit `.env` file to version control

## Future Enhancements

- Email notifications for transactions
- SMS alerts for purchases
- Referral program
- Transaction receipts
- Support for international payment methods
- Real-time notifications
- Mobile app (React Native)

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`

**JWT Token Expired**
- Clear browser localStorage and log in again

**CORS Errors**
- Ensure frontend and backend are on the same domain or update CORS settings

## License

MIT License - Feel free to use this project for learning purposes.

---

Built with ❤ for beginners learning full-stack web development!
