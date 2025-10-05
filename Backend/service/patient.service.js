import Patient from "../models/patient.model";

class PatientService {
    async createPatients(patientdata) {
        const patient = new Patient(patientdata)
        await patient.save()
        return patient
    }

    async getAllPatient(filter = {}) {
        const patients = await Patient.find({ ...filter, isActive: true })
            .populate('addedBy', 'name email').sort({ createdAt: -1 })
        return patients
    }

    async getpatinetById(patientId) {
        const patient = await Patient.findById(patientId)
            .populate('addedBy', 'name email')
        if (!patient) {
            throw new Error('Patient Not Found')
        }
        return patient
    }
    async updatePatient(patientId , patientData){
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            patientData,
            {new:true , runValidators:true}
        )
        if (!patient) {
            throw new Error('Patient not found')
        }
        return patient
    }
    async deletePatient(patientId){
        const patient = await Patient.findByIdAndUpdate(
            patientId,
            {isActive:false},
            {new : true}
        )
        if (!patient) {
            throw new Error('Patient not found')
        }
        return patient
    }

    async searchPatients(searchItem){
        const patient = await Patient.find({
            $or:[
                {name: {$regex : searchItem , $options:'i'}},
                {phone: {$regex : searchItem , $options:'i'}},
                {email: {$regex : searchItem , $options:'i'}},
            ],
            isActive:true
        })
        return patient
    }
}

export default new PatientService()