import Medicine from "../models/Medicine.model.js";


class MedicineService {
    async createMedicine(medicineData) {
        const medicine = new Medicine(medicineData)
        await medicine.save();
        return medicine
    }
    async getAllMedicines(filter = {}) {
        const medicines = await Medicine.find({ ...filter, isActive: true })
            .populate('addedBy', 'name email').sort({ createdAt: -1 })
        return medicines
    }

    async getMedicineById(medicineId) {
        const medicine = await Medicine.findById(medicineId).populate('addedBy', 'name email')
        if (!medicine) {
            throw new Error('Medicine Not Found')
        }
        return medicine
    }

    async updateMedicine(medicineId, updatedata) {
        const medicine = await Medicine.findByIdAndUpdate(
            medicineId, updatedata, { new: true, runValidators: true }
        )
        if (!medicine) {
            throw new Error('Medicine Not Found')
        }
        return medicine
    }

    async deleteMedicine(medicineId) {
        const medicine = await Medicine.findByIdAndUpdate(
            medicineId,
            { isActive: false },
            { new: true }
        )
        if (!medicine) {
            throw new Error('Medicine Not Found')
        }
        return { message: 'Medicine deleted successfully' };
    }

    async getLowStockMedicines() {
        const medicine = await Medicine.find({
            $expr: { $lte: ['$stock', '$lowStockAlert'] },
            isActive: true
        })
        return medicine
    }

    async getExpiringMedicines(days = 30) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);

        const medicine = await Medicine.find({
            expiryDate: {$lte : futureDate},
            isActive:true
        })
        return medicine
    }

    async searchMedicines(searchItem){
        const medicine = await Medicine.find({
            $or:[
                {name : {$regex : searchItem , $options: 'i'}},
                {genericName : {$regex : searchItem , $options: 'i'}},
                {category : {$regex : searchItem ,$options: 'i' }}
            ],
            isActive:true
        })
        return medicine
    }

}

export default new MedicineService()
