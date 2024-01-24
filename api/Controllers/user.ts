import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { NextFunction, Request, RequestHandler, Response } from 'express';

import AppDataSource from '../data-source';
import User from '../Models/User';
import APIError from '../utils/APIError';
import { JWT_TOKEN_SECRET } from '../config';

import { TUser } from '../@types/user';

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
