import express from  'express'
import authMiddlaware from '../middlaware/auth.middlaware.js'
import roleMiddleware from '../middlaware/role.middleware.js'
import patientController from '../controllers/patient.controller.js'

const patientRouter = express.Router()

patientRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

patientRouter.post('/',roleMiddleware.isPharmacist.bind(roleMiddleware),
    patientController.createPatient.bind(patientController)
)

patientRouter.get('/',patientController.getAllPatient.bind(patientController))
patientRouter.get('/search',patientController.searchPatients.bind(patientController))
patientRouter.get('/:id',patientController.getPatientById.bind(patientController))
patientRouter.put('/:id',roleMiddleware.isPharmacist.bind(roleMiddleware),patientController.updatePatient.bind(patientController))
patientRouter.delete('/:id',roleMiddleware.isPharmacist.bind(roleMiddleware),patientController.deletePatient.bind(patientController))

export default patientRouter