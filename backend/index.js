import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import paymentRoutes from "./routes/paymentRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import contactRoute from "./routes/contactRoutes.js";

// Load environment variables
dotenv.config();

// Enable CORS for frontend domain
app.use(cors({
  origin: "https://pet-selter-donation-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  console.error("Missing Razorpay environment variables.");
  process.exit(1); // stop the app
}

// Init Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoute);

// Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
