
const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');

dotenv.config();   //to use env variables
connectDB();

//middlware
app.use(express.json());   //to use json payload

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send("Auth Service Running successfully"));

module.exports = app;
