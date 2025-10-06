import patientService from "../service/patient.service.js"

class PatientController {
    async createPatient(req, res) {
        try {
            const patientdata = {
                ...req.body,
                addedBy: req.user.userId
            }
            const patient = await patientService.createPatients(patientdata)

            res.status(201).json({
                success: true,
                message: 'Patient added successfully',
                data: patient
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllPatient(req, res) {
        try {
            const patients = await patientService.getAllPatient();

            res.status(200).json({
                success: true,
                count: patients.length,
                data: patients
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getPatientById(req, res) {
        try {
            const patient = await patientService.getpatinetById(req.params.id);

            res.status(200).json({
                success: true,
                data: patient
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });

        }
    }
    async updatePatient(req, res) {
        try {
            const patient = await patientService.updatePatient(req.params.id, req.body)
            res.status(200).json({
                success: true,
                message: 'Patient updated successfully',
                data: patient
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async deletePatient(req, res) {
        try {
            const result = await patientService.deletePatient(req.params.id);

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
    async searchPatients(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }
            const patients = await patientService.searchPatients(query)

            res.status(200).json({
                success: true,
                count: patients.length,
                data: patients
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}
export default new PatientController()