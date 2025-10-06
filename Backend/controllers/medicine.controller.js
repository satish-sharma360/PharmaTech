import medicineService from "../service/medicine.service.js"

class MedicineController {
    async createMedicine(req, res) {
        try {
            const medicinedata = {
                ...req.body,
                addedBy: req.user.userId
            }
            if (req.file) {
                medicinedata.image = {
                    url: req.file.path,
                    publicId: req.file.filename
                }
            }
            const medicine = await medicineService.createMedicine(medicinedata)
            res.status(201).json({
                success: true,
                message: 'Medicine added successfully',
                data: medicine
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }
    async getAllMedicine(req, res) {
        try {
            const medicines = await medicineService.getAllMedicines();

            res.status(200).json({
                success: true,
                count: medicines.length,
                data: medicines
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
    async getMedicineById(req, res) {
        try {
            const medicine = await medicineService.getMedicineById(req.params.id);
            res.status(200).json({
                success: true,
                data: medicine
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });

        }
    }
    async updateMedicine(req, res) {
        try {
            const updateData = { ...req.body };
            if (req.file) {
                updateData.image = {
                    url: req.file.path,
                    publicId: req.file.filename
                }
            }
            const medicine = await medicineService.updateMedicine(req.params.id, updateData);
            res.status(200).json({
                success: true,
                message: 'Medicine updated successfully',
                data: medicine
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });

        }
    }
    async deleteMedicine(req, res) {
        try {
            const result = await medicineService.deleteMedicine(req.params.id)
            res.status(200).json({
                success: true,
                message: result.message
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }

    }
    async getLowStockMedicine(req, res) {
        try {
            const medicines = await medicineService.getLowStockMedicines()

            res.status(200).json({
                success: true,
                count: medicines.length,
                data: medicines
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
    async getExpiringMedicines(req, res) {
        try {
            const days = parseInt(req.query.days) || 30;
            const medicines = await medicineService.getExpiringMedicines(days)
            res.status(200).json({
                success: true,
                count: medicines.length,
                data: medicines
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
    async searchMedicine(req, res) {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
            }
            const medicines = await medicineService.searchMedicines(query)
            res.status(200).json({
                success: true,
                count: medicines.length,
                data: medicines
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}
export default new MedicineController()
