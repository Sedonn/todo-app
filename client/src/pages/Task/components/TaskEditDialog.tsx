/** @fileoverview Dialog for creating and updating task data. */

import {
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import {
  Button,
  Form,
  Icon,
  ModalActions,
  ModalContent,
  ModalHeader,
  TextArea,
} from 'semantic-ui-react';

import ControllableDialog, {
  ControllableDialogRefAttributes,
} from '@/components/ControllableDialog';

import { createTask, updateTaskContent } from '@/API/taskAPI';
import { showErrorMessage } from '@/helpers/error';

type TEditMode = 'create' | 'update';

type TTaskEditDialogProps = {
  /** Executes when task is successfully created. */
  onTaskCreated: (task: TTask) => void;
  /** Executes when task is successfully updated. */
  onTaskUpdated: (task: TTask) => void;
};

export type TTaskEditDialogRefAttributes = {
  /** Show dialog and enable 'create' task mode. */
  openAndCreateTask: () => void;

  /**
   * Show dialog and enable 'update' task mode.
   * @param task
   */
  openAndEditTask: (task: TTask) => void;
};

/** Dialog for creating and updating task data. */
const TaskEditDialog = forwardRef<
  TTaskEditDialogRefAttributes,
  TTaskEditDialogProps
>(({ onTaskCreated, onTaskUpdated }, ref) => {
  const dialogRef = useRef<ControllableDialogRefAttributes>(null);

  const [task, setTask] = useState<TTask | null>(null);
  const [editMode, setEditMode] = useState<TEditMode>('create');
  const [taskContent, setTaskContent] = useState<string>('');

  const openAndCreateTask = () => {
    setTask(null);
    setEditMode('create');
    dialogRef.current?.open();
  };

  const openAndEditTask = (task: TTask) => {
    setTask(task);
    setTaskContent(task.content);
    setEditMode('update');
    dialogRef.current?.open();
  };

  useImperativeHandle(ref, () => ({ openAndCreateTask, openAndEditTask }));

  const onTaskContentChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) =>
    setTaskContent(target.value);

  const onCreateTask = async () => {
    try {
      const newTaskData = await createTask();
      await updateTaskContent(newTaskData.id, taskContent);

      dialogRef.current?.close();
      toast.success('Новая задача добавлена');
      onTaskCreated({ ...newTaskData, content: taskContent });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onUpdateTask = async () => {
    try {
      await updateTaskContent(task!.id, taskContent);

      dialogRef.current?.close();
      toast.success('Изменения сохранены');
      onTaskUpdated({ ...task!, content: taskContent });
    } catch (error) {
      showErrorMessage(error);
    }
  };

  const onSaveTask = async () => {
    const taskSaveConfig = {
      create: onCreateTask,
      update: onUpdateTask,
    } satisfies Record<TEditMode, () => void>;

    taskSaveConfig[editMode]();
  };

  const titleConfig = {
    create: 'Создать новую задачу',
    update: 'Обновить задачу',
  } satisfies Record<TEditMode, string>;

  return (
    <ControllableDialog ref={dialogRef} onClose={dialogRef.current?.close}>
      <ModalHeader className="!flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="edit" size="large" />
          <div>{titleConfig[editMode]}</div>
        </div>
        <Icon
          className="cursor-pointer"
          name="close"
          color="black"
          size="large"
          onClick={dialogRef.current?.close}
        />
      </ModalHeader>
      <ModalContent>
        <Form as="div">
          <TextArea
            value={taskContent}
            onChange={onTaskContentChange}
            name="content"
            className="min-h-[100px] max-h-[350px]"
          />
        </Form>
      </ModalContent>
      <ModalActions>
        <Button
          labelPosition="left"
          icon="checkmark"
          color="green"
          content="Сохранить"
          onClick={onSaveTask}
        />
      </ModalActions>
    </ControllableDialog>
  );
});

export default TaskEditDialog;