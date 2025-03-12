import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure headers
app.use(morgan("dev")); // HTTP request logging

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Aurora Baby API is running!" });
});

export default app;
