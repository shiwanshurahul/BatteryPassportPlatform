const Document = require('../models/Document');
const s3 = require('../utils/s3Client');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { v4: uuidv4 } = require('uuid');

//s3 file upload controller
exports.uploadFile = [
  upload.single('file'),  //single file at once
  async (req, res) => {
    try {
      if (!req.file)  //no file provided
        return res.status(400).json({ message: 'File is required' });
      const key = `${uuidv4()}-${req.file.originalname}`;
      
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };

      const data = await s3.upload(params).promise();

      //Saving metadata to MongoDB
      const doc = await Document.create({ fileName: req.file.originalname, s3Key: key });
      res.json({
        docId: doc._id,
        fileName: doc.fileName,
        url: data.Location,    //link of the file
        createdAt: doc.createdAt
      });
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
];

//get file from s3 based on docId
exports.getFile = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    if (!doc) //not provided docid
        return res.status(404).json({ 
          message: 'Link Not found'
        });

    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: doc.s3Key,
      Expires: 60 * 5
    });

    res.json({ 
        downloadUrl: url,
     });
  } 
  catch (err) {
    res.status(500).json({ 
        message: err.message 
    });
  }
};

//delete file
exports.deleteFile = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.docId);
    if (!doc) //no params is provided
        return res.status(404).json({ message: 'Document Not found' });

    await s3.deleteObject({
      Bucket: process.env.S3_BUCKET,
      Key: doc.s3Key
    }).promise();

    res.json({ message: "Deleted successfully" });
  } 
  catch (err) {
    res.status(500).json({ 
        message: err.message
     });
  }
};












