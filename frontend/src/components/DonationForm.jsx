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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDonate = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      const backendURL = import.meta.env.VITE_BACKEND_URL;

      if (!razorpayKey || !import.meta.env.VITE_BACKEND_URL) {
        alert("Missing environment variables.");
        setLoading(false);
        return;
      }

      if (!form.amount || form.amount <= 0) {
        alert("Please enter a valid donation amount.");
        setLoading(false);
        return;
      }

      // Step 1: Create Razorpay order
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`, {
        amount: Number(form.amount) * 100,
      });

      const order = data?.order || data;

      if (!order?.id) {
        alert("Failed to create order. Please try again.");
        setLoading(false);
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
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/verify`, {
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
            });

            // Optional: Save donation details
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/donations`, {
              ...form,
              amount: order.amount,
              paymentMethod: "Razorpay",
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

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
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#1abc9c" },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Donation error:", error);
      alert("Something went wrong! " + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Donate to Pet Shelter</h2>

      <label className="block mb-3 text-sm font-medium text-gray-700">
        Name
        <input
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          autoComplete="name"
          className="input border p-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-3 text-sm font-medium text-gray-700">
        Email
        <input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          className="input border p-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-3 text-sm font-medium text-gray-700">
        Phone
        <input
          required
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          autoComplete="tel"
          className="input border p-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-3 text-sm font-medium text-gray-700">
        Amount (₹)
        <input
          required
          name="amount"
          type="number"
          min="1"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount in ₹"
          autoComplete="off"
          className="input border p-2 mt-1 w-full"
        />
      </label>

      <label className="block mb-3 text-sm font-medium text-gray-700">
        Message (optional)
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={3}
          className="input border p-2 mt-1 w-full"
        />
      </label>

      <button
        onClick={handleDonate}
        disabled={loading}
        className={`w-full border py-2 rounded-full text-sm font-semibold transition-colors ${
          loading
            ? "bg-orange-300 text-white cursor-not-allowed"
            : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : "Donate Now 🙌"}
      </button>
    </div>
  );
};

export default DonationForm;
