const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization; //from headers 

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];   //Authorization Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // set user in req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//checking for specific role to protect routes e.g. admin only route
const authorize = (roles = []) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient rights" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
