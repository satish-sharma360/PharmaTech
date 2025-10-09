import axiosInstance from "./axios";

class PatientApi{
    async getAllPatients() {
    const response = await axiosInstance.get('/patients');
    return response.data;
  }

  async getPatientById(id) {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  }

  async createPatient(patientData) {
    const response = await axiosInstance.post('/patients', patientData);
    return response.data;
  }

  async updatePatient(id, patientData) {
    const response = await axiosInstance.put(`/patients/${id}`, patientData);
    return response.data;
  }

  async deletePatient(id) {
    const response = await axiosInstance.delete(`/patients/${id}`);
    return response.data;
  }

  async searchPatients(query) {
    const response = await axiosInstance.get('/patients/search', {
      params: { query },
    });
    return response.data;
  }
}
export default new PatientApi()