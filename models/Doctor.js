import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  specialty: String,
  experience: Number,
  timings: String
});

export default mongoose.model('Doctor', doctorSchema);