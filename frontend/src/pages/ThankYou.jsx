import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ThankYou = () => {
  const location = useLocation();
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (location.state) {
      setDetails(location.state);
    } else {
      const savedDetails = localStorage.getItem("orderInfo");
      if (savedDetails) {
        try {
          setDetails(JSON.parse(savedDetails));
        } catch (e) {
          console.error("Invalid order info in localStorage", e);
        }
      }
    }
  }, [location.state]);

  const { orderId, email, amount, name } = details;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 min-h-[80vh] text-center bg-gray-50">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-4">
         Thank You{name ? `, ${name}` : ""}!
      </h1>

      <p className="text-base sm:text-lg mb-6 text-gray-700">
        {name
          ? `Dear ${name}, your donation/payment was successful.`
          : "Your donation/payment was successful."}
      </p>

      {orderId && (
        <div className="bg-white shadow-lg p-5 sm:p-6 rounded-2xl border w-full max-w-md text-left space-y-2">
          <p>
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Payment Amount:</span> ₹{amount / 100}
          </p>
        </div>
      )}
    </div>
  );
};

export default ThankYou;
