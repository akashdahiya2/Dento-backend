import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('patientToken');
      const res = await axios.get('http://localhost:5000/api/patient/appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch appointments', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              {appt.date} at {appt.time} with Dr. {appt.doctor?.name} ({appt.doctor?.specialization}) at {appt.clinic?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientAppointments;