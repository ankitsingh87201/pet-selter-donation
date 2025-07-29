import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">
        Terms & Conditions
      </h1>

      <p className="mb-4">
        Welcome to our donation platform. By accessing or using our website, you agree to be bound by the following terms and conditions:
      </p>

      <ul className="list-disc pl-5 space-y-2">
        <li>All donations made through this platform are voluntary and non-refundable.</li>
        <li>Funds collected are used strictly for animal rescue, food, shelter maintenance, and medical care.</li>
        <li>We reserve the right to update, modify, or replace any part of these terms at any time without prior notice.</li>
        <li>Donor details (name, email, transaction ID) are stored securely and not shared with any third party without consent.</li>
        <li>Users must not attempt to misuse, hack, or alter any part of the platform.</li>
        <li>The platform may contain links to third-party websites. We are not responsible for their content or practices.</li>
        <li>All content (text, images, videos) is owned by the organization and may not be copied, reproduced, or redistributed without permission.</li>
        <li>Minimum age for making a donation is 18 years. Users below this age must have parental or guardian supervision.</li>
        <li>In exceptional cases (e.g., double payment, fraud), refund requests will be reviewed and processed within 7–10 working days.</li>
        <li>Any disputes arising out of donations or platform usage shall be governed by the laws of India.</li>
      </ul>

      <p className="mt-6 text-sm text-gray-500">
        If you have any questions or concerns regarding these terms, feel free to contact our support team.
      </p>
    </div>
  );
};

export default Terms;
