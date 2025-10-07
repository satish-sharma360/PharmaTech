import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import saleController from "../controllers/sale.controller.js";

const saleRouter = express.Router()

saleRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

saleRouter.post('/',roleMiddleware.isCashier.bind(roleMiddleware),saleController.createSale.bind(saleController))
saleRouter.get('/',saleController.getAllSales.bind(saleController))
saleRouter.get('/today',saleController.getTodaySales.bind(saleController))
saleRouter.get('/my-sale',saleController.getMySale.bind(saleController))
// saleRouter.get('/:id',saleController.get.bind(saleController))

export default saleRouter