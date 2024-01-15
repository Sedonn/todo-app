import db from '../db/db.js';

/** Получить пользователя по id */
export const getUserByID = (id) =>
  db.get('SELECT id FROM user WHERE id = :id', {
    ':id': id
  });

/** Получить пользователя по логину */
export const getUserByLogin = (login) =>
  db.get('SELECT id FROM user WHERE login = :login', {
    ':login': login
  });

/** Получить пользователя по логину и паролю */
export const getUserByLoginAndPassword = (login, password) =>
  db.get('SELECT id FROM user WHERE login = :login AND password = :password', {
    ':login': login,
    ':password': password
  });

/** Создать нового пользователя */
export const createUser = (login, password) =>
  db.run(`INSERT INTO user (login, password) VALUES (:login, :password)`, {
    ':login': login,
    ':password': password
  });