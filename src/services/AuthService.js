import axiosInstance from '../utils/axios';
import {getToken, setToken} from './TokenService';

export const login = async credentials => {
  const {data} = await axiosInstance.post('login', credentials);
  await setToken(data.token);
  console.log('res.data AuthService-------', data);
};

export const loadProfile = async () => {
  const token = await getToken();
  console.log('🚀 ~ loadProfile ~ token:', token);
  const {data: profile} = await axiosInstance.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return profile;
};

export const logout = async () => {
  const token = await getToken();

  await axiosInstance.get('/logout', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
