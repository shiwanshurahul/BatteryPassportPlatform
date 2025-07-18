const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();   //to use .env files variable

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION
});

module.exports = s3;
