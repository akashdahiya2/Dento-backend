import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ doctorId, clinicId }) => {
  const [form, setForm] = useState({
    patientName: '',
    contact: '',
    appointmentDate: '',
    notes: ''
  });

  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments/book', {
        ...form,
        doctorId,
        clinicId
      });
      setMsg('✅ Appointment booked!');
      setForm({
        patientName: '',
        contact: '',
        appointmentDate: '',
        notes: ''
      });
    } catch (error) {
      console.error(error);
      setMsg('❌ Booking failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="patientName" placeholder="Patient Name" value={form.patientName} onChange={handleChange} required />
      <input type="text" name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required />
      <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
      <input type="text" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <button type="submit">Book Appointment</button>
      <p>{msg}</p>
    </form>
  );
};

export default AppointmentForm;