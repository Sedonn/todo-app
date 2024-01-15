import jwt from 'jsonwebtoken';

import { createUser, getUserByLogin, getUserByLoginAndPassword } from '../Models/user.js';
import { JWT_TOKEN_SECRET } from '../config.js';
import db from '../db/db.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const register = async (req, res) => {
  const { login, password } = req.body;

  const user = await getUserByLogin(login);

  if (user) {
    return res.status(400).json({ error: 'Такой пользователь уже существует' });
  }

  try {
    await createUser(login, password);

    return res.json({ status: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка регистрации пользователя' });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await getUserByLoginAndPassword(login, password);

    if (!user) {
      return res.status(500).json({ error: 'Ошибка авторизации пользователя, проверьте введенный логин или пароль' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_TOKEN_SECRET);

    return res.json({ token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка авторизации пользователя' });
  }
};