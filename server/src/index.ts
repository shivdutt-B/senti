import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import activityRoutes from "./routes/activity.routes";
import heimdall from 'heimdall-nodejs-sdk';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: ["https://senti-vrpj.onrender.com", "http://localhost:3000"]
}));
app.use(express.json());

// Add Heimdall ping endpoint
heimdall.ping(app);

// Connect to MongoDB
const mongoUri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sentiment";
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log("Connected to MongoDB", mongoUri);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/welcome", (req, res) => {
  res.send("Welcome to the Sentiment Analysis API");
});
app.use("/api", activityRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
