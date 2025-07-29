import React, { useState } from "react";
import axios from "axios";

const Donate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const { data: order } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        amount: form.amount,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Pet Shelter Donation",
        description: "Thank you for your support!",
        
        order_id: order.id,
        handler: async function (response) {
          alert("Payment Successful!");
          console.log("Payment Response:", response);

          // Optional: Send verification details to backend
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            ...form,
            amount: order.amount,
          });
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: "#4CAF50",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Donate to Pet Shelter 🐾</h1>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount (₹)"
        value={form.amount}
        onChange={handleChange}
        className="w-full mb-3 px-4 py-2 border rounded"
      />

      <button
        onClick={handlePayment}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        Donate Now
      </button>
    </div>
  );
};

export default Donate;
