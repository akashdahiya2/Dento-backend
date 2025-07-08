// src/pages/AdminDashboard.js
import React from 'react';
import AppointmentForm from '../components/AppointmentForm';
import AdminAppointments from '../components/AdminAppointments';

const AdminDashboard = () => {
  const dummyDoctorId = 'replace_with_real_id';
  const dummyClinicId = 'replace_with_real_id';

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AppointmentForm doctorId={dummyDoctorId} clinicId={dummyClinicId} />
      <AdminAppointments />
    </div>
  );
};

export default AdminDashboard;