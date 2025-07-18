const express = require('express');
const router = express.Router();
const passportController = require('../controllers/passportController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

//admin only routes -> middleware to check
router.post('/', authenticate, authorize(['admin']), passportController.createPassport);
router.put('/:id', authenticate, authorize(['admin']), passportController.updatePassport);
router.delete('/:id', authenticate, authorize(['admin']), passportController.deletePassport);

//Accessible by user or admin
router.get('/:id', authenticate, authorize(['user', 'admin']), passportController.getPassport);

module.exports = router;
