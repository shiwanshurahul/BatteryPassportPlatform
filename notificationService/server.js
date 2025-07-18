const express = require('express');

const app = require('./app');

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => 
    console.log(`Notification service running on port ${PORT}`));
