const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION
});
  // accessKeyId: process.env.S3_ACCESS_KEY,
  // secretAccessKey: process.env.S3_SECRET_KEY,
  // endpoint: process.env.S3_ENDPOINT,
  // s3ForcePathStyle: true,
  // signatureVersion: 'v4'


module.exports = s3;
