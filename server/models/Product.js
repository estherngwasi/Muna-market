const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true }, // New field for cost price
  category: { type: String, required: true },
  image: { type: String }, // URL or path to product image
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 