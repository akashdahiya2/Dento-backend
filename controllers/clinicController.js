// controllers/clinicController.js

const Clinic = require('../models/clinicModel');

// ✅ Define addClinic function here
const addClinic = async (req, res) => {
  try {
    const { name, address } = req.body;

    const newClinic = new Clinic({
      name,
      address,
      createdBy: req.admin._id, // Assuming admin is added by middleware
    });

    await newClinic.save();
    res.status(201).json({ message: 'Clinic added successfully', clinic: newClinic });
  } catch (error) {
    res.status(500).json({ message: 'Error adding clinic', error: error.message });
  }
};

// ✅ Define getClinics function
const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({ createdBy: req.admin._id });
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinics', error: error.message });
  }
};

// ✅ Export both functions
module.exports = {
  addClinic,
  getClinics,
};