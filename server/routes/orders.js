const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Customer: Place a new order
router.post('/', authMiddleware, placeOrder);

// Customer: Get their own orders
router.get('/my-orders', authMiddleware, getUserOrders);

// Admin: Get all orders
router.get('/', authMiddleware, adminMiddleware, getAllOrders);

// Admin: Update order status
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router; 