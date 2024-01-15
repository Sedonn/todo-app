import db from '../db/db.js';

/** Получить список дел */
export const getUserTodos = (userId) =>
  db.all('SELECT * FROM todo WHERE userId = :userId', {
    ':userId': userId
  });

/** Создать новую задачу в списке дел */
export const createTodoRecord = (userId) =>
  db.get('INSERT INTO todo (userId, createDate) VALUES (:userId, :createDate) RETURNING *', {
    ':userId': userId,
    ':createDate': new Date().getTime()
  });

/** Обновить статус задачи в списке дел */
export const updateTodoRecordCompletion = (userId, todoId, completed) =>
  db.run('UPDATE todo SET completed = :completed, completeDate = :completeDate WHERE userId = :userId AND id = :id', {
    ':id': todoId,
    ':userId': userId,
    ':completed': Number(completed),
    ':completeDate': completed ? new Date().getTime() : null
  });

/** Обновить содержание задачи в списке дел */
export const updateTodoRecordContent = (userId, todoId, content) =>
  db.run('UPDATE todo SET content = :content WHERE userId = :userId AND id = :id', {
    ':id': todoId,
    ':userId': userId,
    ':content': content,
  });

/** Удалить задачу */
export const deleteTodoRecord = (todoId) =>
  db.get('DELETE FROM todo WHERE id = :id', {
    ':id': todoId
  });