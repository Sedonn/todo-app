/** @fileoverview Manage of the user tasks. */

import { useEffect, useMemo, useRef, useState } from 'react';

import { List, Message, Segment } from 'semantic-ui-react';

import TaskListHeader from './components/TaskListHeader';
import TaskListMenu, { TTaskStatusFilterType } from './components/TaskListMenu';
import TaskListItem from './components/TaskListItem';
import TaskEditDialog, {
  TTaskEditDialogRefAttributes,
} from './components/TaskEditDialog';

import { TSortType } from '@/components/SortButton';

import { getTasks } from '@/API/taskAPI';
import { showErrorMessage } from '@/helpers/error';

import { TTask, TTaskSortableKeys } from '@/@types/task';

type TTaskFilterFunction = (task: TTask) => boolean;

type TTaskSortFunction = (first: TTask, second: TTask) => number;

/**
 * Create a task sort function for {@link Array.sort} by the certain field and sort type.
 * @param field
 * @param sort
 */
const createTaskSortFunction = (field: TTaskSortableKeys, sort: TSortType) => {
  const comparatorConfig = {
    asc: (first: TTask, second: TTask) =>
      Number(first[field]) - Number(second[field]),
    desc: (first: TTask, second: TTask) =>
      Number(second[field]) - Number(first[field]),
    none: () => 0,
  } satisfies Record<TSortType, TTaskSortFunction>;

  return comparatorConfig[sort];
};

/**
 * Function for {@link Array.filter} that shows a tasks without filter condition.
 * @param task
 */
const showAllTasks: TTaskFilterFunction = (task: TTask) => !!task;

/**
 * Function for {@link Array.filter} that shows only completed tasks.
 * @param task
 */
const showOnlyCompletedTasks: TTaskFilterFunction = ({ completeDate }: TTask) =>
  !!completeDate;

/** Function for {@link Array.filter} that shows only uncompleted tasks. */
const showOnlyUncompletedTasks: TTaskFilterFunction = ({
  completeDate,
}: TTask) => !completeDate;

/** Manage of the user tasks. */
const Task = () => {
  const taskEditDialog = useRef<TTaskEditDialogRefAttributes>(null);

  const [tasks, setTasks] = useState<TTask[]>([]);

  const [tasksFilterFunction, setTasksFilterFunction] =
    useState<TTaskFilterFunction>(() => showAllTasks);

  const [tasksSortFunction, setTasksSortFunction] =
    useState<TTaskSortFunction>();

  const tasksFilteredAndSorted = useMemo<TTask[]>(
    () => tasks.filter(tasksFilterFunction).sort(tasksSortFunction),
    [tasks, tasksFilterFunction, tasksSortFunction],
  );

  const onFilterByStatusType = (filterType: TTaskStatusFilterType) => {
    const taskDataFilterConfig = {
      all: showAllTasks,
      completed: showOnlyCompletedTasks,
      uncompleted: showOnlyUncompletedTasks,
    } satisfies Record<TTaskStatusFilterType, TTaskFilterFunction>;

    setTasksFilterFunction(() => taskDataFilterConfig[filterType]);
  };

  const onSortByDate = (sortKey: TTaskSortableKeys, sortType: TSortType) =>
    setTasksSortFunction(() => createTaskSortFunction(sortKey, sortType));

  const onTaskCreated = (createdTask: TTask) =>
    setTasks((prevState) => [...prevState, createdTask]);

  const onTaskUpdated = (updatedTask: TTask) =>
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );

  const onTaskDeleted = ({ id: deleteId }: TTask) =>
    setTasks((prevState) => prevState.filter(({ id }) => id !== deleteId));

  useEffect(() => {
    getTasks().then(setTasks).catch(showErrorMessage);
  }, []);

  return (
    <>
      <TaskEditDialog
        ref={taskEditDialog}
        onTaskCreated={onTaskCreated}
        onTaskUpdated={onTaskUpdated}
      />

      <Segment.Group className="flex h-full w-full">
        <Segment className="flex-initial">
          <TaskListHeader />
          <TaskListMenu
            onCreateTask={() => taskEditDialog.current?.openAndCreateTask()}
            onFilterByStatusType={onFilterByStatusType}
            onSortByDate={onSortByDate}
          />
        </Segment>
        <Segment className="flex-auto !overflow-y-auto">
          {tasksFilteredAndSorted.length !== 0 ? (
            <List relaxed>
              {tasksFilteredAndSorted.map((task: TTask) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onTaskEdit={(task: TTask) =>
                    taskEditDialog.current?.openAndEditTask(task)
                  }
                  onTaskUpdated={onTaskUpdated}
                  onTaskDeleted={onTaskDeleted}
                />
              ))}
            </List>
          ) : (
            <Message className="text-center">Список дел пуст</Message>
          )}
        </Segment>
      </Segment.Group>
    </>
  );
};

export default Task;
