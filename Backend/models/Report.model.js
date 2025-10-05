import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    enum: ['daily-sales', 'inventory', 'prescription', 'financial', 'customer', 'expiry'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
export default Report;