const express = require('express');
const app = express();

const dotenv = require('dotenv');
const connectDB = require('./config/db');
const documentRoutes = require('./routes/documentRoutes');

dotenv.config();
connectDB();

app.use(express.json());  // to use json payload

app.use('/api/documents', documentRoutes);


app.get('/', (req, res) => res.send("Document Service Running successfully"));

module.exports = app;
