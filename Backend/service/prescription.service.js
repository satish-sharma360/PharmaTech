import Prescription from "../models/prescription.model";

class PrescriptionService {
    async generatePrescriptionNumber() {
        const lastPrescription = await Prescription.findOne().sort({ createdAt: -1 })
        if (!lastPrescription) {
            return `PRE-001`;
        }
        const lastNumber = parseInt(lastPrescription.prescriptionNumber.split('-')[1]);
        return `PRE-${String(lastNumber + 1).padStart(3, '0')}`
    }

    async createPrescription(prescriptionData) {
        const PrescriptionNumber = await this.generatePrescriptionNumber();
        const prescription = await Prescription({
            ...prescriptionData,
            PrescriptionNumber
        })
        const savedPrescription = await prescription.save();
        const populatedPrescription = await Prescription.findById(savedPrescription._id)
            .populate('Patient')
            .populate('medicines.medicine')
            .populate('addedBy');

        return populatedPrescription;
    }
    async getprescriptions(filter = {}) {
        const Prescriptions = await Prescription.find(filter)
            .populate('patient')
            .populate('medicines.medicine')
            .populate('addedBy')
            .sort({ createdAt: -1 });
        return Prescriptions
    }
    async getPrescriptionById(prescriptionId) {
        const prescription = await Prescription.findById(prescriptionId)
            .populate('patient')
            .populate('medicines.medicine')
            .populate('addedBy')
        if (!prescription) {
            throw new Error('Prescription not found')
        }
        return prescription
    }
    async updatePrescription(prescriptionId, updatedata) {
        const prescription = await Prescription.findByIdAndUpdate(
            prescriptionId, updatedata, { new: true, runValidators: true })
            .populate('patient')
            .populate('medicines.medicine')
            .populate('addedBy');
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        return prescription;
    }
    async deletePrescription(prescriptionId) {
        const prescription = await Prescription.findByIdAndDelete(prescriptionId)
        if (!prescription) {
            throw new Error('Prescription not found');
        }
        return { message: 'Prescription deleted successfully' };
    }
}
export default new PrescriptionService()