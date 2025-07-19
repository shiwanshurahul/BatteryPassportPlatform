
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);   //call to registerController
router.post('/login', login);   //call to loginController

//mount in server.js file
module.exports = router;
