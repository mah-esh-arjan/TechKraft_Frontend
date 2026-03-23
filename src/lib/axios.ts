import axios from 'axios';
import { auth } from './auth';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  if (auth.isAdmin()) {
    config.headers['x-admin'] = 'true';
  }
  return config;
});

export default api;
