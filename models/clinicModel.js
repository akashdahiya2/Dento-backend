const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  phone: String,
  // Add other clinic fields as needed
});

module.exports = mongoose.models.Clinic || mongoose.model('Clinic', clinicSchema);