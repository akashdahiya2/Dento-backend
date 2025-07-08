import mongoose from 'mongoose';

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: String,
  address: String,
  phone: String,
  rating: Number,
  specialities: [String]
});

export default mongoose.model('Clinic', clinicSchema);