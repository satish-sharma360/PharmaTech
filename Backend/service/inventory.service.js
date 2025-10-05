import Inventory from "../models/Inventory.model";
import Medicine from "../models/medicine.model";

class InventoryService{
    async addInventory(inventoryData,userId){
        const medicine = await Medicine.findById(inventoryData.medicine)
        if (!medicine) {
            throw new Error('Medicine not Found')
        }

        const previousStock = medicine.stock;
        medicine.stock += inventoryData.quantity;
        await medicine.save()

        const inventory = new Inventory({
            ...inventoryData,
            previousStock,
            currentStock:medicine.stock,
            performedBy:userId
        })
        const savedInventory = await inventory.save()
        const populatedInventory = await Inventory.findById(savedInventory._id)
        .populate('medicine').populate('performedBy')
    }

    async getInventoryHistory(medicineId){
        const history = await Inventory.find({medicine:medicineId})
        .populate('medicine')
        .populate('performedBy')
        return history
    }

    async getAllInventoryTransactions(filter ={}){
        const transaction = await Inventory.find(filter)
        .populate('medicine')
        .populate('performedBy')
        return transaction
    }
}
export default new InventoryService()