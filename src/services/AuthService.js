import axiosInstance from '../utils/axios';
import {setToken} from './TokenService';

export const login = async credentials => {
  const {data} = await axiosInstance.post('login', credentials);
  await setToken(data.token);
  console.log('res.data AuthService-------', data);
};

export const register = async registerInfo => {
  const {data} = await axiosInstance.post('register', registerInfo);
  await setToken(data.token);
  console.log('res.data AuthService-------', data);
};

export const loadProfile = async () => {
  const {data: profile} = await axiosInstance.get('/profile');
  return profile;
};

export const logout = async () => {
  await axiosInstance.get('/logout');

  await setToken(null); // forget to include in previous commit
};
