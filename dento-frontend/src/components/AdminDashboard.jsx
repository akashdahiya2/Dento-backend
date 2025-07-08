import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminAppointments from '../components/AdminAppointments';

const AdminDashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClinics(res.data.clinics);
      setDoctors(res.data.doctors);
      setLoading(false);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧑‍💼 Admin Dashboard</h2>

      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
          <h3>🏥 Clinics: {clinics.length}</h3>
          <Link to="/admin/clinics">Manage Clinics</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
          <h3>👨‍⚕️ Doctors: {doctors.length}</h3>
          <Link to="/admin/doctors">Manage Doctors</Link>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
          <h3>📅 Appointments</h3>
          <Link to="/admin/appointments">View Appointments</Link>
        </div>
      </div>
    </div>
  );
};

const [appointments, setAppointments] = useState([]);
const [stats, setStats] = useState({});

setClinics(res.data.clinics);
setDoctors(res.data.doctors);
setAppointments(res.data.appointments);
setStats(res.data.stats);

<div style={{ display: 'flex', gap: '2rem', marginBottom: '20px' }}>
  <div><strong>🏥 Clinics:</strong> {stats.totalClinics}</div>
  <div><strong>👨‍⚕️ Doctors:</strong> {stats.totalDoctors}</div>
  <div><strong>📅 Appointments:</strong> {stats.totalAppointments}</div>
</div>

export default AdminDashboard;