const Product = require('../models/Product');

// Get all products (with optional category filter)
exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new product (admin only)
exports.createProduct = async (req, res) => {
  console.log('Received create product request'); // Log when the endpoint is hit
  try {
    const { name, description, price, costPrice, category, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const product = new Product({ name, description, price, costPrice, category, image, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('Create Product Error:', err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, costPrice, category, stock } = req.body;
    // If a new image is uploaded, use it; otherwise, keep the existing image
    let image = req.body.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, costPrice, category, image, stock },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('Update Product Error:', err); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 