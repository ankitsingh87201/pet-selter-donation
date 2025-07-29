import { useEffect, useState } from "react";
import axios from "axios";

const Donors = () => {
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/donations`);
        const data = response.data;

        const sortedData =
          activeTab === "recent"
            ? [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : [...data].sort((a, b) => b.amount - a.amount);

        setDonations(sortedData);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 text-center">
        Donors 🧡
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button
          onClick={() => setActiveTab("recent")}
          className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
            activeTab === "recent"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Recent Donors
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
            activeTab === "top"
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Top Donors
        </button>
      </div>

      {/* Donation List */}
      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations yet.</p>
      ) : (
        <div className="space-y-4">
          {donations.map((donor) => (
            <div
              key={donor._id}
              className="p-4 sm:p-5 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <p className="font-semibold text-lg sm:text-xl">{donor.name}</p>
              <p className="text-sm sm:text-base">Amount: ₹{donor.amount}</p>
              <p className="text-sm sm:text-base">
                Date: {new Date(donor.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Donors;
