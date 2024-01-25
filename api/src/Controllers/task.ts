import type { NextFunction, Request, RequestHandler, Response } from 'express';

import AppDataSource from '@/data-source.ts';
import Task from '@/Models/Task.ts';
import APIError from '@/utils/APIError.ts';

import type { TTask, TTaskResponseBody } from '@/@types/task.d.ts';

/**
 * Get all current user tasks.
 * @param req
 * @param res
 * @param next
 */
export const getTasks: RequestHandler = async (
  { user }: Request,
  res: Response<TTaskResponseBody[]>,
  next: NextFunction,
) => {
  const taskRepository = AppDataSource.getRepository(Task);

  try {
    const tasks = await taskRepository.findBy({ user: user!.id });

    return res.json(tasks);
  } catch (error) {
    return next(new APIError(500, 'Ошибка получения списка задач', error));
  }
};

type CreateTaskRequestBody = Pick<TTask, 'content'>;

type CreateTaskRequest = Request<object, object, CreateTaskRequestBody>;

/**
 * Create the new user task.
 * @param req
 * @param res
 * @param next
 */
export const createTask: RequestHandler = async (
  { user, body }: CreateTaskRequest,
  res: Response<TTaskResponseBody>,
  next: NextFunction,
) => {
  const taskRepository = AppDataSource.getRepository(Task);
  const { content } = body;

  try {
    const task = await taskRepository.save(
      taskRepository.create({
        user: user!.id,
        content,
      }),
    );

    return res.json(task);
  } catch (error) {
    return next(new APIError(500, 'Ошибка создания новой задачи', error));
  }
};

type UpdateTaskRequestBody = Pick<TTask, 'id' | 'content' | 'completeDate'>;

type UpdateTaskRequest = Request<object, object, UpdateTaskRequestBody>;

/**
 * Update the certain users task.
 * @param req
 * @param res
 * @param next
 */
export const updateTask: RequestHandler = async (
  { user, body }: UpdateTaskRequest,
  res: Response<TTaskResponseBody>,
  next: NextFunction,
) => {
  const { id, completeDate, content } = body;
  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOneBy({ id, user: user!.id });
  if (!task) {
    return next(new APIError(500, 'Задача не существует'));
  }

  try {
    taskRepository.merge(task, { content, completeDate });
    const updatedTask = await taskRepository.save(task);

    return res.json(updatedTask);
  } catch (error) {
    return next(new APIError(500, 'Ошибка обновления задачи', error));
  }
};

type DeleteTaskRequestBody = Pick<TTask, 'id'>;

type DeleteTaskRequest = Request<object, object, DeleteTaskRequestBody>;

/**
 * Delete the certain users task.
 * @param req
 * @param res
 * @param next
 */
export const deleteTask: RequestHandler = async (
  { user, body }: DeleteTaskRequest,
  res: Response<TTaskResponseBody>,
  next: NextFunction,
) => {
  const { id } = body;
  const taskRepository = AppDataSource.getRepository(Task);

  const task = await taskRepository.findOneBy({ id, user: user!.id });
  if (!task) {
    return next(new APIError(500, 'Задача не существует'));
  }

  try {
    await taskRepository.remove(task);

    return res.json(task);
  } catch (error) {
    return next(new APIError(500, 'Ошибка удаления задачи', error));
  }
};
