/** @fileoverview Task operation options. */

import { useState } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import SortButton, { TSortButtonProps } from '@/components/SortButton';

export type TTaskStatusFilterType = 'completed' | 'uncompleted' | 'all';

type TTaskListMenuProps = {
  onCreateTask: () => void;
  onFilterByStatusType: (filterType: TTaskStatusFilterType) => void;
  onSortByDate: TSortButtonProps<TTaskSortableKeys>['onSortChanged'];
};

const TaskListMenu = ({
  onCreateTask,
  onFilterByStatusType,
  onSortByDate,
}: TTaskListMenuProps) => {
  const [filterKey, setFilterKey] = useState<TTaskStatusFilterType>('all');

  const onFilterClick = (key: TTaskStatusFilterType) => {
    const newFilterKey: TTaskStatusFilterType = filterKey === key ? 'all' : key;

    setFilterKey(newFilterKey);
    onFilterByStatusType(newFilterKey);
  };

  return (
    <Button.Group>
      <Button onClick={onCreateTask} icon="add" color="green" />
      <SortButton<TTaskSortableKeys>
        title="Дата создания"
        sortKey="createDate"
        onSortChanged={onSortByDate}
      />
      <SortButton<TTaskSortableKeys>
        title="Дата выполнения"
        sortKey="completeDate"
        onSortChanged={onSortByDate}
      />
      <Button
        color={filterKey === 'completed' ? 'blue' : undefined}
        onClick={() => onFilterClick('completed')}
        icon
      >
        <Icon className="!ml-1" name="filter" />
        Выполненные
      </Button>
      <Button
        color={filterKey === 'uncompleted' ? 'blue' : undefined}
        onClick={() => onFilterClick('uncompleted')}
        icon
      >
        <Icon className="!ml-1" name="filter" />
        Невыполненные
      </Button>
    </Button.Group>
  );
};

export default TaskListMenu;