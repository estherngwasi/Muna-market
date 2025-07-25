const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors({
  origin: [
    'https://muna-market-ekj3.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Muna Market API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
