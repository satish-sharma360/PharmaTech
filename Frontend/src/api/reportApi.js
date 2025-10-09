import axiosInstance from "./axios";

class ReportApi {
  async getAllReports(params = {}) {
    const response = await axiosInstance.get('/reports', { params });
    return response.data;
  }

  async generateDailySalesReport() {
    const response = await axiosInstance.post('/reports/daily-sales');
    return response.data;
  }

  async generateInventoryReport() {
    const response = await axiosInstance.post('/reports/inventory');
    return response.data;
  }
}

export default new ReportApi();