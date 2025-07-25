const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public: Get all products (with optional category filter)
router.get('/', getProducts);

// Public: Get single product by ID
router.get('/:id', getProductById);

// Admin: Create a new product with image upload
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createProduct);

// Admin: Update a product
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);

// Admin: Delete a product
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router; 