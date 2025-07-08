import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminClinics from '../components/AdminClinics';
import AdminDoctors from '../components/AdminDoctors';
import AdminAppointments from '../components/AdminAppointments';

const AdminDashboard = () => {
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken'); // set this on login
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
    <div>
      <h2>🧑‍💼 Admin Dashboard</h2>

      <h3>🏥 Clinics</h3>
      {clinics.length ? (
        <ul>{clinics.map((c) => <li key={c._id}>{c.name}</li>)}</ul>
      ) : (
        <p>No clinics yet.</p>
      )}

      <h3>👨‍⚕️ Doctors</h3>
      {doctors.length ? (
        <ul>{doctors.map((d) => (
          <li key={d._id}>{d.name} ({d.specialization})</li>
        ))}</ul>
      ) : (
        <p>No doctors yet.</p>
      )}
    </div>
  );
};

const handleAdminLogout = () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
};

<button onClick={handleAdminLogout}>Logout</button>

export default AdminDashboard;