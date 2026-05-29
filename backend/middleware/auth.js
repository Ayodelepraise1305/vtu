const jwt = require('jsonwebtoken');

// Middleware to verify JWT tokens. Checks if a valid authorization token is present.
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authorization token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to verify if the user is an admin
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can access this resource' });
  }
  next();
};

module.exports = { auth, adminOnly };
