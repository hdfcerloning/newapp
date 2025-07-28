const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/formRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const myRouter = require('./routes/userRoutes');

const bcrypt = require('bcryptjs');
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));         // Enable CORS
app.use(express.json());                // Parse JSON request bodies

// MongoDB Connection URL
const URL = process.env.MONGO_URL;

// Routes
app.use('/', router);
app.use('/me' ,myRouter)

// Start Server
app.listen(3000, async () => {
  try {
    await mongoose.connect(URL);
    console.log('Connected to MongoDB');
    console.log('Server started on PORT 3000');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
});
