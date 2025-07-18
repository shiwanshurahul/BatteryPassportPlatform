const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });  //findOne operation from mongoDB
    if (exists) //checking if User already exists in db
        return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10); //encrypt then store in db  
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

//login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
    return res.status(400).json({ message: 'Invalid credentials, no User found' });
    //user is found:
    const match = await bcrypt.compare(password, user.password);  //compare req.body.password with hashed password in db
    if (!match)  //wrong password
    return res.status(400).json({ message: 'Invalid password, please retry' });

    const token = jwt.sign(   //jwt token
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
