import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL for your NestJS backend
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
});

export default apiClient;