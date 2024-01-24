/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */

import { NextFunction, Request, Response } from 'express';

import APIError from '../utils/APIError';

import { ErrorResponse } from '../@types/error';

/** Middleware which sending all API errors to the client. */
const globalErrorHandler = async (
  error: Error | APIError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => {
  if (error instanceof APIError) {
    return res.status(error.httpCode).json({ error: error.message });
  }

  console.error(error);

  return res.status(500).json({ error: 'Неизвестная ошибка' });
};

export default globalErrorHandler;
