import axiosInstance from "./axios";

class MedicineApi{
    async getMedicines(){
        const response = await axiosInstance.get('/medicines')
        return response.data
    }
    async getMedicineById(id){
        const response = await axiosInstance.get(`/medicines/${id}`)
        return response.data
    }
    async createMedicine(formData) {
    const response = await axiosInstance.post('/medicines', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async updateMedicine(id, formData) {
    const response = await axiosInstance.put(`/medicines/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async deleteMedicine(id) {
    const response = await axiosInstance.delete(`/medicines/${id}`);
    return response.data;
  }

  async searchMedicines(query) {
    const response = await axiosInstance.get('/medicines/search', {
      params: { query },
    });
    return response.data;
  }

  async getLowStockMedicines() {
    const response = await axiosInstance.get('/medicines/low-stock');
    return response.data;
  }

  async getExpiringMedicines(days = 30) {
    const response = await axiosInstance.get('/medicines/expiring', {
      params: { days },
    });
    return response.data;
  }
}
export default new MedicineApi()