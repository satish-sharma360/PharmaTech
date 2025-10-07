import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import uploadMiddleware from "../middlaware/upload.middleware.js";
import medicineController from "../controllers/medicine.controller.js";

const medicineRouter = express.Router()

medicineRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

medicineRouter.post('/', roleMiddleware.isPharmacist.bind(roleMiddleware),
    uploadMiddleware.upload.single('image'),
    medicineController.createMedicine.bind(medicineController)
)
medicineRouter.get('/', medicineController.getAllMedicine.bind(medicineController))
medicineRouter.get('/search', medicineController.searchMedicine.bind(medicineController))
medicineRouter.get('/low-stock', medicineController.getLowStockMedicine.bind(medicineController))
medicineRouter.get('/expiring', medicineController.getExpiringMedicines.bind(medicineController))
medicineRouter.get('/:id', medicineController.getMedicineById.bind(medicineController))

medicineRouter.put('/:id',
    roleMiddleware.isPharmacist.bind(roleMiddleware) ,
    uploadMiddleware.upload.single('image'),
    medicineController.updateMedicine.bind(medicineController)
)
medicineRouter.delete('/:id',
    roleMiddleware.isPharmacist.bind(roleMiddleware) ,
    medicineController.deleteMedicine.bind(medicineController)
)
export default medicineRouter