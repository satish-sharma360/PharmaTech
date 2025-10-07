import express from "express";
import authMiddlaware from "../middlaware/auth.middlaware.js";
import roleMiddleware from "../middlaware/role.middleware.js";
import inventoryController from "../controllers/inventory.controller.js";

const inventoryRouter = express.Router()

inventoryRouter.use(authMiddlaware.verifyToken.bind(authMiddlaware))

inventoryRouter.post('/',roleMiddleware.isPharmacist.bind(roleMiddleware),inventoryController.addInventory.bind(inventoryController))
inventoryRouter.get('/',inventoryController.getAllInventoryTransactions.bind(inventoryController))
inventoryRouter.get('/:medicineId',inventoryController.getInventoryHistory.bind(inventoryController))


export default inventoryRouter