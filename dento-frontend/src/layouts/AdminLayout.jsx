// src/layouts/AdminLayout.jsx

import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Dento Admin</h2>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-gray-700'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/clinics"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-gray-700'
          }
        >
          Clinics
        </NavLink>

        <NavLink
          to="/admin/doctors"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-gray-700'
          }
        >
          Doctors
        </NavLink>

        <NavLink
          to="/admin/appointments"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-900 px-3 py-2 rounded mb-2'
              : 'px-3 py-2 rounded mb-2 hover:bg-gray-700'
          }
        >
          Appointments
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
          Welcome, {admin?.name || 'Admin'}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;