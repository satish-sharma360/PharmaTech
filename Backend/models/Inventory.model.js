import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true
  },
  transactionType: {
    type: String,
    enum: ['purchase', 'sale', 'return', 'adjustment', 'expired'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  previousStock: {
    type: Number,
    required: true
  },
  currentStock: {
    type: Number,
    required: true
  },
  batchNumber: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;