/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { APIError } from '@/utils/APIError.ts';

import type { TErrorResponse } from '@/@types/error.d.ts';

/** Middleware which sending all API errors to the client. */
export const globalErrorHandler: ErrorRequestHandler = async (
  error: Error | APIError,
  req: Request<object, TErrorResponse>,
  res: Response<TErrorResponse>,
  next: NextFunction,
) => {
  if (error instanceof APIError) {
    return res.status(error.httpCode).json({ error: error.message });
  }

  console.error(error);

  return res.status(500).json({ error: 'Неизвестная ошибка' });
};
