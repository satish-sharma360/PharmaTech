import axiosInstance from './axios';

class UserApi {
  async getAllUsers(params = {}) {
    const response = await axiosInstance.get('/users', { params });
    return response.data;
  }

  async getUserById(id) {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData) {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  }

  async updateUser(id, userData) {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id) {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  }
}

export default new UserApi();