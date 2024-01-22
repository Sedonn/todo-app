/** @fileoverview Task card. */

import { FormEvent } from 'react';

import {
  Button,
  Checkbox,
  CheckboxProps,
  Label,
  List,
  Segment,
} from 'semantic-ui-react';

import { deleteTask, updateTaskCompletion } from '@/API/taskAPI';
import { showErrorMessage } from '@/helpers/error';

type TTaskListItemProps = {
  task: TTask;
  /** Executes on task update request. */
  onTaskEdit: (task: TTask) => void;
  /** Executes when task status is successfully updated. */
  onTaskUpdated: (task: TTask) => void;
  /** Executes when task is successfully deleted. */
  onTaskDeleted: (task: TTask) => void;
};

/** Task card. */
const TaskListItem = ({
  task,
  onTaskUpdated,
  onTaskEdit,
  onTaskDeleted,
}: TTaskListItemProps) => {
  const onCompleteChange = async (
    _: FormEvent<HTMLInputElement>,
    { checked }: CheckboxProps,
  ) => {
    try {
      await updateTaskCompletion(task.id, Number(checked));

      onTaskUpdated({
        ...task!,
        completed: Number(checked),
        completeDate: Number(checked ? new Date() : null),
      });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onTaskDelete = async () => {
    try {
      await deleteTask(task.id);
      onTaskDeleted(task);
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <List.Item>
      <List.Content>
        <Segment className="!text-xl">
          <List.Header className="!flex justify-between !text-base">
            {!!task.completed && (
              <>
                <Label icon="check" color="green" content="Выполнено" />

                <Label
                  icon="calendar check"
                  color="blue"
                  content={new Date(task.completeDate).toLocaleString()}
                />
              </>
            )}
            <Label
              className="!ml-auto"
              icon="calendar plus"
              color="teal"
              content={new Date(task.createDate).toLocaleString()}
            />
          </List.Header>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex w-full items-center">
              <Checkbox
                checked={!!task.completed}
                onChange={onCompleteChange}
              />

              <div className="flex w-full max-w-max items-center">
                <p className="ml-3">{task.content}</p>
                <Button
                  onClick={() => onTaskEdit(task)}
                  className="!ml-3"
                  circular
                  size="mini"
                  icon="pencil alternate"
                />
              </div>
            </div>

            <Button
              onClick={onTaskDelete}
              className="!ml-3"
              circular
              icon="trash"
              color="red"
            />
          </div>
        </Segment>
      </List.Content>
    </List.Item>
  );
};

export default TaskListItem;
