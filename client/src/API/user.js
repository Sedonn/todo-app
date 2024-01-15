import axios from 'axios';

import { API_URL } from '../config';

export const loginUser = async (login, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { login, password });

  return response.data.token;
};

export const registerUser = async (login, password) => {
  const response = await axios.post(`${API_URL}/user/register`, { login, password });

  return response.data.token;
};