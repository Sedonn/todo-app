type TTask = {
  id: number;
  userId: number;
  completed: number;
  content: string;
  createDate: number;
  completeDate: number;
};

type TTaskSortableKeys = keyof PickByType<TTask, number>;
