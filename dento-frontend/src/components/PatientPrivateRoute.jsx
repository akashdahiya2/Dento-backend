// src/components/PatientPrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PatientPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('patientToken');
  return token ? children : <Navigate to="/patient/login" />;
};

export default PatientPrivateRoute;