import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AppointmentForm from '../components/AppointmentForm';

const ClinicDoctors = () => {
  const { clinicId } = useParams();
  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClinicDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}`);
      setClinic(res.data.clinic);
      setDoctors(res.data.doctors);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch clinic doctors:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinicDoctors();
  }, [clinicId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>👨‍⚕️ Doctors at {clinic?.name}</h2>
      {doctors.length ? (
        doctors.map((doctor) => (
          <div key={doctor._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
            <h3>{doctor.name}</h3>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <AppointmentForm doctorId={doctor._id} clinicId={clinicId} />
          </div>
        ))
      ) : (
        <p>No doctors found in this clinic.</p>
      )}
    </div>
  );
};

export default ClinicDoctors;