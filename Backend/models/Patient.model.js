import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  medicalHistory: {
    type: String,
    trim: true
  },
  allergies: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;