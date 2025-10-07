import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import reportController from "../controllers/report.controller.js";

const reportRouter = express.Router()

reportRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

reportRouter.post('/daily-sales',roleMiddleware.isPharmacist.bind(roleMiddleware),reportController.generateDailySalesReport.bind(reportController))
reportRouter.post('/inventory',roleMiddleware.isPharmacist.bind(roleMiddleware),reportController.generateInventoryReport.bind(reportController))
reportRouter.get('/',reportController.getAllReport.bind(reportController))


export default reportRouter