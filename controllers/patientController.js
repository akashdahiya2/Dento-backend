const Patient = require('../models/Patient');

// Get logged-in patient profile
exports.getProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update logged-in patient profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const patient = await Patient.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

const Patient = require('../models/Patient');

// @desc    Get logged-in patient profile
// @route   GET /api/patient/profile
// @access  Private (Patient)
exports.getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select('-password');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update logged-in patient profile
// @route   PUT /api/patient/profile
// @access  Private (Patient)
exports.updatePatientProfile = async (req, res) => {
  try {
    const updates = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(updatedPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};