const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)  //not token provided via headers
    return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); //check for valid token
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
        message: 'Invalid token'
     });
  }
};

module.exports = { authenticate };
