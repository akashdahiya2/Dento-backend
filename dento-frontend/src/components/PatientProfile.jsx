import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const token = localStorage.getItem('patientToken');

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/patient/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setFormData({ name: res.data.name, phone: res.data.phone });
    } catch (err) {
      console.error('Fetch profile error:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        'http://localhost:5000/api/patient/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>🙍‍♂️ My Profile</h2>
      {editMode ? (
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;