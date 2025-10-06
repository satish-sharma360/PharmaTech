import Inventory from "../models/Inventory.model.js";
import Medicine from "../models/Medicine.model.js";
import Sale from "../models/Sale.model.js";

class SaleService {
    async generateInvoiceNumber() {
        const lastSale = await Sale.findOne().sort({ createdAt: -1 });
        if (!lastSale) {
            return `INV-001`
        }
        const lastNumber = parseInt(lastSale.invoiceNumber.split('-')[1]);
        return `INV-${String(lastNumber + 1).padStart(3, '0')}`
    }

    async createSale(saleData, userId) {
        const invoiceNumber = await this.generateInvoiceNumber();

        for (const item of saleData.items) {
            const medicine = await Medicine.findById(item.Medicine);
            if (!medicine) {
                throw new Error(`Medicine not found: ${item.medicine}`);
            }
            if (medicine.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${medicine.name}`);
            }
        }

        for (const item of saleData.items) {
            const medicine = await Medicine.findById(item.medicine);
            const previousStoke = medicine.stock;
            medicine.stock -= item.quantity;
            await medicine.save();

            await new Inventory({
                medicine: medicine._id,
                transactionType: 'sale',
                quantity: -item.quantity,
                previousStoke,
                currentStock: medicine.stock,
                performedBy: userId
            }).save()
        }
        const sale = new Sale({
            ...saleData,
            invoiceNumber,
            soldBy: userId
        });
        const savedSale = await sale.save();

        const populatedSale = await Sale.findById(savedSale._id)
            .populate('patient')
            .populate('prescription')
            .populate('items.medicine')
            .populate('soldBy');

        return populatedSale;
    }
    async getAllSales(filter = {}) {
        const sale = await Sale.find(filter)
            .populate('patient')
            .populate('prescription')
            .populate('items.medicine')
            .populate('soldBy')
        if (!sale) {
            throw new Error('Sale not found');
        }
        return sale;
    }
    async getTodaySales(){
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);

        const sales = await Sale.find({
            createdAt: {$gte : startOfDay , $lte: endOfDay},
            status:'completed'
        }).populate('items.medicine').populate('soldBy')
        return sales
    }
}
export default new SaleService()