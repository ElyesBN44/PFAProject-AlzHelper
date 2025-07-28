const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle both doctor and caregiver tokens
    if (decoded.doctorId) {
      req.user = { id: decoded.doctorId, role: 'doctor' };
    } else if (decoded.id) {
      req.user = { id: decoded.id, role: decoded.role || 'caregiver' };
    } else {
      return res.status(401).json({ message: 'Invalid token format' });
    }
    
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
