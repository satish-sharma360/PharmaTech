import reportService from "../service/report.service.js";

class ReportController {
    async generateDailySalesReport(req, res) {
        try {
            const report = await reportService.generateDailySalesReport(req.user.userId);
            res.status(201).json({
                success: true,
                message: 'Daily sales report generated successfully',
                data: report
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async generateInventoryReport(req, res) {
        try {
            const report = await reportService.generateInventoryReport(req.user.userId)
            res.status(201).json({
                success: true,
                message: 'Inventory report generated successfully',
                data: report
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    async getAllReport(req, res) {
        try {
            const { reportType } = req.query;
            const filter = {};
            if (reportType) {
                filter.reportType = reportType
            }

            const reports = await reportService.getAllreports(filter)
            res.status(200).json({
                success: true,
                count: reports.length,
                data: reports
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
export default new ReportController()
