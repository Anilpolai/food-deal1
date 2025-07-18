// const Jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../utilities/config');

// const auth = async (req, res, next) => {
//   const token = req.headers.token;

//   if (!token) {
//     return res.status(401).json({
//       status: false,
//       message: 'Not authorized. Please log in again.',
//     });
//   }

//   try {
//     const decoded = Jwt.verify(token, JWT_SECRET);
//     req.body.userId = decoded.id; // attach user info (if any) to request
//     next(); // continue to next middleware or route
//   } catch (error) {
//     console.error('JWT verification failed:', error.message);
//     return res.status(401).json({
//       status: false,
//       message: 'Invalid or expired token. Please log in again.',
//     });
//   }
// };

// module.exports = auth;
const Jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utilities/config');

const auth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Not authorized. Please log in again.',
    });
  }

  try {
    const decoded = Jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id }; // Correct: attach to req.user
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return res.status(401).json({
      status: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

module.exports = auth;
