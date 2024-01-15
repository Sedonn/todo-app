import { createTodoRecord, deleteTodoRecord, getUserTodos, updateTodoRecordCompletion, updateTodoRecordContent } from '../Models/todo.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getTodos = async (req, res) => {
  try {
    const todos = await getUserTodos(req.user.id);

    return res.json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка получения списка дел' });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createTodo = async (req, res) => {
  try {
    const newTodo = await createTodoRecord(req.user.id);

    return res.json(newTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка создания записи' });
  }
};


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateTodoStatus = async (req, res) => {
  const { id, completed } = req.body;
  try {
    const updatedTodo = await updateTodoRecordCompletion(req.user.id, id, completed);

    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка обновления записи' });
  }
};


/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateTodoContent = async (req, res) => {
  const { id, content } = req.body;
  try {
    const updatedTodo = await updateTodoRecordContent(req.user.id, id, content);

    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка обновления записи' });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteTodo = async (req, res) => {
  try {
    await deleteTodoRecord(req.body.id);

    return res.json({ status: 'Удалено успешно' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Ошибка создания записи' });
  }
};