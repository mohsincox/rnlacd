import axios from 'axios';
import {getToken} from '../services/TokenService';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async req => {
  const token = await getToken();

  if (token !== null) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default axiosInstance;
