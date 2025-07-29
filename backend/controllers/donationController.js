import Donation from "../models/Donation.js";

export const createDonation = async (req, res) => {
  try {
    const { name, amount, email, phone, state } = req.body;
    const donation = new Donation({
      name,
      amount: amount / 100,
      email,
      phone,
      state,
    });

    await donation.save();
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Failed to save donation", error });
  }
};

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }); // recent first
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donations", error });
  }
};
