const express = require('express');
const router = express.Router();
const {
  signupAdmin,
  loginAdmin,
  getAdminDashboard
} = require('../controllers/adminController');

const { verifyAdmin } = require('../middleware/auth');

const Clinic = require('../models/Clinic');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// ✅ Admin signup
router.post('/signup', signupAdmin);

// ✅ Admin login
router.post('/login', loginAdmin);

// ✅ Admin dashboard (Protected)
router.get('/dashboard', verifyAdmin, getAdminDashboard);

// ✅ Get all appointments with optional filters
router.get('/appointments', verifyAdmin, async (req, res) => {
  try {
    const { search, date } = req.query;
    const query = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { patientName: regex },
        { doctorName: regex },
        { clinicName: regex },
      ];
    }

    if (date) {
      const targetDate = new Date(date);
      const nextDate = new Date(targetDate);
      nextDate.setDate(targetDate.getDate() + 1);
      query.date = { $gte: targetDate, $lt: nextDate };
    }

    const appointments = await Appointment.find(query);
    res.json(appointments);
  } catch (err) {
    console.error('Admin appointment filter error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete an appointment
router.delete('/appointments/:id', verifyAdmin, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment)
      return res.status(404).json({ error: 'Appointment not found' });

    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;