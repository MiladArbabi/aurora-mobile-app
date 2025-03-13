// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Aurora Baby API is Running');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});