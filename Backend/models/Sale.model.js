import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  prescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  },
  items: [{
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  finalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'upi', 'other'],
    default: 'cash'
  },
  saleType: {
    type: String,
    enum: ['prescription', 'quick'],
    default: 'quick'
  },
  status: {
    type: String,
    enum: ['completed', 'returned', 'exchanged'],
    default: 'completed'
  },
  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;