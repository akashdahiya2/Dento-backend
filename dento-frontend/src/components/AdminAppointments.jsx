import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [clinicFilter, setClinicFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [search, setSearch] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Fetch all initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        const [appointmentsRes, clinicsRes, doctorsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/appointments', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/clinics', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/doctors', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAppointments(appointmentsRes.data);
        setFilteredAppointments(appointmentsRes.data);
        setClinics(clinicsRes.data);
        setDoctors(doctorsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...appointments];

    if (clinicFilter) {
      filtered = filtered.filter((a) => a.clinic?._id === clinicFilter);
    }

    if (doctorFilter) {
      filtered = filtered.filter((a) => a.doctor?._id === doctorFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((a) => a.date === dateFilter);
    }

    if (search) {
      filtered = filtered.filter((a) =>
        a.patient?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (searchDate) {
      filtered = filtered.filter((a) => a.date === searchDate);
    }

    setFilteredAppointments(filtered);
  }, [appointments, clinicFilter, doctorFilter, dateFilter, search, searchDate]);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2>📋 Admin Appointments</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by patient name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={clinicFilter} onChange={(e) => setClinicFilter(e.target.value)}>
          <option value="">All Clinics</option>
          {clinics.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)}>
          <option value="">All Doctors</option>
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {filteredAppointments.length ? (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Clinic</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((a) => (
              <tr key={a._id}>
                <td>{a.patient?.name}</td>
                <td>{a.doctor?.name}</td>
                <td>{a.clinic?.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <select
                    value={a.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        const token = localStorage.getItem('adminToken');
                        await axios.put(
                          `http://localhost:5000/api/admin/appointments/${a._id}/status`,
                          { status: newStatus },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        const updated = appointments.map((appt) =>
                          appt._id === a._id ? { ...appt, status: newStatus } : appt
                        );
                        setAppointments(updated);
                      } catch (err) {
                        console.error('Failed to update status', err);
                        alert('Error updating status');
                      }
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={async () => {
                      if (!window.confirm('Are you sure you want to delete this appointment?')) return;

                      try {
                        const token = localStorage.getItem('adminToken');
                        await axios.delete(
                          `http://localhost:5000/api/admin/appointments/${a._id}`,
                          {
                            headers: { Authorization: `Bearer ${token}` },
                          }
                        );
                        setAppointments((prev) =>
                          prev.filter((appt) => appt._id !== a._id)
                        );
                      } catch (err) {
                        console.error('Delete failed:', err);
                        alert('Failed to delete appointment');
                      }
                    }}
                    style={{ color: 'red', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default AdminAppointments;