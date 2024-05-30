const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController.js');
const { authenticateToken, authorizeRole } = require('../middleware/auth.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/items', itemController.getItems);
router.get('/getItems/:id', itemController.getItem);
router.post('/create', authenticateToken, upload.single('image'), itemController.createItem);
router.put('/updateItem/:id', authenticateToken, authorizeRole(['admin', 'user']), upload.single('image'), itemController.updateItem);
router.delete('/deleteItem/:id', authenticateToken, authorizeRole(['admin', 'user']), itemController.deleteItem);

module.exports = router;
