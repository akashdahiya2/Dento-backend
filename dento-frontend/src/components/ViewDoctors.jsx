import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from '../components/AppointmentForm'; // import it here

const ViewDoctors = ({ clinicId }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await axios.get(`http://localhost:5000/api/doctors/by-clinic/${clinicId}`);
      setDoctors(res.data);
    };
    fetchDoctors();
  }, [clinicId]);

  return (
    <div>
      <h3>Doctors in this clinic</h3>
      {doctors.length ? (
        doctors.map((doc) => (
          <div key={doc._id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <h4>{doc.name} ({doc.specialization})</h4>
            <p>Experience: {doc.experience} years</p>

            {/* 👇 AppointmentForm with doctorId and clinicId */}
            <AppointmentForm doctorId={doc._id} clinicId={clinicId} />
          </div>
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
  );
};

export default ViewDoctors;