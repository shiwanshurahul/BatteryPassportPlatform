
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());  // to use json payload

const runConsumer = require('./kafka/consumer');

runConsumer()
 .then(() => {
  console.log("Notification Service listening to Kafka...")
});

module.exports = app;
