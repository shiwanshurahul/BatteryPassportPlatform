const express = require('express');
const app = require('./app');

//checking if PORT is provided in .env 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service application running on port ${PORT}`);
});
