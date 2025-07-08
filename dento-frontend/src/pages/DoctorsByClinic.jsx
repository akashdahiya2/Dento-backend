import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DoctorsByClinic = () => {
  const { clinicId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clinics/${clinicId}/doctors`);
      setDoctors(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [clinicId]);

  if (loading) return <p>Loading doctors...</p>;

  return (
    <div>
      <h2>👨‍⚕️ Doctors in this Clinic</h2>
      {doctors.length ? (
        <ul>
          {doctors.map((doc) => (
            <li key={doc._id}>
              <strong>{doc.name}</strong> — {doc.specialization}
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found for this clinic.</p>
      )}
    </div>
  );
};

export default DoctorsByClinic;