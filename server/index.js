import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import { PORT } from "./config/env.js";

dotenv.config();

const app = express();

app.use(cors());
// middleware
app.use(express.json());

// connect to MongoDB
connectDB();

// routes
app.use("/auth", authRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
