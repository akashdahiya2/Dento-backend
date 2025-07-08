import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/clinics/list')
      .then(res => setClinics(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>🦷 Welcome to Dento</h1>
      {clinics.map(clinic => (
        <div key={clinic._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{clinic.name}</h3>
          <p>{clinic.address}</p>
          <Link to={`/clinic/${clinic._id}`}>View Doctors</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;