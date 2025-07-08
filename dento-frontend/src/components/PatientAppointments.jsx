import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('patientToken');
      const res = await axios.get('http://localhost:5000/api/patient/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a._id}>
              <strong>Doctor:</strong> {a.doctor?.name} ({a.doctor?.specialization}) <br />
              <strong>Clinic:</strong> {a.clinic?.name} <br />
              <strong>Date:</strong> {new Date(a.date).toLocaleString()} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientAppointments;