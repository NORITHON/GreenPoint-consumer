import { SERVER_URL } from '@env';
import axios from 'axios';

export const getStores = async () => {
  const response = await axios.get(`${SERVER_URL}/store`);

  return response.data ?? [];
};

export const getRecentStores = async (id: number) => {
  const response = await axios.get(`${SERVER_URL}/history/three/${id}`);

  return response.data ?? [];
};

export const getHistories = async (id: number) => {
  const response = await axios.get(`${SERVER_URL}/history/${id}`);

  return response.data
    .map((item: any) => {
      return { ...item, created_at: new Date(item.created_at) };
    })
    .reverse();
};

export const getDailyPoint = async (id: number) => {
  const response = await axios.get(`${SERVER_URL}/dailyHistory?customerId=${id}`).catch((error) => {
    console.log(error);
  });

  return response?.data ?? [];
};
