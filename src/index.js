// index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/auroraBabyDB"; 

// Connect to MongoDB
connectDB();

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('🚀 Aurora Baby API is Running');
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});