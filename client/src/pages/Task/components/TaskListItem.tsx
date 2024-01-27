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

import { deleteTask, updateTask } from '@/API/taskAPI';
import { showErrorMessage } from '@/helpers/error';

import { TTask } from '@/@types/task';

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
      const updatedTask = await updateTask({
        ...task,
        completeDate: checked ? new Date() : null,
      });

      onTaskUpdated(updatedTask);
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onTaskDelete = async () => {
    try {
      await deleteTask(task);
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
            {task.completeDate && (
              <>
                <Label icon="check" color="green" content="Выполнено" />

                <Label
                  icon="calendar check"
                  color="blue"
                  content={task.completeDate.toLocaleString()}
                />
              </>
            )}
            <div className="!ml-auto">
              {Number(task.createDate) !== Number(task.updateDate) && (
                <Label
                  icon="edit"
                  color="yellow"
                  content={task.updateDate.toLocaleString()}
                />
              )}

              <Label
                icon="calendar plus"
                color="teal"
                content={task.createDate.toLocaleString()}
              />
            </div>
          </List.Header>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex w-full items-center">
              <Checkbox
                checked={!!task.completeDate}
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
