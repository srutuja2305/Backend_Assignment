const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController.js');
const { authenticateToken } = require('../middleware/auth.js');

router.get('/get_all', authenticateToken, notificationController.getNotifications);
router.post('/mark_read', authenticateToken, notificationController.markRead);

module.exports = router;
