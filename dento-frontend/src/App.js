// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import AdminClinics from './components/AdminClinics';
import ViewClinics from './pages/ViewClinics';
import DoctorsByClinic from './pages/DoctorsByClinic';
import PatientProfile from './pages/PatientProfile';
import PatientAppointments from './pages/PatientAppointments';
import PatientLogin from './pages/PatientLogin';
import PatientLayout from './layouts/PatientLayout';
import PatientDashboard from './pages/PatientDashboard';
import PatientPrivateRoute from './components/PatientPrivateRoute';
import AdminLayout from './layouts/AdminLayout';
import ClinicManagement from './pages/admin/ClinicManagement';
import DoctorManagement from './pages/admin/DoctorManagement';
import AdminAppointments from './pages/admin/AdminAppointments';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clinics" element={<AdminClinics />} />
        <Route path="/clinics" element={<ViewClinics />} />
        <Route path="/clinics/:clinicId/doctors" element={<DoctorsByClinic />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/admin" element={<AdminLayout />}></Route>
        <Route path="/admin/clinics" element={<ClinicManagement />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="clinics" element={<ClinicManagement />} />
        <Route path="doctors" element={<DoctorManagement />} />
  <Route path="appointments" element={<AdminAppointments />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/admin/doctors" element={<DoctorManagement />} />
<Route path="/admin/appointments" element={<AdminAppointments />} />     
        <Route path="/patient" element={<PatientLayout />}>
        <Route path="dashboard" element={<PatientDashboard />} />
        </Route>     
                {/* Patient protected routes */}
        <Route
          path="/patient/dashboard"
          element={
            <PatientPrivateRoute>
              <PatientDashboard />
            </PatientPrivateRoute>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <PatientPrivateRoute>
              <PatientProfile />
            </PatientPrivateRoute>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <PatientPrivateRoute>
              <PatientAppointments />
            </PatientPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;