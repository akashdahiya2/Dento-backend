// src/layouts/PatientLayout.jsx

import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

const PatientLayout = () => {
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem('patient'));

  const handleLogout = () => {
    localStorage.removeItem('patient');
    navigate('/patient/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dento Patient</h2>

        <NavLink
          to="/patient/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-blue-600'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/patient/appointments"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-blue-600'
          }
        >
          My Appointments
        </NavLink>

        <NavLink
          to="/patient/profile"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-blue-600'
          }
        >
          Profile
        </NavLink>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 px-3 py-2 rounded text-left"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="text-xl font-semibold mb-4">
          Welcome, {patient?.name || 'Patient'}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;