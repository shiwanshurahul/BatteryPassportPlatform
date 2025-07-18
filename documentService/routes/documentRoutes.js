const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { authenticate } = require('../middlewares/authMiddleware');
const docCtrl = require('../controllers/documentController');

router.post('/upload', authenticate, docCtrl.uploadFile);
router.get('/:docId', authenticate, docCtrl.getFile);
router.delete('/:docId', authenticate, docCtrl.deleteFile);

//import this is app.js
module.exports = router;
