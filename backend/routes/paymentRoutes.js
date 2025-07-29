import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import Donation from "../models/Donation.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

//  Razorpay Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: amount, // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Create Order Error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create Razorpay order" });
  }
});

//Verify Payment and Save Donation
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationData,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !donationData
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    const donation = new Donation({
      ...donationData,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await donation.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Donation verified & saved successfully",
      });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Donation verification failed", error });
  }
});

export default router;
