const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment config
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Basic Middleware
app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/file'));
app.use('/api', require('./routes/scan'));
app.use('/api', require('./routes/analytics'));
app.use('/api', require('./routes/analyze'));

// Basic health check
app.get('/', (req, res) => res.send('DeepShield API Server Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
