import { APIService } from './APIService';

/** Login the user and get his token. */
export const loginUser = async (userCredentials: TUserCredentials) => {
  const { data } = await APIService.post<{ token: string }>(
    'user/login',
    userCredentials,
  );

  return data.token;
};

/** Register the new user. */
export const registerUser = async (userCredentials: TUserCredentials) => {
  await APIService.post<{ token: string }>('user/register', userCredentials);
};
