import { SERVER_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IRegisterData } from '../screens/RegisterScreen';

export const login = async (token: string) => {
  const response = await axios.get(`${SERVER_URL}/login?code=${token}`);

  if (response.data.token) {
    await AsyncStorage.setItem('token', response.data.token);
  }

  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const register = async (data: IRegisterData) => {
  const response = await axios.post(`${SERVER_URL}/makeAccount`, data).catch((error) => {
    console.log(error);
  });

  return response?.data;
};

export const deleteUser = async (kakaoId: number) => {
  const response = await axios.delete(`${SERVER_URL}/deleteMember?id=${kakaoId}`).catch((error) => {
    console.log(error);
  });

  return response;
};

export const getUser = async (kakaoId: number) => {
  const response = await axios.get(`${SERVER_URL}/readCustomer?id=${kakaoId}`);

  return response.data;
};
