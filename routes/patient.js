const express = require('express');
const router = express.Router();
const express = require('express');
const router = express.Router();
const { verifyPatient } = require('../middlewares/auth');
const Appointment = require('../models/Appointment');

// GET /api/patient/appointments
router.get('/appointments', verifyPatient, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name specialization')
      .populate('clinic', 'name address');

    res.json(appointments);
  } catch (err) {
    console.error('Error fetching patient appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const {
  getPatientProfile,
  updatePatientProfile,
} = require('../controllers/patientController');

// 🔐 Protect the route with verifyPatient
router.get('/profile', verifyPatient, getPatientProfile);
router.put('/profile', verifyPatient, updatePatientProfile);

// PUT /api/admin/appointments/:id/status
router.put('/appointments/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    res.json({ success: true, appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const express = require('express');
const router = express.Router();
const { verifyPatient } = require('../middlewares/auth');
const Patient = require('../models/Patient');

// GET: Patient Profile
router.get('/profile', verifyPatient, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    res.json(patient);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Update Patient Profile
router.put('/profile', verifyPatient, async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updated = await Patient.findByIdAndUpdate(
      req.patient.id,
      { name, phone },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updated);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;