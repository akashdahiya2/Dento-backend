import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('patientToken'); // token set at login
      const res = await axios.get('http://localhost:5000/api/appointments/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a._id}>
              <strong>Doctor:</strong> {a.doctor.name} <br />
              <strong>Clinic:</strong> {a.clinic.name} <br />
              <strong>Date:</strong> {new Date(a.date).toLocaleDateString()} <br />
              <strong>Time:</strong> {a.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;