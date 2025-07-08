import React from 'react';

const AdminClinics = ({ clinics }) => {
  return (
    <div>
      <h3>🏥 Clinics</h3>
      {clinics.length ? (
        <ul>
          {clinics.map((clinic) => (
            <li key={clinic._id}>{clinic.name}</li>
          ))}
        </ul>
      ) : (
        <p>No clinics yet.</p>
      )}
    </div>
  );
};

export default AdminClinics;