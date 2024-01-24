export type TTask = {
  id: number;
  user: number;
  content: string;
  createDate: Date;
  updateDate: Date;
  completeDate: Date;
};

export type TTaskResponseBody = Omit<TTask, 'user'>;
