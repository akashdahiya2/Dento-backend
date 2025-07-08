const Doctor = require('../models/doctorModel');

// Add a doctor
const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
};

// Get all doctors for a clinic
const getDoctorsByClinic = async (req, res) => {
  try {
    const doctors = await Doctor.find({ clinicId: req.params.clinicId });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error getting doctors', error: error.message });
  }
};

module.exports = { addDoctor, getDoctorsByClinic };