/* eslint-disable @typescript-eslint/no-misused-promises */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { NextFunction, Request, RequestHandler, Response } from 'express';

import AppDataSource from '@/data-source.ts';
import User from '@/Models/User.ts';
import APIError from '@/utils/APIError.ts';
import { JWT_TOKEN_SECRET } from '@/config.ts';

import type { TUser } from '@/@types/user.d.ts';

type RegisterUserRequest = Request<object, object, TUser>;

/**
 * Create the new user.
 * @param req
 * @param res
 */
export const registerUser: RequestHandler = async (
  { body }: RegisterUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const { login, password } = body;

  if (await userRepository.findOneBy({ login })) {
    return next(new APIError(400, 'Такой пользователь уже существует'));
  }

  const user = userRepository.create({
    login,
    password: await bcrypt.hash(password, 10),
  });

  try {
    await userRepository.save(user);

    return res.status(200).end();
  } catch (error) {
    return next(new APIError(500, 'Ошибка регистрации пользователя'));
  }
};

type LoginUserRequest = Request<object, object, TUser>;

/**
 * Authorize the new user.
 * @param req
 * @param res
 */
export const loginUser: RequestHandler = async (
  { body }: LoginUserRequest,
  res: Response<{ token: string }>,
  next: NextFunction,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const { login, password } = body;

  const user = await userRepository.findOneBy({ login });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new APIError(401, 'Ошибка авторизации пользователя, проверьте введенный логин или пароль'));
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, JWT_TOKEN_SECRET);

  return res.json({ token });
};
