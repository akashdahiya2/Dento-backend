const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('✅ Dento backend is running!');
});

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const clinicRoutes = require('./routes/clinicRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Use Routes
app.use('/api/admin', adminRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// MongoDB Connection & Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

   const clinicRoutes = require('./routes/clinicRoutes');
app.use('/api/clinics', clinicRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

    app.listen(5000, () => {
      console.log('🚀 Server running on http://localhost:5000');
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });
  
startServer();