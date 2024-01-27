import { APIService } from './APIService';

import { TTask, TTaskRaw, TTaskRawResponse } from '@/@types/task';

/**
 * Convert to the {@link Date} type certain task data fields.
 * @param task
 */
const convertTaskData = (task: TTaskRaw): TTask => ({
  ...task,
  createDate: new Date(task.createDate),
  updateDate: new Date(task.updateDate),
  completeDate: task.completeDate ? new Date(task.completeDate) : null,
});

/** Get all current user tasks. */
export const getTasks = async () => {
  const { data } = await APIService.get<TTaskRaw[]>('task/');

  return data.map(convertTaskData);
};

/**
 * Create the new user task.
 * @param content
 */
export const createTask = async (content: string): Promise<TTask> => {
  const { data } = await APIService.post<
    TTaskRaw,
    TTaskRawResponse,
    Pick<TTask, 'content'>
  >('task/', { content });

  return convertTaskData(data);
};

/**
 * Update the certain users task.
 * @param task
 */
export const updateTask = async ({ id, completeDate, content }: TTask) => {
  const { data } = await APIService.put<
    TTaskRaw,
    TTaskRawResponse,
    Pick<TTask, 'id' | 'content' | 'completeDate'>
  >('task/', { id, completeDate, content });

  return convertTaskData(data);
};

/**
 * Delete the certain users task.
 * @param task
 */
export const deleteTask = async ({ id }: TTask) => {
  const { data } = await APIService.delete<
    TTaskRaw,
    TTaskRawResponse,
    Pick<TTask, 'id'>
  >('task/', {
    data: { id },
  });

  return convertTaskData(data);
};
