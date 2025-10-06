import inventoryService from "../service/inventory.service.js";

class InventoryController {
    async addInventory(req, res) {
        try {
            const inventory = await inventoryService.addInventory(req.body, req.user.userId);

            res.status(201).json({
                success: true,
                message: 'Inventory updated successfully',
                data: inventory
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getInventoryHistory(req, res) {
        try {
            const { medicineId } = req.params
            const history = await inventoryService.getInventoryHistory(medicineId)
            res.status(200).json({
                success: true,
                count: history.length,
                data: history
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllInventoryTransactions(req, res) {
        try {
            const { transactionType } = req.query;
            const filter = {};
            if (transactionType) {
                filter.transactionType = transactionType;
            }
            const transactions = await inventoryService.getAllInventoryTransactions(filter)
            res.status(200).json({
                success: true,
                count: transactions.length,
                data: transactions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new InventoryController()