import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddDoctorForm from './AddDoctorForm';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error('Failed to fetch doctors', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <AddDoctorForm onDoctorAdded={fetchDoctors} />
      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.name}</strong> – {doc.specialization} <br />
            Experience: {doc.experience} yrs | Contact: {doc.contact} <br />
            Clinic: {doc.clinicId?.name || 'N/A'} <br />
            Available Days: {doc.availableDays?.join(', ')}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDoctors;