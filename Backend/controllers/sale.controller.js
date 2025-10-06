import saleService from "../service/sale.service.js";

class SaleController {
    async createSale(req, res) {
        try {
            const sale = await saleService.createSale(req.body, req.user.userId);

            res.status(201).json({
                success: true,
                message: 'Sale completed successfully',
                data: sale
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllSales(req, res) {
        try {
            const { status, saleType } = req.query;
            const filter = {};
            if (status) {
                filter.status = status;
            }
            if (saleType) {
                filter.saleType = saleType;
            }
            const sales = await saleService.getAllSales(filter)
            res.status(200).json({
                success: true,
                count: sales.length,
                data: sales
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    // async getSaleById(req,res){
    //     try {
    //         const sale = await saleService.
    //     } catch (error) {

    //     }
    // }
    async getTodaySales(req, res) {
        try {
            const sales = await saleService.getTodaySales();
            const totalRevenue = sales.reduce((sum, sale) => sum += sale.finalAmount, 0)
            res.status(200).json({
                success: true,
                count: sales.length,
                totalRevenue,
                data: sales
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getMySale(req, res) {
        try {
            const sales = await saleService.getAllSales({ soldBy: req.user.userId })
            res.status(200).json({
                success: true,
                count: sales.length,
                data: sales
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new SaleController()