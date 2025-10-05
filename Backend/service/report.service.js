import Medicine from "../models/medicine.model";
import Report from "../models/report.model";
import Sale from "../models/Sale.model";

class ReportService {
    async generateDailySalesReport(userId) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999)

        const sales = await Sale.find({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
            status: 'completed'
        })
        const totalSales = sales.length;
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.finalAmount, 0)

        const reportData = {
            totalSales,
            totalRevenue,
            sales
        }

        const report = new Report({
            reportType: 'daily-sales',
            title: `Daily Sales Report - ${new Date().toLocaleDateString()}`,
            data: reportData,
            startDate: startOfDay,
            endDate: endOfDay,
            generatedBy: userId
        })
        await report.save()
        return report;
    }

    async generateInventoryReport(userId) {
        const medicines = await Medicine.find({ isActive: true });
        const lowStockMedicines = medicines.filter(m => m.stock <= m.lowStockAlert)
        const totalValue = medicines.reduce((sum, m) => sum + (m.stock * m.price), 0)

        const reportData = {
            totalMedicines: medicines.length,
            lowStockCount: lowStockMedicines.length,
            totalInventoryValue: totalValue,
            lowStockMedicines
        }

        const report = new Report({
            reportType:'inventory',
            title:`Inventory Report - ${new Date().toLocaleDateString()}`,
            data:reportData,
            generatedBy:userId
        })

        await report.save();
        return report
    }

    async getAllreports(filter={}){
        const reports = await Report.find(filter)
        .populate('generatedBy','name email')
        .sort({createdAt:-1})
        return reports
    }
}
export default new ReportService()