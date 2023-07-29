const jwt = require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Acceso no autorizado' });
  }
};

module.exports = authMiddleware;
