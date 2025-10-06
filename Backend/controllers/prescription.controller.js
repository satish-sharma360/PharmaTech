import prescriptionService from "../service/prescription.service.js"

class PrescriptionController {
    async createPrescription(req, res) {
        try {
            const prescriptionData = {
                ...req.body,
                addedBy: req.user.userId
            }
            const prescription = await prescriptionService.createPrescription(prescriptionData)
            res.status(201).json({
                success: true,
                message: 'Prescription created successfully',
                data: prescription
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllPrescription(req, res) {
        try {
            const { status } = req.query;
            const filter = {}
            if (status) {
                filter.status = status
            }
            const prescriptions = await prescriptionService.getprescriptions(filter)
            res.status(200).json({
                success: true,
                count: prescriptions.length,
                data: prescriptions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getPrescriptionById(req, res) {
        try {
            const prescription = await prescriptionService.getPrescriptionById(req.params.id);
            res.status(200).json({
                success: true,
                data: prescription
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
    async updatePrescription(req, res) {
        try {
            const prescription = await prescriptionService.updatePrescription(req.params.id, req.body)

            res.status(200).json({
                success: true,
                message: 'Prescription updated successfully',
                data: prescription
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async deletePrescription(req, res) {
        try {
            const result = await prescriptionService.deletePrescription(req.params.id)
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new PrescriptionController()