import { APIService } from './APIService';

const formateTaskData = (task: TTask) => ({
  ...task,
  completed: Boolean(task.completed),
  createDate: new Date(task.createDate),
  completeDate:
    typeof task.completeDate === 'number'
      ? new Date(task.completeDate)
      : task.completeDate,
});

export const getTasks = async () => {
  const { data } = await APIService.get<TTask[]>('todo/');
  const todoFormatted = data.map(formateTaskData);

  return todoFormatted;
};

export const createTask = async () => {
  const { data } = await APIService.post<TTask>('todo/');
  const todoFormatted = formateTaskData(data);

  return todoFormatted;
};

export const updateTaskCompletion = async (id: number, completed: number) =>
  APIService.put<TTask>('/todo/status', {
    id,
    completed: Number(completed),
  });

export const updateTaskContent = async (id: number, content: string) =>
  APIService.put<TTask>('/todo/content', { id, content });

export const deleteTask = async (id: number) =>
  APIService.delete('todo/', { data: { id } });
