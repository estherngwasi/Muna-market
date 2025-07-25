const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin dashboard summary
router.get('/dashboard-summary', authMiddleware, adminMiddleware, getDashboardSummary);

module.exports = router; 