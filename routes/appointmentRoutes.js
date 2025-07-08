const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');

// Book appointment
router.post('/', bookAppointment);

// Get all appointments
router.get('/', getAppointments);

module.exports = router;