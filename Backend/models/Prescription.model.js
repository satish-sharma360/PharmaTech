import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    prescriptionNumber: {
        type: String,
        required: true,
        unique: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorName: {
        type: String,
        required: true,
        trim: true
    },
    medicines: [{
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
        dosage: {
            type: String,
            trim: true
        },
        duration: {
            type: String,
            trim: true
        }
    }],
    prescriptionDate: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'dispensed', 'expired'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;