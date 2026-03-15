require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => res.json({ message: 'Artificial Jewellery API running' }));

const PORT = process.env.PORT || 9014;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
