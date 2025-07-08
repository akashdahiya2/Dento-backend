import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddDoctorForm = ({ onDoctorAdded }) => {
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    contact: '',
    clinicId: '',
    availableDays: ''
  });
  const [clinics, setClinics] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clinics');
        setClinics(res.data);
      } catch (err) {
        console.error('Failed to load clinics:', err);
      }
    };
    fetchClinics();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const daysArray = form.availableDays.split(',').map((day) => day.trim());

      await axios.post('http://localhost:5000/api/doctors/add', {
        ...form,
        availableDays: daysArray
      });

      setMsg('✅ Doctor added!');
      setForm({
        name: '',
        specialization: '',
        experience: '',
        contact: '',
        clinicId: '',
        availableDays: ''
      });

      onDoctorAdded(); // refresh doctor list if needed
    } catch (err) {
      console.error(err);
      setMsg('❌ Failed to add doctor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Doctor</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" required />
      <input name="experience" type="number" value={form.experience} onChange={handleChange} placeholder="Experience (years)" required />
      <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
      <select name="clinicId" value={form.clinicId} onChange={handleChange} required>
        <option value="">Select Clinic</option>
        {clinics.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <input name="availableDays" value={form.availableDays} onChange={handleChange} placeholder="Available Days (Mon,Tue,...)" />
      <button type="submit">Add Doctor</button>
      <p>{msg}</p>
    </form>
  );
};

export default AddDoctorForm;