import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import prescriptionController from "../controllers/prescription.controller.js";

const prescriptionRouter = express.Router()

prescriptionRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

prescriptionRouter.post('/',roleMiddleware.isPharmacist.bind(roleMiddleware),prescriptionController.createPrescription.bind(prescriptionController))
prescriptionRouter.get('/',prescriptionController.getAllPrescription.bind(prescriptionController))
prescriptionRouter.get('/:id',prescriptionController.getPrescriptionById.bind(prescriptionController))
prescriptionRouter.put('/:id',roleMiddleware.isPharmacist.bind(roleMiddleware),prescriptionController.updatePrescription.bind(prescriptionController))
prescriptionRouter.delete('/:id',roleMiddleware.isPharmacist.bind(roleMiddleware),prescriptionController.deletePrescription.bind(prescriptionController))

export default prescriptionRouter