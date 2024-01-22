import { APIService } from './APIService';

export const getTasks = async () => {
  const { data } = await APIService.get<TTask[]>('todo/');

  return data;
};

export const createTask = async () => {
  const { data } = await APIService.post<TTask>('todo/');

  return data;
};

export const updateTaskCompletion = async (id: number, completed: number) =>
  APIService.put<TTask>('/todo/status', {
    id,
    completed: Number(completed),
  });

export const updateTaskContent = async (id: number, content: string) => {
  const { data } = await APIService.put<TTask>('/todo/content', {
    id,
    content,
  });

  return data;
};

export const deleteTask = async (id: number) =>
  APIService.delete('todo/', { data: { id } });
