import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Privacy Policy
      </h1>

      <p className="mb-4">
        Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>
          We collect personal information such as your name, email, and payment details only when you make a donation, contact us, or subscribe to updates.
        </li>
        <li>
          Your information is used solely for communication, donor records, and securely processing donations.
        </li>
        <li>
          We do not sell, rent, or trade your personal data with third parties, except as required by law.
        </li>
        <li>
          Payments are processed securely via trusted gateways like Razorpay. We do not store sensitive card details on our servers.
        </li>
        <li>
          We use standard security practices (SSL, encryption, access controls) to protect your data from unauthorized access or misuse.
        </li>
        <li>
          We may collect limited non-personal data (like browser type, visit time) through cookies to improve user experience. You can disable cookies via your browser settings.
        </li>
        <li>
          Your data is retained only for as long as necessary for the purposes outlined or as required by law.
        </li>
        <li>
          Our services are not intended for children under the age of 13. We do not knowingly collect personal information from minors.
        </li>
        <li>
          You have the right to access, correct, or request deletion of your personal information by contacting us directly.
        </li>
        <li>
          This privacy policy may be updated occasionally. Changes will be posted on this page with a revised “Last Updated” date.
        </li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        If you have any questions or concerns about this policy, please contact us via the Contact page.
      </p>

      
    </div>
  );
};

export default PrivacyPolicy;
