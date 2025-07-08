const Appointment = require('../models/appointmentModel');

// 📌 Book a New Appointment
const bookAppointment = async (req, res) => {
  try {
    const { patientName, contact, doctorId, clinicId, appointmentDate, notes } = req.body;

    const newAppointment = await Appointment.create({
      patientName,
      contact,
      doctorId,
      clinicId,
      appointmentDate,
      notes
    });

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error booking appointment',
      error: error.message
    });
  }
};

// 📌 Get Appointments (with optional filters)
const getAppointments = async (req, res) => {
  try {
    const { doctorId, clinicId, date } = req.query;

    const filter = {};
    if (doctorId) filter.doctorId = doctorId;
    if (clinicId) filter.clinicId = clinicId;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.appointmentDate = { $gte: start, $lte: end };
    }

    const appointments = await Appointment.find(filter)
      .populate('doctorId clinicId')
      .sort({ appointmentDate: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

// ✅ Export Controller Functions
module.exports = {
  bookAppointment,
  getAppointments
};