import axiosInstance from "./axios";

class InventoryApi {
  async getAllTransactions(params = {}) {
    const response = await axiosInstance.get('/inventory', { params });
    return response.data;
  }

  async getInventoryHistory(medicineId) {
    const response = await axiosInstance.get(`/inventory/${medicineId}`);
    return response.data;
  }

  async addInventory(inventoryData) {
    const response = await axiosInstance.post('/inventory', inventoryData);
    return response.data;
  }
}

export default new InventoryApi();