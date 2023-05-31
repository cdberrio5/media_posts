const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado', status: "expired" });
  }
}

module.exports = authMiddleware;