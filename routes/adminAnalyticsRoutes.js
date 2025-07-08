const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Clinic = require('../models/Clinic');

// GET /api/admin/analytics
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalClinics = await Clinic.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const statusCounts = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const appointmentsPerDay = await Appointment.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$appointmentDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalDoctors,
      totalClinics,
      totalAppointments,
      statusCounts,
      appointmentsPerDay
    });
  } catch (error) {
    res.status(500).json({ error: 'Analytics fetch failed' });
  }
});

module.exports = router;