import axios from 'axios';

import { APIService } from './APIService';

export const loginUser = async (login: string, password: string) => {
  const { data } = await APIService.post<{ token: string }>('user/login', {
    login,
    password,
  });

  return data.token;
};

export const registerUser = async (login: string, password: string) => {
  const { data } = await axios.post<{ token: string }>('user/register', {
    login,
    password,
  });

  return data.token;
};
