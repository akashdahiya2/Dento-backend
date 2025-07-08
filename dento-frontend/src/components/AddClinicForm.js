import React, { useState } from 'react';
import axios from 'axios';

const AddClinicForm = ({ onClinicAdded }) => {
  const [form, setForm] = useState({ name: '', address: '' });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace `adminId` with actual ID or token-based logic
      const adminId = 'YOUR_ADMIN_ID_HERE'; // 🔒 Replace securely
      const res = await axios.post('http://localhost:5000/api/clinics/add', {
        ...form,
        createdBy: adminId
      });
      setMsg('✅ Clinic added successfully!');
      onClinicAdded(); // To refresh list
      setForm({ name: '', address: '' });
    } catch (error) {
      console.error(error);
      setMsg('❌ Failed to add clinic');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input type="text" name="name" placeholder="Clinic Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
      <button type="submit">Add Clinic</button>
      <p>{msg}</p>
    </form>
  );
};

export default AddClinicForm;