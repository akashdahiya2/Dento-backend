import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const user = JSON.parse(localStorage.getItem('patient'));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'Patient'}!</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phone}</p>
          <Link to="/patient/profile" className="text-blue-600 hover:underline mt-2 block">
            View / Edit Profile
          </Link>
        </div>

        {/* Appointments Section */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p>View your upcoming and past appointments.</p>
          <Link to="/patient/appointments" className="text-blue-600 hover:underline mt-2 block">
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;