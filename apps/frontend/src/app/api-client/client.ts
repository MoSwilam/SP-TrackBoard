import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL for your NestJS backend
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

const apiClient = {
  makeRequest: async (method: string, url: string, data?: unknown) => {
    const response = await axiosClient.request({
      method,
      url,
      data,
    });
    return response.data;
  },

  createTask: async (title: string) => {
    const path = '/tasks';
    return await apiClient.makeRequest('POST', path, { title });
  },
  getTasks: async () => {
    const path = '/tasks';
    return await apiClient.makeRequest('GET', path);
  },
  updateTask: async (id: number, status: string) => {
    const path = `/tasks/${id}`;
    return await apiClient.makeRequest('PATCH', path, { status });
  },
  deleteTask: async (id: number) => {
    console.log('deleteTask from API client', id);
    const path = `/tasks/${id}`;
    return await apiClient.makeRequest('DELETE', path);
  }
};

export default apiClient;
