
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];  //Authorization Bearer <token>
  if (!token) 
    return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // illegal token
    req.user = decoded;
    next();  //next middlware
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ 
        message: 'Invalid token, admin only route'
     });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {       //check for admin only middleware 
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden, admin only route' });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
