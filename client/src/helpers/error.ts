/** @fileoverview Shows error messages from all places of the app. */

import { AxiosError, AxiosResponse } from 'axios';
import { t } from 'i18next';
import { toast } from 'react-toastify';

/**
 * Shows error messages from all places of the app.
 * @param error
 */
export const showErrorMessage = (
  error: unknown | Error | AxiosError<ErrorResponse>,
) => {
  if (error instanceof AxiosError && error.response?.data.error) {
    const { data } = error.response as AxiosResponse<ErrorResponse>;

    return toast.error(t(`api:errors.${data.error}`));
  }

  console.error(error);

  if (error instanceof AxiosError) {
    return toast.error(t('api:errors.UNKNOWN_NETWORK_ERROR'));
  }

  if (error instanceof Error) {
    return toast.error(t('api:errors.UNKNOWN_ERROR'));
  }
};
