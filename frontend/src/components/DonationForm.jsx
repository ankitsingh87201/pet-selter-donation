import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async () => {
    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      const backendURL = import.meta.env.VITE_BACKEND_URL;

      if (!razorpayKey || !backendURL) {
        alert("Missing environment variables.");
        return;
      }

      if (!form.amount || form.amount <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      // Step 1: Create Razorpay order (amount in paise)
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
        {
          amount: Number(form.amount) * 100,
        }
      );

      const order = data?.order || data;

      if (!order?.id) {
        alert("Failed to create order. Please try again.");
        return;
      }

      // Step 2: Setup Razorpay options
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        name: "Pet Shelter Donation",
        description: "Thank you for your support!",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify payment
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationData: {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  amount: order.amount, 
                  message: form.message,
                },
              }
            );

            // Save donation to backend (optional - if not already in /verify)
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/donations`,
              {
                ...form,
                amount: order.amount,
                paymentMethod: "Razorpay",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            const details = {
              orderId: response.razorpay_order_id,
              email: form.email,
              amount: order.amount,
              name: form.name,
            };

            localStorage.setItem("orderInfo", JSON.stringify(details));
            navigate("/thankyou", { state: details });

            setForm({
              name: "",
              email: "",
              phone: "",
              amount: "",
              message: "",
            });
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment was successful, but verification failed.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#1abc9c" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Donation error:", error);
      alert(
        "Something went wrong! " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Donate to Pet Shelter</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="input border p-2 mb-3 w-full"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="input border p-2 mb-3 w-full"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="input border p-2 mb-3 w-full"
      />
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount (₹)"
        type="number"
        min="1"
        className="input border p-2 mb-3 w-full"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Message (optional)"
        className="input border p-2 mb-3 w-full"
      />
      <button
        onClick={handleDonate}
        className="w-full border border-orange-500 text-orange-500 py-2 rounded-full text-sm font-semibold cursor-pointer hover:bg-orange-500 hover:text-white transition-colors"
      >
        Donate Now 🙌
      </button>
    </div>
  );
};

export default DonationForm;
