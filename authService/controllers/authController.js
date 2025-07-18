const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });  //find operation from mongoDB
    if (exists) 
        return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });

    res.status(201).json({ 
      message: "User registered successfully",
      user: { email: user.email, role: user.role }
     });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
    return res.status(400).json({ message: 'Invalid credentials, no User found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)  //wrong password
    return res.status(400).json({ message: 'Invalid password, please retry' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { email: user.email, role: user.role } });
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
