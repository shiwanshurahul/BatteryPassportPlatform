const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passportRoutes = require('./routes/passportRoutes');

dotenv.config();
connectDB();

app.use(express.json());  // to use json payload

app.use('/api/passports', passportRoutes);

app.get('/', (req, res) => res.send("Battery Passport Service Running successfully"));

module.exports = app;
