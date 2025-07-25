const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Samsung Galaxy S23',
    description: 'Latest Samsung flagship smartphone with AMOLED display and triple camera.',
    price: 95000,
    costPrice: 80000,
    category: 'Electronics',
    image: '',
    stock: 25,
  },
  {
    name: 'HP Pavilion 15 Laptop',
    description: '15.6" FHD, Intel Core i5, 8GB RAM, 512GB SSD, Windows 11.',
    price: 78000,
    costPrice: 65000,
    category: 'Electronics',
    image: '',
    stock: 10,
  },
  {
    name: 'Maize Flour 2kg',
    description: 'High quality sifted maize flour, 2kg pack.',
    price: 220,
    costPrice: 180,
    category: 'Cereals',
    image: '',
    stock: 100,
  },
  {
    name: 'Rice 5kg',
    description: 'Premium long grain rice, 5kg bag.',
    price: 950,
    costPrice: 800,
    category: 'Cereals',
    image: '',
    stock: 60,
  },
  {
    name: 'Men’s Leather Shoes',
    description: 'Classic formal leather shoes for men, size 40-45.',
    price: 3500,
    costPrice: 2500,
    category: 'Fashion',
    image: '',
    stock: 30,
  },
  {
    name: 'Ladies Handbag',
    description: 'Trendy handbag for ladies, available in multiple colors.',
    price: 2200,
    costPrice: 1500,
    category: 'Fashion',
    image: '',
    stock: 40,
  },
  {
    name: 'Cooking Oil 3L',
    description: 'Pure vegetable cooking oil, 3 litre bottle.',
    price: 750,
    costPrice: 600,
    category: 'Groceries',
    image: '',
    stock: 50,
  },
  {
    name: 'Sugar 2kg',
    description: 'Refined white sugar, 2kg pack.',
    price: 420,
    costPrice: 350,
    category: 'Groceries',
    image: '',
    stock: 80,
  },
  {
    name: 'Bluetooth Headphones',
    description: 'Wireless over-ear headphones with noise cancellation.',
    price: 3200,
    costPrice: 2500,
    category: 'Electronics',
    image: '',
    stock: 18,
  },
  {
    name: 'Dried Beans 1kg',
    description: 'Nutritious dried beans, 1kg pack.',
    price: 180,
    costPrice: 120,
    category: 'Cereals',
    image: '',
    stock: 70,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 