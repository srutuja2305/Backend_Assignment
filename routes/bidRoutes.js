const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController.js');
const { authenticateToken } = require('../middleware/auth.js');

router.get('/:itemId/getbids', bidController.getBids);
router.post('/:itemId/bids', authenticateToken, bidController.placeBid);

module.exports = router;
