import axiosInstance from "./axios";

class PrescriptionApi {
  async getAllPrescriptions(params = {}) {
    const response = await axiosInstance.get('/prescriptions', { params });
    return response.data;
  }

  async getPrescriptionById(id) {
    const response = await axiosInstance.get(`/prescriptions/${id}`);
    return response.data;
  }

  async createPrescription(prescriptionData) {
    const response = await axiosInstance.post('/prescriptions', prescriptionData);
    return response.data;
  }

  async updatePrescription(id, prescriptionData) {
    const response = await axiosInstance.put(`/prescriptions/${id}`, prescriptionData);
    return response.data;
  }

  async deletePrescription(id) {
    const response = await axiosInstance.delete(`/prescriptions/${id}`);
    return response.data;
  }
}

export default new PrescriptionApi();