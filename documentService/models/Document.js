const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  fileName: String,
  s3Key: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', docSchema);
