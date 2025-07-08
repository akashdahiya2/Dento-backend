const express = require('express');
const router = express.Router();
const { addDoctor, getDoctorsByClinic } = require('../controllers/doctorController');

// Add new doctor
router.post('/', addDoctor);

// Get doctors for a specific clinic
router.get('/:clinicId', getDoctorsByClinic);

module.exports = router;