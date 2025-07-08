import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClinics = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clinics');
      setClinics(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching clinics:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  if (loading) return <p>Loading clinics...</p>;

  return (
    <div>
      <h2>🏥 Available Clinics</h2>
      {clinics.length ? (
        <ul>
          {clinics.map((clinic) => (
            <li key={clinic._id}>
              <Link to={`/clinics/${clinic._id}/doctors`}>
                <strong>{clinic.name}</strong> — {clinic.location}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clinics found.</p>
      )}
    </div>
  );
};

export default ViewClinics;