import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = ({ doctorId, clinicId }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments/book', {
        ...formData,
        doctorId,
        clinicId,
      });
      alert('✅ Appointment booked successfully!');
      setFormData({ name: '', contact: '', date: '', time: '' });
    } catch (error) {
      console.error(error);
      alert('❌ Failed to book appointment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;