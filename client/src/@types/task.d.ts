import { AxiosResponse } from 'axios';

/** The base task type. */
type TTask = {
  id: number;
  content: string;
  createDate: Date;
  updateDate: Date;
  completeDate: Date | null;
};

/** The task data received from API. */
type TTaskRaw = TTask & {
  content: string;
  createDate: string;
  updateDate: string;
  completeDate: string | null;
};

type TTaskRawResponse = AxiosResponse<TTaskRaw>;

type TTaskSortableKeys = keyof PickByType<TTask, number | (Date | null)>;
