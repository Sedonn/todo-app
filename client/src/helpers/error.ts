/** @fileoverview Shows error messages from all places of the app. */

import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

type ErrorResponse = { error: string };

/**
 * Shows error messages from all places of the app.
 * @param error
 */
export const showErrorMessage = (
  error: unknown | Error | AxiosError<ErrorResponse>,
) => {
  if (error instanceof AxiosError && error.response?.data.error) {
    const { data } = error.response as AxiosResponse<ErrorResponse>;

    return toast.error(data.error);
  }

  console.error(error);

  if (error instanceof AxiosError) {
    return toast.error('Неизвестная ошибка сети');
  }

  if (error instanceof Error) {
    return toast.error('Неизвестная ошибка');
  }
};
