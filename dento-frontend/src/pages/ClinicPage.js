import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppointmentForm from '../components/AppointmentForm';

const ClinicPage = () => {
  const { id } = useParams(); // get clinicId from URL
  const [clinic, setClinic] = useState({});
  const [doctors, setDoctors] = useState([]);

  // Fetch clinic info (optional)
  useEffect(() => {
    axios.get(`http://localhost:5000/api/clinics/${id}`)
      .then(res => setClinic(res.data.clinic))
      .catch(err => console.error('Clinic fetch error:', err));
  }, [id]);

  // Fetch doctors for this clinic
  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/clinic/${id}`)
      .then(res => setDoctors(res.data))
      .catch(err => console.error('Doctor fetch error:', err));
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>{clinic?.name || 'Clinic Details'}</h2>
      <p>{clinic?.address}</p>

      <h3>Doctors at this clinic:</h3>
      {doctors.length === 0 ? (
        <p>No doctors available at this clinic yet.</p>
      ) : (
        doctors.map(doctor => (
          <div key={doctor._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
            <h4>{doctor.name} ({doctor.specialty})</h4>
            <p>Experience: {doctor.experience} years</p>
            <p>Timings: {doctor.timings}</p>
            <AppointmentForm doctorId={doctor._id} clinicId={id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ClinicPage;