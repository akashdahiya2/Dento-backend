import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('patientToken'); // Clear the auth token
    navigate('/patient/login'); // Redirect to login page
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f2f2f2' }}>
      <h3>🦷 Dento App</h3>
      <div>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

import { useNavigate } from 'react-router-dom';

// Inside your component:
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem('patientToken');
  alert('You have been logged out successfully!');
  navigate('/'); // Redirect to homepage or login page
};


export default PatientNavbar;