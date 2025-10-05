import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  genericName: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lowStockAlert: {
    type: Number,
    default: 10
  },
  expiryDate: {
    type: Date,
    required: true
  },
  batchNumber: {
    type: String,
    trim: true
  },
  image: {
    url: String,
    publicId: String
  },
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

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;