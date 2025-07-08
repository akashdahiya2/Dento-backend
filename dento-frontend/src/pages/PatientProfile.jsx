import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('patientToken');
      const res = await axios.get('http://localhost:5000/api/patient/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setEditData(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load profile:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('patientToken');
      const res = await axios.put(
        'http://localhost:5000/api/patient/profile',
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Profile updated!');
      setProfile(res.data);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>🧑 Patient Profile</h2>
      <label>Name: </label>
      <input name="name" value={editData.name || ''} onChange={handleChange} />
      <br />
      <label>Email: </label>
      <input name="email" value={editData.email || ''} onChange={handleChange} />
      <br />
      <label>Phone: </label>
      <input name="phone" value={editData.phone || ''} onChange={handleChange} />
      <br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default PatientProfile;